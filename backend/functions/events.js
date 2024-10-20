const {query} = require('../functions/database');

module.exports.getUpcomingEvents = function () {
    try {
        const currentDate = new Date().toISOString().slice(0,19).replace("T", "");
        return query(`
        SELECT * 
        FROM Events
        WHERE eventTime > ?
        ORDER BY eventTime ASC`, [currentDate]);
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

module.exports.addEvent = async function (eventData) {
    const {eventID, eventName, eventTime, members_only, exhibitID} = eventData
    try {
        // Insert the new event into the database
        const result = await query(`
            INSERT INTO Events (eventID, eventName, eventTime, members_only, exhibitID)
            VALUES (?, ?, ?, ?, ?)`,
            [eventID, eventName, eventTime, members_only, exhibitID]);
        return result;
    } catch (error) {
        console.error("Error adding event: ", error);
        throw error;
    }
};

module.exports.deleteEvent = async function (eventData) {
    const {eventID} = eventData;
    try {
        // delete the event from the database using parameterized query
        const result = await query(`
            DELETE FROM Events
            WHERE eventID=?;
        `, [eventID]);
        return result;
    } catch (error) {
        console.error("Error deleting event", error);
        throw error;
    }
};

module.exports.getEventByID = async function (eventData) {
    const {eventID} = eventData;
    try {
        // get a single event by its ID
        const result = await query(`
            SELECT * 
            FROM Events
            WHERE eventID=?
        `, [eventID]);
        return result;
    } catch (error) {
        console.error("Error getting event", error);
        throw error;
    }
};