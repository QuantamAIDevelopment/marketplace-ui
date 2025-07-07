import React from 'react';
import PageRevealWrapper from '../components/PageRevealWrapper';

const OnBoardingPage = () => (
  <PageRevealWrapper
    heading="Onboarding Email Generator"
    description="Generate personalized onboarding emails from client files using AI-powered automation."
    details={
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-green-700 mb-2">Features</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Upload client onboarding files in various formats.</li>
            <li>AI-generated personalized onboarding email content.</li>
            <li>Automated welcome messages and next steps.</li>
            <li>Professional email templates and formatting.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-purple-700 mb-2">Example Use Cases</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>HR teams welcoming new employees.</li>
            <li>Service businesses onboarding new clients.</li>
            <li>Software companies welcoming new users.</li>
            <li>Consulting firms introducing new projects.</li>
          </ul>
        </div>
      </div>
    }
  >
    <div className="w-full max-w-2xl mx-auto">
      <div className="card p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Onboarding Email Generator
        </h3>
        <p className="text-gray-600 mb-6">
          This feature is currently under development. Please use the OnBoarding Q Email Generator for ODS file processing.
        </p>
        <button 
          onClick={() => window.location.href = '/onboarding-q'}
          className="btn-primary"
        >
          Go to OnBoarding Q
        </button>
      </div>
    </div>
  </PageRevealWrapper>
);

export default OnBoardingPage; 