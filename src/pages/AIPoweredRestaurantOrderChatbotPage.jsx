import React from 'react';
import PageRevealWrapper from '../components/PageRevealWrapper';
import AIPoweredRestaurantOrderChatbot from '../components/workflows/AIPoweredRestaurantOrderChatbot';

const AIPoweredRestaurantOrderChatbotPage = () => (
  <PageRevealWrapper
    heading="AI-Powered Restaurant Order Chatbot"
    description="Chat with our AI assistant to place your restaurant order in natural language. The AI will understand, confirm, and summarize your order for you!"
  >
    <div className="w-full max-w-2xl mx-auto">
      <AIPoweredRestaurantOrderChatbot />
    </div>
  </PageRevealWrapper>
);

export default AIPoweredRestaurantOrderChatbotPage; 