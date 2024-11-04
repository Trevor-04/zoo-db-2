const express = require('express');
const router = express.Router();
const donationsController = require('../functions/donations');

// Route to get all donations
router.get('/', async (req, res) => {
    try {
        const donations = await donationsController.getDonations();
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch donations.' });
    }
});

// Route to get donations by email
router.get('/email/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const donations = await donationsController.getDonationsByEmail(email);
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch donations by email.' });
    }
});

// Route to get donations by date range
router.get('/date-range', async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const donations = await donationsController.getDonationsByDateRange(startDate, endDate);
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch donations by date range.' });
    }
});

// Route to get total donation amount
router.get('/total', async (req, res) => {
    try {
        const {startDate, endDate} = req.query;
        const totalAmount = await donationsController.getTotalDonationAmount({startDate, endDate});
        res.status(200).json({ totalAmount });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch total donation amount.' });
    }
});

router.post('/add', async (req, res) => {
    try {
        const donationData = req.body; // Get data from request body
        const result = await donationsController.addDonation(donationData);
        res.status(201).json({ message: 'Donation added successfully!', result });
    } catch (error) {
        console.error("Error adding donation:", error);
        res.status(500).json({ error: 'Failed to add donation.' });
    }
});

// Route to get a donation by its ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const donation = await donationsController.getDonationById(id);
        if (donation) {
            res.status(200).json(donation);
        } else {
            res.status(404).json({ error: 'Donation not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch donation.' });
    }
});

module.exports = router;
