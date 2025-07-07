import React from 'react';
import PageRevealWrapper from '../components/PageRevealWrapper';
import LeavePredictAI from '../components/workflows/LeavePredictAI';

const LeavePredictAIPage = () => (
  <PageRevealWrapper
    heading="LeavePredict AI – Absenteeism & Leave Pattern Prediction"
    description="Upload employee leave data to predict absenteeism risk and get actionable HR insights. This AI-powered tool analyzes leave patterns, engagement, and login data to help HR proactively address absenteeism risks."
    details={
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-indigo-700 mb-2">Features</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Upload CSV: Accepts employee leave and engagement data in CSV format.</li>
            <li>AI Risk Analysis: Classifies absenteeism risk as Low, Medium, or High for each employee.</li>
            <li>Actionable Insights: Provides explanations and suggested HR actions for each case.</li>
            <li>Automated Workflow: Integrates with Google Sheets and email for reporting (via n8n backend).</li>
            <li>Modern UI: Clean, animated, and responsive interface for HR teams.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-purple-700 mb-2">Example Use Cases</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>HR Teams: Proactively identify and address absenteeism risks before they escalate.</li>
            <li>Managers: Get instant insights into team attendance and engagement patterns.</li>
            <li>Organizations: Automate leave risk analysis and reporting for compliance and planning.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-indigo-700 mb-2">How It Works</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Upload your leave data CSV file.</li>
            <li>The AI analyzes patterns, engagement, and missed logins.</li>
            <li>Results are displayed in a table with risk levels and suggested actions.</li>
            <li>Optionally, results can be sent to HR via email or logged in Google Sheets (if backend is configured).</li>
          </ul>
        </div>
      </div>
    }
  >
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl mx-auto">
        <LeavePredictAI />
      </div>
    </div>
  </PageRevealWrapper>
);

export default LeavePredictAIPage; 