import api from '../api';

export const getProcessingStatus = async () => {
  try {
    const response = await api.get('/attachments/processing');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const retryProcessing = async (attachmentId) => {
  try {
    const response = await api.post(`/attachments/processing/${attachmentId}/retry`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const downloadProcessedAttachment = async (attachmentId) => {
  try {
    const response = await api.get(`/attachments/processing/${attachmentId}/download`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProcessingHistory = async (attachmentId) => {
  try {
    const response = await api.get(`/attachments/processing/${attachmentId}/history`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadAttachment = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/attachments/processing/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}; 