import axios from 'axios';

const API_BASE_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/Dynamic_Post';

export const uploadDynamicPricingCSV = (file) => {
  const formData = new FormData();
  if (file) {
    formData.append('dynamic', file);
  }
  return axios.post(API_BASE_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(res => res.data).catch(error => {
    console.error('Error uploading dynamic pricing CSV:', error);
    throw error;
  });
}; 