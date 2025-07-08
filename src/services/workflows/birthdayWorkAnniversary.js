import api from '../api';

export const getCelebrationsData = async (startDate, endDate) => {
  try {
    const params = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    
    const response = await api.get('/celebrations', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendCelebrationWish = async (celebrationId, message) => {
  try {
    const response = await api.post(`/celebrations/${celebrationId}/wish`, { message });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const scheduleCelebrationReminder = async (celebrationId, reminderDate) => {
  try {
    const response = await api.post(`/celebrations/${celebrationId}/reminder`, { reminderDate });
    return response.data;
  } catch (error) {
    throw error;
  }
}; 