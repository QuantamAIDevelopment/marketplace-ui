import React from 'react';
import SentimentAgent from '../components/workflows/SentimentAgent';
import PageRevealWrapper from '../components/PageRevealWrapper';

const SentimentAgentPage = () => {
  return (
    <PageRevealWrapper>
      <SentimentAgent />
    </PageRevealWrapper>
  );
};

export default SentimentAgentPage;
