import React from 'react';
import CustomerSupportAgent from '../components/workflows/CustomerSupportAgent';

const CustomerSupportAgentPage = () => {
  return (
    <div className="min-h-screen bg-anthropic-light font-sans flex flex-col items-center justify-center">
      <CustomerSupportAgent />
    </div>
  );
};

export default CustomerSupportAgentPage;
