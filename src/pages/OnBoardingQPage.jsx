import React from 'react';
import PageRevealWrapper from '../components/PageRevealWrapper';
import { OnBoardingQ } from '../components/workflows';

const OnBoardingQPage = () => (
  <PageRevealWrapper
    heading="Onboarding Q Email Generator"
    description="Upload a client onboarding ODS file and let our AI generate a personalized onboarding email body for your client using the On_Boarding.Q workflow."
    details={
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-green-700 mb-2">Features</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Upload ODS onboarding files.</li>
            <li>AI-generated, ready-to-send onboarding email body.</li>
            <li>Checklist and personalized steps included in the email.</li>
            <li>Instant preview of the generated email body.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-purple-700 mb-2">Example Use Cases</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>HR teams onboarding new employees or clients.</li>
            <li>Consulting agencies welcoming new customers.</li>
            <li>Automated onboarding for SaaS and service businesses.</li>
          </ul>
        </div>
      </div>
    }
  >
    <div className="w-full max-w-2xl mx-auto">
      <OnBoardingQ />
    </div>
  </PageRevealWrapper>
);

export default OnBoardingQPage; 