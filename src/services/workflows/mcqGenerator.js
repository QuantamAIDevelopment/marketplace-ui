import axios from 'axios';

const API_BASE_URL = 'http://localhost:5678/webhook';

const handleRequest = async (endpoint, formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error triggering workflow for ${endpoint}:`, error);
    throw error;
  }
};

export const uploadFileAndGetMCQs = (topic, file) => {
  const formData = new FormData();
  formData.append('topic', topic);
  if (file) {
    formData.append('file', file);
  }
  return handleRequest('upload-file', formData);
};

export const getWebMCQs = (topic) => {
  const formData = new FormData();
  formData.append('topic', topic);
  return handleRequest('web-mcq', formData);
};

export const startQuiz = (topic) => {
  const formData = new FormData();
  formData.append('topic', topic);
  return handleRequest('start-quiz', formData);
};

export const submitAnswer = (question_id, user_answer) => {
  const formData = new FormData();
  formData.append('question_id', question_id);
  formData.append('user_answer', user_answer);
  // The endpoint in the curl example seems to have query params, but the body is form-data.
  // Replicating the user's curl command structure. The form data might be what the webhook expects.
  return handleRequest(`submit-answer`, formData);
};

export const getTopics = async () => {
  try {
    const response = await axios.get('http://localhost:5678/webhook/topics');
    return response.data;
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw error;
  }
}; 