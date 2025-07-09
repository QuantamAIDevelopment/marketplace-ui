import axios from 'axios';

const API_BASE_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook';

export const uploadOnBoardingODS = (file) => {
  const formData = new FormData();
  formData.append('ods', file);
  return axios.post(`${API_BASE_URL}/d4c5fd15-5d71-4a4c-9b84-14e0949a75c5`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(res => res.data);
}; 