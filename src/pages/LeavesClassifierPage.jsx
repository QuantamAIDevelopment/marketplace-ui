import React from "react";
import LeavesClassifier from "../components/workflows/LeavesClassifier";
import PageRevealWrapper from "../components/workflows/PageRevealWrapper";

const LeavesClassifierPage = () => (
  <PageRevealWrapper
    heading="Leaves Classifier: Smart Leave Type Detection from Google Calendar"
    description="Automatically classify employee leaves (Sick/Casual) from Google Calendar events within a selected date range. This workflow leverages AI to analyze event descriptions and categorize leaves, streamlining HR processes and improving attendance tracking accuracy."
    details={
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-blue-700 mb-2">Features</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Date Range Input: Select start and end dates for leave classification.</li>
            <li>AI-Powered Classification: Detects leave type (Sick/Casual) from event data.</li>
            <li>Tabular Results: View classified leaves in a user-friendly table.</li>
            <li>Error Handling: Clear feedback for API or data issues.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-purple-700 mb-2">Example Use Cases</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>HR Teams: Automate leave tracking and reduce manual classification errors.</li>
            <li>Managers: Quickly review leave patterns for team members.</li>
            <li>Employees: Self-check leave records and types for payroll or compliance.</li>
          </ul>
        </div>
      </div>
    }
  >
    <LeavesClassifier />
  </PageRevealWrapper>
);

export default LeavesClassifierPage;
