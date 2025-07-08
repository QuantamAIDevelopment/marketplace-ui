import api from '../api';

export const getSyncStatus = async () => {
  try {
    const response = await api.get('/candidates/sync');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const retryFailedSync = async (profileId) => {
  try {
    const response = await api.post(`/candidates/sync/${profileId}/retry`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forceSync = async (profileId) => {
  try {
    const response = await api.post(`/candidates/sync/${profileId}/force`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSyncHistory = async (profileId) => {
  try {
    const response = await api.get(`/candidates/sync/${profileId}/history`);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 