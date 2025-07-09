import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExclamationTriangle, FaRobot, FaUserCircle, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const PR_SUMMARY_API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/pr-config';

const workflowSteps = [
  { icon: FaUserCircle, label: 'Input Data', color: 'bg-blue-500' },
  { icon: FaGithub, label: 'Processing', color: 'bg-yellow-500' },
  { icon: FaCheckCircle, label: 'Complete', color: 'bg-green-500' },
];

const PRSummaryAgentPageContent = () => {
  const navigate = useNavigate();

  const handleStartNow = (e) => {
    e.preventDefault();
    navigate('/pr-summary-agent/form');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full bg-gradient-to-b from-white to-blue-50">
      {/* Documentation Section */}
      <div className="w-full max-w-4xl mx-auto mb-6">
        <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 text-center">PR Summary Agent Workflow Documentation</h2>
          <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">Overview</h3>
          <p className="text-gray-700 mb-4">The <b>PR_Summary_agent</b> workflow in n8n automates the process of generating summaries for GitHub pull requests (PRs) and posting them as comments on the PR, while also sending email notifications. Triggered by a webhook, the workflow fetches PR metadata, commits, and diff data from GitHub, processes it using an OpenAI model to generate a non-technical summary, and handles errors with fallback messages. The workflow is designed to streamline PR review processes by providing concise, human-readable summaries and notifying stakeholders via email.</p>
          <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">Workflow Objectives</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Fetch PR metadata, commits, and diff data from GitHub using the GitHub API.</li>
            <li>Generate a non-technical summary of the PR using an OpenAI language model.</li>
            <li>Post the summary as a comment on the GitHub PR.</li>
            <li>Send an email notification with the PR summary to a specified Gmail address.</li>
            <li>Handle errors by posting a fallback message to GitHub if the summary generation fails.</li>
            <li>Respond to the triggering webhook with the processed data.</li>
          </ul>
          <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">Use Cases</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li><b>Automated PR Review Assistance:</b>
              <ul className="list-disc pl-6">
                <li><b>Scenario:</b> Development teams need quick, non-technical summaries of PRs to understand changes without diving into technical details.</li>
                <li><b>Application:</b> The workflow generates a summary of the PR’s purpose, changes, and risks, making it easier for non-technical stakeholders (e.g., product managers) to review.</li>
              </ul>
            </li>
            <li><b>Notification for Stakeholders:</b>
              <ul className="list-disc pl-6">
                <li><b>Scenario:</b> Team members or managers need to be notified about new PRs and their details.</li>
                <li><b>Application:</b> The workflow sends an email with the PR number and summary to a specified Gmail address, ensuring stakeholders stay informed.</li>
              </ul>
            </li>
            <li><b>Error Handling for Robust Automation:</b>
              <ul className="list-disc pl-6">
                <li><b>Scenario:</b> If the OpenAI model fails to generate a summary (e.g., due to invalid diff data), the team still needs feedback.</li>
                <li><b>Application:</b> The workflow posts a fallback message to the PR, ensuring transparency and continuity.</li>
              </ul>
            </li>
            <li><b>Centralized PR Monitoring:</b>
              <ul className="list-disc pl-6">
                <li><b>Scenario:</b> Teams managing multiple repositories need a standardized way to track PR changes.</li>
                <li><b>Application:</b> The workflow fetches data from any specified repository and provides consistent summaries, improving oversight.</li>
              </ul>
            </li>
          </ul>
          <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">Conclusion</h3>
          <p className="text-gray-700">The <b>PR_Summary_agent</b> workflow streamlines PR review by automating summary generation, GitHub commenting, and email notifications. It is ideal for teams seeking to improve collaboration and transparency in the PR process, with robust error handling to ensure reliability.</p>
        </div>
      </div>
      {/* Gradient CTA Bar */}
      <div className="w-full max-w-4xl mx-auto mb-6">
        <div className="rounded-2xl shadow-xl p-6 text-center text-white text-xl md:text-2xl font-semibold bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500">
          Deploy your PR Summary Agent and automate your code review process in minutes—no code, no worries.
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

const PRSummaryAgentPage = () => (
  <PRSummaryAgentPageContent />
);

export default PRSummaryAgentPage;
