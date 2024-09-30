const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "162.248.101.97",
    user: "zoo",
    password: "Uma1234!",
});

module.exports.query = async function(query) {
    return new Promise((resolve, reject) => {
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
    console.log("Connected to database");
    return connection.connect();
}
module.exports.disconnect = async function () {
    return connection.end();
}