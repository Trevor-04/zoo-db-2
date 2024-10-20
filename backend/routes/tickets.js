const express = require('express');
const ticketsController = require('./tickets'); // Assuming this file is named tickets.js

const router = express.Router();

// Route to calculate visitor count
router.post('/tickets/visitor-count', async (req, res) => {
    try {
        const visitorData = req.body; // Assuming startDate and endDate are passed in the body
        const visitorCount = await ticketsController.calculateVisitorCount(visitorData);
        res.status(200).json({ visitorCount });
    } catch (error) {
        res.status(500).json({ error: 'Failed to calculate visitor count' });
    }
});

module.exports = router;