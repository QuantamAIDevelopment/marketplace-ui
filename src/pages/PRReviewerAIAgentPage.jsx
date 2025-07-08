import React from 'react';
import { useNavigate } from 'react-router-dom';

const PRReviewerAIAgentPage = () => {
  const navigate = useNavigate();

  const handleStartNow = (e) => {
    e.preventDefault();
    navigate('/pr-reviewer-ai-agent/form');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full bg-gradient-to-b from-white to-blue-50">
      {/* Documentation/Overview Section */}
      <div className="w-full max-w-4xl mx-auto mb-6">
        <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 text-center">PR Reviewer AI Agent Workflow Documentation</h2>
          <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">Overview</h3>
          <p className="text-gray-700 mb-4">The <b>PR Reviewer AI Agent</b> automates the process of reviewing GitHub pull requests (PRs) using AI. It fetches PR metadata, analyzes code changes, and generates review comments or suggestions, streamlining the code review process for development teams.</p>
          <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">Workflow Objectives</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Fetch PR metadata and code changes from GitHub using the GitHub API.</li>
            <li>Analyze code changes using an AI model to identify issues, improvements, or suggestions.</li>
            <li>Post AI-generated review comments directly on the GitHub PR.</li>
            <li>Send email notifications with review results to specified stakeholders.</li>
            <li>Handle errors gracefully and provide fallback messages if review generation fails.</li>
          </ul>
          <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">Use Cases</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li><b>Automated Code Review:</b> Accelerate the review process by providing instant AI-generated feedback on PRs.</li>
            <li><b>Stakeholder Notification:</b> Keep team members and managers informed about PR reviews via email.</li>
            <li><b>Error Handling:</b> Ensure transparency by posting fallback messages if the AI review fails.</li>
            <li><b>Consistent Review Standards:</b> Apply standardized review criteria across multiple repositories.</li>
          </ul>
          <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">Conclusion</h3>
          <p className="text-gray-700">The <b>PR Reviewer AI Agent</b> enhances code quality and team collaboration by automating PR reviews, providing actionable feedback, and ensuring all stakeholders are promptly notified.</p>
        </div>
      </div>
      {/* Gradient CTA Bar */}
      <div className="w-full max-w-4xl mx-auto mb-6">
        <div className="rounded-2xl shadow-xl p-6 text-center text-white text-xl md:text-2xl font-semibold bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500">
          Deploy your PR Reviewer AI Agent and automate your code review process in minutes—no code, no worries.
        </div>
      </div>
      {/* Start Now Button */}
      <div className="w-full max-w-4xl mx-auto mb-10 flex justify-center">
        <button
          className="bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white px-12 py-4 rounded-full text-2xl font-bold shadow-lg hover:from-blue-600 hover:to-purple-600 transition-colors"
          onClick={handleStartNow}
        >
          Start Now
        </button>
      </div>
    </div>
  );
};

export default PRReviewerAIAgentPage;
