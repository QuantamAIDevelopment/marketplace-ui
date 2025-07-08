
import React from 'react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileContract, FaUpload, FaSpinner, FaCheckCircle, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';
import ContractRedFlagDetector from '../components/workflows/ContractRedFlagDetector';

const ContractRedFlagDetectorPage = () => (
  <PageRevealWrapper
    heading="Contract Red Flag Detector"
    description="The Contract Red Flag Detector helps you instantly analyze contracts for risky clauses, missing sections, and overall risk. Upload your contract to receive a structured risk assessment and actionable suggestions—no legal expertise required."
    details={
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-red-700 mb-2">Example Use Cases</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Legal Teams: Quickly review contracts for risky clauses before signing.</li>
            <li>Procurement: Automate compliance checks on vendor agreements.</li>
            <li>Startups: Get instant feedback on investor or partnership contracts.</li>
            <li>HR: Screen employment contracts for missing or problematic sections.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-purple-700 mb-2">Why This Stands Out</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>AI-Powered Clause Detection<br/>Identifies and highlights risky or missing clauses using advanced language models.</li>
            <li>Structured Risk Assessment<br/>Provides a clear summary of red flags, missing sections, and overall risk score.</li>
            <li>Actionable Recommendations<br/>Suggests concrete steps to mitigate contract risks.</li>
            <li>Instant Results<br/>No waiting for manual review—get your analysis in seconds.</li>
            <li>Confidential & Secure<br/>Your documents are processed securely and never stored.</li>
          </ul>
        </div>
        <div className="mt-6 text-center">
          <span className="inline-block bg-gradient-to-r from-red-500 via-yellow-500 to-pink-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg">Use the Contract Red Flag Detector to safeguard your agreements and make informed decisions—instantly and effortlessly!</span>
        </div>
      </div>
    }
  >
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Contract Red Flag Detector</h1>
      <ContractRedFlagDetector />
    </div>
  </PageRevealWrapper>
);

export default ContractRedFlagDetectorPage; 