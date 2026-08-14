const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding ROSHNI database with official DISCOs & KE 4-cycle schedules...');

  // Clean existing
  await prisma.outageReport.deleteMany();
  await prisma.scheduleEntry.deleteMany();
  await prisma.feeder.deleteMany();
  await prisma.disco.deleteMany();

  // Create DISCOs
  const ke = await prisma.disco.create({
    data: { code: 'K-ELECTRIC', name: 'K-Electric', region: 'Karachi Metro & Coast' }
  });

  const lesco = await prisma.disco.create({
    data: { code: 'LESCO', name: 'Lahore Electric Supply Company', region: 'Lahore & Kasur' }
  });

  const iesco = await prisma.disco.create({
    data: { code: 'IESCO', name: 'Islamabad Electric Supply Company', region: 'Islamabad Capital & Potohar' }
  });

  const pesco = await prisma.disco.create({
    data: { code: 'PESCO', name: 'Peshawar Electric Supply Company', region: 'Khyber Pakhtunkhwa' }
  });

  const mepco = await prisma.disco.create({
    data: { code: 'MEPCO', name: 'Multan Electric Power Company', region: 'Multan & South Punjab' }
  });

  // Create KE Feeders (Real PDF Dataset)
  const feeder1 = await prisma.feeder.create({
    data: {
      discoId: ke.id,
      name: 'BLOCK # 5 RMU',
      code: 'KE-AIR-B5',
      gridStation: 'AIRPORT',
      city: 'Karachi',
      lossCategory: 'Category 3',
      lossPercentage: 'High Loss (24%)',
      status: 'OFFLINE',
      description: 'Official K-Electric Airport Grid station feeder. Under scheduled 4-cycle daily load management.'
    }
  });

  await prisma.scheduleEntry.createMany({
    data: [
      { feederId: feeder1.id, source: 'seeded', dayOfWeek: 'Daily', startTime: '10:35', endTime: '13:35', startDecimal: 10.58, endDecimal: 13.58 },
      { feederId: feeder1.id, source: 'seeded', dayOfWeek: 'Daily', startTime: '14:35', endTime: '17:35', startDecimal: 14.58, endDecimal: 17.58 },
      { feederId: feeder1.id, source: 'seeded', dayOfWeek: 'Daily', startTime: '18:35', endTime: '21:05', startDecimal: 18.58, endDecimal: 21.08 },
      { feederId: feeder1.id, source: 'seeded', dayOfWeek: 'Daily', startTime: '22:35', endTime: '02:05', startDecimal: 22.58, endDecimal: 2.08 }
    ]
  });

  await prisma.outageReport.create({
    data: {
      feederId: feeder1.id,
      startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
      endTime: new Date(Date.now() - 30 * 60 * 1000),
      outageType: 'tripping',
      note: 'Extra outage cycle reported by crowd.',
      deviceId: 'device_karachi_01'
    }
  });

  const feeder2 = await prisma.feeder.create({
    data: {
      discoId: ke.id,
      name: 'TANGA STAND',
      code: 'KE-AIR-TS',
      gridStation: 'AIRPORT',
      city: 'Karachi',
      lossCategory: 'Category 2',
      lossPercentage: 'Medium Loss (14%)',
      status: 'ONLINE',
      description: 'KE Airport Grid feeder powering Tanga Stand market area.'
    }
  });

  await prisma.scheduleEntry.createMany({
    data: [
      { feederId: feeder2.id, source: 'seeded', dayOfWeek: 'Daily', startTime: '09:35', endTime: '11:05', startDecimal: 9.58, endDecimal: 11.08 },
      { feederId: feeder2.id, source: 'seeded', dayOfWeek: 'Daily', startTime: '13:35', endTime: '15:05', startDecimal: 13.58, endDecimal: 15.08 },
      { feederId: feeder2.id, source: 'seeded', dayOfWeek: 'Daily', startTime: '17:05', endTime: '18:35', startDecimal: 17.08, endDecimal: 18.58 },
      { feederId: feeder2.id, source: 'seeded', dayOfWeek: 'Daily', startTime: '20:05', endTime: '21:35', startDecimal: 20.08, endDecimal: 21.58 }
    ]
  });

  const feeder3 = await prisma.feeder.create({
    data: {
      discoId: lesco.id,
      name: 'Gulberg-III',
      code: 'LES-GLB-03',
      gridStation: 'GULBERG S/S',
      city: 'Lahore',
      lossCategory: 'Category 3',
      lossPercentage: 'High Loss (22%)',
      status: 'OFFLINE',
      description: 'LESCO Gulberg Sector 3 grid feeder.'
    }
  });

  await prisma.scheduleEntry.createMany({
    data: [
      { feederId: feeder3.id, source: 'seeded', dayOfWeek: 'Daily', startTime: '02:00', endTime: '04:00', startDecimal: 2.0, endDecimal: 4.0 },
      { feederId: feeder3.id, source: 'seeded', dayOfWeek: 'Daily', startTime: '10:00', endTime: '12:00', startDecimal: 10.0, endDecimal: 12.0 },
      { feederId: feeder3.id, source: 'seeded', dayOfWeek: 'Daily', startTime: '14:00', endTime: '16:00', startDecimal: 14.0, endDecimal: 16.0 }
    ]
  });

  const feeder4 = await prisma.feeder.create({
    data: {
      discoId: iesco.id,
      name: 'F-8 Markaz',
      code: 'IES-F8-MKZ',
      gridStation: 'ISLAMABAD F-8',
      city: 'Islamabad',
      lossCategory: 'Category 1',
      lossPercentage: 'Low Loss (4%)',
      status: 'ONLINE',
      description: 'IESCO F-8 Markaz commercial hub feeder.'
    }
  });

  await prisma.scheduleEntry.createMany({
    data: [
      { feederId: feeder4.id, source: 'seeded', dayOfWeek: 'Daily', startTime: '06:00', endTime: '07:00', startDecimal: 6.0, endDecimal: 7.0 },
      { feederId: feeder4.id, source: 'seeded', dayOfWeek: 'Daily', startTime: '18:00', endTime: '19:00', startDecimal: 18.0, endDecimal: 19.0 }
    ]
  });

  console.log('ROSHNI Database Seeded Successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
