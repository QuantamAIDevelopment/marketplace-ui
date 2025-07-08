import React from 'react';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';
import TestmonialExtractor from '../components/workflows/TestmonialExtractor';

const TestmonialExtractorPage = () => {
  return (
    <PageRevealWrapper
      heading="AI Testmonial Extractor Agent"
      description="Extract testimonials, sentiment, tags, and product from marketing feedback files."
    >
      <TestmonialExtractor />
    </PageRevealWrapper>
  );
};

export default TestmonialExtractorPage;
