const express = require('express');
const loginController = require('./login'); // Assuming this is where your login.js resides

const router = express.Router();

// Route to create a new employee login
router.post('/login/create', async (req, res) => {
    try {
        const loginData = req.body;
        await loginController.createLogin(loginData);
        res.status(201).json({ message: 'Login created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create login' });
    }
});

// Route to validate a login
router.post('/login/validate', async (req, res) => {
    try {
        const loginData = req.body;
        const result = await loginController.validateLogin(loginData);
        if (result.loggedIn) {
            res.status(200).json(result);
        } else {
            res.status(401).json({ message: 'Invalid login credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to validate login' });
    }
});

// Route to change employee password
router.post('/login/change-password', async (req, res) => {
    try {
        const passwordData = req.body;
        await loginController.changePassword(passwordData);
        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to change password' });
    }
});

module.exports = router;