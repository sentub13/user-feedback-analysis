import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Pie, Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { getSentimentAnalysis } from '../services/reportService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement, 
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Report() {
  const [reportData, setReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    group: '',
    satisfaction: '',
    overallSummary: '',
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

    if (filters.group) {
      filtered = filtered.filter(item => item.fb_group === filters.group);
    }
    if (filters.satisfaction) {
      filtered = filtered.filter(item => item.fb_satisfaction === filters.satisfaction);
    }
    if (filters.overallSummary) {
      filtered = filtered.filter(item => item.fb_overall_summary === filters.overallSummary);
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
      group: '',
      satisfaction: '',
      overallSummary: '',
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
        data: Object.values(getDistribution('fb_overall_summary')),
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
            return `${context.label}: ${percentage}%`;
          }
        }
      },
      datalabels: {
        formatter: (value, ctx) => {
          const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`;
        },
        color: '#fff',
        font: {
          weight: 'bold'
        }
      }
    }
  };

  return (
    <div className="container mt-4">
      <h5 className='title'>
          <span>Dashboard Report </span>
          <Link className="navbar-brand" to="/"><i className="fas fa-paper-plane reload me-3" title="Submit Feedback"></i></Link>
      </h5>
      
      <div className="card mb-4">
        <div className="card-header title2">
          <h6 className="mb-0">Filters</h6>
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
            <label className="form-label">Group</label>
            <select
              className="form-select"
              name="group"
              value={filters.group}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              <option value="IJP">IJP</option>
              <option value="Wordday">Wordday</option>
              <option value="Service Now">Service Now</option>
            </select>
          </div>
            <div className="col-md-2">
              <label className="form-label">Overall Summary</label>
              <select
                className="form-select"
                name="overallSummary"
                value={filters.overallSummary}
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="Positive">Positive</option>
                <option value="Neutral">Neutral</option>
                <option value="Negative">Negative</option>
              </select>
            </div>
            <div className="col-md-2 offset-md-2">
              <button
                type="button"
                className="btn btn-secondary mt-4 float-end"
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
        <>
        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header title2">
                <h6 className="mb-0 ">Feedback Data ({filteredData.length} records)</h6>
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
                          <span className={`badge ${
                            item.fb_overall_summary === 'Positive' ? 'text-bg-success text-light' :
                            item.fb_overall_summary === 'Neutral' ? 'text-bg-warning text-light' : 'text-bg-danger text-light'
                          }`} style={{width: '65px'}}>
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

          <div className="col-md-4">
            <div className="card">
              <div className="card-header title2">
                <h6 className="mb-0">Overall Summary</h6>
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
        <div className="row my-4">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header title2">
                <h6 className="mb-0"> Summary - {filters.group || 'All Groups'}</h6>
              </div>
              <div className="card-body">
                {filteredData.length > 0 ? (
                  <Bar
                    data={{
                      labels: ['Positive', 'Neutral', 'Negative'],
                      datasets: [
                        {
                          data: Object.values(getDistribution('fb_overall_summary')),
                          backgroundColor: [
                            '#4BC0C0',
                            '#FFCD56',
                            '#FF6384'
                          ],
                          borderWidth: 1
                        }
                      ]
                    }}
                    options={{
                      indexAxis: 'y',
                      responsive: true,
                      plugins: {
                        legend: {
                          display: false
                        },
                        tooltip: {
                          callbacks: {
                            label: (context) => {
                              const total = context.dataset.data.reduce((a, b) => a + b, 0);
                              const percentage = ((context.parsed.x / total) * 100).toFixed(1);
                              return `${context.label}: ${percentage}%`;
                            }
                          }
                        }
                      },
                      scales: {
                        x: {
                          beginAtZero: true
                        }
                      }
                    }}
                  />
                ) : (
                  <div className="text-center text-muted">
                    <p>No data to display</p>
                  </div>
                )}
              </div>
            </div>
          </div>


          <div className="col-md-6">
            <div className="card">
              <div className="card-header title2">
                <h6 className="mb-0">Trends - {filters.group || 'All Groups'}</h6>
              </div>
              <div className="card-body">
                {filteredData.length > 0 ? (
                  <Line
                    data={{
                      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                      datasets: [
                        {
                          label: 'Positive',
                          data: [12, 19, 3, 5, 2, 3],
                          borderColor: '#4BC0C0',
                          backgroundColor: '#4BC0C0',
                          tension: 0.1
                        },
                        {
                          label: 'Neutral',
                          data: [2, 3, 20, 5, 1, 4],
                          borderColor: '#FFCD56',
                          backgroundColor: '#FFCD56',
                          tension: 0.1
                        },
                        {
                          label: 'Negative',
                          data: [3, 10, 13, 15, 22, 30],
                          borderColor: '#FF6384',
                          backgroundColor: '#FF6384',
                          tension: 0.1
                        }
                      ]
                    }}
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
                ) : (
                  <div className="text-center text-muted">
                    <p>No data to display</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        </>        
      )}
    </div>
  );
}

export default Report;
