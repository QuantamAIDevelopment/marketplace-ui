import axios from 'axios';

const API_URL = 'http://localhost:5678/webhook/fraud-detection';

export const triggerFraudDetectionWorkflow = async (file) => {
  const formData = new FormData();
  formData.append('fraud-list', file);

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error triggering fraud detection workflow:', error);
    throw error;
  }
}; 