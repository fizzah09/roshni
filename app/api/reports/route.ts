import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { feederId, startTime, endTime, note, outageType, deviceId } = body;

    if (!feederId || !startTime) {
      return NextResponse.json(
        { error: 'feederId and startTime are required fields' },
        { status: 400 }
      );
    }

    // Anti-abuse check: rate limit (max 5 reports per device in 1 hour)
    const clientDeviceId = deviceId || 'anon_device';
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    const recentReports = await prisma.outageReport.count({
      where: {
        deviceId: clientDeviceId,
        createdAt: { gte: oneHourAgo }
      }
    });

    if (recentReports >= 5) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait before submitting more reports.' },
        { status: 429 }
      );
    }

    const report = await prisma.outageReport.create({
      data: {
        feederId,
        startTime: new Date(startTime),
        endTime: endTime ? new Date(endTime) : null,
        outageType: outageType || 'unscheduled',
        note: note || null,
        deviceId: clientDeviceId,
      }
    });

    return NextResponse.json({ success: true, report });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
