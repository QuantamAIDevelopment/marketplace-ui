import api from '../api';

export const getLeavesClassifierData = async () => {
  try {
    const response = await api.get('/leaves/classifier');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const approveLeave = async (leaveId) => {
  try {
    const response = await api.post(`/leaves/classifier/${leaveId}/approve`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const rejectLeave = async (leaveId, reason) => {
  try {
    const response = await api.post(`/leaves/classifier/${leaveId}/reject`, { reason });
    return response.data;
  } catch (error) {
    throw error;
  }
}; 