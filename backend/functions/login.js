const jwt = require('jsonwebtoken');//checking 
const { query } = require('../functions/database');
const JWT_SECRET = process.env.JWT_SECRET; // Ensure to replace this in production

// Function to create a new login for an employee
module.exports.createLogin = async function (loginData) {
    const { employeePassword, employeeEmail } = loginData;

    if (!employeePassword || !employeeEmail) {
        throw new Error("Email and password are required.");
    }

    try {
        await query(
            `INSERT INTO Employee_logins (employeePassword, employeeEmail) VALUES (?, ?)`,
            [employeePassword, employeeEmail]
        );
    } catch (error) {
        console.error('Error in createLogin:', error);
        throw error;
    }
};

// Function to validate login credentials and generate a JWT token based on role
module.exports.validateLogin = async function (loginData) {
    try {
        const { employeePassword, employeeEmail } = loginData;

        if (!employeeEmail || !employeePassword) {
            throw new Error("Email and password are required.");
        }

        let returnData = {
            type: null,
            ID: "",
            loggedIn: false,
            token: null // Field for JWT token
        };

        // Check if login is for an employee
        const employeeResults = await query(
            `SELECT employeeID FROM Employee_logins WHERE employeeEmail = ? AND employeePassword = ?`,
            [employeeEmail, employeePassword]
        );

        if (employeeResults.length > 0) {
            // Update employee last login and generate employee token
            await query(
                `UPDATE Employee_logins SET last_login = NOW() WHERE employeeEmail = ? AND employeePassword = ?`,
                [employeeEmail, employeePassword]
            );

            returnData = {
                type: "employee",
                ID: employeeResults[0].employeeID,
                loggedIn: true,
                token: jwt.sign(
                    { ID: employeeResults[0].employeeID, role: "employee" },
                    JWT_SECRET,
                    { expiresIn: "1h" }
                )
            };
        } else {
            // If not an employee, check if login is for a member
            const membersResults = await query(
                `SELECT loginID, memberID FROM Member_logins WHERE memberEmail = ? AND memberPassword = ?`,
                [employeeEmail, employeePassword]
            );

            if (membersResults.length > 0) {
                returnData = {
                    type: "member",
                    ID: membersResults[0].memberID,
                    loggedIn: true,
                    token: jwt.sign(
                        { ID: membersResults[0].memberID, role: "member" },
                        JWT_SECRET,
                        { expiresIn: "1h" }
                    )
                };
            }
        }

        return returnData;
    } catch (error) {
        console.error('Error in validateLogin:', error);
        throw error;
    }
};

module.exports.validateEmployeeLogin = async function ({ email, password }) {
    try {
        //console.log("Email:", email, "Password:", password);
        const results = await query(
            `SELECT employeeID, role FROM Employee_logins WHERE employeeEmail = ? AND employeePassword = ?`,
            [email, password]
        );

        if (results.length > 0) {
            const employee = results[0];
            const token = jwt.sign(
                { ID: employee.employeeID, role: employee.role },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            return {
                type: employee.role === 'admin' ? 'admin' : 'employee',
                ID: employee.employeeID,
                loggedIn: true,
                token,
            };
        }

        return { loggedIn: false };
    } catch (error) {
        console.error('Error validating employee login:', error);
        throw error;
    }
};

module.exports.validateMemberLogin = async function ({ email, password }) {
    try {
        const results = await query(
            `SELECT loginID, memberID FROM Member_logins WHERE memberEmail = ? AND memberPassword = ?`,
            [email, password]
        );

        if (results.length > 0) {
            const member = results[0];
            const token = jwt.sign(
                { ID: member.memberID, role: 'member' },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            return {
                type: 'member',
                ID: member.memberID,
                loggedIn: true,
                token,
            };
        }

        return { loggedIn: false };
    } catch (error) {
        console.error('Error validating member login:', error);
        throw error;
    }
};

// Function to change an employee's password
module.exports.changePassword = async function (passwordData) {
    const { employeeID, employeePassword } = passwordData;

    if (!employeeID || !employeePassword) {
        throw new Error("Employee ID and new password are required.");
    }

    try {
        await query(
            `UPDATE Employee_logins SET employeePassword = ? WHERE employeeID = ?`,
            [employeePassword, employeeID]
        );
        console.log("Password changed successfully");
    } catch (error) {
        console.error('Error in changePassword:', error);
        throw error;
    }
};

// Function to retrieve employee details by ID
module.exports.getEmployeeByID = async function (employeeData) {
    const { employeeID } = employeeData;

    if (!employeeID) {
        throw new Error("Employee ID is required.");
    }

    try {
        const result = await query(
            `SELECT * FROM Employee_logins WHERE employeeID = ?`,
            [employeeID]
        );
        return result[0];
    } catch (error) {
        console.error('Error in getEmployeeByID:', error);
        throw error;
    }
};

// Function to retrieve all employees
module.exports.getAllEmployees = async function () {
    try {
        return await query(`SELECT * FROM Employee_logins`);
    } catch (error) {
        console.error('Error in getAllEmployees:', error);
        throw error;
    }
};