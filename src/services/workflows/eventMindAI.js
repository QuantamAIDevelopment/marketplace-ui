import axios from 'axios';

const API_URL = 'http://localhost:5678/webhook/Plan';

export const triggerEventMindAI = async (payload) => {
  try {
    const response = await axios.post(API_URL, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error triggering EventMind AI workflow:', error);
    throw error;
  }
}; 