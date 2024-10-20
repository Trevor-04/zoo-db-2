const {query} = require('../functions/database');

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