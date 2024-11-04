// routes/employeeRoutes.js
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
//const employeeController = require('../functions/employee');

const router = express.Router();

// Employee dashboard route (only accessible by authenticated employees)
router.get('/dashboard', (req, res) => {
    if (req.user.type !== 'employee') {
        return res.status(403).json({ message: 'Access denied' });
    }
    res.json({ message: 'Welcome to the Employee Dashboard' });
});

// Other employee-specific routes can be added here

module.exports = router;