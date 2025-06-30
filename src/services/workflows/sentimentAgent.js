// Service for Sentiment Agent AI Workflow
// Handles API requests to the sentiment agent backend

import axios from 'axios';

const BASE_URL = 'http://localhost:5678';

/**
 * Submit customer feedback for sentiment analysis
 * @param {Object} data - { name, mail, message, endpoint }
 * @returns {Promise<string>} - The sentiment report as plain text
 */
export async function submitSentimentFeedback({ name, mail, message, endpoint = '/webhook/siri' }) {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('mail', mail);
  formData.append('message', message);

  const response = await axios.post(`${BASE_URL}${endpoint}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}
