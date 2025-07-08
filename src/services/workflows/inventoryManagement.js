import axios from 'axios';

const API_URL = 'http://localhost:5678/webhook/inventory-check';

export const triggerInventoryManagementWorkflow = async (data) => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error triggering inventory management workflow:', error);
    throw error;
  }
}; 