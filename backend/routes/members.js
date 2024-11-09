const express = require('express');
const membersController = require('../functions/members'); 
const { verifyToken } = require('../middleware/auth'); // Import the verifyToken function

const router = express.Router();

// Route to create a new member

router.post('/new/login', async (req, res) => {
    try {
        const memberData = req.body;
        const result = await membersController.newMemberLogin(memberData);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/new/member', async (req, res) => {
    try {
        const memberData = req.body;
        const result = await membersController.newMember(memberData);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Route to get the member profile based on token
router.get('/profile', verifyToken, async (req, res) => {
    console.log("Decoded user from token:", req.user); // Log to check the payload
    try {
        const memberID = req.user.ID; // Assuming the token payload has memberID
        const memberResult = await membersController.getMember({ memberID });

        if (memberResult && memberResult.length > 0) {
            const member = memberResult[0]; // Get the first row (expected only one since memberID is unique)
            const formattedMember = {
                memberID: member.memberID,
                memberType: member.memberType,
                memberTerm: member.memberTerm,
                subscribed_on: member.subscribed_on,
                last_billed: member.last_billed,
                memberEmail: member.memberEmail,
                memberPhone: member.memberPhone,
                memberFName: member.memberFName,
                memberLName: member.memberLName,
                memberBirthday: member.memberBirthday
            };
            res.status(200).json(formattedMember);
        } else {
            res.status(404).json({ message: 'Member not found' });
        }
    } catch (error) {
        console.error("Error fetching member data:", error);
        res.status(500).json({ error: 'Failed to get member' });
    }
});


// Route to get a member by ID
router.get('/:id', async (req, res) => {
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
router.post('/billed', async (req, res) => {
    try {
        const memberData = req.body;
        await membersController.billed(memberData);
        res.status(200).json({ message: 'Billing information updated.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update billing information' });
    }
});

module.exports = router;