import React from 'react';
import BarChart from './BarChart';
import TrendChart from './TrendChart';
import OverallChart from './OverallChart';

const SummaryView = ({ feedbackData = [], filters = {} }) => {

  return (
    <div>
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card card-box1">
              <div className="card-header title2 rounded-0">
                <h6 className="mb-0"> Total survey submitted out of Toal Initiated</h6>
              </div>
              <div className="card-body">
                  <div className='fs-4 font-bold'>
                      100 / 150
                  </div>
              </div>
            </div>
          </div>


          <div className="col-md-4">
            <div className="card card-box1">
              <div className="card-header title2 rounded-0">
                <h6 className="mb-0">Survey Completion Rate</h6>
              </div>
              <div className="card-body bg-white">
                <div className='d-flex align-items-center gap-3'>
                  <div>
                    <span className="fs-4 fw-bold">67%</span>
                  </div>
                  <div className="progress flex-grow-1" style={{height: '12px'}}>
                    <div className="progress-bar bg-success" role="progressbar" style={{width: '67%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card card-box1">
              <div className="card-header title2 rounded-0">
                <h6 className="mb-0">Average Experience Rating</h6>
              </div>
              <div className="card-body">
                <div className="d-flex align-items-center gap-2">
                  <span className="fs-4 fw-bold">4.3</span>
                  <div className="d-flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} className={`text-warning fs-5 ${star <= 4.3 ? 'fas' : 'far'} fa-star`}></span>
                    ))}
                  </div>
                </div>
              </div> 
            </div>
          </div>     
        </div>

        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card card-box1">
              <div className="card-header title2 rounded-0">
                <h6 className="mb-0">Feedback Summary - {filters.u_feedback_for || 'All Groups'}</h6>
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
            <div className="card card-box1">
              <div className="card-header title2 rounded-0">
                <h6 className="mb-0">Feedback Trends - {filters.u_feedback_for || 'All Groups'}</h6>
              </div>
              <div className="card-body bg-white">
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
            <div className="card card-box1">
              <div className="card-header title2 rounded-0">
                <h6 className="mb-0">Feedback Satisfaction Distribution </h6>
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
