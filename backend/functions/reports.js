const {query} = require('../functions/database');

const pricing = {
    '9am': { adult: 25, child: 15, senior: 20, infant: 0 },
    '10am': { adult: 20, child: 13.5, senior: 15, infant: 0 },
    '11am': { adult: 25, child: 15, senior: 20, infant: 0 },
    '12pm': { adult: 30, child: 15, senior: 25, infant: 0 },
    '1pm': { adult: 30, child: 15, senior: 25, infant: 0 },
    '2pm': { adult: 20, child: 13.5, senior: 15, infant: 0 },
    '3pm': { adult: 25, child: 15, senior: 20, infant: 0 },
    '4pm': { adult: 30, child: 15, senior: 25, infant: 0 },
    '5pm': { adult: 20, child: 13.5, senior: 15, infant: 0 },
  };


module.exports.restaurantItemReports = async function (reportData) {
    const {startDate, endDate} = reportData;
    try {
        return await query(`
        SELECT 
        I.itemName, 
        I.itemID, 
        SUM(R.quantity) AS total_quantity_sold,
        (I.itemPrice * total_quantity_sold) AS total_sales_revenue 
        FROM Inventory I
        JOIN Restaurant_sales R 
        ON I.itemID = R.itemID
        WHERE R.purchased_at BETWEEN ? AND ?
        GROUP BY I.itemID, I.itemName, I.itemPrice
        ORDER BY total_sales_revenue DESC
        `, [startDate, endDate]);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports.restaurantTotalReport = async function (reportData) {
    const {startDate, endDate} = reportData;
    try {
        return await query(`
        SELECT 
        SUM(I.itemPrice * R.quantity) as total_sales_revenue
        FROM Inventory I
        JOIN Restaurant_sales R
        ON I.itemID = R.itemID
        WHERE R.purchased_at BETWEEN ? AND ?
        GROUP BY I.itemID, I.itemName, I.itemPrice
        ORDER BY total_sales_revenue DESC`, [startDate, endDate])
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports.concessionItemReport = async function (reportData) {
    const {startDate, endDate} = reportData;
    try {
        return await query(`
        SELECT 
        I.itemName,
        I.itemID, 
        SUM(C.quantity) AS total_quantity_sold,
        (I.itemPrice * total_quantity_sold) AS total_sales_revenue
        FROM Inventory I
        JOIN Concession_sales AS C 
        ON I.itemID = C.itemID
        WHERE C.purchased_at BETWEEN ? AND ?
        GROUP BY I.itemID, I.itemName, I.itemPrice
        ORDER BY total_sales_revenue DESC
        `, [startDate, endDate])
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports.concessionTotalReport = async function (reportData) {
    const {startDate, endDate} = reportData;
    try {
        return await query(`
        SELECT 
        SUM(I.itemPrice * C.quantity) as total_sales_revenue
        FROM Inventory I
        JOIN Concession_sales C
        ON I.itemID = C.itemID
        WHERE C.purchased_at BETWEEN ? AND ?
        GROUP BY I.itemID, I.itemName, I.itemPrice
        ORDER BY total_sales_revenue DESC`, [startDate, endDate])
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports.giftShopItemReport = async function (reportData) {
    const {startDate, endDate} = reportData;
    try {
        return query(`
        SELECT 
        I.itemName,
        I.itemID, 
        SUM(G.quantity) AS total_quantity_sold,
        (I.itemPrice * total_quantity_sold) AS total_sales_revenue
        FROM Inventory I
        JOIN Gift_shop_sales AS G
        ON I.itemID = G.itemID
        WHERE G.purchased_at BETWEEN ? AND ?
        GROUP BY I.itemID, I.itemName, I.itemPrice
        ORDER BY total_sales_revenue DESC
        `, [startDate, endDate])
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports.giftShopTotalReport = async function (reportData) {
    const {startDate, endDate} = reportData;
    try {
        return await query(`
        SELECT 
        SUM(I.itemPrice * G.quantity) as total_sales_revenue
        FROM Inventory I
        JOIN gift_shop_sales G
        ON I.itemID = G.itemID
        WHERE G.purchased_at BETWEEN ? AND ?
        GROUP BY I.itemID, I.itemName, I.itemPrice
        ORDER BY total_sales_revenue DESC`, [startDate, endDate])
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports.listSubscribers = async function (memberData) {
    const {startDate, endDate} = memberData;

    try {
        return await query(`SELECT * FROM Members
        WHERE subscribed_on BETWEEN ? AND ?`,
        [startDate, endDate]);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports.getVisitors = async function (memberData) {
    let {startDate, endDate} = memberData;

    startDate = startDate + " 00:00:00";
    endDate = endDate + " 23:59:59";
    try {
        const results = await query(`
        SELECT ticketType, ticketPrice, time_purchased
        FROM Ticket_sales
        WHERE time_purchased BETWEEN ? AND ?`,
        [startDate, endDate]);

        let visitors = 0;
        const  ticketTypeMap = ["adult", "child", "senior", "infant"];

        for (let tickets of results) {
            const timeBought = `${tickets.time_purchased}`.split(" ");
            const ticketPriceNum = Number(tickets.ticketPrice) || 0;
            const price = pricing[format12Hours(timeBought[4].split(":")[0])][ticketTypeMap[tickets.ticketType]];
            visitors += price === 0 ? 1 : Math.floor(ticketPriceNum / price);
        }

        return visitors;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

function format12Hours(time) {
    const period = time >= 12 ? "pm" : "am";  // Determine AM or PM
    const hour = time % 12 || 12;             // Convert 0 or 13-23 to 12-hour format
    return `${hour}${period}`;
}