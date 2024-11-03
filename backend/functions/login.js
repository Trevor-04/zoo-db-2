const jwt = require('jsonwebtoken');//checking 
const { query } = require('../functions/database');
const JWT_SECRET = process.env.JWT_SECRET; // Ensure to replace this in production

// Function to create a new login for an employee
module.exports.query = async function(query, params = []) {
    let connection;
    try {
        connection = await pool.getConnection();

        const [results] = await connection.execute(query, params);
        return results; 
    } catch (err) {
        console.log("Error with query");
        throw err;
    } finally {
        if (connection) {
            connection.release();
        }
    }

}

module.exports.disconnect = async function () {
    try {
        await pool.end();
        console.log("Closed all database connections");
    } catch (error) {
        console.error('Error in disconnect function:', error);
        throw error;
    }
}

module.exports.checkConnection = async function() {
    try {
        const connection = await pool.getConnection();
        console.log("Connected to the database");
        connection.release();
    } catch (err) {
        console.error("Didn't connect", err)
    }
}

module.exports.startTransaction = async function() {
    try {
        const connection = await pool.beginTransaction();
        console.log("Started Transaction");
        return connection;
    } catch (err) {
        console.error("Did not start transaction", err)
    }
}

module.exports.commit = async function () {
    try {
        const connection = await pool.commit()
        console.log("Commited Transaction");
        connection.release();
    } catch (err) {
        console.error("Did not commit", err)
    }
}