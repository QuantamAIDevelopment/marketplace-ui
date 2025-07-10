

import React from 'react';
import { Link } from 'react-router-dom';
import { FaRobot, FaCalendarAlt, FaFileAlt, FaUserAlt, FaBirthdayCake, FaFileInvoiceDollar, FaEnvelope, FaFileContract, FaBoxOpen, FaWarehouse, FaBrain, FaCommentDots, FaMoneyBillWave, FaChartBar, FaRupeeSign, FaShieldAlt, FaChartLine } from 'react-icons/fa';

const workflows = [
  { title: 'AI Customer Support', icon: FaRobot, path: '/ai-customer-support' },
  { title: 'Leaves Classifier', icon: FaCalendarAlt, path: '/workflows/leaves-classifier' },
  { title: 'Document Upload Reminder', icon: FaFileAlt, path: '/workflows/document-upload' },
  { title: 'Candidate Hiring Status', icon: FaUserAlt, path: '/workflows/candidate-hiring-status' },
  { title: 'Payslip Auto Encrypted', icon: FaFileInvoiceDollar, path: '/workflows/payslip-encryption' },
  { title: 'Email Attachment Processing', icon: FaEnvelope, path: '/workflows/email-attachment' },
  { title: 'Policy Change Notification', icon: FaFileAlt, path: '/workflows/policy-notifications' },
  { title: 'Resume to Profile Extractor', icon: FaUserAlt, path: '/workflows/resume-extractor' },
  { title: 'Contract Red Flag Detector', icon: FaFileContract, path: '/workflows/contract-red-flag' },
  { title: 'Product Recommendation Agent', icon: FaBoxOpen, path: '/workflows/product-recommendation' },
  { title: 'Business Intelligence Explainer Bot', icon: FaChartBar, path: '/workflows/business-intelligence-bot' },
  { title: 'Product Feedback Summarizer', icon: FaCommentDots, path: '/workflows/product-feedback-summarizer' },
  { title: 'Dynamic Pricing Agent', icon: FaMoneyBillWave, path: '/workflows/dynamic-pricing' },
  { title: 'Metrics Business Analytics', icon: FaChartBar, path: '/workflows/metrics-business-analytics' },
  { title: 'Monthly Expenditure', icon: FaRupeeSign, path: '/workflows/monthly-expenditure' },
  { title: 'Fraud Detection', icon: FaShieldAlt, path: '/workflows/fraud-detection' },
  { title: 'Inventory Management', icon: FaWarehouse, path: '/inventory-management' },
  { title: 'Appointment Scheduler', icon: FaCalendarAlt, path: '/appointment-scheduler' },
  { title: 'MCQ Generator & Trainer', icon: FaBrain, path: '/mcq-generator' },
  { title: 'Complaint Handler Agent', icon: FaCommentDots, path: '/complaint-handler' },
];

const MarketplaceDashboard = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 p-8">
    <h1 className="text-3xl font-bold mb-8 text-center text-gradient">Workflow Dashboard</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
      {workflows.map(({ title, icon: Icon, path }) => (
        <Link key={title} to={path} className="bg-white shadow-lg rounded-xl p-6 hover:bg-purple-50 transition border border-blue-100 flex flex-col items-center">
          <Icon className="w-8 h-8 text-purple-500 mb-3" />
          <div className="font-semibold text-lg mb-1 text-center">{title}</div>
        </Link>
      ))}
    </div>
    <div className="mt-12 flex flex-col items-center">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full text-center">
        <h2 className="text-xl font-bold mb-2 text-gradient">Need Help Getting Started?</h2>
        <p className="text-gray-500 mb-4">Our team is here to help you implement and optimize these workflows for your business.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-primary">Contact Support</button>
          <button className="btn-ghost">View Documentation</button>
        </div>
      </div>
    </div>
  </div>
);

export default MarketplaceDashboard;
