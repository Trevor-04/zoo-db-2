const {query, connect, disconnect} = require('../functions/database');

(async() => {
    try {
        await connect(); 
        console.log("Connected");

        const results = await query("SHOW DATABASES"); 
        console.log("Databases", results); 

    } catch (error) {
        // console.error("Error:", error); 
    } finally {
        await disconnect(); 
    }
})();

