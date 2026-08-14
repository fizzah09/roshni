import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const disco = searchParams.get('disco');
    const city = searchParams.get('city');
    const query = searchParams.get('q')?.toLowerCase();

    const whereClause: any = {};

    if (disco && disco !== 'ALL') {
      whereClause.disco = {
        code: { equals: disco.toUpperCase() }
      };
    }

    if (city && city !== 'ALL') {
      whereClause.city = { equals: city };
    }

    let feeders = await prisma.feeder.findMany({
      where: whereClause,
      include: {
        disco: true,
        schedules: true,
        outages: true,
      },
      orderBy: { name: 'asc' }
    });

    if (query) {
      feeders = feeders.filter(f =>
        f.name.toLowerCase().includes(query) ||
        f.gridStation.toLowerCase().includes(query) ||
        f.city.toLowerCase().includes(query) ||
        f.disco.code.toLowerCase().includes(query)
      );
    }

    return NextResponse.json(feeders);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
