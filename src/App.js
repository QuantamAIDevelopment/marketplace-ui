import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MarketplaceDashboard from './pages/MarketplaceDashboard';
import LeavesClassifierPage from './pages/LeavesClassifierPage';
import DocumentUploadReminderPage from './pages/DocumentUploadReminderPage';
import ResumeToProfileExtractorPage from './pages/ResumeToProfileExtractorPage';
import EmailAttachmentProcessingPage from './pages/EmailAttachmentProcessingPage';
import CandidateHiringStatusPage from './pages/CandidateHiringStatusPage';
import PolicyChangeNotificationPage from './pages/PolicyChangeNotificationPage.jsx';
import PayslipAutoEncryptedPage from './pages/PayslipAutoEncryptedPage';
import AICustomerSupport from './pages/AICustomerSupport';
import ProductRecommendationPage from './pages/ProductRecommendationPage';
import ContractRedFlagDetectorPage from './pages/ContractRedFlagDetectorPage';
import InventoryManagementPage from './pages/InventoryManagementPage';
import MCQGeneratorPage from './pages/MCQGeneratorPage';
import AppointmentSchedulerPage from './pages/AppointmentSchedulerPage';
import ProductFeedbackSummarizerPage from './pages/ProductFeedbackSummarizerPage';
import DynamicPricingAgentPage from './pages/DynamicPricingAgentPage';
import MetricsBusinessAnalyticsPage from './pages/MetricsBusinessAnalyticsPage';
import MonthlyExpenditurePage from './pages/MonthlyExpenditurePage';
import FraudDetectionPage from './pages/FraudDetectionPage';
import './App.css';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';
import DashboardComponent from './components/Dashboard';
import ComplaintHandlerAgentPage from './pages/ComplaintHandlerAgentPage';
import BusinessIntelligenceBOTPage from './pages/BusinessIntelligenceBOTPage';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background-tertiary">
          <main className="flex-1 flex flex-col items-center justify-center p-4">
            <Routes>
              <Route path="/" element={<MarketplaceDashboard />} />
              <Route path="/workflows/leaves-classifier" element={<LeavesClassifierPage />} />
              <Route path="/workflows/document-upload" element={<DocumentUploadReminderPage />} />
              <Route path="/workflows/resume-extractor" element={<ResumeToProfileExtractorPage />} />
              <Route path="/workflows/email-attachment" element={<EmailAttachmentProcessingPage />} />
              <Route path="/workflows/candidate-hiring-status" element={<CandidateHiringStatusPage />} />
              <Route path="/workflows/payslip-encryption" element={<PayslipAutoEncryptedPage />} />
              <Route path="/workflows/policy-notifications" element={<PolicyChangeNotificationPage />} />
              <Route path="/ai-customer-support" element={<AICustomerSupport />} />
              <Route path="/workflows/product-recommendation" element={<ProductRecommendationPage />} />
              <Route path="/workflows/contract-red-flag" element={<ContractRedFlagDetectorPage />} />
              <Route path="/inventory-management" element={<InventoryManagementPage />} />
              <Route path="/mcq-generator" element={<MCQGeneratorPage />} />
              <Route path="/workflows/business-intelligence-bot" element={<BusinessIntelligenceBOTPage />} />
              <Route path="/complaint-handler" element={<ComplaintHandlerAgentPage />} />
              <Route path="/dashboard-component" element={<DashboardComponent />} />
            </Routes>
          </main>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
