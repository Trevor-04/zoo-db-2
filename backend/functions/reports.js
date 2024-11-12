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
                I.itemName AS itemName, 
                I.itemID AS itemID, 
                SUM(R.quantity) AS total_quantity_sold,
                (I.itemPrice * SUM(R.quantity)) AS total_sales_revenue,
                MAX(R.purchased_at) as purchase_date
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
        JOIN Restaurant_sales R ON I.itemID = R.itemID`;
      let whereClause = startDate && endDate ? `WHERE R.purchased_at BETWEEN ? AND ?` : ``;
  
      const fullQuery = `${baseQuery} ${whereClause}`;
      
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
                I.itemName as itemName,
                I.itemID as itemID, 
                SUM(C.quantity) AS total_quantity_sold,
                (I.itemPrice * SUM(C.quantity)) AS total_sales_revenue,
                MAX(C.purchased_at) as purchase_date
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

        const fullQuery = `${baseQuery} ${whereClause}`;
        
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
                I.itemName as itemName,
                I.itemID as itemID, 
                SUM(G.quantity) AS total_quantity_sold,
                (I.itemPrice * SUM(G.quantity)) AS total_sales_revenue,
                MAX(G.purchased_at) as purchase_date
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
            JOIN Gift_shop_sales G ON I.itemID = G.itemID`;
        const whereClause = startDate && endDate ? `WHERE G.purchased_at BETWEEN ? AND ?` : ``;

        const fullQuery = `${baseQuery} ${whereClause}`;
        
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

module.exports.getTicketQuantity = function (tickets) {
    const  ticketTypeMap = ["adult", "child", "senior", "infant"];
    const timeBought = `${tickets.time_purchased}`.split(" ");
    const ticketPriceNum = Number(tickets.ticketPrice) || 0;
    const price = pricing[format12Hours(timeBought[4].split(":")[0])][ticketTypeMap[tickets.ticketType]];
    return price === 0 ? 1 : Math.floor(ticketPriceNum / price);
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
        for (let tickets of results) {
            visitors += module.exports.getTicketQuantity(tickets);
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
        SELECT ticketType,
        SUM(ticketPrice) AS total_sales_revenue,
        MAX(date_purchased) AS purchase_date,
        COUNT(*) as ticketCount
        FROM Ticket_sales`;
        
        const groupby = `GROUP BY ticketType ORDER BY ticketType`;
        return startDate && endDate ? 
        await query(code+ ` WHERE date_purchased BETWEEN ? AND ? ` + groupby, [startDate, endDate]) :
        await query(code + " "+groupby);

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
            revenue: restaurant[0].total_sales_revenue || 0 ,
            label: "Restaurant Sales",
            color: "#6A9E73" // example color
        },
        {
            type: "concession",
            revenue: concession[0].total_sales_revenue || 0,
            label: "Concession Sales",
            color: "#8BB174"
        },
        {
            type: "giftShop",
            revenue: giftShop[0].total_sales_revenue || 0,
            label: "Gift Shop Sales",
            color: "#A1C181"
        },
        {
            type: "tickets",
            revenue: tickets.reduce((sum, ticket) => {
                return sum + parseFloat(ticket.total_sales_revenue || 0);
              }, 0),
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



// reports pages 


module.exports.combinedItemReport = async function (reportData) {
    const { startDate, endDate } = reportData;
    
    try {
        // Define the base query to fetch combined data from all three sales sources
        const baseQuery = `
            SELECT 
                I.itemName AS itemName,
                I.itemID AS itemID,
                SUM(
                    CASE 
                        WHEN R.itemID IS NOT NULL THEN R.quantity 
                        ELSE 0 
                    END
                ) AS restaurant_quantity_sold,
                SUM(
                    CASE 
                        WHEN C.itemID IS NOT NULL THEN C.quantity 
                        ELSE 0 
                    END
                ) AS concession_quantity_sold,
                SUM(
                    CASE 
                        WHEN G.itemID IS NOT NULL THEN G.quantity 
                        ELSE 0 
                    END
                ) AS giftshop_quantity_sold,
                SUM(
                    CASE 
                        WHEN R.itemID IS NOT NULL THEN (R.quantity * I.itemPrice)
                        ELSE 0 
                    END
                ) AS restaurant_sales_revenue,
                SUM(
                    CASE 
                        WHEN C.itemID IS NOT NULL THEN (C.quantity * I.itemPrice)
                        ELSE 0 
                    END
                ) AS concession_sales_revenue,
                SUM(
                    CASE 
                        WHEN G.itemID IS NOT NULL THEN (G.quantity * I.itemPrice)
                        ELSE 0 
                    END
                ) AS giftshop_sales_revenue,
                (SUM(
                    CASE 
                        WHEN R.itemID IS NOT NULL THEN (R.quantity * I.itemPrice)
                        ELSE 0 
                    END
                ) + 
                SUM(
                    CASE 
                        WHEN C.itemID IS NOT NULL THEN (C.quantity * I.itemPrice)
                        ELSE 0 
                    END
                ) + 
                SUM(
                    CASE 
                        WHEN G.itemID IS NOT NULL THEN (G.quantity * I.itemPrice)
                        ELSE 0 
                    END
                )) AS total_sales_revenue
            FROM Inventory I
            LEFT JOIN Restaurant_sales R ON I.itemID = R.itemID
            LEFT JOIN Concession_sales C ON I.itemID = C.itemID
            LEFT JOIN Gift_shop_sales G ON I.itemID = G.itemID
        `;

        // Apply the date filter if start and end dates are provided
        const whereClause = startDate && endDate ? `WHERE (R.purchased_at BETWEEN ? AND ? OR C.purchased_at BETWEEN ? AND ? OR G.purchased_at BETWEEN ? AND ?)` : ``;

        // Group by item and order by total sales revenue
        const groupByAndOrder = `
            GROUP BY I.itemID, I.itemName
            ORDER BY total_sales_revenue DESC
        `;

        // Combine the parts of the query
        const fullQuery = `${baseQuery} ${whereClause} ${groupByAndOrder}`;
        
        // Execute the query with or without the date parameters
        const results = startDate && endDate
            ? await query(fullQuery, [startDate, endDate, startDate, endDate, startDate, endDate])
            : await query(fullQuery);

        // Format results to include total quantity and total revenue across all categories
        return results.map(item => ({
            itemName: item.itemName,
            itemID: item.itemID,
            restaurant_quantity_sold: item.restaurant_quantity_sold || 0,
            concession_quantity_sold: item.concession_quantity_sold || 0,
            giftshop_quantity_sold: item.giftshop_quantity_sold || 0,
            total_quantity_sold: (item.restaurant_quantity_sold || 0) + (item.concession_quantity_sold || 0) + (item.giftshop_quantity_sold || 0),
            restaurant_sales_revenue: item.restaurant_sales_revenue || 0,
            concession_sales_revenue: item.concession_sales_revenue || 0,
            giftshop_sales_revenue: item.giftshop_sales_revenue || 0,
            total_sales_revenue: item.total_sales_revenue || 0
        }));

    } catch (err) {
        console.error("Error fetching combined item report:", err);
        throw err;
    }
};