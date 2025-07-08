import React, { useState } from 'react';
import AutomateCandidateAcceptance from '../components/workflows/AutomateCandidateAcceptance';
import CoverScreen from '../components/workflows/CoverScreen';

const AutomateCandidateAcceptancePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <AutomateCandidateAcceptance />
    </div>
  );
};

export default AutomateCandidateAcceptancePage;
