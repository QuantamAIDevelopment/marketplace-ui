import axios from 'axios';

const API_BASE_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook';

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

export const submitAnswer = (id, user_answer) => {
  const formData = new FormData();
  formData.append('id', id);
  formData.append('user_answer', user_answer);
  return handleRequest(`submit-answer`, formData);
};

export const getTopics = async () => {
  try {
    const response = await axios.get('https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/topics');
    return response.data;
  } catch (error) {
    console.error('Error fetching topics:', error);
    throw error;
  }
}; 