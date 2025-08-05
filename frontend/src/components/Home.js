import React, { useState } from 'react';
import { submitFeedback } from '../services/feedbackService';
import { FormInput, RadioGroup, TextArea } from './FormComponents';

const initialFormState = {
  u_fname: '',
  u_lastname: '',
  u_id: '',
  u_email: '',
  u_frequency: '',
  u_suggestions: '',
  u_satisfaction: '',
  u_issues_faced: '',
  u_recommendation: '',
  u_used_feature: ''
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
    if (!formData.u_frequency) newErrors.u_frequency = 'This field is required';
    if (!formData.u_suggestions) newErrors.u_suggestions = 'This field is required';
    if (!formData.u_satisfaction) newErrors.u_satisfaction = 'This field is required';
    if (!formData.u_issues_faced) newErrors.u_issues_faced = 'This field is required';
    if (!formData.u_recommendation) newErrors.u_recommendation = 'This field is required';
    if (!formData.u_used_feature) newErrors.u_used_feature = 'This field is required';
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
        alert('Error submitting feedback. Please try again.');
      }
    } else {
      setErrors(newErrors);
    }
  };

  const frequencyOptions = [
    { value: '1', label: 'Daily' },
    { value: '2', label: 'Weekly' },
    { value: '3', label: 'Monthly' },
    { value: '4', label: 'Rarely' },
    { value: '5', label: 'First time' },
    { value: '6', label: 'Never' }
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
          <h5 className='title'>Customer Feedback Survey</h5>
          <div className='text-secondary'> <small>This is sample customer feedback form for TICL project </small> </div>
          <div className='mb-3 text-secondary'> <small>Hi, Sentu. When you submit this form, the owner will see your name and email address.</small> </div>
          
          <form onSubmit={handleSubmit}>
            <FormInput
              label="Please enter your first name :"
              name="u_fname"
              value={formData.u_fname}
              onChange={handleChange}
            />

            <FormInput
              label="Please enter your last name :"
              name="u_lastname"
              value={formData.u_lastname}
              onChange={handleChange}
            />

            <FormInput
              label="Please enter your User Id : "
              name="u_id"
              value={formData.u_id}
              onChange={handleChange}
              type="number"
            />

            <FormInput
              label="Please enter your Email : "
              name="u_email"
              type="email"
              value={formData.u_email}
              onChange={handleChange}
            />


            <h5 className='title mb-3'>Take Survey</h5>

            <RadioGroup
              label="1. How frequently do you use the portal?"
              name="u_frequency"
              options={frequencyOptions}
              value={formData.u_frequency}
              onChange={handleChange}
              error={errors.u_frequency}
            />           

            <RadioGroup
              label="2. Are you satisfied with this portal overall? *"
              name="u_satisfaction"
              options={satisfactionOptions}
              value={formData.u_satisfaction}
              onChange={handleChange}
              error={errors.u_satisfaction}
            />           

            <RadioGroup
              label="3. Will you recommend this portal to your colleagues? *"
              name="u_recommendation"
              options={recommendOptions}
              value={formData.u_recommendation}
              onChange={handleChange}
              error={errors.u_recommendation}
            />

            <RadioGroup
              label="4. What is your most used feature? *"
              name="u_used_feature"
              options={featureOptions}
              value={formData.u_used_feature}
              onChange={handleChange}
              error={errors.u_used_feature}
            />
            

            <TextArea
              label="5. Did you face any issues while using the portal? *"
              name="u_issues_faced"
              value={formData.u_issues_faced}
              onChange={handleChange}
              error={errors.u_issues_faced}
            />

            <TextArea
              label="6. Do you have any suggestions to improve our portal features? *"
              name="u_suggestions"
              value={formData.u_suggestions}
              onChange={handleChange}
              error={errors.u_suggestions}
            />

            <div className="mb-3 text-start">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;

