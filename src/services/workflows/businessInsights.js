import axios from 'axios';

const API_URL = 'http://localhost:5678/webhook/sales';

export const triggerBusinessInsightsWorkflow = async (file) => {
  const formData = new FormData();
  formData.append('sales', file);

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error triggering business insights workflow:', error);
    throw error;
  }
}; 