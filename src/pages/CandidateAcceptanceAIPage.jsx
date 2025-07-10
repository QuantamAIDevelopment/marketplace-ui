import React from 'react';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';
import CandidateAcceptanceAI from '../components/workflows/CandidateAcceptanceAI';
import AICustomerSupportWorkflowSVG from '../components/workflows/AICustomerSupportWorkflowSVG';

const CandidateAcceptanceAIPage = () => (
  <PageRevealWrapper
    heading="Candidate Acceptance AI: Automated Onboarding Notification"
    description="Submit candidate acceptance details to trigger onboarding notifications and update trackers. Automate your HR workflow with instant feedback."
    workflowSVG={AICustomerSupportWorkflowSVG}
  >
    <CandidateAcceptanceAI />
  </PageRevealWrapper>
);

export default CandidateAcceptanceAIPage;
