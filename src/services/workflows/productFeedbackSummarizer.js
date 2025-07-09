import axios from 'axios';

const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/product-feedback-trigger';

export const triggerProductFeedbackSummarizer = async (feedbackArray) => {
  try {
    const response = await axios.post(API_URL, feedbackArray, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error triggering product feedback summarizer workflow:', error);
    throw error;
  }
}; 