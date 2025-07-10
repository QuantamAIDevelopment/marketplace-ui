import axios from 'axios';

const API_BASE_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook';

export const uploadInventoryAndGetForecast = async (file) => {
  const formData = new FormData();
  formData.append('csv', file);
  try {
    const response = await axios.post(`${API_BASE_URL}/inventory`, formData, {
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