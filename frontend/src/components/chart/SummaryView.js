import React from 'react';
import BarChart from './BarChart';
import TrendChart from './TrendChart';
import OverallChart from './OverallChart';

const SummaryView = ({ feedbackData = [], filters = {} }) => {

  return (
    <div>
      <div className="row mb-4">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header title2">
                <h6 className="mb-0"> Summary - {filters.u_feedback_for || 'All Groups'}</h6>
              </div>
              <div className="card-body">
                {feedbackData.length > 0 ? (
                  <BarChart feedbackData={feedbackData}/>
                ) : (
                  <div className="text-center text-muted">
                    <p>No data to display</p>
                  </div>
                )}
              </div>
            </div>
          </div>


          <div className="col-md-4">
            <div className="card">
              <div className="card-header title2">
                <h6 className="mb-0">Trends - {filters.u_feedback_for || 'All Groups'}</h6>
              </div>
              <div className="card-body">
                {feedbackData.length > 0 ? (
                  <TrendChart feedbackData={feedbackData}/>                  
                ) : (
                  <div className="text-center text-muted">
                    <p>No data to display</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-header title2">
                <h6 className="mb-0">Overall Summary</h6>
              </div>
              <div className="card-body">               
                {feedbackData.length > 0 ? (
                  <OverallChart feedbackData={feedbackData}/>
                ) : (
                  <div className="text-center text-muted">
                    <p>No data to display</p>
                  </div>
                )}
              </div> 
            </div>
          </div>     
        </div>
    </div>
  )
};

export default SummaryView;
