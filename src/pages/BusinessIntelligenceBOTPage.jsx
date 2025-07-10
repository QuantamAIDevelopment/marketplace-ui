import React from 'react';
import PageRevealWrapper from '../components/PageRevealWrapper';
import { BusinessIntelligenceBOT } from '../components/workflows';

const BusinessIntelligenceBOTPage = () => (
  <PageRevealWrapper
    heading="Business Intelligence Explainer Bot"
    description="Upload your sales data to get instant AI-powered business insights, error detection, and actionable suggestions. This workflow analyzes your data, highlights issues, and provides recommendations to improve your business performance."
    details={
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-blue-700 mb-2">Features</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Upload sales data (CSV/Excel) for instant analysis</li>
            <li>AI-powered summary of key metrics (revenue, top product, growth region)</li>
            <li>Error detection and validation (missing fields, data issues)</li>
            <li>Actionable suggestions to improve business performance</li>
            <li>Clear, user-friendly results with timestamps</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-purple-700 mb-2">Example Use Cases</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Sales teams: Quickly identify trends and issues in sales data</li>
            <li>Business analysts: Get AI-generated summaries and recommendations</li>
            <li>Managers: Monitor performance and take action on suggestions</li>
            <li>Anyone needing fast, automated business intelligence from raw data</li>
          </ul>
        </div>
      </div>
    }
  >
    <BusinessIntelligenceBOT />
  </PageRevealWrapper>
);

export default BusinessIntelligenceBOTPage; 