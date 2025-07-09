import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaFileAlt, FaEnvelope, FaUserAlt, FaBirthdayCake, FaFileInvoiceDollar, FaRobot, FaFileContract, FaBoxOpen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Workflow Components
import LeavesClassifier from './workflows/LeavesClassifier';
import BirthdayWorkAnniversary from './workflows/BirthdayWorkAnniversary';
import DocumentUploadReminder from './workflows/DocumentUploadReminder';
import CandidateDetailsSync from './workflows/CandidateDetailsSync';
import PayslipAutoEncrypted from './workflows/PayslipAutoEncrypted';
import EmailAttachmentProcessing from './workflows/EmailAttachmentProcessing';
import PolicyChangeNotification from './workflows/PolicyChangeNotification';
import ResumeToProfileExtractor from './workflows/ResumeToProfileExtractor';
import AICustomerSupport from './workflows/AICustomerSupport';
import ProductRecommendation from './workflows/ProductRecommendation';

import { FaRegComments } from 'react-icons/fa';

const workflows = [
  {
    title: 'Product Feedback Summarizer',
    icon: FaRegComments,
    path: '/workflows/product-feedback-summarizer',
    description: 'Summarize customer feedback for each product, including praises, complaints, keywords, and sentiment.',
    gradient: 'from-pink-500 via-yellow-400 to-purple-500',
  },
  // {
  //   title: 'Automating Research with AI Agent',
  //   icon: FaFilePdf,
  //   path: '/automated-research-ai',
  //   description: 'Give a topic as input and get a downloadable PDF research report as output.',
  // },
  {
    title: 'AI Customer Support',
    icon: FaRobot,
    path: '/ai-customer-support',
    description: 'Automate customer support with AI-driven responses.',
    gradient: 'from-blue-500 via-pink-500 to-purple-500',
  },
  {
    title: 'Leaves Classifier',
    icon: FaCalendarAlt,
    path: '/workflows/leaves-classifier',
    description: 'Classify and manage employee leave requests efficiently.',
    gradient: 'from-green-400 via-blue-300 to-blue-600',
  },
  {
    title: 'Birthday & Work Anniversary',
    icon: FaBirthdayCake,
    path: '/workflows/birthday-anniversary',
    description: 'Celebrate employee milestones automatically.',
    gradient: 'from-yellow-400 via-pink-300 to-pink-600',
  },
  {
    title: 'Document Upload Reminder',
    icon: FaFileAlt,
    path: '/workflows/document-upload',
    description: 'Remind users to upload important documents on time.',
    gradient: 'from-purple-400 via-blue-400 to-blue-700',
  },
  {
    title: 'Candidate Hiring Status',
    icon: FaUserAlt,
    path: '/workflows/candidate-details-sync',
    description: 'Checking candidate details across platforms seamlessly.',
    gradient: 'from-pink-400 via-purple-400 to-blue-400',
  },
  {
    title: 'Payslip Auto Encrypted',
    icon: FaFileInvoiceDollar,
    path: '/workflows/payslip-encryption',
    description: 'Automatically encrypt and distribute payslips.',
    gradient: 'from-green-400 via-blue-400 to-blue-700',
  },
  {
    title: 'Email Attachment Processing',
    icon: FaEnvelope,
    path: '/workflows/email-attachment',
    description: 'Process and organize email attachments automatically.',
    gradient: 'from-yellow-400 via-pink-400 to-pink-700',
  },
  {
    title: 'Policy Change Notification',
    icon: FaFileAlt,
    path: '/policy-notifications',
    description: 'Track and notify policy changes to relevant users.',
    gradient: 'from-blue-400 via-purple-400 to-pink-400',
  },
  {
    title: 'Resume to Profile Extractor',
    icon: FaUserAlt,
    path: '/workflows/resume-extractor',
    description: 'Extract profile data from resumes with AI.',
  },
  {
    title: 'Contract Red Flag Detector',
    icon: FaFileContract,
    path: '/workflows/contract-red-flag',
    description: 'Detect red flags in contracts using AI.',
    isButton: true,
    buttonText: 'Go to Detector',
  },
  {
    title: 'Product Recommendation Agent',
    icon: FaBoxOpen,
    path: '/workflows/product-recommendation',
    description: 'Recommend products based on user data.',
  },
];

const WorkflowCard = ({ title, icon: Icon, description, onClick, isButton, buttonText, gradient }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`relative bg-white bg-opacity-80 rounded-3xl shadow-xl cursor-pointer transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col justify-between min-h-[200px]`}
    whileHover={{ scale: 1.05, y: -6 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    tabIndex={0}
  >
    <div className={`absolute inset-0 z-0 bg-gradient-to-br ${gradient || 'from-blue-400 to-purple-400'} opacity-60 group-hover:opacity-80 transition-all duration-300`} />
    <div className="relative z-10 flex flex-col items-center justify-center h-full p-6">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white bg-opacity-70 shadow-lg mb-4">
        <Icon className="text-3xl text-blue-700 group-hover:text-purple-700 transition-colors duration-300" />
      </div>
      <h3 className="font-bold text-lg text-gray-800 mb-2 text-center drop-shadow-sm">{title}</h3>
      <p className="text-gray-600 text-sm text-center flex-1">{description}</p>
      {isButton && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white py-2 rounded-xl font-bold text-base shadow-lg hover:from-blue-600 hover:to-purple-600 transition-colors mt-4"
          onClick={e => { e.stopPropagation(); onClick(); }}
        >
          {buttonText || 'Open'}
        </motion.button>
      )}
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-60" />
  </motion.div>
);

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-anthropic-light font-sans">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {workflows.map((wf, idx) => (
            <WorkflowCard
              key={wf.title}
              title={wf.title}
              icon={wf.icon}
              description={wf.description}
              isButton={wf.isButton}
              buttonText={wf.buttonText}
              gradient={wf.gradient}
              onClick={() => navigate(wf.path)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 