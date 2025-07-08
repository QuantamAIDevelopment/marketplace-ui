import React from 'react';
import PageRevealWrapper from '../components/PageRevealWrapper';
import AIPoweredBookPriceTracker from '../components/workflows/AI_Powered_Book_Price_Tracker';

const AI_Powered_Book_Price_TrackerPage = () => {
  return (
    <PageRevealWrapper
      heading="AI-Powered Book Price Tracker"
      description="Track book prices, availability, and details using AI-powered extraction. Enter a book title, keyword, or message to get the latest price and product info. More features like price history and analytics coming soon!"
    >
      <AIPoweredBookPriceTracker />
    </PageRevealWrapper>
  );
};

export default AI_Powered_Book_Price_TrackerPage; 