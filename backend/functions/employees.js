const {query} = require('../functions/database.js');

module.exports.getEmployees = async function (employeeData = {}) {
    const { employeeID } = employeeData;
    try {
        const queryBase = `
            SELECT 
                e.employeeID, 
                e.fName, 
                e.mName,
                e.lName, 
                e.departmentID, 
                e.supervisorID, 
                e.email,
                e.phone, 
                e.gender, 
                e.salary, 
                e.start_on, 
                d.departmentName
            FROM Employees e
            LEFT JOIN Departments d ON e.departmentID = d.departmentID
        `;

        const result = employeeID
            ? await query(`${queryBase} WHERE e.employeeID = ?`, [employeeID])
            : await query(queryBase);

        return result;
    } catch (err) {
        console.error("Error fetching employees with department info:", err);
        throw err;
    }
};

module.exports.deleteEmployee = async function (employeeID) {
    try {
        const result = await query(`DELETE FROM Employees WHERE employeeID = ?`, [employeeID]);
        return result;
    } catch (err) {
        console.error("Error in deleteEmployee function:", err);
        throw err;
    }
};

module.exports.deleteEmployeeLogin = async function(employeeID) {
    try {
        const result = await query(`DELETE FROM Employee_logins WHERE employeeID = ?`, [employeeID]);
        return result;   
    } catch (err) {
        console.log("Error in deleting employee logins");
        throw err;
    }
}

module.exports.addEmployee = async function (employeeData) {
    console.log(employeeData)
    try {
        const {fName, mName = null, lName, salary, gender, start_on, email, phone, supervisorID = null, departmentID} = employeeData;
        const results = await query(
            `INSERT INTO Employees 
            (fName, mName, lName, salary, gender, start_on, email, phone, supervisorID, departmentID) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [fName, mName, lName, salary, gender, start_on, email, phone, supervisorID, departmentID]
        );
        return results;
    } catch (err) {
        console.log("Error adding employee:", err);
        throw err; // Rethrow the error to handle it in higher-level code if needed
    }
};

module.exports.editEmployee = async function (employeeData) {
    const {
        employeeID,
        fName,
        mName = null,
        lName,
        salary,
        gender,
        start_on,
        email,
        phone,
        supervisorID = null,
        departmentID,
    } = employeeData;

    if (!employeeID) {
        throw new Error("Employee ID is required to edit an employee.");
    }

    try {
        const result = await query(
            `UPDATE Employees 
            SET fName =?, mName =?, lName =?, salary =?, gender =?, start_on =?, email =?, phone =?, supervisorID =?, departmentID =? 
            WHERE employeeID =?`,
            [fName, mName, lName, salary, gender, new Date(start_on).toISOString().split("T")[0], email, phone, supervisorID, departmentID, employeeID]
        );

        if (result.affectedRows === 0) {
            throw new Error(`Employee with ID ${employeeID} not found.`);
        }

        return result;
    } catch (err) {
        console.error("Error in editEmployee function:", err);
        throw err;
    }
};