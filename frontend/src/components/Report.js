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
      <h5 className='title'>
          <span>Dashboard Report </span>
          <Link className="navbar-brand" to="/"><i className="fas fa-paper-plane reload me-3" title="Submit Feedback"></i></Link>
      </h5>
      
      <div className='border-bottom mb-3 pb-3'>
        <div className='row d-flex align-items-end'> 
          <div className="col-md-4">
            <ul className="nav nav-underline">
              <li className="nav-item fs-5">
                <button 
                  className={`nav-link ${activeTab === 'summary' ? 'active' : ''}`} 
                  onClick={() => setActiveTab('summary')}
                  style={{ border: 'none', background: 'none' }}
                >
                  Summary
                </button>
              </li>
              <li className="nav-item fs-5">
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
         
          <div className="col-md-2">   
            <div className='form-floating input-group-sm'>          
              <input type="date" 
                className="form-control" 
                id="startDate" 
                name="startDate"
                placeholder="Start Date"
                value={filters.startDate}
                onChange={handleFilterChange}
              />
              <label htmlFor="startDate">Start Date</label> 
            </div>            
          </div>
          <div className="col-md-2 form-floating">      
            <div className='form-floating input-group-sm'>            
              <input type="date" 
                className="form-control" 
                id="endDate" 
                name="endDate"
                placeholder="End Date"
                value={filters.endDate}
                onChange={handleFilterChange}
              />
              <label htmlFor="endDate">End Date</label>     
              </div>         
          </div>
          <div className="col-md-3 form-floating">
            <div className='form-floating'> 
              <select 
                  className="form-select" 
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
              <label htmlFor="u_feedback_for">Group</label>
              </div>
          </div>

          <div className="col-md-1 d-flex align-items-end">
            <button
              type="button"
              className="btn btn-secondary mb-3"
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
