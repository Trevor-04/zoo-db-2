const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: "162.248.101.97",
    user: "zoo",
    password: "Uma1234!",
});

module.exports.query = async function(query) {
    connection.query(query, (err, results) => {
        if(err) throw err; 
        return results;
    });
}

module.exports.connect = async function () {
    return connection.connect();
}
module.exports.disconnect = async function () {
    return connection.end();
}