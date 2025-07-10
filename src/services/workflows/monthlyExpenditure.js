import axios from 'axios';

// Use the proxy path for development
const BASE_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook';

// Chat Expenditure (input: text)
export const chatExpenditure = async (message) => {
  const response = await axios.post(`${BASE_URL}/chat`, message, {
    headers: { 'Content-Type': 'text/plain' },
  });
  return response.data;
};

// Manual Bill Entry (input: Amount, Paid to, Date)
export const submitManualBill = async ({ amount, merchant, transaction }) => {
  const formData = new FormData();
  formData.append('Amount', amount);
  formData.append('Paid to', merchant);
  formData.append('Date', transaction);
  const response = await axios.post(`${BASE_URL}/bill`, formData);
  return response.data;
};

// Upload Bill File (input: file)
export const uploadBillFile = async (file) => {
  const formData = new FormData();
  formData.append('', file); // API expects the file as an unnamed form field
  const response = await axios.post(`${BASE_URL}/upload-bill`, formData);
  return response.data;
}; 