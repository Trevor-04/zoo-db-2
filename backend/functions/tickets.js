const {query} = require('../functions/database');

module.exports.calculateVisitorCount = async function(visitorData) {
    
    const {startDate, endDate} = visitorData

    try {
        const results =  query(`
        SELECT COUNT(ticketID) as visitorCount
        FROM Ticket_sales
        WHERE date_purchased BETWEEN ? AND ?`,
        [startDate, endDate])
        return results[0].visitorCount;
    } catch (err) {
        console.log(err);
        throw err;
    }
}


