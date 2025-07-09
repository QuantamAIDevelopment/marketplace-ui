import axios from 'axios';

const API_BASE_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook';

export const startResearch = async (topic) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/research-start`, null, {
      params: {
        Tpoic: topic // Note: This matches the workflow parameter name
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error starting research:', error);
    throw error;
  }
}; 