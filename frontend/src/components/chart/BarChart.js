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
  // Count feedback responses based on overall summary
  const counts = {
    positive: 0,
    negative: 0,
    neutral: 0
  };

  feedbackData.forEach(feedback => {
    const sentiment = feedback.fb_overall_summary?.toLowerCase();
    if (sentiment && counts.hasOwnProperty(sentiment)) {
      counts[sentiment]++;
    }
  });

  const data = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        label: 'Feedback Responses',
        data: [counts.positive, counts.negative, counts.neutral],
        backgroundColor: ['#4CAF50', '#F44336', '#9E9E9E'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: false,
        text: 'Feedback Response Distribution',
      },
    },
  };

  return <div style={{height: '275px'}}> <Bar data={data} options={options} /> </div>;
};

export default BarChart;
