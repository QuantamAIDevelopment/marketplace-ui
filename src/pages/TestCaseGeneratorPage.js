import React from 'react';
import TestGenerator from '../components/workflows/TestGenerator';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';

const TestCaseGeneratorPage = () => {
  return (
    <PageRevealWrapper
      heading="AI Assistant: Test Case Generator"
      description="Transform feature specs into structured, ready-to-use QA test cases. This AI-powered assistant ingests your requirements, understands the context, and outputs detailed test cases for manual or automated QA. Built for QA engineers, developers, and product teams, it reduces manual effort, improves coverage, and adapts to changing requirements."
      details={
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-blue-700 mb-2">Features</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Multi-source Input: Accepts Google Doc IDs and manual entries via webhooks.</li>
              <li>LLM-Powered Analysis: Extracts title, description, user stories, and acceptance criteria.</li>
              <li>Auto Test Case Generation: Outputs structured test cases with steps, expected results, and tags.</li>
              <li>Positive & Negative Coverage: Ensures both positive and negative scenarios are included.</li>
              <li>Spreadsheet & Email Integration: Logs results to Google Sheets and sends via Gmail.</li>
              <li>Manual & Automated QA: Supports both manual review and export for automation frameworks.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-purple-700 mb-2">Example Use Cases</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>QA Teams: Instantly generate test cases from feature specs for new releases.</li>
              <li>Developers: Validate acceptance criteria and edge cases before coding.</li>
              <li>Product Managers: Ensure requirements are testable and complete.</li>
              <li>Agile Teams: Speed up sprint planning and QA handoff with ready-made test cases.</li>
              <li>Automation Engineers: Export structured cases for use in test automation tools.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-orange-600 mb-2 flex items-center"><span className="mr-2">⚡</span>Why This Stands Out</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Instantly transforms requirements into actionable test cases, saving hours of manual work.</li>
              <li>Ensures comprehensive coverage, including edge and negative scenarios.</li>
              <li>Integrates with your existing QA workflow (Google Sheets, email, automation tools).</li>
              <li>Reduces human error and increases test reliability.</li>
              <li>Adaptable to changing requirements and agile processes.</li>
            </ul>
          </div>
        </div>
      }
    >
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mx-auto mt-8">
        <TestGenerator />
      </div>
    </PageRevealWrapper>
  );
};

export default TestCaseGeneratorPage;
