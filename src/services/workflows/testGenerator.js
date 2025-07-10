import axios from 'axios';

const API_BASE_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook';

export const generateTestCases = (docTitle, author, docId) => {
  const formData = new FormData();
  formData.append('doc title', docTitle);
  formData.append('author', author);
  formData.append('doc id', docId);
  return axios.post(`${API_BASE_URL}/doc-input`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(res => res.data);
}; 