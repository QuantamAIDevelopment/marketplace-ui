import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaFileAlt, FaEnvelope, FaUserAlt, FaBirthdayCake, FaFileInvoiceDollar, FaRobot, FaFileContract, FaBoxOpen, FaWarehouse, FaBrain, FaCommentDots, FaMoneyBillWave, FaChartLine, FaChartBar, FaRupeeSign, FaShieldAlt, FaCalendarCheck , FaFilePdf } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

const WorkflowCard = ({ title, icon: Icon, path, summary }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card-hover cursor-pointer"
      onClick={() => navigate(path)}
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-gradient-button rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-h3 text-text-primary">{title}</h3>
      </div>
      <p className="text-text-secondary leading-relaxed">{summary}</p>
    </motion.div>
  );
};

const workflowData = [
  {
    title: 'AI Customer Support',
    icon: FaRobot,
    path: '/ai-customer-support',
    summary: 'Chat with AI for customer support queries.'
  },
  {
    title: 'Leaves Classifier',
    icon: FaCalendarAlt,
    path: '/workflows/leaves-classifier',
    summary: 'Classify and track employee leaves.'
  },
  {
    title: 'Birthday & Work Anniversary',
    icon: FaBirthdayCake,
    path: '/workflows/birthday-anniversary',
    summary: 'Celebrate employee birthdays and anniversaries.'
  },
  {
    title: 'Document Upload Reminder',
    icon: FaFileAlt,
    path: '/workflows/document-upload',
    summary: 'Remind employees to upload documents.'
  },
  {
    title: 'Candidate Hiring Status',
    icon: FaUserAlt,
    path: '/workflows/candidate-hiring-status',
    summary: 'Sync candidate hiring status automatically.'
  },
  {
    title: 'Payslip Auto Encrypted',
    icon: FaFileInvoiceDollar,
    path: '/workflows/payslip-encryption',
    summary: 'Encrypt and distribute payslips securely.'
  },
  {
    title: 'Email Attachment Processing',
    icon: FaEnvelope,
    path: '/workflows/email-attachment',
    summary: 'Process and extract email attachments.'
  },
  {
    title: 'Policy Change Notification',
    icon: FaFileAlt,
    path: '/workflows/policy-notifications',
    summary: 'Track and notify policy changes.'
  },
  {
    title: 'Resume to Profile Extractor',
    icon: FaUserAlt,
    path: '/workflows/resume-extractor',
    summary: 'Extract profiles from resumes automatically.'
  },
  {
    title: 'Contract Red Flag Detector',
    icon: FaFileContract,
    path: '/workflows/contract-red-flag',
    summary: 'Detects red flags in contracts'
  },
  {
    title: 'Product Recommendation Agent',
    icon: FaBoxOpen,
    path: '/workflows/product-recommendation',
    summary: 'Get AI-powered product recommendations.'
  },
  {
    title: 'Product Feedback Summarizer',
    icon: FaCommentDots,
    path: '/workflows/product-feedback-summarizer',
    summary: 'Summarize customer feedback and extract actionable insights.'
  },
  {
    title: 'Dynamic Pricing Agent',
    icon: FaMoneyBillWave,
    path: '/workflows/dynamic-pricing',
    summary: 'Upload a CSV to get AI-powered dynamic price recommendations.'
  },
  {
    title: 'Business Insights Agent',
    icon: FaChartLine,
    path: '/workflows/business-insights',
    summary: 'Upload a sales CSV to get KPIs, error detection, and suggestions.'
  },
  {
    title: 'Metrics Business Analytics',
    icon: FaChartBar,
    path: '/workflows/metrics-business-analytics',
    summary: 'Upload quarterly CSVs to get a professional business summary.'
  },
  {
    title: 'Monthly Expenditure',
    icon: FaRupeeSign,
    path: '/workflows/monthly-expenditure',
    summary: 'Track, upload, and chat about your monthly expenses.'
  },
  {
    title: 'Fraud Detection',
    icon: FaShieldAlt,
    path: '/workflows/fraud-detection',
    summary: 'Upload transaction CSVs to detect fraud, risk scores, and AI notes.'
  },
  {
    title: 'Inventory Management',
    icon: FaWarehouse,
    path: '/inventory-management',
    summary: 'Manage stock levels and automate reordering.'
  },
  {
    title: 'Appointment Scheduler',
    icon: FaCalendarAlt,
    path: '/appointment-scheduler',
    summary: 'Book and manage appointments with ease.'
  },
  {
    title: 'MCQ Generator & Trainer',
    icon: FaBrain,
    path: '/mcq-generator',
    summary: 'Generate quizzes and train with our AI agent.'
  },
  {
    title: 'PDF Summarizer',
    icon: FaFilePdf,
    path: '/pdf-summarizer',
    summary: 'Upload a PDF to extract key points, executive summary, entities, and topics using AI.'
  },
  {
    title: 'Sales Forecasting Agent',
    icon: FaChartLine,
    path: '/sales-forecasting',
    summary: 'AI-powered sales forecasting with pipeline analysis and revenue predictions.'
  },
  {
    title: 'Leave Balance Chatbot',
    icon: FaCalendarCheck,
    path: '/leave-balance-chatbot',
    summary: 'Get instant leave balance information through AI-powered HR assistant.'
  },
];

const Dashboard = () => {
  return (
    <div className="section">
      <div className="section-content">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-gradient mb-6">
            Workflow Dashboard
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Explore our comprehensive suite of AI-powered automation tools designed to streamline your business processes.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workflowData.map((workflow, index) => (
            <WorkflowCard
              key={index}
              title={workflow.title}
              icon={workflow.icon}
              path={workflow.path}
              summary={workflow.summary}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="card max-w-2xl mx-auto">
            <h2 className="text-h2 text-gradient mb-4">
              Need Help Getting Started?
            </h2>
            <p className="text-text-secondary mb-6">
              Our team is here to help you implement and optimize these workflows for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Contact Support
              </button>
              <button className="btn-ghost">
                View Documentation
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;