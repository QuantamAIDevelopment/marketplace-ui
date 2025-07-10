import React from 'react';

import TestGenerator from '../components/workflows/TestGenerator';
import TestCaseGenerator from '../components/workflows/TestCaseGenerator';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';

const TestCaseGeneratorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center text-fuchsia-600 mb-4 font-display">Smart Study Assistant: MCQ Generator &amp; Revision Trainer</h1>
        <p className="text-xl text-center text-gray-700 mb-8 max-w-3xl mx-auto">
          Transform feature specs into structured, ready-to-use QA test cases—automatically and intelligently. This AI-powered assistant ingests your requirements, understands the context, and outputs detailed test cases for manual or automated QA. Built for QA engineers, developers, and product teams, it reduces manual effort, improves coverage, and adapts to changing requirements.
        </p>
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full shadow-lg px-6 py-2 flex items-center">
            <span className="font-semibold text-lg text-gray-700">AI Assistant</span>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-purple-700 mb-4 mt-8">Features</h2>
        <ul className="list-disc list-inside text-gray-700 text-lg mb-8 pl-6">
          <li>Multi-source Input: Accepts Google Doc IDs and manual entries via webhooks.</li>
          <li>LLM-Powered Analysis: Extracts title, description, user stories, and acceptance criteria.</li>
          <li>Auto Test Case Generation: Outputs structured test cases with steps, expected results, and tags.</li>
          <li>Positive &amp; Negative Coverage: Ensures both positive and negative scenarios are included.</li>
          <li>Spreadsheet &amp; Email Integration: Logs results to Google Sheets and sends via Gmail.</li>
          <li>Manual &amp; Automated QA: Supports both manual review and export for automation frameworks.</li>
        </ul>
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mx-auto mt-8">
          <TestGenerator />
        </div>
      </div>
    </div>
  );
};

export default TestCaseGeneratorPage;
