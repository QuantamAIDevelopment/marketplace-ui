import React from 'react';
import { useNavigate } from 'react-router-dom';
import CoverScreen from '../components/workflows/CoverScreen';

const AutomateCandidateAcceptanceCoverPage = () => {
  const navigate = useNavigate();
  return (
    <CoverScreen
      heading="Automate Candidate Acceptance"
      description="Automate candidate acceptance and onboarding notifications. Fill the form to notify the team and update the tracker."
      onStart={() => navigate('/automate-candidate-acceptance')}
    />
  );
};

export default AutomateCandidateAcceptanceCoverPage; 