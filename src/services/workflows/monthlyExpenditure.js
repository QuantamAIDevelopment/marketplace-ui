import axios from 'axios';

const API_BASE_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook';

export const submitManualBill = async ({ amount, merchant, transaction }) => {
  // The backend expects: amount, paid to, date
  return axios.post(`${API_BASE_URL}/c411e19d-03d4-4c49-9e86-10a44edf5f16`, {
    amount,
    "paid to": merchant,
    date: transaction,
  });
};

export const uploadBillFile = async (file) => {
  const formData = new FormData();
  formData.append('bill', file);

  try {
    const response = await axios.post('http://localhost:5678/webhook/upload-bill', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading bill file:', error);
    throw error;
  }
};

export const chatExpenditure = async (message) => {
  const formData = new FormData();
  formData.append('message', message);

  try {
    const response = await axios.post('http://localhost:5678/webhook/chat', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error chatting with expenditure bot:', error);
    throw error;
  }
};

export const uploadMonthlyExpenditureFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${API_BASE_URL}/ee0c9efc-9d9b-4af0-af24-f7c147e52ee7`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then(res => res.data);
}; 