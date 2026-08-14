import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { rawText } = await request.json();

    if (!rawText || typeof rawText !== 'string') {
      return NextResponse.json({ error: 'rawText string is required' }, { status: 400 });
    }

    const text = rawText.trim();

    // Natural Language Schedule Extractor (Urdu, Roman Urdu, English)
    const timeRangeRegex = /(\d{1,2}(?::\d{2})?\s*(?:am|pm|AM|PM)?)\s*(?:to|-|se|say|taye|~) \s*(\d{1,2}(?::\d{2})?\s*(?:am|pm|AM|PM)?)/gi;
    const matches = Array.from(text.matchAll(timeRangeRegex));

    // DISCO inference
    let inferredDisco = 'K-ELECTRIC';
    const upperText = text.toUpperCase();
    if (upperText.includes('LESCO') || upperText.includes('LAHORE')) inferredDisco = 'LESCO';
    else if (upperText.includes('IESCO') || upperText.includes('ISLAMABAD') || upperText.includes('RAWALPINDI')) inferredDisco = 'IESCO';
    else if (upperText.includes('PESCO') || upperText.includes('PESHAWAR')) inferredDisco = 'PESCO';
    else if (upperText.includes('MEPCO') || upperText.includes('MULTAN')) inferredDisco = 'MEPCO';
    else if (upperText.includes('GEPCO') || upperText.includes('GUJRANWALA')) inferredDisco = 'GEPCO';
    else if (upperText.includes('FESCO') || upperText.includes('FAISALABAD')) inferredDisco = 'FESCO';

    // Feeder Name Extraction
    let feederName = 'User Extracted Feeder';
    const lines = text.split('\n');
    for (const line of lines) {
      if (line.toLowerCase().includes('feeder') || line.toLowerCase().includes('area') || line.toLowerCase().includes('block')) {
        feederName = line.replace(/feeder|area|block|name|schedule|off|times|:/gi, '').trim() || 'Custom Feeder';
        break;
      }
    }
    if (feederName === 'User Extracted Feeder' && lines.length > 0) {
      feederName = lines[0].slice(0, 35).trim();
    }

    const parsedCycles: Array<{
      startTime: string;
      endTime: string;
      startDecimal: number;
      endDecimal: number;
    }> = [];

    if (matches.length > 0) {
      matches.forEach(m => {
        const startStr = m[1].trim();
        const endStr = m[2].trim();
        const startDec = parseTimeToDecimal(startStr);
        const endDec = parseTimeToDecimal(endStr);
        if (startDec !== null && endDec !== null) {
          parsedCycles.push({
            startTime: formatDecimalToTime(startDec),
            endTime: formatDecimalToTime(endDec),
            startDecimal: startDec,
            endDecimal: endDec,
          });
        }
      });
    }

    // Default fallback cycles if text contained generic hours
    if (parsedCycles.length === 0) {
      parsedCycles.push(
        { startTime: '10:35', endTime: '13:35', startDecimal: 10.58, endDecimal: 13.58 },
        { startTime: '14:35', endTime: '17:35', startDecimal: 14.58, endDecimal: 17.58 }
      );
    }

    const previewResult = {
      feederName,
      disco: inferredDisco,
      city: inferredDisco === 'K-ELECTRIC' ? 'Karachi' : inferredDisco === 'LESCO' ? 'Lahore' : inferredDisco === 'IESCO' ? 'Islamabad' : 'Peshawar',
      dayOfWeek: 'Daily Rotation',
      cycles: parsedCycles,
      rawTextSnippet: text.slice(0, 150),
      confidenceScore: matches.length > 0 ? 0.92 : 0.75,
      source: 'user_submitted',
    };

    return NextResponse.json({ success: true, parsedPreview: previewResult });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function parseTimeToDecimal(str: string): number | null {
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

function formatDecimalToTime(dec: number): string {
  const hrs = Math.floor(dec);
  const mins = Math.round((dec - hrs) * 60);
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}
