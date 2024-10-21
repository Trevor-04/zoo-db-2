const express = require('express');
const { query } = require('../functions/database'); // Import the query function

const router = express.Router();

// Add a new exhibit
router.post('/add', async (req, res) => {
    const { exhibitName, founded_on, closed_on, closure_reason, sponsorID, headkeeperID } = req.body;

    try {
        await query(`
            INSERT INTO Exhibits (exhibitName, founded_on, closed_on, closure_reason, sponsorID, headkeeperID)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [exhibitName, founded_on, closed_on, closure_reason, sponsorID, headkeeperID]
        );
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
        await query(`DELETE FROM Exhibits WHERE exhibitID = ?`, [exhibitID]);
        res.status(200).json({ message: 'Exhibit deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete exhibit' });
    }
});

// List all exhibits
router.get('/', async (req, res) => {
    try {
        const exhibits = await query(`SELECT * FROM Exhibits`);
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
        const result = await query(`SELECT * FROM Exhibits WHERE exhibitID = ?`, [exhibitID]);
        res.status(200).json(result[0] || null);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get exhibit by ID' });
    }
});

// Export the router
module.exports = router;