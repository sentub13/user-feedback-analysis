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
      const date = new Date(feedback.fb_created_at);
      const month = date.getMonth();

      const countSentiments = (obj) => {
        let positive = 0, neutral = 0, negative = 0;
        Object.values(obj).forEach(value => {
          if (value.toLowerCase() === 'positive') positive++;
          else if (value.toLowerCase() === 'neutral') neutral++;
          else if (value.toLowerCase() === 'negative') negative++;
        });
        return { positive, neutral, negative };
      };

      const sentiments = countSentiments({
        frequency: feedback.fb_frequency,
        satisfaction: feedback.fb_satisfaction,
        recommendation: feedback.fb_recommendation,
        usedFeature: feedback.fb_used_feature,
        issuesFaced: feedback.fb_issues_faced,
        suggestions: feedback.fb_suggestions,
        overallSummary: feedback.fb_overall_summary
      });

      datasets.Positive[month] += sentiments.positive;
      datasets.Neutral[month] += sentiments.neutral;
      datasets.Negative[month] += sentiments.negative;
    });

    return {
      labels: months,
      datasets: [
        {
          label: 'Positive',
          data: datasets.Positive,
          borderColor: '#4BC0C0',
          backgroundColor: '#4BC0C0',
          tension: 0.1
        },
        {
          label: 'Neutral',
          data: datasets.Neutral,
          borderColor: '#FFCD56',
          backgroundColor: '#FFCD56',
          tension: 0.1
        },
        {
          label: 'Negative',
          data: datasets.Negative,
          borderColor: '#FF6384',
          backgroundColor: '#FF6384',
          tension: 0.1
        }
      ]
    };
  };

  return (
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
  );
};

export default TrendChart;


