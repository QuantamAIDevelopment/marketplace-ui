import axios from 'axios';

const API_BASE_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook';

export const uploadPdfAndGetSummary = async (file, email) => {
  const formData = new FormData();
  formData.append('pdf', file);
  if (email) {
    formData.append('email', email);
  }
  const response = await axios.post(`${API_BASE_URL}/document_upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
