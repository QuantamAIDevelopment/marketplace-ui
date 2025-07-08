import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LeavesClassifierPage from './pages/LeavesClassifierPage';
import BirthdayWorkAnniversaryPage from './pages/BirthdayWorkAnniversaryPage';
import DocumentUploadReminderPage from './pages/DocumentUploadReminderPage';
import ResumeToProfileExtractorPage from './pages/ResumeToProfileExtractorPage';
import EmailAttachmentProcessingPage from './pages/EmailAttachmentProcessingPage';
import CandidateHiringStatusPage from './pages/CandidateHiringStatusPage';
import PolicyChangeNotificationPage from './pages/PolicyChangeNotificationPage';
import PayslipAutoEncryptedPage from './pages/PayslipAutoEncryptedPage';
import AICustomerSupport from './pages/AICustomerSupport';
import ProductRecommendationPage from './pages/ProductRecommendationPage';
import ContractRedFlagDetectorPage from './pages/ContractRedFlagDetectorPage';
import InventoryManagementPage from './pages/InventoryManagementPage';
import MCQGeneratorPage from './pages/MCQGeneratorPage';
import AutomatedResearchPage from './pages/AutomatedResearchPage';
// Removed: AutomatedResearchAIPage (workflow removed)
import AppointmentSchedulerPage from './pages/AppointmentSchedulerPage';
import InterviewPanelAssignmentPage from './pages/InterviewPanelAssignmentPage';
import ProductFeedbackSummarizerPage from './pages/ProductFeedbackSummarizerPage';
import DynamicPricingAgentPage from './pages/DynamicPricingAgentPage';
import BusinessInsightsAgentPage from './pages/BusinessInsightsAgentPage';
import MetricsBusinessAnalyticsPage from './pages/MetricsBusinessAnalyticsPage';
import MonthlyExpenditurePage from './pages/MonthlyExpenditurePage';
import FraudDetectionPage from './pages/FraudDetectionPage';
import PerformanceReviewSummaryPage from './pages/PerformanceReviewSummaryPage';
import './App.css';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';
// Removed: InterviewPanelAutoAssignmentPage (workflow removed)

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background-tertiary">
          <main className="flex-1 flex flex-col items-center justify-center p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/workflows/leaves-classifier" element={<LeavesClassifierPage />} />
              <Route path="/workflows/birthday-anniversary" element={<BirthdayWorkAnniversaryPage />} />
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
              <Route path="/automated-research" element={<AutomatedResearchPage />} />
              {/* Removed: /automated-research-ai route (workflow removed) */}
              <Route path="/appointment-scheduler" element={<AppointmentSchedulerPage />} />
              <Route path="/interview-panel-assignment" element={<InterviewPanelAssignmentPage />} />
              <Route path="/workflows/product-feedback-summarizer" element={<ProductFeedbackSummarizerPage />} />
              <Route path="/workflows/dynamic-pricing" element={<DynamicPricingAgentPage />} />
              <Route path="/workflows/business-insights" element={<BusinessInsightsAgentPage />} />
              <Route path="/workflows/metrics-business-analytics" element={<MetricsBusinessAnalyticsPage />} />
              <Route path="/workflows/monthly-expenditure" element={<MonthlyExpenditurePage />} />
              <Route path="/workflows/fraud-detection" element={<FraudDetectionPage />} />
              <Route path="/workflows/performance-review-summary" element={<PerformanceReviewSummaryPage />} />
              {/* Removed: /performance-review-summary route (workflow removed) */}
              {/* Removed: /workflows/interview-panel-auto-assignment route (workflow removed) */}
            </Routes>
          </main>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
