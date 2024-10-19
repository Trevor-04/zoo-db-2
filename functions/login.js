const { query, connect, disconnect } = require('../functions/database');

// Employee_logins
// employeeID, employeeEmail, employeePassword

module.exports.createLogin = async function (loginData) {
    const {employeeID, employeePassword, employeeEmail} = loginData;
    
        try {
            await query(`INSERT INTO 
            Employee_logins (employeeID, employeePassword, employeeEmail) 
            VALUES (?, ?, ?) `, 
            [employeeID, employeePassword, employeeEmail]);
        } catch (error) {
            console.error('Error in createLogin:', error);
            throw error;
        }
    }   

module.exports.validateLogin = async function(loginData) {
    try {
        const {employeePassword, employeeEmail} = loginData;
        let returnData = {
            type: null,
            ID: "",
            loggedIn: false,
        }
        
        const results = await query(`
        SELECT employeeID 
        FROM Employee_logins
        WHERE employeeEmail = ?
        AND employeePassword = ?`, 
        [employeeEmail, employeePassword]);

        if (results.length > 0) { // if they logged in 
            await query(`
            UPDATE Employee_logins SET last_login = NOW()
            WHERE employeeEmail = ? 
            AND employeePassword = ?`, 
            [employeeEmail, employeePassword]);
            
            returnData.type = "employee"
            returnData.ID = results[0].employeeID;
            returnData.loggedIn = true;
        } else {
            const membersResults = await query(`
            SELECT memberID
            FROM Member_logins
            WHERE memberEmail = ?
            AND memberPassword = ?`, 
            [employeeEmail, employeePassword]);
            if (membersResults.length > 0) {
                returnData.type = "member"
                returnData.ID = membersResults[0].memberID;
                returnData.loggedIn = true;
            }
        } 
        return returnData
    }catch (error) {    
        console.error('Error in validateLogin:', error);
        throw error;
    }
};

module.exports.changePassword = async function(passwordData) {
    const {employeeID, employeePassword} = passwordData;
    const newPassword = employeePassword;

    try {
        await query(`
        UPDATE Employee_logins
        SET employeePassword = ?
        WHERE employeeID = ?`,
        [newPassword, employeeID]);
    } catch (error) {
        console.error('Error in changePassword:', error);
        throw error;
    }
};

module.exports.getEmployeeByID = async function(employeeData) {
    const {employeeID} = employeeData;

    try {
        const result = await query(`
        SELECT * 
        FROM Employee_logins
        WHERE employeeID = ?`,
        [employeeID]);
        return result[0];
    } catch (error) {
        console.error('Error in getEmployeeByID:', error);
        throw error;
    }
};

module.exports.getAllEmployees = async function() {
    try {
        return await query(`SELECT * FROM Employee_logins`);
    } catch (error) {
        console.error('Error in getAllEmployees:', error);
        throw error;
    }
};