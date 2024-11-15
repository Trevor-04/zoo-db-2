const express = require('express');
const animalController = require("../functions/animals");

const router = express.Router();

// Add a new animal
router.post('/add', async (req, res) => {
    const { name, sex, date_acquired, date_died, date_born, species, classification, enclosureID } = req.body;

    try {
        await animalController.addNewAnimal({ name, sex, date_acquired, date_died, date_born, species, classification, enclosureID });
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
        await animalController.deleteAnimal({ animalID });
        res.status(200).json({ message: 'Animal deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete animal' });
    }
});

// List all animals
router.get('/', async (req, res) => {
    try {
        const animals = await animalController.listAllAnimals();
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
        const animal = await animalController.getAnimalById({ animalID });
        res.status(200).json(animal || null);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get animal by ID' });
    }
});

// Get animal by species
router.get('/species/:species', async (req, res) => {
    const { species } = req.params;

    try {
        const animals = await animalController.getAnimalBySpecies({ species });
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
        const animals = await animalController.getAnimalsbyEnclosure({ enclosureID, enclosureName });
        res.status(200).json(animals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get animals by enclosure' });
    }
});

// Get animals by exhibit
router.get('/exhibits/:exhibitName', async (req, res) => {
    const { exhibitName } = req.params;

    try {
        const animals = await animalController.getAnimalsByExhibit({ exhibitName });
        res.status(200).json(animals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get animals by exhibit' });
    }
});

router.put('/edit', async (req, res) => {
    const animalData = req.body;

    try {
        const result = await animalController.editAnimal(animalData);
        res.status(200).json({ message: 'Animal updated successfully', result });
    } catch (err) {
        console.error('Error editing animal:', err);
        res.status(500).json({ error: 'Failed to edit animal' });
    }
});


// Export the router
module.exports = router;