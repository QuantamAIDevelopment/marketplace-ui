import axios from 'axios';

const API_BASE_URL = 'http://localhost:5678/webhook';

export const getLeavePrediction = async (file) => {
  const formData = new FormData();
  if (file) {
    formData.append('data', file);
  }
  try {
    const response = await axios.post(`${API_BASE_URL}/demo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching leave prediction:', error);
    throw error;
  }
}; 