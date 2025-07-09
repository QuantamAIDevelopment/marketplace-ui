import axios from 'axios';

const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/fraud3';

export const uploadFraudDataAndGetResults = async (file) => {
  const formData = new FormData();
  formData.append('fraud data', file);
  const response = await axios.post(API_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
}; 