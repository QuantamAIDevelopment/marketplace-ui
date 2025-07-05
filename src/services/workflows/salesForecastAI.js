import axios from 'axios';

const API_URL = 'http://localhost:5678/webhook/leads';

export const triggerSalesForecastAIWorkflow = async (pipelineFile, historicalFile) => {
  const formData = new FormData();
  formData.append('pipeline', pipelineFile);
  formData.append('historical', historicalFile);

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error triggering SalesForecast AI workflow:', error);
    throw error;
  }
}; 