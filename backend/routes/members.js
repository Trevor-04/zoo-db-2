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
                memberBirthday: member.memberBirthday,
                expiry_notification: member.expiry_notification // Include the expiry notification
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

router.put('/update', verifyToken, async (req, res) => {
    try {
        const memberID = req.user.ID;
        const updatedData = req.body;
        await membersController.updateMember(memberID, updatedData);
        res.status(200).json({ message: 'Member profile updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update member profile' });
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

router.delete('/:id', async (req, res) => {
    try {
        const memberID = parseInt(req.params.id);
        if (isNaN(memberID)) {
            return res.status(400).json({ error: "Invalid member ID" });
        }

        const result = await membersController.deleteMember(memberID);
        if (result.affectedRows === 0) {
            // If no rows were affected, the member might not exist
            return res.status(404).json({ error: "Member not found" });
        }

        res.status(200).json({ message: "Member deleted successfully" });
    } catch (error) {
        console.error("Error in DELETE /members/:id:", error); // Log error details
        res.status(500).json({ error: "Failed to delete member" });
    }
});

// Route to get all members
router.get('/', async (req, res) => {
    try {
        const members = await membersController.getAllMembers();
        res.status(200).json({ members });
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve members" });
    }
});


module.exports = router;