import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import moment from "moment";
import "../App.css";
import "../index.css";

const { url } = require('../config.json')[process.env.NODE_ENV];

function TotalReport() {
  const [salesData, setSalesData] = useState(null);
  const [reportType, setReportType] = useState("totalSales");
  const [itemBoughtSearchTerm, setItemBoughtSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);

  // Define report field mappings
  const reportFieldMappings = {
    totalSales: { itemName: 'itemName', revenue: 'total_sales_revenue', quantity: 'total_quantity_sold', date: 'purchase_date' },
    giftShop: { itemName: 'itemName', revenue: 'total_sales_revenue', quantity: 'total_quantity_sold', date: 'purchase_date' },
    tickets: { itemName: 'ticketType', revenue: 'total_sales_revenue', quantity: 'ticketCount', date: 'purchase_date' },
    concession: { itemName: 'itemName', revenue: 'total_sales_revenue', quantity: 'total_quantity_sold', date: 'purchase_date' },
    restaurant: { itemName: 'itemName', revenue: 'total_sales_revenue', quantity: 'total_quantity_sold', date: 'purchase_date' },
  };

  // Dynamically set fields based on reportType
  const fields = reportFieldMappings[reportType];

useEffect(() => {
  fetchSalesData();
}, [reportType, dateFilter, startDate, endDate]);

  const fetchSalesData = async () => {
    let fetchData;
    switch (reportType) {
      case "giftShop":
        fetchData = "/reports/giftshop/items";
        break;
      case "tickets":
        fetchData = "/reports/ticketRevenue";
        break;
      case "concession":
        fetchData = "/reports/concession/items";
        break;
      case "restaurant":
        fetchData = "/reports/restaurant/items";
        break;
      default:
        fetchData = "/reports/all";
    }
    try {
      const response = await axios.get(`${url}${fetchData}`, {params: {startDate, endDate}});
      if (response.status !== 200) {
        throw new Error("Failed to fetch sales data");
      }
      setSalesData(response.data);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  const handleHeaderClick = (field) => {
    setSortField(field);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const sortedData = React.useMemo(() => {
    if (!sortField) return salesData;

    const sorted = [...salesData].sort((a, b) => {
      if (a[fields[sortField]] < b[fields[sortField]]) return -1;
      if (a[fields[sortField]] > b[fields[sortField]]) return 1;
      return 0;
    });
    return sortDirection === "asc" ? sorted : sorted.reverse();
  }, [salesData, sortField, sortDirection]);

  const filteredData = sortedData?.filter((sale) => {
    const itemBoughtMatches = sale?.[fields.itemName] !== undefined &&
      sale[fields.itemName]
        .toString()
        .toLowerCase()
        .includes(itemBoughtSearchTerm.toLowerCase());

    let dateMatches = false;
    const saleDate = moment.utc(sale?.[fields.date]);
    console.log(saleDate)
    switch (dateFilter) {
      case "lastWeek":
        dateMatches = saleDate.isAfter(moment().subtract(1, "weeks").startOf("week")) &&
                      saleDate.isBefore(moment().startOf("week"));
        break;
      case "lastMonth":
        dateMatches = saleDate.isAfter(moment().subtract(1, "months").startOf("month")) &&
                      saleDate.isBefore(moment().startOf("month"));
        break;
      case "lastYear":
        dateMatches = saleDate.isAfter(moment().subtract(1, "years").startOf("year")) &&
                      saleDate.isBefore(moment().startOf("year"));
        break;
      case "between":
        if (startDate && endDate) {
          const start = moment.utc(startDate).startOf("day");
          const end = moment.utc(endDate).endOf("day");
          dateMatches = saleDate.isBetween(start, end, undefined, "[]");
        } else {
          dateMatches = true;
        }
        break;
      case "all":
        dateMatches = true;
        break;
      default:
        dateMatches = true;
    }
    return itemBoughtMatches && dateMatches;
  });

  const totalAmountSpent = filteredData
    ? filteredData.reduce((total, sale) => Number(total) + Number(sale[fields.revenue]), 0)
    : 0;
  
  const totalQuantity = filteredData
    ? filteredData.reduce((total, sale) => Number(total) + Number(sale[fields.quantity]), 0)
    : 0;

  const itemTotals = filteredData
    ? filteredData.reduce((totals, sale) => {
        totals[sale[fields.itemName]] = (totals[sale[fields.itemName]] || 0) + Number(sale[fields.quantity]);
        return totals;
      }, {})
    : {};

  const mostPopularItem = Object.keys(itemTotals).reduce(
    (a, b) => (itemTotals[a] > itemTotals[b] ? a : b),
    "N/A"
  );

  const itemTypeMapping = {
    0: 'Adult Tickets',
    1: 'Child Tickets',
    2: 'Senior Tickets',
    3: 'Infant Tickets'
  };

  return (
    <main className="min-h-screen bg-[#EFEDE5] w-screen flex justify-center">
      <div className="container mx-auto p-6">
        <Link to="/admin" className="absolute top-32 left-10 inline-block text-2xl text-[#313639] hover:text-[#C0BAA4]"></Link>
        <h1 className="text-4xl text-center mb-6 mt-24 text-[#313639]">Sales Report</h1>

        {/* Filter Controls */}
        <div className="mb-4 flex justify-center space-x-4">
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          >
            <option value="totalSales">Total Sales Report</option>
            <option value="giftShop">Gift Shop Sales Report</option>
            <option value="concession">Concession Sales Report</option>
            <option value="restaurant">Restaurant Sales Report</option>
            <option value="tickets">Ticket Sales Report</option>
          </select>
          <input
            type="text"
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            value={itemBoughtSearchTerm || ""}
            onChange={(e) => setItemBoughtSearchTerm(e.target.value)}
            placeholder="Search by item bought"
          />
          <select
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="all">All dates</option>
            <option value="lastWeek">Last week</option>
            <option value="lastMonth">Last month</option>
            <option value="lastYear">Last year</option>
            <option value="between">Between dates</option>
          </select>
          {dateFilter === "between" && (
            <div className="w-1/3 flex justify-between">
              <input type="date" value={startDate || ""} onChange={(e) => setStartDate(e.target.value)} className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none w-1/2 mr-2" />
              <input type="date" value={endDate || ""} onChange={(e) => setEndDate(e.target.value)} className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none w-1/2" />
            </div>
          )}
        </div>

        {/* Sales Data Table */}
        <table className="divide-y divide-gray-300 mb-6 w-full text-center mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 font-medium text-xl underline border" onClick={() => handleHeaderClick('itemName')}>
                {reportType === 'tickets' ? 'Ticket Type' : 'Item Bought'}
              </th>
              <th className="px-4 py-2 font-medium text-xl underline border" onClick={() => handleHeaderClick('revenue')}>
                Amount Earned
              </th>
              <th className="px-4 py-2 font-medium text-xl underline border" onClick={() => handleHeaderClick('quantity')}>
                Quantity
              </th>
              <th className="px-4 py-2 font-medium text-xl underline border" onClick={() => handleHeaderClick('date')}>
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData &&
              filteredData.map((sale, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="px-4 py-2 border">{itemTypeMapping[sale[fields.itemName]] || sale[fields.itemName]}</td>
                  <td className="px-4 py-2 border">${sale[fields.revenue]}</td>
                  <td className="px-4 py-2 border">{sale[fields.quantity]}</td>
                  <td className="px-4 py-2 border">{new Date(sale[fields.date]).toISOString().split("T")[0]}</td>
                </tr>
              ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td className="py-2 border">Most Popular Item: {mostPopularItem}</td>
              <td className="py-2 border">Total Earned: ${totalAmountSpent.toFixed(0)}</td>
              <td className="py-2 border">Total Quantity: {totalQuantity.toFixed(2)}</td>
              <td className="py-2 border">Total Count: {filteredData ? filteredData.length : 0}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  );
}

export default TotalReport;
