import api from '../api';

export const getAbsenceData = async (startDate, endDate) => {
  try {
    const params = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    
    const response = await api.get('/absences/tracker', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addAbsence = async (absenceData) => {
  try {
    const response = await api.post('/absences/tracker', absenceData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAbsence = async (absenceId, absenceData) => {
  try {
    const response = await api.put(`/absences/tracker/${absenceId}`, absenceData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAbsence = async (absenceId) => {
  try {
    const response = await api.delete(`/absences/tracker/${absenceId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAbsenceCalendar = async (year, month) => {
  try {
    const response = await api.get('/absences/tracker/calendar', {
      params: { year, month },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}; 