const express = require('express');
const events = require('./events');

const router = express.Router();

// Get upcoming events
router.get('/upcoming', async (req, res) => {
    try {
        const eventsList = await events.getUpcomingEvents();
        res.json(eventsList);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch upcoming events' });
    }
});

// Add a new event
router.post('/add', async (req, res) => {
    try {
        const eventData = req.body;
        const result = await events.addEvent(eventData);
        res.status(201).json({ message: 'Event added successfully', event: result });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add event' });
    }
});

module.exports = router;