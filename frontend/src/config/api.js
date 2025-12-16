const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
  ENDPOINTS: {
    FEEDBACK: process.env.REACT_APP_FEEDBACK_ENDPOINT || '/feedbacks',
    SENTIMENT_ANALYZE: '/sentimentAnalyze'
  }
};

export default API_CONFIG;