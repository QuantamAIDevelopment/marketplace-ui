import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaFileAlt, FaEnvelope, FaUserAlt, FaBirthdayCake, FaFileInvoiceDollar, FaRobot, FaFileContract, FaBoxOpen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Workflow Components
import LeavesClassifier from './workflows/LeavesClassifier';
import BirthdayWorkAnniversary from './workflows/BirthdayWorkAnniversary';
import DocumentUploadReminder from './workflows/DocumentUploadReminder';
// import CandidateDetailsSync from './workflows/CandidateDetailsSync';
import PayslipAutoEncrypted from './workflows/PayslipAutoEncrypted';
import EmailAttachmentProcessing from './workflows/EmailAttachmentProcessing';
import PolicyChangeNotification from './workflows/PolicyChangeNotification';
import ResumeToProfileExtractor from './workflows/ResumeToProfileExtractor';
import AICustomerSupport from './workflows/AICustomerSupport';
import ProductRecommendation from './workflows/ProductRecommendation';

const workflows = [
  {
    title: 'AI Customer Support',
    icon: FaRobot,
    path: '/ai-customer-support',
    description: 'Automate customer support with AI-driven responses.',
  },
  
  {
    title: 'Leaves Classifier',
    icon: FaCalendarAlt,
    path: '/workflows/leaves-classifier',
    description: 'Classify and manage employee leave requests efficiently.',
  },
  {
    title: 'Birthday & Work Anniversary',
    icon: FaBirthdayCake,
    path: '/workflows/birthday-anniversary',
    description: 'Celebrate employee milestones automatically.',
  },
  {
    title: 'Document Upload Reminder',
    icon: FaFileAlt,
    path: '/workflows/document-upload',
    description: 'Remind users to upload important documents on time.',
  },
  {
    title: 'Candidate Hiring Status',
    icon: FaUserAlt,
    path: '/workflows/candidate-details-sync',
    description: 'Checking candidate details across platforms seamlessly.',
  },
  {
    title: 'Payslip Auto Encrypted',
    icon: FaFileInvoiceDollar,
    path: '/workflows/payslip-encryption',
    description: 'Automatically encrypt and distribute payslips.',
  },
  {
    title: 'Email Attachment Processing',
    icon: FaEnvelope,
    path: '/workflows/email-attachment',
    description: 'Process and organize email attachments automatically.',
  },
  {
    title: 'Policy Change Notification',
    icon: FaFileAlt,
    path: '/policy-notifications',
    description: 'Track and notify policy changes to relevant users.',
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

const WorkflowCard = ({ title, icon: Icon, description, onClick, isButton, buttonText }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[200px]"
    whileHover={{ scale: 1.03 }}
    onClick={onClick}
  >
    <div className="flex items-center space-x-4 mb-3">
      <div className="bg-accent-blue p-3 rounded-lg">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-display text-anthropic-dark">{title}</h3>
    </div>
    <div className="text-gray-600 text-sm flex-1 mb-4">{description}</div>
    {isButton && (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white py-2 rounded-xl font-bold text-base shadow-lg hover:from-blue-600 hover:to-purple-600 transition-colors mt-2"
        onClick={e => { e.stopPropagation(); onClick(); }}
      >
        {buttonText || 'Open'}
      </motion.button>
    )}
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
              onClick={() => navigate(wf.path)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 