import axios from 'axios';

const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/bi-insights';

export const triggerMetricsBusinessAnalyticsWorkflow = async (files) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('quarterly', file);
  });

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error triggering metrics business analytics workflow:', error);
    throw error;
  }
}; 