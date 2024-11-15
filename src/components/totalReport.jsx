import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import moment from "moment";
import { jsPDF } from "jspdf"; // Import jsPDF for PDF export
import "jspdf-autotable"; // Optional: for table layout in PDF
import { Bar, Line} from "react-chartjs-2"; // Import Bar chart for the chart view
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
  
  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const [viewMode, setViewMode] = useState("table"); // Toggle view mode between table and chart
  const itemsPerPage = 10;

  const [chartType, setChartType] = useState("Bar");
  const ChartComponent = chartType === "Bar" ? Bar : Line;


  const reportFieldMappings = {
    totalSales: { itemName: 'itemName', revenue: 'total_sales_revenue', quantity: 'total_quantity_sold', date: 'purchase_date' },
    giftShop: { itemName: 'itemName', revenue: 'total_sales_revenue', quantity: 'total_quantity_sold', date: 'purchase_date' },
    tickets: { itemName: 'ticketType', revenue: 'total_sales_revenue', quantity: 'ticketCount', date: 'purchase_date' },
    concession: { itemName: 'itemName', revenue: 'total_sales_revenue', quantity: 'total_quantity_sold', date: 'purchase_date' },
    restaurant: { itemName: 'itemName', revenue: 'total_sales_revenue', quantity: 'total_quantity_sold', date: 'purchase_date' },
  };

  const fields = reportFieldMappings[reportType];

  useEffect(() => {
    switch (dateFilter) {
      case "lastWeek":
        setStartDate(moment().subtract(1, "weeks").startOf("week").format("YYYY-MM-DD"));
        setEndDate(moment().subtract(1, "weeks").endOf("week").format("YYYY-MM-DD"));
        break;
      case "lastMonth":
        setStartDate(moment().subtract(1, "months").startOf("month").format("YYYY-MM-DD"));
        setEndDate(moment().subtract(1, "months").endOf("month").format("YYYY-MM-DD"));
        break;
      case "lastYear":
        setStartDate(moment().subtract(1, "years").startOf("year").format("YYYY-MM-DD"));
        setEndDate(moment().subtract(1, "years").endOf("year").format("YYYY-MM-DD"));
        break;
      case "between":
        if (startDate && endDate) {
          setStartDate(startDate);
          setEndDate(endDate);
        }
        break;
      default:
        setStartDate(undefined);
        setEndDate(undefined);
    }

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
      const response = await axios.get(`${url}${fetchData}`, { params: { startDate, endDate } });
        if (response.status !== 200) throw new Error("Failed to fetch sales data");
        
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

    return itemBoughtMatches;
  });

  const totalItems = filteredData ? filteredData.length : 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = filteredData?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  const totalAmountSpent = filteredData ? filteredData.reduce((total, sale) => total + Number(sale[fields.revenue]), 0) : 0;
  const totalQuantity = filteredData ? filteredData.reduce((total, sale) => total + Number(sale[fields.quantity]), 0) : 0;
  
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

  const downloadCSV = () => {
    const csvContent = [
      ["Item Bought", "Amount Earned", "Quantity", "Last Purchased"],  // Header row
      ...filteredData.map((sale) => [
        itemTypeMapping[sale[fields.itemName]] || sale[fields.itemName],  // Item Bought
        sale[fields.revenue],                                             // Amount Earned
        sale[fields.quantity],                                            // Quantity
        sale[fields.date]                                                 // Last Purchased
      ])
    ]
    .map((e) => e.join(","))
    .join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "sales_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Sales Report", 14, 22);
    doc.setFontSize(12);
    doc.text(`Report Type: ${reportType}`, 14, 30);
    doc.text(`Date Range: ${startDate || "N/A"} to ${endDate || "N/A"}`, 14, 36);

    const tableColumn = ["Item Bought", "Amount Earned", "Quantity", "Last Purchased"];
    const tableRows = filteredData.map((sale) => [
      itemTypeMapping[sale[fields.itemName]] || sale[fields.itemName],
      `$${sale[fields.revenue]}`,
      sale[fields.quantity],
      new Date(sale[fields.date]).toISOString().split("T")[0],
    ]);

    doc.autoTable({ startY: 40, head: [tableColumn], body: tableRows });
    doc.save("sales_report.pdf");
  };

  const chartData = {
    labels: filteredData?.map(sale => sale[fields.itemName]) || [],
    datasets: [
      {
        label: "Amount Earned",
        data: filteredData?.map(sale => sale[fields.revenue]) || [],
        backgroundColor: "#8AA686",
      },
      {
        label: "Quantity",
        data: filteredData?.map(sale => sale[fields.quantity]) || [],
        backgroundColor: "#C0BAA4",
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#EFEDE5] w-screen flex justify-center">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl text-center mb-6 mt-24 text-[#313639]">Sales Report</h1>
  
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

        <div className="mb-4 flex justify-center space-x-4">
        <button onClick={() => setViewMode(viewMode === "table" ? "chart" : "table")} className="bg-[#8AA686] text-white py-2 px-4 rounded">
            {viewMode === "table" ? "Switch to Chart View" : "Switch to Table View"}
          </button>
          <button onClick={downloadPDF} className="bg-[#8AA686] text-white py-2 px-4 rounded">Download PDF</button>
          <button onClick={downloadCSV} className="bg-[#8AA686] text-white py-2 px-4 rounded">Download CSV</button>
        </div>
        
  
        {viewMode === "table" ? (
          <table className="divide-y divide-gray-300 mb-6 w-full text-center bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 font-medium text-xl underline border" onClick={() => handleHeaderClick('itemName')}>Item Bought</th>
                <th className="px-4 py-2 font-medium text-xl underline border" onClick={() => handleHeaderClick('revenue')}>Amount Earned</th>
                <th className="px-4 py-2 font-medium text-xl underline border" onClick={() => handleHeaderClick('quantity')}>Quantity</th>
                <th className="px-4 py-2 font-medium text-xl underline border" onClick={() => handleHeaderClick('date')}>Last Purchased</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData?.map((sale, index) => (
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
        ) : (
          <div className="chart-container mb-6">
          {/* <Bar data={chartData} options={{ responsive: true }} /> */}

          <div className="flex justify-center items-center">
            <select 
                className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                onChange={(e) => setChartType(e.target.value)} 
                value={chartType}
            >
                <option value="Bar">Bar Chart</option>
                <option value="Line">Line Chart</option>
            </select>
        </div>
          
          <ChartComponent data={chartData} options={{ responsive: true }} />
          </div>
        )}
  
        {/* Pagination Controls: only visible in table view */}
        {viewMode === "table" && (
          <div className="flex justify-center mt-4 space-x-2">
            <button onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} className={`px-3 py-1 border rounded-md ${currentPage === 1 ? "bg-[#8AA686] text-white opacity-50" : "bg-[#8AA686] text-white hover:bg-[#6C8A5E]"}`} disabled={currentPage === 1}>
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i} onClick={() => handlePageChange(i + 1)} className={`px-3 py-1 border rounded-md ${currentPage === i + 1 ? "bg-[#8AA686] text-white" : "bg-[#8AA686] text-white hover:bg-[#6C8A5E]"}`}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} className={`px-3 py-1 border rounded-md ${currentPage === totalPages ? "bg-[#8AA686] text-white opacity-50" : "bg-[#8AA686] text-white hover:bg-[#6C8A5E]"}`} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default TotalReport;