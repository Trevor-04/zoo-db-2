const express = require('express');
const exhibitController = require('../functions/exhibits'); 

const router = express.Router();

// Add a new exhibit
router.post('/add', async (req, res) => {
    const { exhibitName, founded_on, closed_on, closure_reason, sponsorID, headkeeperID } = req.body;

    try {
        await exhibitController.addExhibit({ exhibitName, founded_on, closed_on, closure_reason, sponsorID, headkeeperID });
        res.status(201).json({ message: 'Exhibit added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add exhibit' });
    }
});

// Delete an exhibit by ID
router.delete('/:exhibitID', async (req, res) => {
    const { exhibitID } = req.params;

    try {
        await exhibitController.deleteExhibit({ exhibitID });
        res.status(200).json({ message: 'Exhibit deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete exhibit' });
    }
});

// List all exhibits
router.get('/', async (req, res) => {
    try {
        const exhibits = await exhibitController.listAllExhibits();
        res.status(200).json(exhibits);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to list exhibits' });
    }
});

// Get exhibit by ID
router.get('/:exhibitID', async (req, res) => {
    const { exhibitID } = req.params;

    try {
        const exhibit = await exhibitController.getExhibitById({ exhibitID });
        res.status(200).json(exhibit || null);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get exhibit by ID' });
    }
});

// Get exhibit by name
router.get('/name/:exhibitName', async (req, res) => {
    const { exhibitName } = req.params;

    try {
        const exhibit = await exhibitController.getExhibitByName({ exhibitName });
        res.status(200).json(exhibit || null);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get exhibit by name' });
    }
});

// Export the router
module.exports = router;