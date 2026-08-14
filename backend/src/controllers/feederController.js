const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getFeeders = async (req, res) => {
  try {
    const { disco, city, q } = req.query;
    const whereClause = {};

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

    if (q) {
      const query = q.toLowerCase();
      feeders = feeders.filter(f =>
        f.name.toLowerCase().includes(query) ||
        f.gridStation.toLowerCase().includes(query) ||
        f.city.toLowerCase().includes(query) ||
        f.disco.code.toLowerCase().includes(query)
      );
    }

    res.json(feeders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFeederSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const feeder = await prisma.feeder.findUnique({
      where: { id },
      include: {
        disco: true,
        schedules: { orderBy: { createdAt: 'desc' } }
      }
    });

    if (!feeder) {
      return res.status(404).json({ error: 'Feeder not found' });
    }

    res.json(feeder.schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFeederReports = async (req, res) => {
  try {
    const { id } = req.params;
    const reports = await prisma.outageReport.findMany({
      where: { feederId: id },
      orderBy: { startTime: 'desc' }
    });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
