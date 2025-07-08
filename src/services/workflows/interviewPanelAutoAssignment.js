import axios from 'axios';

const API_BASE_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook';

export const assignInterview = async (candidateData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/assign-interview`, candidateData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error assigning interview:', error);
    throw error;
  }
}; 