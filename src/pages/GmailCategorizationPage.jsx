import React from 'react';
import PageRevealWrapper from '../components/PageRevealWrapper';
import GmailCategorization from '../components/workflows/GmailCategorization';

const GmailCategorizationPage = () => (
  <PageRevealWrapper
    heading="Gmail Categorization Workflow"
    description="Automatically categorize and label your emails using AI and Google Sheets integration."
    details={
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-blue-700 mb-2">Features</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>AI-powered email categorization based on Google Sheet categories.</li>
            <li>Easy integration with Gmail and Google Sheets.</li>
            <li>Instant label creation and assignment in your Gmail account.</li>
            <li>Customizable categories and descriptions for flexible workflows.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-purple-700 mb-2">Example Use Cases</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Sort incoming emails into business, personal, or custom categories.</li>
            <li>Automate labeling for newsletters, invoices, or support tickets.</li>
            <li>Sync categories with your team using Google Sheets.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-blue-700 mb-2">⚡ Why This Stands Out</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Real-time, multi-source email categorization.</li>
            <li>Seamless workflow between Gmail, Google Sheets, and AI.</li>
            <li>Simple UI for quick category and description input.</li>
            <li>Instant feedback and label creation confirmation.</li>
          </ul>
        </div>
      </div>
    }
  >
    <GmailCategorization />
  </PageRevealWrapper>
);

export default GmailCategorizationPage;
