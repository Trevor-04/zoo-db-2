const {query, connect, disconnect} = require('../functions/database');

// Employee_logins
// employeeID, employeeEmail, employeePassword

module.exports.createLogin = async function(email, username, password) {
    await query(`INSERT INTO 
    Employee_logins (employeeID, employeePassword, employeeEmail) 
    VALUES (${username}, ${password}, ${email})`)
}

module.exports.validateLogin = async function(email, password) {
    const results = await query(`
    SELECT employeeID 
    FROM Employee_logins
    WHERE employeeEmail = '${email}' 
    AND employeePassword = '${password}'`);

    if(results.length > 0) {
        await query(`
        UPDATE Employee_logins SET last_login = NOW()
        WHERE employeeEmail = ${email} 
        AND employeePassword = ${password}`);
        return true;
    }

    return results.length > 0;
}

module.exports.changePassword = async function(employeeID, newPassword) {
    await query(`
    UPDATE Employee_logins
    SET employeePassword = ${newPassword}
    WHERE employeeID = ${employeeID}`);
}

module.exports.getEmployeeByID = async function(employeeID) {
    const result = await query(`
    SELECT * 
    FROM Employee_logins
    WHERE employeeID = ${employeeID}`);
    return result[0];
}

module.exports.getAllEmployees = async function() {
    return query(`SELECT * FROM Employee_logins`);
}