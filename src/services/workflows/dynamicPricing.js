import axios from 'axios';

const API_URL = 'http://localhost:5678/webhook/dynamic-pricing';

export const triggerDynamicPricingWorkflow = async (file) => {
  const formData = new FormData();
  formData.append('prices-list', file);

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error triggering dynamic pricing workflow:', error);
    throw error;
  }
}; 