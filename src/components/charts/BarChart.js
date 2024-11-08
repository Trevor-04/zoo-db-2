import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

export function BarChart({ chartData }) {
    return <Bar data={chartData} options />;
}

export function LineChart({ chartData }) {
    return <Line data={chartData} options />;
}

export function PieChart({ chartData }) {
    return <Pie data={chartData} options />;
}