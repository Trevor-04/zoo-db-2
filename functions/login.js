const { query, connect, disconnect } = require('../functions/database');

// Employee_logins
// employeeID, employeeEmail, employeePassword

module.exports.createLogin = async function(email, username, password) {
    try {
        await query(`INSERT INTO 
        Employee_logins (employeeID, employeePassword, employeeEmail) 
        VALUES (${username}, ${password}, ${email})`);
    } catch (error) {
        console.error('Error in createLogin:', error);
        throw error;
    }
};

module.exports.validateLogin = async function(email, password) {
    try {
        let returnData = {
            type: null,
            ID: "",
            loggedIn: false,
        }
        
        const results = await query(`
        SELECT employeeID 
        FROM Employee_logins
        WHERE employeeEmail = '${email}' 
        AND employeePassword = '${password}'`);

        if (results.length > 0) { // if they logged in 
            await query(`
            UPDATE Employee_logins SET last_login = NOW()
            WHERE employeeEmail = ${email} 
            AND employeePassword = ${password}`);
            
            returnData.type = "employee"
            returnData.ID = results[0].employeeID;
            returnData.loggedIn = true;
        } else {
            const membersResults = await query(`
            SELECT memberID
            FROM Member_logins
            WHERE memberEmail = ${email}
            AND memberPassword = ${password}`);
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

module.exports.changePassword = async function(employeeID, newPassword) {
    try {
        await query(`
        UPDATE Employee_logins
        SET employeePassword = ${newPassword}
        WHERE employeeID = ${employeeID}`);
    } catch (error) {
        console.error('Error in changePassword:', error);
        throw error;
    }
};

module.exports.getEmployeeByID = async function(employeeID) {
    try {
        const result = await query(`
        SELECT * 
        FROM Employee_logins
        WHERE employeeID = ${employeeID}`);
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