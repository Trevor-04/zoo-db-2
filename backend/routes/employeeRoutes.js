// routes/employeeRoutes.js
const axios = require('axios');
const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {getEmployees, deleteEmployee, addEmployee, deleteEmployeeLogin, editEmployee} = require('../functions/employees')
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


router.get('/:employeeID', async (req, res) => {
    try {
        const { employeeID } = req.params;
        const results = await getEmployees({ employeeID });

        if (results.length === 0) {
            // Return 404 if no employee found with the given ID
            return res.status(404).json({ error: `Employee with ID ${employeeID} not found` });
        }

        res.status(200).json(results[0]);  // Return the single employee object
    } catch (err) {
        console.error("Error fetching employee by ID:", err);
        res.status(500).json({ error: 'Failed to fetch employee by ID' });
    }
});

router.get('/', async (req, res) => {
    try {
        const results = await getEmployees();
        res.status(200).json(results);  // Returns all employees as an array
    } catch (err) {
        console.error("Error fetching all employees:", err);
        res.status(500).json({ error: 'Failed to fetch all employees' });
    }
});

router.post('/add', async (req, res) => {
    try {
        const results = await addEmployee(req.body);
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({error: "Failed to add employees"});
    }
})

router.delete('/:employeeID', async (req, res) => {
    const { employeeID } = req.params;

    try {
        const employeeResult = await deleteEmployee(employeeID);
        if (employeeResult.affectedRows === 0) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        const loginResult = await deleteEmployeeLogin(employeeID);
        if (loginResult.affectedRows === 0) {
            console.warn(`Employee login for ${employeeID} not found, but employee record was deleted`);
            return res.status(200).json({ message: 'Employee deleted, but no login found' });
        }

        res.status(200).json({ message: 'Employee and associated login deleted successfully' });
    } catch (err) {
        console.error("Error in deleteEmployee route:", err);
        res.status(500).json({ error: 'Failed to delete employee' });
    }
});

router.put('/edit', async (req, res) => {
    const {
        employeeID, fName, lName, email, phone, gender, salary, departmentID, start_on
    } = req.body;

    // Validate required fields
    if (!employeeID || !fName || !lName || !email || !phone || !gender || !salary || !departmentID || !start_on) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const results = await editEmployee(req.body);

        // Check if any row was actually updated
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: `Employee with ID ${employeeID} not found` });
        }

        res.status(200).json({ message: 'Employee updated successfully', results });
    } catch (err) {
        console.error("Error in editEmployee route:", err);
        res.status(500).json({ error: 'Failed to edit employee' });
    }
});
module.exports = router;