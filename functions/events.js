const {query, connect, disconnect} = require('../functions/database');

module.exports.getUpcomingEvents = function () {
    const currentDate = new Date().toISOString().slice(0,19).replace("T", "");
    //
    return query(`
    SELECT * 
    FROM Events
    WHERE eventTime > ${currentDate}
    ORDER BY eventTime ASC`);
}

module.exports.getAllUpdates = async function () {
    return query(`
    SELECT * 
    FROM Events
    ORDER BY eventTime ASC`);
}