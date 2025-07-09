import api from '../api';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';

export const getDocumentStatus = async () => {
  try {
    const response = await api.get('/documents/status');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendReminder = async (documentId) => {
  try {
    const response = await api.post(`/documents/${documentId}/remind`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDocumentStatus = async (documentId, status) => {
  try {
    const response = await api.put(`/documents/${documentId}/status`, { status });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadDocument = async (documentId, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post(`/documents/${documentId}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}; 