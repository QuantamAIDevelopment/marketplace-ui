import React from 'react';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';
import TestmonialExtractor from '../components/workflows/TestmonialExtractor';

const TestmonialExtractorPage = () => {
  return (
    <PageRevealWrapper
      heading="AI Testmonial Extractor Agent"
      description="Extract testimonials, sentiment, tags, and product from marketing feedback files."
      details={
        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
          <li>Upload marketing feedback files (CSV, Excel, or text).</li>
          <li>Automatically extract testimonials, sentiment, tags, and product mentions.</li>
          <li>See structured results for easy review and reporting.</li>
          <li>Great for marketing, product teams, and customer success analysis.</li>
        </ul>
      }
    >
      <TestmonialExtractor />
    </PageRevealWrapper>
  );
};

export default TestmonialExtractorPage;
