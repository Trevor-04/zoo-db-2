const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "162.248.101.97",
    user: "zoo",
    password: "Uma1234!",
});

module.exports.query = async function(query) {
    return new Promise((resolve, reject) => {
        if (!module.exports.connected()) module.exports.connect(); // check if it's connected
        connection.query(query, (err, results) => {
            if(err) {
                console.log(err); 
                reject(err)
            }
        resolve(results);
        });
    });
}

module.exports.connect = async function () {
    if(!module.exports.connected()) {
        console.log("Connected to database");
        return connection.connect();
    } else {
        console.log("You're already connected");
    }
    
}
module.exports.disconnect = async function () {
    if(module.exports.connected()) {
        return connection.end();
    } else {
        console.log("You were never connected to the database")
    }
}

module.exports.connected = async function () {
    return connection.state === "disconnected";
}