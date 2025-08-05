import React, { useState } from 'react';
import { submitFeedback } from '../services/feedbackService';
import { FormInput, RadioGroup, TextArea } from './FormComponents';

const initialFormState = {
  firstName: '',
  lastName: '',
  userId: '',
  email: '',
  frequency: '',
  suggestions: '',
  satisfaction: '',
  issues: '', 
  recommend: '',
  mostUsedFeature: ''
};

function Contact() {
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
    if (!formData.frequency) newErrors.frequency = 'This field is required';
    if (!formData.suggestions) newErrors.suggestions = 'This field is required';
    if (!formData.satisfaction) newErrors.satisfaction = 'This field is required';
    if (!formData.issues) newErrors.issues = 'This field is required';
    if (!formData.recommend) newErrors.recommend = 'This field is required';
    if (!formData.mostUsedFeature) newErrors.mostUsedFeature = 'This field is required';
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
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'rarely', label: 'Rarely' },
    { value: 'firsttime', label: 'First time' },
    { value: 'never', label: 'Never' }
  ];

  const satisfactionOptions = [
    { value: 'verysatisfied', label: 'Very Satisfied' },
    { value: 'satisfied', label: 'Satisfied' },
    { value: 'undecided', label: 'Undecided' },
    { value: 'unsatisfied', label: 'Unsatisfied' },
    { value: 'veryunsatisfied', label: 'Very Unsatisfied' }
  ];

  const recommendOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ];

  const featureOptions = [
    { value: 'dashboard', label: 'Dashboard' },
    { value: 'reports', label: 'Reports' },
    { value: 'analytics', label: 'Analytics' }
  ];

  return (
    <div className="row formAreaBg">
      <div className="col-md-8 offset-md-2">
        <div className='formarea'>
          <h4 className='text-center'>User Survey</h4>
          <form onSubmit={handleSubmit}>
            <FormInput
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />

            <FormInput
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />

            <FormInput
              label="User ID"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
            />

            <FormInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />

            <RadioGroup
              label="1. How frequently do you use the portal? *"
              name="frequency"
              options={frequencyOptions}
              value={formData.frequency}
              onChange={handleChange}
              error={errors.frequency}
            />

            <TextArea
              label="2. Do you have any suggestions to improve our portal features? *"
              name="suggestions"
              value={formData.suggestions}
              onChange={handleChange}
              error={errors.suggestions}
            />

            <RadioGroup
              label="3. Are you satisfied with this portal overall? *"
              name="satisfaction"
              options={satisfactionOptions}
              value={formData.satisfaction}
              onChange={handleChange}
              error={errors.satisfaction}
            />

            <TextArea
              label="4. Did you face any issues while using the portal? *"
              name="issues"
              value={formData.issues}
              onChange={handleChange}
              error={errors.issues}
            />

            <RadioGroup
              label="5. Will you recommend this portal to your colleagues? *"
              name="recommend"
              options={recommendOptions}
              value={formData.recommend}
              onChange={handleChange}
              error={errors.recommend}
            />

            <RadioGroup
              label="6. What is your most used feature? *"
              name="mostUsedFeature"
              options={featureOptions}
              value={formData.mostUsedFeature}
              onChange={handleChange}
              error={errors.mostUsedFeature}
            />

            <div className="mb-3 text-end">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>    
  );
}

export default Contact;