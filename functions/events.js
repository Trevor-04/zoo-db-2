const {query, connect, disconnect} = require('../functions/database');

module.exports.getUpcomingEvents = function () {
    try {
        const currentDate = new Date().toISOString().slice(0,19).replace("T", "");
        return query(`
        SELECT * 
        FROM Events
        WHERE eventTime > ${currentDate}
        ORDER BY eventTime ASC`);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports.getAllUpdates = async function () {
    try {
        return query(`
        SELECT * 
        FROM Events
        ORDER BY eventTime ASC`);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports.addEvent = async function (eventID, eventName, eventTime, members_only, exhibitID) {
    try {
        // Insert the new event into the database
        const result = await query(`
            INSERT INTO Events (eventName, eventTime, eventDescription)
            VALUES ('${eventID}''${eventName}', '${eventTime}', '${members_only}', '${exhibitID}')
        `);
        return result;
    } catch (error) {
        console.error("Error adding event: ", error);
        throw error;
    }
};