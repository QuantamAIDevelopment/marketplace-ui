import React from 'react';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';
import TestGenerator from '../components/workflows/TestGenerator';

const TestGeneratorPage = () => (
  <PageRevealWrapper
    heading="AI Test Case Generator"
    description="Automatically generate structured test cases from your feature specification documents using AI. Enter your document details and get ready-to-use test cases for QA and development."
    details={
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-purple-700 mb-2">Features</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Accepts Google Doc title, author, and document ID as input.</li>
            <li>AI-powered extraction and test case generation from feature specs.</li>
            <li>Structured output: Test ID, Title, Type, Steps, Expected Results.</li>
            <li>Instant, ready-to-use for QA, automation, and documentation.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-blue-700 mb-2">Example Use Cases</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>QA Engineers: Instantly generate test cases for new features.</li>
            <li>Developers: Validate requirements and acceptance criteria.</li>
            <li>Product Managers: Ensure coverage of user stories and edge cases.</li>
          </ul>
        </div>
      </div>
    }
  >
    <TestGenerator />
  </PageRevealWrapper>
);

export default TestGeneratorPage; 