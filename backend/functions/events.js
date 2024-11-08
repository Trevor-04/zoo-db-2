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

module.exports.getAllEvents = async function () {
    try {
        return await query(`
        SELECT * 
        FROM Events
        ORDER BY eventTime ASC`);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports.addEvent = async function (eventData) {
    const {eventName, eventTime, members_only, exhibitID, attendeeCount = 0, sponsorID = null} = eventData;

    const exhibitExists = await query(`SELECT 1 FROM Exhibits WHERE exhibitID = ?`, [exhibitID]);
    
    // if (!exhibitExists.length ) throw new Error('Invalid exhibitID: Exhibit does not exist');

    try {
        // Insert the new event into the database
        const result = await query(`
            INSERT INTO Events (eventName, eventTime, members_only, exhibitID, attendeeCount, sponsorID)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [eventName, eventTime, members_only, exhibitID, attendeeCount, sponsorID]);
        return result;
    } catch (error) {
        console.error("Error adding event: ", error);
        throw error;
    }
};

module.exports.deleteEvent = async function (eventData) {
    const { eventID } = eventData;
    try {
        console.log('wtf')
        const result = await query(`DELETE FROM Events WHERE eventID = ?`, [eventID]);
        
        console.log("Delete result:", result);  // Debugging line to confirm the operation
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