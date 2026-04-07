import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// ChartJS registration for all types
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

// 1. Monthly Sales Bar Chart
export const SalesBarChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Monthly Sales',
      data: [4200, 5800, 7200, 6100, 8400, 9200],
      backgroundColor: '#2F6151',
      borderColor: '#2F6151',
      borderWidth: 1,
      borderRadius: 4, 
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { 
        beginAtZero: true, 
        grid: { color: '#E8E8E8' },
        ticks: { font: { family: 'serif' }}
      },
      x: { grid: { display: false } }
    },
  };

  return <Bar data={data} options={options} />;
};

// 2. Sales by Category Donut Chart
export const CategoryDonutChart = () => {
  const data = {
    labels: ['Electronics', 'Clothing', 'Accessories', 'Home & Garden', 'Sports', 'Books'],
    datasets: [{
      label: 'Sales Percentage',
      data: [35, 20, 18, 12, 10, 5],
      backgroundColor: ['#2F6151', '#F59E0B', '#10B981', '#EF4444', '#3B82F6', '#8B5CF6'],
      hoverOffset: 4,
      borderWidth: 2,
      borderColor: '#FFF',
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: { font: { family: 'serif', size: 10 } }
      }
    }
  };

  return <Doughnut data={data} options={options} />;
};