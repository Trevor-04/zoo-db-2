const {query} = require('../functions/database');
const {getTotalDonationAmount} = require('./donations');

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
    const { startDate, endDate } = reportData;
    try {
        const baseQuery = `
            SELECT 
                I.itemName, 
                I.itemID, 
                SUM(R.quantity) AS total_quantity_sold,
                (I.itemPrice * SUM(R.quantity)) AS total_sales_revenue 
            FROM Inventory I
            JOIN Restaurant_sales R ON I.itemID = R.itemID
        `;
        const whereClause = startDate && endDate ? `WHERE R.purchased_at BETWEEN ? AND ?` : ``;
        const groupByAndOrder = `
            GROUP BY I.itemID, I.itemName, I.itemPrice
            ORDER BY total_sales_revenue DESC
        `;

        const fullQuery = `${baseQuery} ${whereClause} ${groupByAndOrder}`;
        
        return startDate && endDate 
            ? await query(fullQuery, [startDate, endDate]) 
            : await query(fullQuery);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports.restaurantTotalReport = async function (reportData) {
    const { startDate, endDate } = reportData;
    try {
      let baseQuery = `
        SELECT 
          SUM(I.itemPrice * R.quantity) AS total_sales_revenue
        FROM Inventory I
        JOIN Restaurant_sales R ON I.itemID = R.itemID
      `;
      let whereClause = startDate && endDate ? `WHERE R.purchased_at BETWEEN ? AND ?` : ``;
      let groupByAndOrder = `
        GROUP BY I.itemID, I.itemName, I.itemPrice
        ORDER BY total_sales_revenue DESC
      `;
  
      const fullQuery = `${baseQuery} ${whereClause} ${groupByAndOrder}`;
      
      return startDate && endDate 
        ? await query(fullQuery, [startDate, endDate]) 
        : await query(fullQuery);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  module.exports.concessionItemReport = async function (reportData) {
    const { startDate, endDate } = reportData;
    try {
        const baseQuery = `
            SELECT 
                I.itemName,
                I.itemID, 
                SUM(C.quantity) AS total_quantity_sold,
                (I.itemPrice * SUM(C.quantity)) AS total_sales_revenue
            FROM Inventory I
            JOIN Concession_sales C ON I.itemID = C.itemID
        `;
        const whereClause = startDate && endDate ? `WHERE C.purchased_at BETWEEN ? AND ?` : ``;
        const groupByAndOrder = `
            GROUP BY I.itemID, I.itemName, I.itemPrice
            ORDER BY total_sales_revenue DESC
        `;

        const fullQuery = `${baseQuery} ${whereClause} ${groupByAndOrder}`;
        
        return startDate && endDate 
            ? await query(fullQuery, [startDate, endDate]) 
            : await query(fullQuery);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports.concessionTotalReport = async function (reportData) {
    const { startDate, endDate } = reportData;
    try {
        const baseQuery = `
            SELECT 
                SUM(I.itemPrice * C.quantity) AS total_sales_revenue
            FROM Inventory I
            JOIN Concession_sales C ON I.itemID = C.itemID
        `;
        const whereClause = startDate && endDate ? `WHERE C.purchased_at BETWEEN ? AND ?` : ``;
        const groupByAndOrder = `
            GROUP BY I.itemID, I.itemName, I.itemPrice
            ORDER BY total_sales_revenue DESC
        `;

        const fullQuery = `${baseQuery} ${whereClause} ${groupByAndOrder}`;
        
        return startDate && endDate 
            ? await query(fullQuery, [startDate, endDate]) 
            : await query(fullQuery);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports.giftShopItemReport = async function (reportData) {
    const { startDate, endDate } = reportData;
    try {
        const baseQuery = `
            SELECT 
                I.itemName,
                I.itemID, 
                SUM(G.quantity) AS total_quantity_sold,
                (I.itemPrice * SUM(G.quantity)) AS total_sales_revenue
            FROM Inventory I
            JOIN Gift_shop_sales G ON I.itemID = G.itemID
        `;
        const whereClause = startDate && endDate ? `WHERE G.purchased_at BETWEEN ? AND ?` : ``;
        const groupByAndOrder = `
            GROUP BY I.itemID, I.itemName, I.itemPrice
            ORDER BY total_sales_revenue DESC
        `;

        const fullQuery = `${baseQuery} ${whereClause} ${groupByAndOrder}`;
        
        return startDate && endDate 
            ? await query(fullQuery, [startDate, endDate]) 
            : await query(fullQuery);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports.giftShopTotalReport = async function (reportData) {
    const { startDate, endDate } = reportData;
    try {
        const baseQuery = `
            SELECT 
                SUM(I.itemPrice * G.quantity) AS total_sales_revenue
            FROM Inventory I
            JOIN Gift_shop_sales G ON I.itemID = G.itemID
        `;
        const whereClause = startDate && endDate ? `WHERE G.purchased_at BETWEEN ? AND ?` : ``;
        const groupByAndOrder = `
            GROUP BY I.itemID, I.itemName, I.itemPrice
            ORDER BY total_sales_revenue DESC
        `;

        const fullQuery = `${baseQuery} ${whereClause} ${groupByAndOrder}`;
        
        return startDate && endDate 
            ? await query(fullQuery, [startDate, endDate]) 
            : await query(fullQuery);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports.listSubscribers = async function (memberData) {
    const {startDate, endDate} = memberData;

    try {
        let code = `SELECT * FROM Members`;

        return startDate && endDate ? 
        await query(code+` WHERE subscribed_on BETWEEN ? AND ?`, [startDate, endDate]) :
        await query(code);
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

module.exports.calculateTicketSales = async function (ticketData) {
    let {startDate, endDate} = ticketData;

    startDate = startDate ? startDate + " 00:00:00" : undefined;
    endDate = endDate ? endDate + " 23:59:59" : undefined;
    try {
        let code = `
        SELECT SUM(ticketPrice) AS ticketProfit 
        FROM Ticket_sales`;
        
        return startDate && endDate ? 
        await query(code+` WHERE date_purchased BETWEEN ? AND ?`, [startDate, endDate]) :
        await query(code);

    } catch (err) {
        console.log(err);
        throw err;
    }

}

module.exports.calculateAllSales = async function (salesData) {
    try {
    const restaurant = await module.exports.restaurantTotalReport(salesData); // total_sales_revenue
    const concession = await module.exports.concessionTotalReport(salesData); // total_sales_revenue
    const giftShop = await module.exports.giftShopTotalReport(salesData); // total_sales_revenue
    const tickets = await module.exports.calculateTicketSales(salesData); // ticketProfit
    const donations = await getTotalDonationAmount(salesData); // totalAmount 
    
    return [
        {
            type: "restaurant",
            revenue: restaurant.total_sales_revenue || 0 ,
            label: "Restaurant Sales",
            color: "#6A9E73" // example color
        },
        {
            type: "concession",
            revenue: concession.total_sales_revenue || 0,
            label: "Concession Sales",
            color: "#8BB174"
        },
        {
            type: "giftShop",
            revenue: giftShop.total_sales_revenue || 0,
            label: "Gift Shop Sales",
            color: "#A1C181"
        },
        {
            type: "tickets",
            revenue: tickets[0].ticketProfit || 0,
            label: "Ticket Sales",
            color: "#B6CF9E"
        },
        {
            type: "donations",
            revenue: donations || 0,
            label: "Donations",
            color: "#D1E2C4"
        }
    ]
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports.getTopProducts = async function (salesData) {
    try {
        const { startDate, endDate, limit = 5 } = salesData;
        
        // Fetch top products for each category with sales details
        const restaurantTop = await module.exports.restaurantItemReports(salesData); 
        const concessionTop = await module.exports.concessionItemReport(salesData);
        const giftShopTop = await module.exports.giftShopItemReport(salesData);

        // Format each category’s top products
        const formattedTopProducts = [
            {
                type: "restaurant",
                products: restaurantTop.map(item => ({
                    product: item.itemName,
                    total_quantity: item.total_quantity_sold || 0,
                    total_revenue: item.total_sales_revenue || 0
                })),
                label: "Restaurant Top Products",
                color: "#6A9E73" // example color
            },
            {
                type: "concession",
                products: concessionTop.map(item => ({
                    product: item.itemName,
                    total_quantity: item.total_quantity_sold || 0,
                    total_revenue: item.total_sales_revenue || 0
                })),
                label: "Concession Top Products",
                color: "#8BB174"
            },
            {
                type: "giftShop",
                products: giftShopTop.map(item => ({
                    product: item.itemName,
                    total_quantity: item.total_quantity_sold || 0,
                    total_revenue: item.total_sales_revenue || 0
                })),
                label: "Gift Shop Top Products",
                color: "#A1C181"
            }
        ];

        return formattedTopProducts;
    } catch (err) {
        console.error("Error fetching top products:", err);
        throw err;
    }
};

function format12Hours(time) {
    const period = time >= 12 ? "pm" : "am";  // Determine AM or PM
    const hour = time % 12 || 12;             // Convert 0 or 13-23 to 12-hour format
    return `${hour}${period}`;
}