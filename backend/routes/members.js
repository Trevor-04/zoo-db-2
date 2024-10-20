const express = require('express');
const membersController = require('./members'); // Assuming the file is named members.js

const router = express.Router();

// Route to create a new member
router.post('/members/new', async (req, res) => {
    try {
        const memberData = req.body;
        await membersController.newMember(memberData);
        res.status(201).json({ message: 'New member created successfully.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to get a member by ID
router.get('/members/:id', async (req, res) => {
    try {
        const memberID = req.params.id;
        const member = await membersController.getMember({ memberID: parseInt(memberID) });
        if (member) {
            res.status(200).json(member);
        } else {
            res.status(404).json({ message: 'Member not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to get member' });
    }
});

// Route to update billing information for a member
router.post('/members/billed', async (req, res) => {
    try {
        const memberData = req.body;
        await membersController.billed(memberData);
        res.status(200).json({ message: 'Billing information updated.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update billing information' });
    }
});

module.exports = router;