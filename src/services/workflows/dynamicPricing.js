import axios from 'axios';

const API_URL = 'http://localhost:5678/webhook/dynamic-pricing';
const DYNAMIC_PRICING_AGENT_API_URL = 'http://localhost:5678/webhook/Dynamic_Post';

export const triggerDynamicPricingWorkflow = async (file) => {
  const formData = new FormData();
  formData.append('prices-list', file);

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error triggering dynamic pricing workflow:', error);
    throw error;
  }
};

export const triggerDynamicPricingAgentWorkflow = async (file) => {
  const formData = new FormData();
  formData.append('dynamic', file);

  try {
    const response = await axios.post(DYNAMIC_PRICING_AGENT_API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error triggering dynamic pricing agent workflow:', error);
    throw error;
  }
}; 