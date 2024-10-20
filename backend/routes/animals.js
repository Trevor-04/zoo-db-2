const express = require('express');
const { query } = require('../database'); // Import the query function

const router = express.Router();

// Add a new animal
router.post('/add', async (req, res) => {
    const { name, sex, date_acquired, date_died, date_born, species, classification, enclosureID } = req.body;

    try {
        await query(`
            INSERT INTO Animals (name, sex, date_acquired, date_died, date_born, species, classification, enclosureID)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, sex, date_acquired, date_died, date_born, species, classification, enclosureID]
        );
        res.status(201).json({ message: 'Animal added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add animal' });
    }
});

// Delete an animal by ID
router.delete('/:animalID', async (req, res) => {
    const { animalID } = req.params;

    try {
        await query(`DELETE FROM Animals WHERE animal_id=?`, [animalID]);
        res.status(200).json({ message: 'Animal deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete animal' });
    }
});

// List all animals
router.get('/', async (req, res) => {
    try {
        const animals = await query(`SELECT * FROM Animals`);
        res.status(200).json(animals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to list animals' });
    }
});

// Get animal by ID
router.get('/:animalID', async (req, res) => {
    const { animalID } = req.params;

    try {
        const result = await query(`SELECT * FROM Animals WHERE animal_id=?`, [animalID]);
        res.status(200).json(result[0] || null);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get animal by ID' });
    }
});

// Get animal by species
router.get('/species/:species', async (req, res) => {
    const { species } = req.params;

    try {
        const animals = await query(`SELECT * FROM Animals WHERE species=?`, [species]);
        res.status(200).json(animals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get animals by species' });
    }
});

// Get animals by enclosure
router.get('/enclosure', async (req, res) => {
    const { enclosureID, enclosureName } = req.query;

    try {
        let results;
        if (enclosureName) {
            results = await query(`
                SELECT * 
                FROM Animals 
                JOIN Enclosures
                ON Animals.enclosureID = Enclosures.enclosureID
                WHERE Enclosures.enclosureName=?`, 
                [enclosureName]);
        } else if (enclosureID) {
            results = await query(`SELECT * FROM Animals WHERE enclosureID=?`, [enclosureID]);
        }

        res.status(200).json(results || []);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get animals by enclosure' });
    }
});

// Export the router
module.exports = router;