import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement, 
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const OverallChart = ({ feedbackData = [] }) => {
  // Count feedback sentiments based on overall summary
  const sentimentCounts = feedbackData.reduce((acc, item) => {
    const sentiment = item.fb_overall_summary?.toLowerCase();
    if (sentiment === 'positive') acc.positive++;
    else if (sentiment === 'negative') acc.negative++;
    else if (sentiment === 'neutral') acc.neutral++;
    return acc;
  }, { positive: 0, negative: 0, neutral: 0 });

  const data = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        label: 'Feedback Distribution',
        data: [
          sentimentCounts.positive,
          sentimentCounts.negative, 
          sentimentCounts.neutral
        ],
        backgroundColor: ['#4CAF50', '#F44336', '#FF9800'],
        borderWidth: 1,
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
        text: 'Feedback Satisfaction Distribution',
      },
    },
  };

  return <div style={{height: '275px'}}><Pie data={data} options={options} /></div>;
};

export default OverallChart;
