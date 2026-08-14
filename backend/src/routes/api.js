const express = require('express');
const router = express.Router();

const feederController = require('../controllers/feederController');
const reportController = require('../controllers/reportController');
const parserController = require('../controllers/parserController');
const insightsController = require('../controllers/insightsController');

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Roshni Standalone Backend API', timestamp: new Date() });
});

// Feeder endpoints
router.get('/feeders', feederController.getFeeders);
router.get('/feeders/:id/schedule', feederController.getFeederSchedule);
router.get('/feeders/:id/reports', feederController.getFeederReports);

// Outage report endpoint
router.post('/reports', reportController.createReport);

// Schedule parsing & confirmation endpoints
router.post('/parse-schedule', parserController.parseRawText);
router.post('/schedule', parserController.saveSchedule);

// Insights analytics endpoint
router.get('/insights', insightsController.getInsights);

module.exports = router;
