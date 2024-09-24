const {query, connect, disconnect} = require('../functions/database');
const mysql = require('mysql2');

(async() => {
    await connect();

    await query("SHOW DATABASES").then((results) => {
        console.log(results);
    })
    
    await disconnect();
})

