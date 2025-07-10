import React, { useState } from 'react';
import CoverScreen from '../components/CoverScreen';
import { FaVial } from 'react-icons/fa';
import TestGenerator from '../components/workflows/TestGenerator';

const TestGeneratorCoverContent = (
  <>
    <div className="flex flex-col items-center mb-6">
      <div className="bg-purple-500 p-4 rounded-lg shadow-lg mb-3">
        <FaVial className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-center leading-tight mb-2">
        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
          Test Case Generator
        </span>
      </h1>
      <p className="text-base text-gray-600 mt-2 text-center max-w-xl">
        Generate QA test cases from your feature docs using AI.
      </p>
      {/* Example content below the title, like Gmail Categorization */}
      <p className="text-lg text-gray-700 font-normal mt-2 text-center max-w-xl">
        Automatically generate and structure test cases from your feature documents using AI. Perfect for QA, automation, and documentation.
      </p>
      {/* Brief information below the Test Case Generator title */}
      <p className="text-base text-gray-600 mt-2 text-center max-w-xl">
        The Test Case Generator leverages advanced AI to analyze your feature specifications and instantly produce detailed, structured test cases. This tool streamlines your QA process, reduces manual effort, and ensures consistency across your testing documentation. Simply provide your document details and let the AI do the rest—making your quality assurance faster, smarter, and more reliable.
      </p>
    </div>
    <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-6 font-medium text-center">
      Instantly generate structured test cases from your feature specification document. Enter the document title, author, and Google Doc ID to get started. Perfect for QA, automation, and documentation.
    </p>
    <ul className="list-disc list-inside text-gray-700 text-lg mb-8 text-left max-w-2xl mx-auto">
      <li>AI-powered extraction and test case generation from feature specs.</li>
      <li>Structured output: Test ID, Title, Type, Steps, Expected Results.</li>
      <li>Instant, ready-to-use for QA, automation, and documentation.</li>
      <li>Zero setup: Just provide your feature doc, get test cases instantly.</li>
      <li>Works with Google Docs and other popular formats.</li>
    </ul>
  </>
);

const TestGeneratorPage = () => {
  const [showForm, setShowForm] = useState(false);
  const handleStart = () => setShowForm(true);

  if (!showForm) {
    return (
      <CoverScreen
        onStart={handleStart}
        heading={null}
        description={null}
        details={TestGeneratorCoverContent}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-100 to-blue-100 flex flex-col items-center justify-center py-12">
      <div className="w-full max-w-2xl bg-white bg-opacity-90 rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <TestGenerator />
      </div>
    </div>
  );
};

export default TestGeneratorPage;