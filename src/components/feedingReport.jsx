import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Bar, Line } from "react-chartjs-2";
import axios from "axios";
import moment from "moment";

const { url } = require('../config.json')[process.env.NODE_ENV];

function AnimalFeedingReport() {
  const [feedingData, setFeedingData] = useState([]);
  const [startDate, setStartDate] = useState(undefined);
  const [endDate, setEndDate] = useState(undefined);
  const [dateFilter, setDateFilter] = useState("all");
  const [viewMode, setViewMode] = useState("table");
  const [chartType, setChartType] = useState("Bar");
  const ChartComponent = chartType === "Bar" ? Bar : Line;

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
      default:
        setStartDate(undefined);
        setEndDate(undefined);
    }
    fetchFeedingData();
  }, [dateFilter, startDate, endDate]);

  const fetchFeedingData = async () => {
    try {
      const response = await axios.get(`${url}/feedingSchedule`, {
        params: { startDate, endDate }
      });
      if (response.status !== 200) throw new Error("Failed to fetch feeding data");
      setFeedingData(response.data);
    } catch (err) {
      console.error("Error fetching feeding data:", err);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Animal Feeding Report", 14, 22);
    doc.setFontSize(12);
    doc.text(`Date Range: ${startDate || "N/A"} to ${endDate || "N/A"}`, 14, 30);

    const tableColumn = [
      "Enclosure Name",
      "Total Animals",
      "Feeding Type",
      "Feeding Frequency",
      "Feeding Amount",
      "Last Fed",
      "Caretaker"
    ];
    const tableRows = feedingData.map(row => [
      row.enclosureName,
      row.totalAnimals,
      row.feedingType,
      row.feedingFrequency,
      row.feedingAmount,
      row.lastFedTime,
      row.caretakerName
    ]);

    doc.autoTable({ startY: 40, head: [tableColumn], body: tableRows });
    doc.save("feeding_report.pdf");
  };

  const chartData = {
    labels: feedingData.map(row => row.enclosureName),
    datasets: [
      {
        label: "Total Animals",
        data: feedingData.map(row => row.totalAnimals),
        backgroundColor: "#8AA686",
      },
      {
        label: "Feeding Amount",
        data: feedingData.map(row => row.feedingAmount),
        backgroundColor: "#C0BAA4",
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#EFEDE5] w-screen flex justify-center">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl text-center mb-6 mt-24 text-[#313639]">Animal Feeding Report</h1>

        <div className="mb-4 flex justify-center space-x-4">
          <select
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="all">All dates</option>
            <option value="lastWeek">Last week</option>
            <option value="lastMonth">Last month</option>
            <option value="lastYear">Last year</option>
          </select>
          <button onClick={downloadPDF} className="bg-[#8AA686] text-white py-2 px-4 rounded">Download PDF</button>
          <button onClick={() => setViewMode(viewMode === "table" ? "chart" : "table")} className="bg-[#8AA686] text-white py-2 px-4 rounded">
            {viewMode === "table" ? "Switch to Chart View" : "Switch to Table View"}
          </button>
        </div>

        {viewMode === "table" ? (
          <table className="divide-y divide-gray-300 mb-6 w-full text-center bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 font-medium text-xl underline border">Enclosure Name</th>
                <th className="px-4 py-2 font-medium text-xl underline border">Total Animals</th>
                <th className="px-4 py-2 font-medium text-xl underline border">Feeding Type</th>
                <th className="px-4 py-2 font-medium text-xl underline border">Feeding Frequency</th>
                <th className="px-4 py-2 font-medium text-xl underline border">Feeding Amount</th>
                <th className="px-4 py-2 font-medium text-xl underline border">Last Fed</th>
                <th className="px-4 py-2 font-medium text-xl underline border">Caretaker</th>
              </tr>
            </thead>
            <tbody>
              {feedingData.map((row, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="px-4 py-2 border">{row.enclosureName}</td>
                  <td className="px-4 py-2 border">{row.totalAnimals}</td>
                  <td className="px-4 py-2 border">{row.feedingType}</td>
                  <td className="px-4 py-2 border">{row.feedingFrequency}</td>
                  <td className="px-4 py-2 border">{row.feedingAmount}</td>
                  <td className="px-4 py-2 border">{row.lastFedTime}</td>
                  <td className="px-4 py-2 border">{row.caretakerName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="chart-container mb-6">
            <ChartComponent data={chartData} options={{ responsive: true }} />
          </div>
        )}
      </div>
    </main>
  );
}

export default AnimalFeedingReport;