import api from '../api';

export const getEncryptionStatus = async () => {
  try {
    const response = await api.get('/payslips/encryption');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const retryEncryption = async (payslipId) => {
  try {
    const response = await api.post(`/payslips/encryption/${payslipId}/retry`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const downloadEncryptedPayslip = async (payslipId) => {
  try {
    const response = await api.get(`/payslips/encryption/${payslipId}/download`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEncryptionHistory = async (payslipId) => {
  try {
    const response = await api.get(`/payslips/encryption/${payslipId}/history`);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 