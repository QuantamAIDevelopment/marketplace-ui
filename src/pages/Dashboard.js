import React from 'react';
import { motion } from 'framer-motion';

// import { FraudDetectionSystemCard } from '../components/workflows';

import { FaCalendarAlt, FaFileAlt, FaEnvelope, FaUserAlt, FaBirthdayCake, FaFileInvoiceDollar, FaRobot, FaFileContract, FaBoxOpen, FaWarehouse, FaBrain, FaCommentDots, FaMoneyBillWave, FaChartLine, FaChartBar, FaRupeeSign, FaShieldAlt, FaDatabase, FaUserShield, FaBook, FaVial, FaCalendarCheck, FaEnvelopeOpenText, FaFilePdf, FaTable, FaUserCheck, FaSync, FaUserPlus, FaAmazon, FaFileCsv, FaUserTie, FaBell } from 'react-icons/fa';

import { useNavigate, Link } from 'react-router-dom';
import { AmazonWebScrapeCard, AIBackroundVerificationCard, ContractRedFlagDetectorCard } from '../components/workflows';
import AutomateCandidateAcceptance from '../components/workflows/AutomateCandidateAcceptance';
import AutomatedResearch from '../components/workflows/AutomatedResearch';
import InterviewPanelAutoAssignment from '../components/workflows/InterviewPanelAutoAssignment';
import PerformanceReviewSummary from '../components/workflows/PerformanceReviewSummary';
import ComplaintHandlerAgent from '../components/workflows/ComplaintHandlerAgent';
import BusinessIntelligenceBOT from '../components/workflows/BusinessIntelligenceBOT';

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
    title: 'OnBoarding Q Email Generator',
    icon: FaUserCheck,
    path: '/onboarding-q',
    summary: 'Generate onboarding emails from ODS files using the On_Boarding.Q workflow.'
  },
  {
    title: 'AI Customer Support',
    icon: FaRobot,
    path: '/ai-customer-support',
    summary: 'Chat with AI for customer support queries.'
  },
  {
    title: 'Inventory Predict AI',
    icon: FaChartLine,
    path: '/inventory-predict-ai',
    summary: 'Forecast inventory, detect stock risks, and get AI-powered suggestions.'
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
    title: 'Metrics Business Analytics',
    icon: FaChartBar,
    path: '/workflows/metrics-business-analytics',
    summary: 'Upload quarterly CSVs to get a professional business summary.'
  },
  {
    title: 'Monthly Expenditure',
    icon: FaRupeeSign,
    path: '/monthly-expenditure',
    summary: 'Track, upload, and chat about your monthly expenses.'
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
    title: 'SmartInvoice AI',
    icon: FaFileInvoiceDollar,
    path: '/smart-invoice-ai',
    summary: 'Upload and validate invoices with AI. Get instant feedback and Google Sheets integration.'
  },
  {
    title: 'AI-Powered Book Price Tracker',
    icon: FaBook,
    path: '/ai-book-price-tracker',
    summary: 'Track book prices, availability, and details using AI-powered extraction.'
  },
  {
    title: 'Automate Candidate Acceptance',
    icon: FaUserCheck,
    path: '/automate-candidate-acceptance',
    summary: 'Automate candidate acceptance and send onboarding notifications.'
  },
  {
    title: 'Attendance Anomalies',
    icon: FaFileCsv,
    path: '/attendance-anomalies',
    summary: 'Upload attendance CSVs to detect anomalies and escalate to HR.'
  },
  {
    title: 'Fetch Leads',
    icon: FaUserTie,
    path: '/fetch-leads',
    summary: 'Trigger the fetch leads workflow and get a personalized response.'
  },
  {
    title: 'AI Testmonial Extractor',
    icon: FaCommentDots,
    path: '/workflows/testmonial-extractor',
    summary: 'Extract testimonials, sentiment, tags, and product from marketing feedback files.'
  },
  {
    title: 'Dynamic Model Selector',
    icon: FaRobot,
    path: '/workflows/dynamic-model-selector',
    summary: 'Ask any question and let the agent route it to the best AI model for the job.'
  },
  {
    title: 'AI Background Verification',
    icon: FaUserShield,
    path: '/ai-background-verification',
    summary: 'Automate candidate background checks with AI. Instantly analyze resumes and public data for risk, discrepancies, and red flags.'
  },
  {
    title: 'Notion Knowledge Base AI Assistant',
    icon: FaBook,
    path: '/workflows/notion-knowledge-base-ai',
    summary: 'Ask questions and get instant answers from your Notion workspace knowledge base.'
  },
  {
    title: 'Database Migration AI Agent',
    icon: FaDatabase,
    path: '/workflows/database-migration-ai',
    summary: 'Migrate tables between databases with AI-powered automation.'
  },
  {
    title: 'ATS to HRMS Candidate Status Sync',
    icon: FaSync,
    path: '/workflows/ats-to-hrms-candidate-status-sync',
    summary: 'Sync and view candidate status between ATS and HRMS.'
  },
  {
    title: 'Test Case Generator',
    icon: FaVial,
    path: '/test-generator',
    summary: 'Generate QA test cases for your feature document using AI. Upload your feature document and let the AI generate comprehensive test cases to ensure quality and coverage.',
  },
  {
    title: 'Gmail Categorization',
    icon: FaEnvelopeOpenText,
    path: '/gmail-categorization',
    summary: 'Automatically categorize and label your emails using AI and Google Sheets integration.'
  },
  {
    title: 'Resume Analyzer',
    icon: FaFileAlt,
    path: '/resume-analyzer',
    summary: 'AI-powered resume screening, scoring, and skill extraction.'
  },
  {
    title: 'Sentiment Agent',
    icon: FaRobot,
    path: '/sentiment-agent-report',
    summary: 'Smart customer support analyst assistant. Processes feedback and returns structured summaries for automation.'
  },
  {
    title: 'Customer Support Agent',
    icon: FaRobot,
    path: '/customer-support-agent',
    summary: 'Chat with an AI-powered customer support agent for order tracking, refunds, and more.'
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
  {
    title: 'PR Summary Agent',
    icon: FaRobot,
    path: '/pr-summary-agent',
    summary: 'Summarize GitHub PRs and get AI-powered summaries and notifications.'
  },
  {
    title: 'PR Reviewer AI Agent',
    icon: FaRobot,
    path: '/pr-reviewer-agent',
    summary: 'Automated code review and actionable suggestions for your GitHub PRs.'
  },
  {
    title: 'Project Cost Reports',
    icon: FaTable,
    path: '/project-coast-reports',
    summary: 'Upload project data and get a detailed cost report for your projects.'
  },
  {
    title: 'Automate Candidate Acceptance',
    icon: FaUserCheck,
    path: '/automate-candidate-acceptance/cover',
    summary: 'Automate candidate acceptance and onboarding notifications.'
  },
  {
    title: 'Fraud Detection System',
    icon: FaShieldAlt,
    path: '/fraud-detection-system',
    summary: 'Upload transaction data to detect fraud, get AI risk scores, and see triggered rules for each order.'
  },
  {
    title: 'Amazon Product Scraper',
    icon: FaAmazon,
    path: '/amazon-web-scrape',
    summary: 'Extract product details (name, description, rating, reviews, price) from any Amazon URL for market research, price tracking, and product analysis.'
  },
  {
    title: 'Complaint Handler Agent',
    icon: FaCommentDots,
    path: '/complaint-handler-agent',
    summary: 'Handle customer complaints and escalate issues to the appropriate team.'
  },
  {
    title: 'Business Intelligence BOT',
    icon: FaChartBar,
    path: '/business-intelligence-bot',
    summary: 'Analyze business data, generate reports, and provide insights for decision-making.'
  },
  {
    title: 'AI-Powered Restaurant Order Chatbot',
    icon: FaVial, // You may want to use a more appropriate icon
    path: '/ai-restaurant-order-chatbot',
    summary: 'Chat with our AI assistant to place your restaurant order in natural language.'
  },
  {
    title: 'Leave Approval Reminder',
    icon: FaBell,
    path: '/leave-approval-reminder',
    summary: 'Upload XLSX to send leave approval reminders and track status.'
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
          {/* <AmazonWebScrapeCard compact /> */}
          <AutomatedResearch compact />
          <InterviewPanelAutoAssignment compact />
          <PerformanceReviewSummary compact />
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