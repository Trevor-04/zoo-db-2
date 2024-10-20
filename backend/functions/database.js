const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "162.248.101.97",
    user: "zoo",
    password: "Uma1234!",
    database: "ZooDB",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

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
