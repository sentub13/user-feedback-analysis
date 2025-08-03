import API_CONFIG from '../config/api';

export const submitFeedback = async (feedbackData) => {
  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.FEEDBACK}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(feedbackData),
  });

  if (!response.ok) {
    throw new Error('Failed to submit feedback');
  }

  return response.json();
};