import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getSentimentAnalysis } from '../services/reportService';

ChartJS.register(ArcElement, Tooltip, Legend);

function Report() {
  const [reportData, setReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    frequency: '',
    satisfaction: '', 
    recommendation: '',
    usedFeature: '',
    issuesFaced: '',
    suggestions: ''
  });

  useEffect(() => {
    fetchReportData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [reportData, filters]);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const data = await getSentimentAnalysis();
      setReportData(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...reportData];
    
    if (filters.startDate) {
      filtered = filtered.filter(item => 
        new Date(item.fb_created_at) >= new Date(filters.startDate)
      );
    }
    
    if (filters.endDate) {
      filtered = filtered.filter(item =>
        new Date(item.fb_created_at) <= new Date(filters.endDate)
      );
    }

    if (filters.frequency) {
      filtered = filtered.filter(item => item.fb_frequency === filters.frequency);
    }
    if (filters.satisfaction) {
      filtered = filtered.filter(item => item.fb_satisfaction === filters.satisfaction);
    }
    if (filters.recommendation) {
      filtered = filtered.filter(item => item.fb_recommendation === filters.recommendation);
    }
    if (filters.usedFeature) {
      filtered = filtered.filter(item => item.fb_used_feature === filters.usedFeature);
    }
    if (filters.issuesFaced) {
      filtered = filtered.filter(item => item.fb_issues_faced === filters.issuesFaced);
    }
    if (filters.suggestions) {
      filtered = filtered.filter(item => item.fb_suggestions === filters.suggestions);
    }
    
    setFilteredData(filtered);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const clearFilters = () => {
    setFilters({
      startDate: '',
      endDate: '',
      frequency: '',
      satisfaction: '',
      recommendation: '',
      usedFeature: '',
      issuesFaced: '',
      suggestions: ''
    });
  };

  const getDistribution = (field) => {
    const distribution = { 'Positive': 0, 'Neutral': 0, 'Negative': 0 };
    filteredData.forEach(item => {
      distribution[item[field]] = (distribution[item[field]] || 0) + 1;
    });
    return distribution;
  };

  const pieChartData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        data: Object.values(getDistribution('fb_recommendation')),
        backgroundColor: [
          '#4BC0C0',
          '#FFCD56', 
          '#FF6384'
        ],
        borderWidth: 1
      }
    ]
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Feedback Report</h2>
      
      {/* Filter Section */}
      <div className="card mb-4">
        <div className="card-header title2">
          <h5 className="mb-0">Filters</h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-2">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Frequency</label>
              <select
                className="form-select"
                name="frequency"
                value={filters.frequency}
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="Positive">Positive</option>
                <option value="Neutral">Neutral</option>
                <option value="Negative">Negative</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label">Satisfaction</label>
              <select
                className="form-select"
                name="satisfaction"
                value={filters.satisfaction}
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="Positive">Positive</option>
                <option value="Neutral">Neutral</option>
                <option value="Negative">Negative</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label">Recommendation</label>
              <select
                className="form-select"
                name="recommendation"
                value={filters.recommendation}
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="Positive">Positive</option>
                <option value="Neutral">Neutral</option>
                <option value="Negative">Negative</option>
              </select>
            </div>
            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-secondary mt-4"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {/* Data Table */}
          <div className="col-md-8">
            <div className="card">
              <div className="card-header title2">
                <h5 className="mb-0 ">Feedback Data ({filteredData.length} records)</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Frequency</th>
                        <th>Satisfaction</th>
                        <th>Recommendation</th>
                        <th>Used Features</th>
                        <th>Issues Faced</th>
                        <th>Suggestions</th>
                        <th>Overall Sentiment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.length > 0 ? (
                        filteredData.map((item) => (
                          <tr key={item.id}>
                          <td>{item.fb_frequency}</td>
                          <td>{item.fb_satisfaction}</td>
                          <td>{item.fb_recommendation}</td>
                          <td>{item.fb_used_feature}</td>
                          <td>{item.fb_issues_faced}</td>
                          <td>{item.fb_suggestions}</td>
                          <td>
                            <span className={`text-success ${
                              item.fb_recommendation === 'Positive' ? 'text-success' :
                              item.fb_recommendation === 'Neutral' ? 'text-warning' : 'text-danger'
                            }`}>
                              {item.fb_overall_summary}
                            </span>
                          </td>
                        </tr>

                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="text-center">No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="col-md-4">
            <div className="card">
              <div className="card-header title2">
                <h5 className="mb-0">Recommendation Distribution</h5>
              </div>
              <div className="card-body">
                {filteredData.length > 0 ? (
                  <Pie data={pieChartData} options={pieChartOptions} />
                ) : (
                  <div className="text-center text-muted">
                    <p>No data to display</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Report;
