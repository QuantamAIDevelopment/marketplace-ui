import axios from 'axios';

const API_BASE_URL = 'https://bhanubhavani.app.n8n.cloud/webhook';

export const uploadInvoiceAndGetSummary = async (file) => {
  try {
    const formData = new FormData();
    formData.append('invoice', file);
    const response = await axios.post(`${API_BASE_URL}/invoice%20summary`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    }
    throw new Error('Failed to process invoice.');
  }
};
