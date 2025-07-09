import React from 'react';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';
import AIBackroundVerificationCard from '../components/workflows/AIBackroundVerificationCard';

const AIBackroundVerificationPage = () => (
  <PageRevealWrapper
    heading="AI Background Verification Agent"
    description="Automate candidate background checks using AI. Instantly analyze resumes and public data for risk, discrepancies, and red flags. Get a comprehensive risk score and summary for each candidate."
    details={
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-blue-700 mb-2">Features</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Upload candidate resume or data file for instant analysis.</li>
            <li>AI-powered cross-checking of resume, LinkedIn, GitHub, and social signals.</li>
            <li>Automatic flagging of discrepancies, employment gaps, and toxic content.</li>
            <li>Risk scoring and rating (Low, Medium, High) with clear explanations.</li>
            <li>Summary report for each candidate, highlighting key issues.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-purple-700 mb-2">Example Use Cases</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>HR teams: Automate pre-employment background checks.</li>
            <li>Recruiters: Quickly screen multiple candidates for risk factors.</li>
            <li>Compliance: Ensure due diligence with AI-driven verification.</li>
            <li>Startups: Scale hiring without scaling manual review effort.</li>
          </ul>
        </div>
      </div>
    }
  >
    <AIBackroundVerificationCard />
  </PageRevealWrapper>
);

export default AIBackroundVerificationPage; 