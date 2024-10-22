const express = require('express');
const reportsController = require('../functions/reports'); 

const router = express.Router();

// Restaurant Item Reports
router.post('/reports/restaurant-items', async (req, res) => {
    try {
        const reportData = req.body;
        const report = await reportsController.restaurantItemReports(reportData);
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch restaurant item reports' });
    }
});

// Restaurant Total Sales Reports
router.post('/reports/restaurant-total', async (req, res) => {
    try {
        const reportData = req.body;
        const report = await reportsController.restaurantTotalReport(reportData);
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch restaurant total report' });
    }
});

// Concession Item Reports
router.post('/reports/concession-items', async (req, res) => {
    try {
        const reportData = req.body;
        const report = await reportsController.concessionItemReport(reportData);
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch concession item reports' });
    }
});

// Gift Shop Item Reports
router.post('/reports/giftshop-items', async (req, res) => {
    try {
        const reportData = req.body;
        const report = await reportsController.giftShopItemReport(reportData);
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch gift shop item reports' });
    }
});

module.exports = router;