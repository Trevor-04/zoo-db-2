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

// Concession Total Sales Report
router.get('/concession/total', async (req, res) => {
    try {
        const reportData = req.query;
        const report = await reportsController.concessionTotalReport(reportData);
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch concession total report' });
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

// Gift Shop Total Sales Report
router.get('/giftshop/total', async (req, res) => {
    try {
        const reportData = req.query;
        const report = await reportsController.giftShopTotalReport(reportData);
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch gift shop total report' });
    }
});

router.get('/transactionCount', async (req, res) => {
    try {
        const transactionData = req.query;
        const transactionCount = await ticketController.calculateTransactionCount(transactionData);
        res.status(200).json({ transactionCount });
    } catch (error) {
        res.status(500).json({ error: 'Failed to calculate transaction count' });
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
});

router.get(`/visitorCount`, async (req, res) => {
    try {
        const {startDate, endDate} = req.query;
        const visitorCount = await reportsController.getVisitors({startDate, endDate});
        res.status(200).json({visitorCount});
    } catch (err) {
        res.status(500).json({error: "Failed to calculate subscriber count"});
    }
});



module.exports = router;

router.get('/ticketRevenue', async (req, res) => {
    try {
        const {startDate, endDate} = req.query;
        const ticketRevenue = await reportsController.calculateTicketSales({startDate, endDate});
        res.status(200).json({ticketProfit: ticketRevenue[0].ticketProfit})
    } catch (err) {
        res.status(500).json({error: "Failed to calculate ticket revenue"});
    }
})