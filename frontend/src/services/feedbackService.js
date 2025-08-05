import API_CONFIG from '../config/api';

export const submitFeedback = async (feedbackData) => {
  // Generate a simple CSRF token (in production, this should come from the server)
  const csrfToken = sessionStorage.getItem('csrfToken') || 'default-token';
  
  const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.FEEDBACK}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
    },
    body: JSON.stringify(feedbackData),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Failed to submit feedback (${response.status}): ${errorData}`);
  }

  return response.json();
};