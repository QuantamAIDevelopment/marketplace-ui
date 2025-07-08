import api from '../api';

export const getExtractionStatus = async () => {
  try {
    const response = await api.get('/resumes/extraction');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const retryExtraction = async (resumeId) => {
  try {
    const response = await api.post(`/resumes/extraction/${resumeId}/retry`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadResume = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/resumes/extraction/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getExtractedProfile = async (resumeId) => {
  try {
    const response = await api.get(`/resumes/extraction/${resumeId}/profile`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateExtractedProfile = async (resumeId, profileData) => {
  try {
    const response = await api.put(`/resumes/extraction/${resumeId}/profile`, profileData);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 