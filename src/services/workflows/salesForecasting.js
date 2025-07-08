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
    console.error(`Error triggering sales forecasting workflow for ${endpoint}:`, error);
    throw error;
  }
};

export const generateSalesForecast = (pipelineFile, historicalFile) => {
  const formData = new FormData();
  if (pipelineFile) {
    formData.append('pipeline', pipelineFile);
  }
  if (historicalFile) {
    formData.append('historical', historicalFile);
  }
  return handleRequest('leads', formData);
}; 