import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSentimentAnalysis } from '../services/reportService';
import SummaryView from './chart/SummaryView';
import DetailView from './chart/DetailView'; 

function Report() {
  const [reportData, setReportData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('summary');

  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    u_feedback_for: '',
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
      setError('');
      const data = await getSentimentAnalysis();
      if (Array.isArray(data)) {
        setReportData(data);
      } else {
        setReportData([]);
        setError('Invalid data format received from server');
      }
    } catch (err) {
      console.error('Error fetching report data:', err);
      setError(err.message || 'Failed to fetch report data');
      setReportData([]);
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

    if (filters.u_feedback_for) {
      filtered = filtered.filter(item => item.u_feedback_for === filters.u_feedback_for);
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
      u_feedback_for: '',
      satisfaction: '',
      overallSummary: '',
      usedFeature: '',
      issuesFaced: '',
      suggestions: ''
    });
  };



  return (
    <div className="container mt-4">
      <div className="fixed-top bg-info pb-2 pt-3">
        <div className='container'>
          <h5 className='title'>
              <span className='text-white font-bold'>Dashboard Report </span>
              <Link className="navbar-brand" to="/"><i className="fas fa-paper-plane reload me-3" title="Submit Feedback"></i></Link>
          </h5>
          </div>
      </div>
      
      <div className='border-bottom border-top mt-5 mb-4 pb-4'>
        <div className='row d-flex align-items-end mt-4 pt-2'> 
          <div className="col-md-5">
            <ul className="nav nav-underline d-flex align-items-end">
              <li className="nav-item fs-6">
                <button 
                  className={`nav-link ${activeTab === 'summary' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('summary')}
                  style={{ border: 'none', background: 'none' }}
                >
                  Summary
                </button>
              </li>
              <li className="nav-item fs-6">
                <button 
                  className={`nav-link ${activeTab === 'details' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('details')}
                  style={{ border: 'none', background: 'none' }}
                >
                  Details
                </button>
              </li>
            </ul>
          </div>
         
          <div className="col-md-4">   
            <div className="input-group input-group-sm">
              <span className="input-group-text">From</span>
              <input type="date" 
                className="form-control form-control-sm" 
                name="startDate"
                value={filters.startDate}
                onChange={handleFilterChange}
              />
              <span className="input-group-text">To</span>
              <input type="date" 
                className="form-control form-control-sm" 
                name="endDate"
                value={filters.endDate}
                onChange={handleFilterChange}
              />
            </div>            
          </div>
          <div className="col-md-2">
              <select 
                  className="form-select form-select-sm" 
                  id="u_feedback_for" 
                  name="u_feedback_for"
                  value={filters.u_feedback_for}
                  onChange={handleFilterChange}
                >
                <option value="" disabled>Select Group</option>
                <option value="">All</option>
                <option value="IJP">IJP</option>
                <option value="Wordday">Wordday</option>
                <option value="Service Now">Service Now</option>
              </select>
          </div>

          <div className="col-md-1 d-flex align-items-end">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={clearFilters}
            >
              Clear
            </button>
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
          {activeTab === 'summary' && (
            <SummaryView feedbackData={filteredData} filters={filters}/>
          )}

          {activeTab === 'details' && (
            <DetailView feedbackData={filteredData} filters={filters}/>
          )}
        </>        
      )}
    </div>
  );
}

export default Report;
