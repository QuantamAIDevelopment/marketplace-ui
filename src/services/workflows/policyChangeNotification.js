import api from '../api';

export const getPolicyNotifications = async () => {
  try {
    const response = await api.get('/policies/notifications');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const acknowledgePolicy = async (policyId) => {
  try {
    const response = await api.post(`/policies/notifications/${policyId}/acknowledge`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPolicyDetails = async (policyId) => {
  try {
    const response = await api.get(`/policies/notifications/${policyId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAcknowledgmentHistory = async (policyId) => {
  try {
    const response = await api.get(`/policies/notifications/${policyId}/acknowledgments`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendReminder = async (policyId) => {
  try {
    const response = await api.post(`/policies/notifications/${policyId}/remind`);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 