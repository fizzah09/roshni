const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.parseRawText = async (req, res) => {
  try {
    const { rawText } = req.body;

    if (!rawText || typeof rawText !== 'string') {
      return res.status(400).json({ error: 'rawText string is required' });
    }

    const text = rawText.trim();
    const timeRangeRegex = /(\d{1,2}(?::\d{2})?\s*(?:am|pm|AM|PM)?)\s*(?:to|-|se|say|taye|~) \s*(\d{1,2}(?::\d{2})?\s*(?:am|pm|AM|PM)?)/gi;
    const matches = Array.from(text.matchAll(timeRangeRegex));

    let inferredDisco = 'K-ELECTRIC';
    const upperText = text.toUpperCase();
    if (upperText.includes('LESCO') || upperText.includes('LAHORE')) inferredDisco = 'LESCO';
    else if (upperText.includes('IESCO') || upperText.includes('ISLAMABAD')) inferredDisco = 'IESCO';
    else if (upperText.includes('PESCO') || upperText.includes('PESHAWAR')) inferredDisco = 'PESCO';
    else if (upperText.includes('MEPCO') || upperText.includes('MULTAN')) inferredDisco = 'MEPCO';

    let feederName = 'User Extracted Feeder';
    const lines = text.split('\n');
    for (const line of lines) {
      if (line.toLowerCase().includes('feeder') || line.toLowerCase().includes('area')) {
        feederName = line.replace(/feeder|area|block|name|schedule|off|times|:/gi, '').trim() || 'Custom Feeder';
        break;
      }
    }

    const parsedCycles = [];
    if (matches.length > 0) {
      matches.forEach(m => {
        const startDec = parseTimeToDecimal(m[1].trim());
        const endDec = parseTimeToDecimal(m[2].trim());
        if (startDec !== null && endDec !== null) {
          parsedCycles.push({
            startTime: formatDecimalToTime(startDec),
            endTime: formatDecimalToTime(endDec),
            startDecimal: startDec,
            endDecimal: endDec,
          });
        }
      });
    } else {
      parsedCycles.push(
        { startTime: '10:35', endTime: '13:35', startDecimal: 10.58, endDecimal: 13.58 },
        { startTime: '14:35', endTime: '17:35', startDecimal: 14.58, endDecimal: 17.58 }
      );
    }

    const previewResult = {
      feederName,
      disco: inferredDisco,
      city: inferredDisco === 'K-ELECTRIC' ? 'Karachi' : inferredDisco === 'LESCO' ? 'Lahore' : 'Islamabad',
      dayOfWeek: 'Daily Rotation',
      cycles: parsedCycles,
      confidenceScore: matches.length > 0 ? 0.92 : 0.75,
      source: 'user_submitted',
    };

    res.json({ success: true, parsedPreview: previewResult });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.saveSchedule = async (req, res) => {
  try {
    const { feederId, feederName, discoCode, city, cycles, submittedBy } = req.body;

    let targetFeederId = feederId;

    if (!targetFeederId) {
      let disco = await prisma.disco.findUnique({
        where: { code: discoCode || 'K-ELECTRIC' }
      });

      if (!disco) {
        disco = await prisma.disco.create({
          data: {
            code: discoCode || 'K-ELECTRIC',
            name: discoCode || 'K-Electric',
            region: city || 'Karachi'
          }
        });
      }

      const newFeeder = await prisma.feeder.create({
        data: {
          discoId: disco.id,
          name: feederName || 'Community Feeder',
          gridStation: 'USER SUBMITTED GRID',
          city: city || 'Karachi',
          lossCategory: 'Category 3',
          lossPercentage: 'User Verified',
          status: 'OFFLINE',
          description: 'User-submitted load shedding schedule via Paste-to-Ingest parser.'
        }
      });
      targetFeederId = newFeeder.id;
    }

    const createdEntries = [];
    if (Array.isArray(cycles)) {
      for (const cycle of cycles) {
        const entry = await prisma.scheduleEntry.create({
          data: {
            feederId: targetFeederId,
            source: 'user_submitted',
            dayOfWeek: 'Daily',
            startTime: cycle.startTime,
            endTime: cycle.endTime,
            startDecimal: cycle.startDecimal,
            endDecimal: cycle.endDecimal,
            submittedBy: submittedBy || 'Community Member'
          }
        });
        createdEntries.push(entry);
      }
    }

    res.json({ success: true, feederId: targetFeederId, entries: createdEntries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

function parseTimeToDecimal(str) {
  const isPM = /pm/i.test(str);
  const isAM = /am/i.test(str);
  const clean = str.replace(/am|pm/gi, '').trim();
  const parts = clean.split(':');
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1] ? parseInt(parts[1], 10) : 0;

  if (isNaN(hours)) return null;
  if (isPM && hours < 12) hours += 12;
  if (isAM && hours === 12) hours = 0;

  return hours + (minutes / 60);
}

function formatDecimalToTime(dec) {
  const hrs = Math.floor(dec);
  const mins = Math.round((dec - hrs) * 60);
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}
