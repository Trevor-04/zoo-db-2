const express = require('express');
const reportsController = require('../functions/reports'); 
const ticketController = require('../functions/tickets'); 

const router = express.Router();

// Restaurant Item Reports
router.get('/restaurant/items', async (req, res) => {
    try {
        const reportData = req.body;
        const report = await reportsController.restaurantItemReports(reportData);
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch restaurant item reports' });
    }
});

// Restaurant Total Sales Reports
router.get('/restaurant/total', async (req, res) => {
    try {
        const reportData = req.query;
        const report = await reportsController.restaurantTotalReport(reportData);
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch restaurant total report' });
    }
});

// Concession Item Reports
router.get('/concession/items', async (req, res) => {
    try {
        const reportData = req.query;
        const report = await reportsController.concessionItemReport(reportData);
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch concession item reports' });
    }
});

// Gift Shop Item Reports
router.get('/giftshop/items', async (req, res) => {
    try {
        const reportData = req.query;
        const report = await reportsController.giftShopItemReport(reportData);
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch gift shop item reports' });
    }
});

// Route to calculate visitor count
router.get('/visitorCount', async (req, res) => {
    try {
        const visitorData = req.query; // Assuming startDate and endDate are passed in the body
        const visitorCount = await ticketController.calculateVisitorCount(visitorData);
        res.status(200).json({ visitorCount });
    } catch (error) {
        res.status(500).json({ error: 'Failed to calculate visitor count' });
    }
});

router.get(`/subscriberCount`, async (req, res) => {
    try {
        const {startDate, endDate} = req.query;
        const subscriberCount = await reportsController.listSubscribers({startDate, endDate});
        res.status(200).json({subscriberCount});
    } catch (err) {
        res.status(500).json({error: "Failed to calculate subscriber count"});
    }
})



module.exports = router;