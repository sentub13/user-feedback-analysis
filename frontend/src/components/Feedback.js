import React, { useState } from 'react';
import { submitFeedback } from '../services/feedbackService';

function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    easyToUse: '',
    helpfulSupport: '',
    foundWhatNeeded: '', 
    useAgain: '',
    recommend: '',
    comments: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.easyToUse) newErrors.easyToUse = 'This field is required';
    if (!formData.helpfulSupport) newErrors.helpfulSupport = 'This field is required';
    if (!formData.foundWhatNeeded) newErrors.foundWhatNeeded = 'This field is required';
    if (!formData.useAgain) newErrors.useAgain = 'This field is required';
    if (!formData.recommend) newErrors.recommend = 'This field is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      try {
        await submitFeedback(formData);
        alert('Feedback submitted successfully!');
        setFormData({
          name: '',
          email: '',
          easyToUse: '',
          helpfulSupport: '',
          foundWhatNeeded: '',
          useAgain: '',
          recommend: '',
          comments: ''
        });
      } catch (error) {
        alert('Error submitting feedback. Please try again.');
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="row">
      <div className="col-md-8">
        <h1>Feedback Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">1. Did you find our service easy to use? *</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  name="easyToUse"
                  id="easyToUse-yes"
                  value="yes"
                  className="form-check-input"
                  checked={formData.easyToUse === 'yes'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="easyToUse-yes">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  name="easyToUse"
                  id="easyToUse-no"
                  value="no"
                  className="form-check-input"
                  checked={formData.easyToUse === 'no'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="easyToUse-no">No</label>
              </div>
            </div>
            {errors.easyToUse && <div className="text-danger">{errors.easyToUse}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">2. Was the support team helpful? *</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  name="helpfulSupport"
                  id="helpfulSupport-yes"
                  value="yes"
                  className="form-check-input"
                  checked={formData.helpfulSupport === 'yes'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="helpfulSupport-yes">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  name="helpfulSupport"
                  id="helpfulSupport-no"
                  value="no"
                  className="form-check-input"
                  checked={formData.helpfulSupport === 'no'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="helpfulSupport-no">No</label>
              </div>
            </div>
            {errors.helpfulSupport && <div className="text-danger">{errors.helpfulSupport}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">3. Did you find what you were looking for? *</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  name="foundWhatNeeded"
                  id="foundWhatNeeded-yes"
                  value="yes"
                  className="form-check-input"
                  checked={formData.foundWhatNeeded === 'yes'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="foundWhatNeeded-yes">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  name="foundWhatNeeded"
                  id="foundWhatNeeded-no"
                  value="no"
                  className="form-check-input"
                  checked={formData.foundWhatNeeded === 'no'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="foundWhatNeeded-no">No</label>
              </div>
            </div>
            {errors.foundWhatNeeded && <div className="text-danger">{errors.foundWhatNeeded}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">4. Would you use our service again? *</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  name="useAgain"
                  id="useAgain-yes"
                  value="yes"
                  className="form-check-input"
                  checked={formData.useAgain === 'yes'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="useAgain-yes">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  name="useAgain"
                  id="useAgain-no"
                  value="no"
                  className="form-check-input"
                  checked={formData.useAgain === 'no'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="useAgain-no">No</label>
              </div>
            </div>
            {errors.useAgain && <div className="text-danger">{errors.useAgain}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">5. Would you recommend us to others? *</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  name="recommend"
                  id="recommend-yes"
                  value="yes"
                  className="form-check-input"
                  checked={formData.recommend === 'yes'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="recommend-yes">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  name="recommend"
                  id="recommend-no"
                  value="no"
                  className="form-check-input"
                  checked={formData.recommend === 'no'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="recommend-no">No</label>
              </div>
            </div>
            {errors.recommend && <div className="text-danger">{errors.recommend}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Additional Comments</label>
            <textarea
              name="comments"
              className="form-control"
              rows="3"
              value={formData.comments}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;
