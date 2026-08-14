const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createReport = async (req, res) => {
  try {
    const { feederId, startTime, endTime, note, outageType, deviceId } = req.body;

    if (!feederId || !startTime) {
      return res.status(400).json({ error: 'feederId and startTime are required fields' });
    }

    const clientDeviceId = deviceId || 'anon_device';
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    const recentReports = await prisma.outageReport.count({
      where: {
        deviceId: clientDeviceId,
        createdAt: { gte: oneHourAgo }
      }
    });

    if (recentReports >= 5) {
      return res.status(429).json({ error: 'Rate limit exceeded. Please wait before submitting more reports.' });
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

    res.json({ success: true, report });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
