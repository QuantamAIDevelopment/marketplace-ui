import React from 'react';
import PageRevealWrapper from '../components/PageRevealWrapper';
import CandidateHiringStatus from '../components/workflows/CandidateHiringStatus';

const CandidateHiringStatusPageContent = () => {
  return (
    <div className="section">
      <div className="section-content">
        <CandidateHiringStatus />
      </div>
    </div>
  );
};

const CandidateHiringStatusPage = () => {
  return (
    <PageRevealWrapper
      heading="Candidate Hiring Status"
      description="Automatically sync and track candidate hiring status and details across ATS and HR systems."
    >
      <CandidateHiringStatusPageContent />
    </PageRevealWrapper>
  );
};

export default CandidateHiringStatusPage; 