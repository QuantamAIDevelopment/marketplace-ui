import React from 'react';
import { BackgroundVerificationAgent } from '../components/workflows';

const useCases = [
  'HR Teams: Instantly verify candidate backgrounds before hiring.',
  'Recruiters: Automate resume, LinkedIn, and GitHub cross-checks for faster shortlisting.',
  'Compliance Officers: Detect discrepancies and red flags in candidate profiles.',
  'Startups: Scale hiring with automated risk scoring and fraud detection.',
  'Agencies: Provide clients with detailed, AI-powered candidate verification reports.'
];

const standOut = [
  'Multi-Source Analysis: Checks resumes, LinkedIn, GitHub, and social media for a holistic view.',
  'Automated Red Flags: Instantly flags name mismatches, employment gaps, degree inconsistencies, and more.',
  'Risk Scoring: Assigns a transparent risk score and rating to each candidate.',
  'Toxicity & Inactivity Detection: Flags toxic social posts and inactive GitHub profiles.',
  'Seamless Reporting: Generates easy-to-read summaries for HR and compliance teams.',
  'Plug & Play: Upload a resume and get actionable insights in seconds—no manual review needed.'
];

const description = `The AI Background Verification Agent automates candidate screening by analyzing resumes, LinkedIn profiles, GitHub activity, and social media sentiment. It cross-checks information, flags discrepancies, and provides a risk score and summary for each candidate—helping you make faster, more informed hiring decisions.`;

const BackgroundVerificationAgentPage = () => (
  <div className="min-h-screen bg-gray-50 py-8 px-4">
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-blue-900">AI Background Verification Agent</h1>
      <p className="mb-6 text-base text-gray-700">{description}</p>
      <div className="mb-8 p-4 rounded-xl bg-blue-50 border border-blue-100">
        <h2 className="text-xl font-bold text-blue-800 mb-2">Example <span className="text-blue-500">Use Cases</span></h2>
        <ul className="list-disc ml-6 text-blue-900 text-base space-y-1">
          {useCases.map((uc, i) => <li key={i}>{uc}</li>)}
        </ul>
      </div>
      <div className="mb-10 p-4 rounded-xl bg-green-50 border border-green-100">
        <h2 className="text-xl font-bold text-green-800 mb-2">Why This <span className="text-green-500">Stands Out</span></h2>
        <ul className="list-disc ml-6 text-green-900 text-base space-y-1">
          {standOut.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>
      <BackgroundVerificationAgent />
    </div>
  </div>
);

export default BackgroundVerificationAgentPage; 