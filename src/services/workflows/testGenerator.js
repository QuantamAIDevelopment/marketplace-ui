import axios from 'axios';

const API_BASE_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/doc-input';

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

export const generateTestCases = (docTitle, author, docId) => {
  const formData = new FormData();
  formData.append('doc title', docTitle);
  formData.append('author', author);
  formData.append('doc id', docId);
  return handleRequest('doc-input', formData);
}; 