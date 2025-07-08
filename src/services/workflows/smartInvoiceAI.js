import axios from 'axios';

const API_BASE_URL = 'http://localhost:5678/webhook';

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

export const uploadInvoiceAndGetSummary = (file) => {
  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  }
  return handleRequest('smartinvoice-upload', formData);
};

export const getInvoiceStatus = (invoiceNumber) => {
  const formData = new FormData();
  formData.append('invoiceNumber', invoiceNumber);
  return handleRequest('smartinvoice-status', formData);
};

export const getVendors = () => {
  return axios.get(`${API_BASE_URL}/smartinvoice-vendors`).then(res => res.data);
};
