import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileContract, FaUpload, FaSpinner, FaCheckCircle, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';
import PageRevealWrapper from '../components/PageRevealWrapper';

const workflowSteps = [
  { icon: FaUpload, label: 'Upload Contract', color: 'bg-blue-500' },
  { icon: FaSpinner, label: 'Analyzing', color: 'bg-yellow-500' },
  { icon: FaFileContract, label: 'Detect Red Flags', color: 'bg-red-500' },
  { icon: FaEnvelope, label: 'Send Report', color: 'bg-green-500' },
  { icon: FaCheckCircle, label: 'Complete', color: 'bg-purple-500' },
];

const ContractRedFlagDetectorPageContent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [email, setEmail] = useState('');
  const [docName, setDocName] = useState('');
  const [docType, setDocType] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  // Responsive animation loop
  React.useEffect(() => {
    let interval;
    if (isExecuting) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % workflowSteps.length);
      }, 900);
    }
    return () => clearInterval(interval);
  }, [isExecuting]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile || !email || !docName || !docType) {
      setError('All fields are required.');
      return;
    }
    setError(null);
    setIsExecuting(true);
    setCurrentStep(0);
    setResponse(null);
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('file', selectedFile);
      formData.append('document name', docName);
      formData.append('document type', docType);
      const res = await axios.post('http://localhost:5678/webhook/contract', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResponse(res.data);
    } catch (err) {
      setError('Failed to execute workflow.');
      setResponse(null);
    } finally {
      setIsExecuting(false);
      setCurrentStep(0);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-8 text-anthropic-dark drop-shadow-lg"
        >
          Contract Red Flag Detector
        </motion.h1>
        <div className="relative z-10 w-full max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 space-y-6 border border-gray-200 w-full">
            <div className="flex flex-col md:flex-row md:gap-4 gap-2">
              <div className="flex-1 flex flex-col gap-2">
                <label className="font-semibold">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label className="font-semibold">Document Name</label>
                <input
                  type="text"
                  value={docName}
                  onChange={e => setDocName(e.target.value)}
                  className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                  placeholder="e.g. RENTAL AGREEMENT"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:gap-4 gap-2">
              <div className="flex-1 flex flex-col gap-2">
                <label className="font-semibold">Document Type</label>
                <input
                  type="text"
                  value={docType}
                  onChange={e => setDocType(e.target.value)}
                  className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                  placeholder="e.g. doc, pdf, docx"
                  required
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label className="font-semibold">Upload Contract File</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                  required
                />
              </div>
            </div>
            {error && <div className="bg-red-500 text-white p-3 rounded-lg">{error}</div>}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isExecuting}
              className="w-full bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition-colors disabled:opacity-50"
            >
              {isExecuting ? 'Processing...' : 'Run Detector'}
            </motion.button>
          </form>
          {/* Workflow Animation */}
          <AnimatePresence>
            {isExecuting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-8 bg-white rounded-2xl p-6 shadow-2xl flex flex-col items-center border border-gray-200"
              >
                <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center text-anthropic-dark">Executing Workflow...</h2>
                <div className="flex flex-wrap justify-center items-center w-full gap-4">
                  {workflowSteps.map((step, idx) => (
                    <motion.div
                      key={idx}
                      animate={{
                        scale: currentStep === idx ? 1.2 : 0.95,
                        opacity: currentStep === idx ? 1 : 0.5
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center space-y-2"
                    >
                      <div className={`p-4 rounded-full shadow-xl border-4 border-gray-200 ${currentStep === idx ? 'bg-primary-500' : 'bg-dark-400'} ${currentStep === idx ? 'ring-4 ring-pink-400' : ''}`}> 
                        <step.icon className="w-8 h-8 text-white drop-shadow-lg" />
                      </div>
                      <span className="text-xs md:text-sm text-anthropic-dark font-semibold">{step.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* Response Display */}
          <AnimatePresence>
            {response && !isExecuting && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="mt-10 bg-gray-50 rounded-2xl p-8 shadow-inner overflow-hidden border border-gray-200"
              >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Workflow Result</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left table-auto">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-600 uppercase">Upload Time</th>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-600 uppercase">User Email</th>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-600 uppercase">Document Name</th>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-600 uppercase text-center">Red Flags</th>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-600 uppercase text-center">Risk Score</th>
                        <th className="px-4 py-3 text-sm font-semibold text-gray-600 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {response.map((row, idx) => (
                        <tr key={idx} className="bg-white hover:bg-gray-100">
                          <td className="px-4 py-3 text-sm text-gray-700">{new Date(row.upload_time).toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm text-gray-700">{row.user_email}</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.document_name}</td>
                          <td className="px-4 py-3 text-sm text-center font-bold text-red-600">{row.red_flag_count}</td>
                          <td className="px-4 py-3 text-sm text-center font-semibold">{row.risk_score}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              row.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const ContractRedFlagDetectorPage = () => {
  return (
    <PageRevealWrapper
      heading="AI Contract Risk Assistant"
      description="Effortlessly scan, analyze, and assess legal contracts with AI. The Contract Red Flag Detector Agent automates first-pass legal reviews by extracting risky clauses, identifying missing sections, and generating structured risk summaries in seconds. Whether you're a legal ops team, procurement manager, startup founder, or compliance officer—this assistant transforms contract review from bottleneck to breeze. Upload or email a contract and receive an AI-generated report with risk scoring, red flag insights, and recommendations—automatically emailed and stored in your database. Built on LLMs, vector-ready storage, PDF parsing, and robust fallback logic, this agent gives you the peace of mind of a human review—on autopilot, 24/7."
      details={
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-blue-700 mb-2">Example Use Cases</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Legal Ops Teams: Pre-screen contracts before routing to legal counsel to save time and highlight concerns early.</li>
              <li>Procurement & Vendor Management: Automatically check contracts for unfavorable terms or missing clauses before onboarding vendors.</li>
              <li>Compliance & Audit: Get red-flag summaries and store contract metadata in a searchable database for future reference.</li>
              <li>Startups & Founders: Reduce risk by auto-flagging termination or indemnity issues in investor or partnership agreements.</li>
              <li>Email-Based Intake: Just forward a contract to a predefined address and receive a risk report PDF in return—no UI required.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-purple-700 mb-2">Why This Stands Out</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Multi-Channel Intake: Upload via webhook, email, or Drive—support for both scanned and digital PDFs.</li>
              <li>LLM-Powered Legal Understanding: Not just regex extraction—semantic detection of vague or high-risk legal phrasing.</li>
              <li>Structured Risk Report: Flags clause-level risks, missing sections, and returns an HTML + PDF summary.</li>
              <li>Feedback Loop: Alerts users when files are unreadable (e.g., poor scans) and suggests alternatives.</li>
              <li>Database Logging: Stores document name, user email, red flag count, risk score, and status in PostgreSQL for analytics.</li>
              <li>Smart Fallback Handling: If parsing fails, auto-notify the sender and attempt alternate extraction methods.</li>
              <li>LLM & Vector-Search Ready: Outputs structured JSON—perfect for building contract intelligence dashboards or search tools.</li>
            </ul>
          </div>
          <div className="mt-6 text-center">
            <span className="inline-block bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg">Try our Contract Risk Assistant free—upload your first 25 contracts and get instant legal insights, no human review needed.</span>
          </div>
        </div>
      }
    >
      <ContractRedFlagDetectorPageContent />
    </PageRevealWrapper>
  );
};

export default ContractRedFlagDetectorPage; 