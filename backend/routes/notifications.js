const express = require('express');
const router = express.Router();  // Initialize the router
const notificationsController = require('../functions/notifications'); 

// Define the route to send notification emails
router.post('/notifyEmail', async (req, res) => {
    try {
        // Call the sendNotifications function from notificationsController
        const report = await notificationsController.sendNotifications();
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ error: 'Failed to send notification email' });
    }
});

module.exports = router;
