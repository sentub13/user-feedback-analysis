// BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register required chart components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const BarChart = ({ feedbackData = [] }) => {
  // Count feedback responses
  const counts = {
    Positive: 0,
    Negative: 0,
    Neutral: 0
  };

  feedbackData.forEach(feedback => {
    Object.entries(feedback).forEach(([key, value]) => {
      if (key.startsWith('fb_') && typeof value === 'string') {
        const normalizedValue = value.toLowerCase() === 'neutral' ? 'Neutral' : value;
        if (counts.hasOwnProperty(normalizedValue)) {
          counts[normalizedValue]++;
        }
      }
    });
  });

  const data = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        label: 'Feedback Responses',
        data: [counts.Positive, counts.Negative, counts.Neutral],
        backgroundColor: ['#4CAF50', '#F44336', '#9E9E9E'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Feedback Response Distribution',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
