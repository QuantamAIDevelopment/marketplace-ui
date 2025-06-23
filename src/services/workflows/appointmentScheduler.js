import axios from 'axios';

const API_URL = 'http://localhost:5678/webhook/appointment';

export const bookAppointment = async (data) => {
  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error booking appointment:', error);
    throw error;
  }
}; 