import React from 'react';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';
import FraudDetectionSystem from '../components/workflows/FraudDetectionSystem';

const FraudDetectionSystemPage = () => (
  <PageRevealWrapper
    heading="Fraud Detection System"
    description="Upload transaction data (CSV, Excel, or JSON) to detect fraud, get AI risk scores, and see triggered rules for each order. Instantly analyze transactions for suspicious activity using advanced AI."
    details={
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-purple-700 mb-2">Example Use Cases</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>E-commerce: Instantly flag suspicious orders for manual review.</li>
            <li>Finance: Analyze bulk transactions for fraud risk and compliance.</li>
            <li>Operations: Automate fraud checks and reduce chargebacks.</li>
            <li>Support: Provide detailed risk explanations for each flagged order.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-pink-700 mb-2">Why This Stands Out</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>AI-Powered Risk Scoring: Combines rules and LLMs for accurate fraud detection.</li>
            <li>Bulk Upload: Analyze hundreds of transactions in one go.</li>
            <li>Transparent Explanations: See exactly which rules were triggered and why.</li>
            <li>Instant Results: No waiting for manual review—get your analysis in seconds.</li>
            <li>Confidential & Secure: Your data is processed securely and never stored.</li>
          </ul>
        </div>
      </div>
    }
  >
    <FraudDetectionSystem />
  </PageRevealWrapper>
);

export default FraudDetectionSystemPage; 