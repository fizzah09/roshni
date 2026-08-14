import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const feeder = await prisma.feeder.findUnique({
      where: { id: params.id },
      include: {
        disco: true,
        schedules: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!feeder) {
      return NextResponse.json({ error: 'Feeder not found' }, { status: 404 });
    }

    return NextResponse.json(feeder.schedules);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
