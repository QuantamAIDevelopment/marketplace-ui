import axios from 'axios';

const API_BASE_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook';

const handleRequest = async (endpoint, formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error triggering workflow for ${endpoint}:`, error);
    throw error;
  }
};

export const uploadLeaveReminderFile = (file) => {
  const formData = new FormData();
  formData.append('xlsx', file);
  return handleRequest('c21ff5b7-64e9-465c-aa20-77a5501a67f3', formData);
}; 