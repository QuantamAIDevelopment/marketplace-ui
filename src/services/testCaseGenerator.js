import axios from 'axios';

const API_URL = 'https://bhavithareddy.app.n8n.cloud/webhook/doc-input';

export const generateTestCase = async (form) => {
  const response = await axios.post(API_URL, form, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};
