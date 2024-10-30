const {query, startTransaction, commit} = require('../functions/database');

module.exports.calculateVisitorCount = async function(visitorData) {
    
    const {startDate, endDate} = visitorData;

    try {
        const results = await query(`
        SELECT COUNT(ticketID) as visitorCount
        FROM Ticket_sales
        WHERE date_purchased BETWEEN ? AND ?`,
        [startDate, endDate]);
        return results;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports.addTicket = async function (ticketData) {
    const { ticketType, date_purchased, ticketPrice} = ticketData;

    try {
        return await query(`
            INSERT INTO Ticket_sales (ticketType, date_purchased, ticketPrice)
            VALUES (?, ?, ?)`,
            [ticketType, date_purchased, ticketPrice]);
    } catch (err) {
        console.error("Error in addTicket:", err);
        // Roll back in case of an error
        await query('ROLLBACK');
        throw err;
    }
};


// Delete a ticket by ticketID
module.exports.deleteTicket = async function (ticketData) {
    const { ticketID } = ticketData;

    try {
        return await query(`DELETE FROM Ticket_sales WHERE ticketID = ?`, [ticketID]);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// Update a ticket's details by ticketID
module.exports.updateTicket = async function (ticketData) {
    const { ticketID, ticketType, date_purchased, ticketPrice } = ticketData;

    try {
        return await query(`
            UPDATE Ticket_sales
            SET ticketType = ?, date_purchased = ?, ticketPrice = ?
            WHERE ticketID = ?`,
            [ticketType, date_purchased, ticketPrice, ticketID]);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// List all tickets
module.exports.listTickets = async function () {
    try {
        return await query(`SELECT * FROM Ticket_sales`);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// Get a ticket by ticketID
module.exports.getTicketById = async function (ticketData) {
    const { ticketID } = ticketData;

    try {
        const result = await query(`SELECT * FROM Ticket_sales WHERE ticketID = ?`, [ticketID]);
        return result[0];
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// Get tickets by type
module.exports.getTicketsByType = async function (ticketData) {
    const { ticketType } = ticketData;

    try {
        return await query(`SELECT * FROM Ticket_sales WHERE ticketType = ?`, [ticketType]);
    } catch (err) {
        console.log(err);
        throw err;
    }
};


