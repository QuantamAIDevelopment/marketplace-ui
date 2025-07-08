import React from 'react';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';
import ContractRedFlagDectector from '../components/workflows/ContractRedFlagDectector';

const ContractRedFlagDectectorPage = () => (
  <PageRevealWrapper
    heading="Contract Red Flag Detector"
    description="Upload a contract and get an instant AI-powered risk assessment. Detects red flags, missing sections, and provides actionable recommendations."
    details={
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-purple-700 mb-2">Features</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>AI-powered contract analysis for risk and compliance.</li>
            <li>Detects red flags, missing sections, and risky clauses.</li>
            <li>Instant, easy-to-read summary and recommendations.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-purple-700 mb-2">Example Use Cases</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Legal teams reviewing new contracts.</li>
            <li>Procurement and vendor management.</li>
            <li>Compliance and risk assessment for business agreements.</li>
          </ul>
        </div>
      </div>
    }
  >
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mx-auto">
      <ContractRedFlagDectector />
    </div>
  </PageRevealWrapper>
);

export default ContractRedFlagDectectorPage; 