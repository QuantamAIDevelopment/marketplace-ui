import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaUpload, FaSpinner, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';

const EmailAttachmentProcessingPageContent = () => {
  const [formData, setFormData] = useState({
    email: '',
    Name: '',
    Subject: '',
    messageId: '',
    id: '',
    files: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const workflowSteps = [
    { icon: FaEnvelope, label: 'Email Details' },
    { icon: FaUpload, label: 'File Upload' },
    { icon: FaSpinner, label: 'Processing' },
    { icon: FaCheckCircle, label: 'Complete' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentStep(0);

    try {
      const formDataToSend = new FormData();
      formData.files.forEach(file => {
        formDataToSend.append('files', file);
      });
      formDataToSend.append('email', formData.email);
      formDataToSend.append('Name', formData.Name);
      formDataToSend.append('Subject', formData.Subject);
      formDataToSend.append('messageId', formData.messageId);
      if (formData.id) {
        formDataToSend.append('id', formData.id);
      }

      const response = await axios.post('http://localhost:5678/webhook/upload-files', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Simulate workflow steps
      for (let i = 0; i < workflowSteps.length; i++) {
        setCurrentStep(i);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      setResponse(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      files: Array.from(e.target.files)
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-8 text-anthropic-dark drop-shadow-lg"
        >
          Email Attachment Processing Workflow
        </motion.h1>
        <div className="relative z-10 w-full max-w-2xl mx-auto">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 space-y-6 border border-gray-200 w-full"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row md:gap-4 gap-2">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="font-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="font-semibold">Name</label>
                  <input
                    type="text"
                    name="Name"
                    value={formData.Name}
                    onChange={handleInputChange}
                    className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:gap-4 gap-2">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="font-semibold">Subject</label>
                  <input
                    type="text"
                    name="Subject"
                    value={formData.Subject}
                    onChange={handleInputChange}
                    className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="font-semibold">Message ID</label>
                  <input
                    type="text"
                    name="messageId"
                    value={formData.messageId}
                    onChange={handleInputChange}
                    className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:gap-4 gap-2">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="font-semibold">ID (Optional)</label>
                  <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="font-semibold">Files</label>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                    required
                  />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : 'Submit'}
              </motion.button>
            </form>
          </motion.div>
          {/* Workflow Animation */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-8 bg-white rounded-2xl p-6 shadow-2xl flex flex-col items-center border border-gray-200"
              >
                <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center text-anthropic-dark">Executing Workflow...</h2>
                <div className="flex flex-wrap justify-center items-center w-full gap-4">
                  {workflowSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      animate={{
                        scale: currentStep === index ? 1.2 : 0.95,
                        opacity: currentStep === index ? 1 : 0.5
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center space-y-2"
                    >
                      <div className={`p-4 rounded-full shadow-xl border-4 border-gray-200 ${currentStep === index ? 'bg-blue-600' : 'bg-gray-700'} ${currentStep === index ? 'ring-4 ring-pink-400' : ''}`}> 
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
            {response && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="mt-10 bg-gray-50 rounded-2xl p-8 shadow-inner border border-gray-200"
              >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Processing Results</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Submission Details</h3>
                    <p className="text-gray-600"><strong className="font-medium">Name:</strong> {response.Name}</p>
                    <p className="text-gray-600"><strong className="font-medium">Email:</strong> {response.SenderEmail}</p>
                    <p className="text-gray-600"><strong className="font-medium">Subject:</strong> {response.Subject}</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Processing Stats</h3>
                    <p className="text-gray-600"><strong className="font-medium">Processed:</strong> <span className="text-green-600 font-bold">{response.stats.processedAttachments}</span></p>
                    <p className="text-gray-600"><strong className="font-medium">In Progress:</strong> <span className="text-yellow-600 font-bold">{response.stats.processingAttachments}</span></p>
                    <p className="text-gray-600"><strong className="font-medium">Failed:</strong> <span className="text-red-600 font-bold">{response.stats.failedAttachments}</span></p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Expected Documents</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {response.expected.map((doc, i) => <li key={i}>{doc}</li>)}
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Received Files</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {response.received_files.map((file, i) => <li key={i}>{file}</li>)}
                    </ul>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Missing Documents</h3>
                    <ul className="list-disc list-inside text-red-600 space-y-1">
                      {response.missing.map((doc, i) => <li key={i}>{doc}</li>)}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const EmailAttachmentProcessingPage = () => {
  return (
    <PageRevealWrapper
      heading="Email Attachment Processing Agent for HRMS"
      description="Process candidate documents automatically from HR inboxes—reliably and intelligently. This HRMS Email Attachment Processor reads emails from your HR documents inbox, extracts candidate metadata and attachments, uses AI to classify the document types (e.g., Resume, ID Proof, Certificates), stores them on Google Drive, and logs the results in Google Sheets. If documents are missing or the email contains no attachments, it triggers auto-replies and flags errors in logs. From parsing resumes to ensuring document completeness, this workflow operates as a full-time virtual assistant for your HR department—reducing manual document handling to zero."
      details={
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-blue-700 mb-2">Example Use Cases</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>HR Teams & Recruiters: Automatically process candidate emails with attachments and categorize documents for onboarding or compliance.</li>
              <li>Remote Hiring Pipelines: Centralize candidate documentation submitted via email without human intervention.</li>
              <li>Recruitment Process Outsourcing (RPO): Reduce errors in collecting, classifying, and organizing candidate submissions at scale.</li>
              <li>Compliance Tracking: Log missing or incomplete submissions and trigger alerts to follow up automatically.</li>
              <li>Digital Document Management: Store all attachments in organized Google Drive folders, mapped with metadata.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-purple-700 mb-2">⚡Why This Stands Out</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Smart Email Ingestion<br/>Pulls emails from Gmail, extracts subject, sender, message, and all attachments.</li>
              <li>AI Document Classification<br/>Uses OpenAI to classify each attachment as Resume, ID Proof, or Certificates based on file name and content.</li>
              <li>Google Drive Sync<br/>Uploads all valid documents to Drive for centralized document storage.</li>
              <li>Google Sheets Logging<br/>Logs expected vs. received vs. missing documents for every candidate in a Google Sheet—ideal for HR audits.</li>
              <li>Automatic Follow-Up
                <ul className="list-disc ml-6">
                  <li>If documents are missing: Sends candidate an email reminder.</li>
                  <li>If no attachments at all: Notifies HR and sends a polite response to the sender.</li>
                </ul>
              </li>
              <li>Verification Logic<br/>Checks if all three required documents are received. If not, marks as incomplete and logs the incident.</li>
              <li>Merge, Wait, Retry<br/>Merges metadata, waits for processing, and logs everything cleanly with retry safeguards.</li>
            </ul>
          </div>
          <div className="mt-6 text-center">
            <span className="inline-block bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg">Install the HRMS Document Agent and ensure every hiring document is collected, categorized, and logged—automatically.</span>
          </div>
        </div>
      }
    >
      <EmailAttachmentProcessingPageContent />
    </PageRevealWrapper>
  );
};

export default EmailAttachmentProcessingPage; 