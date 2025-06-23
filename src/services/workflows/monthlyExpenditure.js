import axios from 'axios';

export const submitManualBill = async ({ amount, merchant, transaction }) => {
  const formData = new FormData();
  formData.append('amount', amount);
  formData.append('merchant', merchant);
  formData.append('transaction', transaction);

  try {
    const response = await axios.post('http://localhost:5678/webhook/bill', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting manual bill:', error);
    throw error;
  }
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