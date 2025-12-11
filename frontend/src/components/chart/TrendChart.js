// TrendChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register chart elements
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const TrendChart = ({ feedbackData = [] }) => {
  const processData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const datasets = {
      Positive: Array(12).fill(0),
      Neutral: Array(12).fill(0),
      Negative: Array(12).fill(0)
    };

    feedbackData.forEach(feedback => {
      if (!feedback.fb_created_at) return;
      
      const date = new Date(feedback.fb_created_at);
      if (isNaN(date.getTime())) return;
      
      const month = date.getMonth();
      const sentiment = feedback.fb_overall_summary?.toLowerCase();
      
      if (sentiment === 'positive') {
        datasets.Positive[month]++;
      } else if (sentiment === 'negative') {
        datasets.Negative[month]++;
      } else if (sentiment === 'neutral') {
        datasets.Neutral[month]++;
      }
    });

    return {
      labels: months,
      datasets: [
        {
          label: 'Positive',
          data: datasets.Positive,
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          tension: 0.1
        },
        {
          label: 'Neutral',
          data: datasets.Neutral,
          borderColor: '#FF9800',
          backgroundColor: 'rgba(255, 152, 0, 0.1)',
          tension: 0.1
        },
        {
          label: 'Negative',
          data: datasets.Negative,
          borderColor: '#F44336',
          backgroundColor: 'rgba(244, 67, 54, 0.1)',
          tension: 0.1
        }
      ]
    };
  };

  return (
    <div style={{height: '300px'}}>
      <Line
        data={processData()}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }}
      />
    </div>
  );
};

export default TrendChart;


