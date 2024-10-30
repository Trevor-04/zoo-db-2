// routes/login.js
const express = require('express');
const loginController = require('../functions/login');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Route to create a new login for employee or member
router.post('/create', async (req, res) => {
    try {
        const loginData = req.body;
        await loginController.createLogin(loginData);
        res.status(201).json({ message: 'Login created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create login' });
    }
});

// Route to validate login and return JWT token


// Route to validate login for both employee and member, issuing role-based JWT tokens
router.post('/validate', async (req, res) => {
    try {
        const { email, password, loginType } = req.body; // Expect `loginType` to be either 'employee' or 'member'

        if (!loginType) {
            return res.status(400).json({ message: "loginType is required and should be 'employee' or 'member'" });
        }

        let result;
        if (loginType === 'employee') {
            result = await loginController.validateEmployeeLogin({ email, password });
        } else if (loginType === 'member') {
            result = await loginController.validateMemberLogin({ email, password });
        } else {
            return res.status(400).json({ message: "Invalid loginType provided." });
        }

        if (result.loggedIn) {
            res.status(200).json(result); // Send token and role in the response
        } else {
            res.status(401).json({ message: 'Invalid login credentials' });
        }
    } catch (error) {
        console.error('Error during login validation:', error);
        res.status(500).json({ error: 'Failed to validate login' });
    }
});



// Route to change password
router.post('/change-password', async (req, res) => {
    try {
        const passwordData = req.body;
        await loginController.changePassword(passwordData);
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to change password' });
    }
});

module.exports = router;