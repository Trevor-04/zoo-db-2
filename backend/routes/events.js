const express = require('express');
const eventsController = require('../functions/events');

const router = express.Router();

// Get upcoming events
router.get('/upcoming', async (req, res) => {
    try {
        const eventsList = await eventsController.getUpcomingEvents();
        return res.json(eventsList);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch upcoming events' });
    }
});

router.get('/', async (req, res) => {
    try {
        const eventsList = await eventsController.getAllEvents();
        res.json(eventsList);
        return res.status(201).json({ message: 'Successfully got upcoming events' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch upcoming events' });
    }
});

// Add a new event
router.post('/add', async (req, res) => {
    try {
        const eventData = req.body;
        const result = await eventsController.addEvent(eventData);
        return res.status(201).json({ message: 'Event added successfully', event: result });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add event' });
    }
});

module.exports = router;