import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement, 
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const OverallChart = ({ feedbackData = [] }) => { // Add default empty array
    console.log("feedbackData----", feedbackData)
  // Count feedback sentiments 
  const sentimentCounts = feedbackData.reduce((acc, item) => {
    acc.positive += ['positive', 'Positive'].includes(item.fb_satisfaction) ? 1 : 0;
    acc.negative += ['negative', 'Negative'].includes(item.fb_satisfaction) ? 1 : 0;
    acc.neutral += ['neutral', 'Neutral'].includes(item.fb_satisfaction) ? 1 : 0;
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
        backgroundColor: ['#4caf50', '#f44336', '#ff9800'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Feedback Satisfaction Distribution',
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default OverallChart;
