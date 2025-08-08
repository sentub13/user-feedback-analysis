import React, { useState } from 'react';
import { submitFeedback } from '../services/feedbackService';
import { FormInput, RadioGroup, TextArea } from './FormComponents';

const initialFormState = {
  u_fname: '',
  u_lastname: '',
  u_id: '',
  u_email: '',
  u_frequency: '',  
  u_satisfaction: '',
  u_recommendation: '',
  u_used_feature: '',
  u_issues_faced: '',
  u_suggestions: '',
};

function Home() {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    // Mandatory fields validation
    if (!formData.u_fname) newErrors.u_fname = 'This field is required';
    if (!formData.u_lastname) newErrors.u_lastname = 'This field is required';
    if (!formData.u_id) newErrors.u_id = 'This field is required';
    if (!formData.u_email) newErrors.u_email = 'This field is required';

    // At least one field from the rest should be filled
    const optionalFields = [
      formData.u_frequency,
      formData.u_satisfaction,
      formData.u_recommendation,
      formData.u_used_feature,
      formData.u_issues_faced,
      formData.u_suggestions
    ];

    if (!optionalFields.some(field => field !== '')) {
      newErrors.general = 'At least one survey question must be answered';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      try {
        await submitFeedback(formData);
        alert('Feedback submitted successfully!');
        setFormData(initialFormState);
      } catch (error) {
        console.error('Feedback submission error:', error);
        const errorMessage = error.message.includes('Network error') 
          ? 'Unable to connect to server. Please check your connection and try again.'
          : error.message.includes('500')
          ? 'Server error occurred. Please try again later or contact support.'
          : `Error: ${error.message}`;
        alert(errorMessage);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
  };

  const frequencyOptions = [
    { value: 'Daily', label: 'Daily' },
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Rarely', label: 'Rarely' },
    { value: 'First time', label: 'First time' },
    { value: 'Never', label: 'Never' }
  ];

  const satisfactionOptions = [
    { value: 'Very Satisfied', label: 'Very Satisfied' },
    { value: 'Satisfied', label: 'Satisfied' },
    { value: 'Undecided', label: 'Undecided' },
    { value: 'Unsatisfied', label: 'Unsatisfied' },
    { value: 'Very Unsatisfied', label: 'Very Unsatisfied' }
  ];

  const recommendOptions = [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' }
  ];

  const featureOptions = [
    { value: 'Feature-1', label: 'Feature-1' },
    { value: 'Feature-2', label: 'Feature-2' },
    { value: 'Feature-3', label: 'Feature-3' },
    { value: 'All features were helpful', label: 'All features were helpful' }
  ];

  return (
    <div className="row formAreaBg">
      <div className="col-md-8 offset-md-2">
        <div className='formarea'>
        <h5 className='title'>
          <span>Customer Feedback Survey</span>
          <i className="fas fa-redo reload" onClick={handleReset} title="Refresh form"></i>
        </h5>
          <div className='text-secondary'> <small>This is sample customer feedback form for TICL project </small> </div>
          <div className='mb-3 text-secondary'> <small>Hi, Sentu. When you submit this form, the owner will see your name and email address.</small> </div>
          
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Please enter your first name : *"
              name="u_fname"
              value={formData.u_fname}
              onChange={handleChange}
              style={{width: '200px'}}
              error={errors.u_fname}
            />

            <FormInput
              label="Please enter your last name : *"
              name="u_lastname"
              value={formData.u_lastname}
              onChange={handleChange}
              style={{width: '200px'}}
              error={errors.u_lastname}
            />

            <FormInput
              label="Please enter your User Id : *"
              name="u_id"
              value={formData.u_id}
              onChange={handleChange}
              type="number" 
              style={{width: '200px'}}
              error={errors.u_id}
            />

            <FormInput
              label="Please enter your Email : *"
              name="u_email"
              type="email"
              value={formData.u_email}
              onChange={handleChange}
              style={{width: '200px'}}
              error={errors.u_email}
            />

            <h5 className='title mb-3'>Take Survey</h5>
            {errors.general && <div className="text-danger mb-3">{errors.general}</div>}

            <RadioGroup
              label="1. How frequently do you use the portal?"
              name="u_frequency"
              options={frequencyOptions}
              value={formData.u_frequency}
              onChange={handleChange}
            />           

            <RadioGroup
              label="2. Are you satisfied with this portal overall?"
              name="u_satisfaction"
              options={satisfactionOptions}
              value={formData.u_satisfaction}
              onChange={handleChange}
            />           

            <RadioGroup
              label="3. Will you recommend this portal to your colleagues?"
              name="u_recommendation"
              options={recommendOptions}
              value={formData.u_recommendation}
              onChange={handleChange}
            />

            <RadioGroup
              label="4. What is your most used feature?"
              name="u_used_feature"
              options={featureOptions}
              value={formData.u_used_feature}
              onChange={handleChange}
            />            

            <TextArea
              label="5. Did you face any issues while using the portal?"
              name="u_issues_faced"
              value={formData.u_issues_faced}
              onChange={handleChange}
            />

            <TextArea
              label="6. Do you have any suggestions to improve our portal features?"
              name="u_suggestions"
              value={formData.u_suggestions}
              onChange={handleChange}
            />

            <div className="mb-3 text-start">
              <button type="submit" className="btn btn-primary me-2">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;

