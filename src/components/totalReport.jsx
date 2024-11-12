import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios';
import moment from "moment";
import "../App.css";
import "../index.css";

const {url} = require('../config.json')[process.env.NODE_ENV];
function TotalReport() {
  const [salesData, setSalesData] = useState(null);
  const [filter, setFilter] = useState("totalSales");
  const [searchTerm, setSearchTerm] = useState("");

  // Add this state to keep track of the selected report type
  // const [reportType, setReportType] = useState("totalSales");
  const [reportType, setReportType] = useState("tickets");

  // Add this function to handle changes to the report type
  const handleReportTypeChange = (event) => {
    setReportType(event.target.value);
  };

  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const handleHeaderClick = (field) => {
    setSortField(field);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const sortedData = React.useMemo(() => {
    if (!sortField) return salesData;
  
    const fields = reportFieldMappings[reportType];
    const actualSortField = fields[sortField] || sortField;
  
    const sorted = [...salesData].sort((a, b) => {
      if (a[actualSortField] < b[actualSortField]) return -1;
      if (a[actualSortField] > b[actualSortField]) return 1;
      return 0;
    });
    return sortDirection === "asc" ? sorted : sorted.reverse();
  }, [salesData, sortField, sortDirection, reportType]);

  useEffect(() => {
    fetchSalesData();
  }, []);

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
        // fetchData = "https://museuma.onrender.com/total-report";
        fetchData = "/reports/restraunt/items";
    }
    try {
      const response = await axios.get(`${url}${fetchData}`);
      if (response.status != 200) {
        throw new Error("Failed to fetch sales data");
      }
      console.log(response.data);
      setSalesData(response.data);
    } catch (error) {
      console.error("Error fetching sales data:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, [reportType]);

  // Add these states to keep track of the search terms and date filter
  const [itemBoughtSearchTerm, setItemBoughtSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [currentFilters, setCurrentFilters] = useState({
    itemBought: "",
    dateFilter: "all",
  });

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  // Add these functions to handle changes to the search terms and date filter

  const handleItemBoughtSearchTermChange = (event) => {
    setItemBoughtSearchTerm(event.target.value);
  };
  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
  };

  const reportFieldMappings = {
    totalSales: { itemName: 'itemName', revenue: 'total_sales_revenue', quantity: 'total_quantity_sold', date: 'purchase_date' },
    giftShop: { itemName: 'itemName', revenue: 'total_sales_revenue', quantity: 'total_quantity_sold', date: 'purchase_date' },
    tickets: { itemName: 'ticketType', revenue: 'total_sales_revenue', quantity: 'ticketCount', date: 'purchase_date' },
    concession: { itemName: 'itemName', revenue: 'total_sales_revenue', quantity: 'total_quantity_sold', date: 'purchase_date' },
    restaurant: { itemName: 'itemName', revenue: 'total_sales_revenue', quantity: 'total_quantity_sold', date: 'purchase_date' },
  };

  const fields = reportFieldMappings[reportType]

  // Modify your filter function to filter by itemName, and date
  const filteredData = salesData?.filter((sale) => {

    const itemBoughtMatches = sale?.[fields.itemName] !== undefined &&
    sale[fields.itemName]
      .toString()
      .toLowerCase()
      .includes(itemBoughtSearchTerm.toLowerCase());

    let dateMatches;
    const saleDate = sale?.[fields.date];

    switch (dateFilter) {
      case "lastWeek":
        dateMatches = moment(saleDate).isAfter(moment().subtract(1, "weeks"));
        break;
      case "lastMonth":
        dateMatches = moment(saleDate).isAfter(moment().subtract(1, "months"));
        break;
      case "lastYear":
        dateMatches = moment(saleDate).isAfter(moment().subtract(1, "years"));
        break;
      case "between":
        dateMatches = moment(new Date(saleDate)).isBetween( // was order date but idk wtf that is 
          moment(new Date(startDate)),
          moment(new Date(endDate)),
          undefined,
          "[]"
        );
        break;
      case "all":
        dateMatches = true; // Allow all dates
        break;
      default:
        dateMatches = true; // Default to true for other filters
    }
    return itemBoughtMatches && dateMatches;
  });


  const itemTotals = filteredData
  ? filteredData.reduce((totals, sale) => {
      console.log(`${sale[fields.itemName]} = ${sale[fields.quantity]}`);
      totals[sale[fields.itemName]] = (totals[sale[fields.itemName]] || 0) + sale[fields.quantity];
      return totals;
    }, {})
  : {};

  const mostPopularItem = Object.keys(itemTotals).reduce(
    (a, b) => (itemTotals[a] > itemTotals[b] ? a : b),
    "N/A"
  );

  const totalAmountSpent = filteredData
    ? filteredData.reduce((total, sale) => total + Number(sale[fields.revenue]), 0)
    : 0;
    console.log(totalAmountSpent)
  const totalQuantity = filteredData
    ? filteredData.reduce((total, sale) => total + Number(sale[fields.quantity]), 0)
    : 0;

  const numRowsShowing = filteredData ? filteredData.length : 0;

  return (
    <main className="min-h-screen bg-[#EFEDE5] w-screen flex justify-center">
      <div className="container mx-auto p-6">
        <Link
          to="/admin"
          className="absolute top-32 left-10 inline-block text-2xl text-[#313639] hover:text-[#C0BAA4]"
        >
          {/* <FaArrowLeft /> */}
        </Link>

        <h1 className="text-4xl text-center mb-6 mt-24 text-[#313639]">
          Sales Report
        </h1>

        <div className="mb-4 flex justify-center space-x-4">
          <select
            value={reportType}
            onChange={handleReportTypeChange}
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          >
            <option value="totalSales">Total Sales Report</option>
            <option value="giftShop">Gift Shop Sales Report</option>
            <option value="concession">Concession Sales Report </option>
            <option value="restaurant">Restaurant Sales Report</option>
            <option value="tickets">Ticket Sales Report</option>
          </select>
          <input
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="text"
            value={itemBoughtSearchTerm}
            onChange={handleItemBoughtSearchTermChange}
            placeholder="Search by item bought"
          />
          <select
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            value={dateFilter}
            onChange={handleDateFilterChange}
          >
            <option value="all">All dates</option>
            <option value="lastWeek">Last week</option>
            <option value="lastMonth">Last month</option>
            <option value="lastYear">Last year</option>
            <option value="between">Between dates</option>
          </select>
          {dateFilter === "between" && (
            <div className="w-1/3 flex justify-between">
              <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none w-1/2 mr-2"
              />
              <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                className="border-2 border-gray-300 bg-white h-10 px-5 rounded-lg text-sm focus:outline-none w-1/2"
              />
            </div>
          )}
        </div>

        <table className="divide-y divide-gray-300 mb-6 w-full text-center mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 font-medium text-xl underline border">
                {reportType === 'tickets' ? 'Ticket Name' : 'Item Bought'}
              </th>
              <th className="px-4 py-2 font-medium text-xl underline border">
                Amount Spent
              </th>
              <th className="px-4 py-2 font-medium text-xl underline border">
                Quantity
              </th>
              <th className="px-4 py-2 font-medium text-xl underline border">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData &&
              filteredData.map((sale, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="px-4 py-2 border">{sale[fields.itemName]}</td>
                  <td className="px-4 py-2 border">${sale[fields.revenue]}</td>
                  <td className="px-4 py-2 border">{sale[fields.quantity]}</td>
                  <td className="px-4 py-2 border">
                    {new Date(sale[fields.date]).toISOString().split("T")[0]}
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td className="py-2 border">
                Most Popular Item: {mostPopularItem}
              </td>
              <td className="py-2 border">
                Total Earned: ${totalAmountSpent.toFixed(2)}
              </td>
              <td className="py-2 border">Total Quantity: {totalQuantity}</td>
              <td className="py-2 border">Total Count: {numRowsShowing}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  );
}

export default TotalReport;