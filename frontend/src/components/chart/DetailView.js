import React, { useState } from 'react';

const DetailView = ({ feedbackData = [], filters = {} }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };
  
  const totalPages = Math.ceil(feedbackData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = feedbackData.slice(startIndex, endIndex);

  return (
    <div className='row mb-4'>
      <div className="col-md-12">
        <div className="card card-box1">
          <div className="card-header title2 rounded-0">
            <h6 className="mb-0 ">Feedback Details ({feedbackData.length} records) </h6>
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
                  {currentData.length > 0 ? (
                    currentData.map((item) => (
                      <tr key={item.id}>
                      <td>{item.fb_frequency}</td>
                      <td>{item.fb_satisfaction}</td>
                      <td>{item.fb_recommendation}</td>
                      <td>{item.fb_used_feature}</td>
                      <td>{item.fb_issues_faced}</td>
                      <td>{item.fb_suggestions}</td>
                      <td>
                      <span className={`badge ${
                        item.fb_overall_summary.toLowerCase() === 'positive' ? 'text-bg-success text-light' :
                        item.fb_overall_summary.toLowerCase() === 'neutral' ? 'text-bg-warning text-light' : 'text-bg-danger text-light'
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
            
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="d-flex align-items-center gap-3">
                <span className="text-muted">Page {currentPage} of {totalPages}</span>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-muted">Show:</span>
                  <select 
                    className="form-select form-select-sm" 
                    style={{width: 'auto'}} 
                    value={itemsPerPage} 
                    onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                      Previous
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, index) => (
                    <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  )
};

export default DetailView;
