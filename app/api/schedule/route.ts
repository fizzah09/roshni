import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { feederId, feederName, discoCode, city, cycles, submittedBy } = body;

    let targetFeederId = feederId;

    // If no existing feederId provided, find or create feeder
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

    // Save schedule entries
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

    return NextResponse.json({ success: true, feederId: targetFeederId, entries: createdEntries });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
