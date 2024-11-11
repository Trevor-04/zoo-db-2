const express = require('express');
const eventsController = require('../functions/events');
const { verifyEmployeeRole } = require('../middleware/auth');

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
        return res.status(201).json(eventsList);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch upcoming events' });
    }
});

// Add a new event
router.post('/add', verifyEmployeeRole, async (req, res) => {
    try {
        const { eventID, eventName, eventTime, members_only, exhibitID, sponsorID } = req.body;
        const eventData = { eventID, eventName, eventTime, members_only, exhibitID, sponsorID };

        const result = await eventsController.addEvent(eventData);
        return res.status(201).json(result);
    } catch (err) {
        return res.status(500).json({ error: 'Failed to add event' });
    }
});

// delete an event (by eventID)
router.delete('/:eventID', verifyEmployeeRole, async (req, res) => {
    const { eventID } = req.params;

    try {
        await eventsController.deleteEvent({ eventID });
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete event' });
    }
});

module.exports = router;