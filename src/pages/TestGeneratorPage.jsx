import React, { useState } from 'react';
import CoverScreen from '../components/CoverScreen';
import { FaVial } from 'react-icons/fa';

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
  const [docTitle, setDocTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [docId, setDocId] = useState('');
  const [output, setOutput] = useState(null);

  const handleStart = () => setShowForm(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this with your API call
    setOutput({
      "test id": "TC001",
      "title": "Login with valid credentials",
      "type": "Positive",
      "steps": [
        "The user enters a valid email address and password on the login form.",
        "The user clicks the login button.",
        "The system displays a loading spinner while processing the login request.",
        "The system redirects the user to the admin dashboard upon successful login."
      ],
      "expected result": "User is logged in and redirected to the admin dashboard."
    });
  };

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
        <form className="w-full max-w-xl mb-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Google Doc Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
              value={docTitle}
              onChange={e => setDocTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Author</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Document ID</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
              value={docId}
              onChange={e => setDocId(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center">
            <button type="submit" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-bold py-4 px-16 rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 transition-colors">
              Start Now
            </button>
          </div>
        </form>
        {output && (
          <div className="w-full max-w-xl bg-gray-100 rounded-lg p-6 mt-4 text-left">
            <h3 className="text-xl font-bold text-purple-700 mb-2">Generated Test Case</h3>
            <div className="mb-2"><span className="font-semibold">Test ID:</span> {output["test id"]}</div>
            <div className="mb-2"><span className="font-semibold">Title:</span> {output.title}</div>
            <div className="mb-2"><span className="font-semibold">Type:</span> {output.type}</div>
            <div className="mb-2"><span className="font-semibold">Steps:</span>
              <ul className="list-decimal list-inside ml-4">
                {output.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>
            <div><span className="font-semibold">Expected Result:</span> {output["expected result"]}</div>
          </div>
        )}
        {/* Small content below the card */}
        <div className="w-full max-w-2xl mt-4 text-center">
          <p className="text-base text-gray-600">
            The Test Case Generator helps you quickly convert feature documentation into actionable, ready-to-use test cases for your QA and automation needs.
          </p>
        </div>
        {/* New description added here */}
        <div className="w-full max-w-2xl mt-2 text-center">
          <p className="text-base text-gray-600">
            Generate QA test cases from your feature docs using AI.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestGeneratorPage;