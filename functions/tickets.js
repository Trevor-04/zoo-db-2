const {query, connect, disconnect} = require('../functions/database');

module.exports.calculateVisitorCount = async function(startDate, endDate) {
    try {
        const results =  query(`
        SELECT COUNT(ticketID) as visitorCount
        FROM Ticket_sales
        WHERE date_purchased BETWEEN ${startDate} AND ${endDate}`)
        return results[0].visitorCount;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

