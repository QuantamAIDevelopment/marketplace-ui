import axios from 'axios';

const API_BASE_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook';

export const getLeaveBalance = async ({ Subject, snippet, From, Date }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/leaves_Post`, {
      Subject,
      snippet,
      From,
      Date
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 second timeout for the workflow
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching leave balance:', error);
    if (error.response?.status === 404) {
      throw new Error('Leave balance not found for this employee. Please check the email address.');
    } else if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.');
    } else {
      throw new Error('Failed to fetch leave balance. Please check your input and try again.');
    }
  }
};

// Helper function to validate email format
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper function to format date
export const formatDate = (date) => {
  if (!date) return new Date().toLocaleDateString('en-GB');
  const d = new Date(date);
  return d.toLocaleDateString('en-GB');
}; 