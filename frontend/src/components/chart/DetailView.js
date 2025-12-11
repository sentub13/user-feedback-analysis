import React from 'react';

const DetailView = ({ feedbackData = [], filters = {} }) => {

  return (
    <div className='row mb-4'>
      <div className="col-md-12">
        <div className="card">
          <div className="card-header title2">
            <h6 className="mb-0 ">Feedback Data ({feedbackData.length} records)</h6>
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
                  {feedbackData.length > 0 ? (
                    feedbackData.map((item) => (
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
          </div>
        </div>
      </div>
    </div>
  )
};

export default DetailView;
