import axios from 'axios';

const API_BASE_URL = 'http://localhost:5678/webhook';

export const uploadInventoryAndGetForecast = async (file) => {
  const formData = new FormData();
  formData.append('csv', file);
  try {
    const response = await axios.post(`${API_BASE_URL}/6df2dcad-bf89-4b74-b51c-7ad2de6aed74`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error triggering InventoryPredictAI workflow:', error);
    throw error;
  }
}; 