import axios from 'axios';

const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/performance-summary';

export const triggerPerformanceReviewSummary = async (reviewsArray) => {
  try {
    const response = await axios.post(API_URL, { reviews: reviewsArray }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error triggering performance review summary workflow:', error);
    throw error;
  }
}; 