const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "162.248.101.97",
    user: "zoo",
    password: "Uma1234!",
});

module.exports.query = async function(query) {
    try {
        return new Promise((resolve, reject) => {
            if (!module.exports.connected()) module.exports.connect(); // check if it's connected
            connection.query(query, (err, results) => {
                if (err) {
                    console.error('Error in query execution:', err);
                    reject(err);
                }
                resolve(results);
            });
        });
    } catch (error) {
        console.error('Error in query function:', error);
        throw error;
    }
}

module.exports.connect = async function () {
    try {
        if (!module.exports.connected()) {
            console.log("Connected to database");
            return connection.connect();
        } else {
            console.log("You're already connected");
        }
    } catch (error) {
        console.error('Error in connect function:', error);
        throw error;
    }
}

module.exports.disconnect = async function () {
    try {
        if (module.exports.connected()) {
            return connection.end();
        } else {
            console.log("You were never connected to the database");
        }
    } catch (error) {
        console.error('Error in disconnect function:', error);
        throw error;
    }
}

module.exports.connected = async function () {
    try {
        return connection.state === "disconnected";
    } catch (error) {
        console.error('Error in connected function:', error);
        throw error;
    }
}