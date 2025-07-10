import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import InventoryPredictAIPage from './pages/InventoryPredictAIPage';
import LeavesClassifierPage from './pages/LeavesClassifierPage';
import DocumentUploadReminderPage from './pages/DocumentUploadReminderPage';
import ResumeToProfileExtractorPage from './pages/ResumeToProfileExtractorPage';
import EmailAttachmentProcessingPage from './pages/EmailAttachmentProcessingPage';
import PolicyChangeNotificationPage from './pages/PolicyChangeNotificationPage';
import PayslipAutoEncryptedPage from './pages/PayslipAutoEncryptedPage';
import AICustomerSupport from './pages/AICustomerSupport';
import ProductRecommendationPage from './pages/ProductRecommendationPage';
import ContractRedFlagDetectorPage from './pages/ContractRedFlagDetectorPage';
import InventoryManagementPage from './pages/InventoryManagementPage';
import MCQGeneratorPage from './pages/MCQGeneratorPage';
import AutomatedResearchPage from './pages/AutomatedResearchPage';
import AppointmentSchedulerPage from './pages/AppointmentSchedulerPage';
import InterviewPanelAssignmentPage from './pages/InterviewPanelAssignmentPage';
import ProductFeedbackSummarizerPage from './pages/ProductFeedbackSummarizerPage';
import DynamicPricingAgentPage from './pages/DynamicPricingAgentPage';
import MetricsBusinessAnalyticsPage from './pages/MetricsBusinessAnalyticsPage';
import MonthlyExpenditurePage from './pages/MonthlyExpenditurePage';
import FraudDetectionSystemPage from './pages/FraudDetectionSystemPage.jsx';
import OnBoardingQPage from './pages/OnBoardingQPage';
import LeaveApprovalReminderPage from './pages/LeaveApprovalReminderPage';
import AIPoweredRestaurantOrderChatbotPage from './pages/AIPoweredRestaurantOrderChatbotPage';
import PerformanceReviewSummaryPage from './pages/PerformanceReviewSummaryPage';
import DatabaseMigrationAIPage from './pages/DatabaseMigrationAIPage';
import NotionKnowledgeBaseAIAssistantPage from './pages/NotionKnowledgeBaseAIAssistantPage';
import ATS_TO_HRMS_CANDIDATE_StatusSyncPage from './pages/ATS_TO_HRMS_CANDIDATE_StatusSyncPage';
import TestGeneratorPage from './pages/TestGeneratorPage';
import AmazonWebScrapePage from './pages/AmazonWebScrapePage';
import SentimentAgentPage from './pages/SentimentAgentPage';
import BackgroundVerificationAgentPage from './pages/BackgroundVerificationAgentPage';
import './App.css';
import './index.css';
import SmartInvoiceAIPage from './pages/SmartInvoiceAIPage';
import AutomateCandidateAcceptancePage from './pages/AutomateCandidateAcceptancePage';
import AutomateCandidateAcceptanceCoverPage from './pages/AutomateCandidateAcceptanceCoverPage';
import GmailCategorizationPage from './pages/GmailCategorizationPage';
import ResumeAnalyzerPage from './pages/ResumeAnalyzerPage';
import CustomerSupportAgentPage from './pages/CustomerSupportAgentPage';
import LeaveBalanceChatbotPage from './pages/LeaveBalanceChatbotPage';
import AIBackroundVerificationPage from './pages/AIBackroundVerificationPage';
import ErrorBoundary from './components/workflows/ErrorBoundary';
import PdfSummarizerPage from './pages/PdfSummarizerPage';
import PRSummaryAgentPage from './pages/PRSummaryAgentPage';
import PRReviewerAIAgentPage from './pages/PRReviewerAIAgentPage';
import PRSummaryAgentFormPage from './pages/PRSummaryAgentFormPage';
import PRReviewerAIAgentFormPage from './pages/PRReviewerAIAgentFormPage';
import ProjectCoastReportsPage from './pages/ProjectCoastReportsPage';
import AI_Powered_Book_Price_TrackerPage from './pages/AI_Powered_Book_Price_TrackerPage';
import SalesForecastingPage from './pages/SalesForecastingPage';
import BirthdayWorkAnniversaryPage from './pages/BirthdayWorkAnniversaryPage';
import AttendanceAnomaliesPage from "./pages/AttendanceAnomaliesPage"
import FetchLeadsPage from "./pages/FetchLeadsPage"
import AppNav from "../src/components/AppNav"
import ComplaintHandlerAgentPage from './pages/ComplaintHandlerAgentPage';
import BusinessIntelligenceBOTPage from './pages/BusinessIntelligenceBOTPage';
import DynamicModelSelectorPage from './pages/DynamicModelSelectorPage';
import TestmonialExtractorPage from './pages/TestmonialExtractorPage';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background-tertiary">
          <main className="flex-1 flex flex-col items-center justify-center p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inventory-predict-ai" element={<InventoryPredictAIPage />} />
              <Route path="/onboarding-q" element={<OnBoardingQPage />} />
              <Route path="/workflows/leaves-classifier" element={<LeavesClassifierPage />} />
              <Route path="/workflows/document-upload" element={<DocumentUploadReminderPage />} />
              <Route path="/workflows/resume-extractor" element={<ResumeToProfileExtractorPage />} />
              <Route path="/workflows/email-attachment" element={<EmailAttachmentProcessingPage />} />
              <Route path="/workflows/payslip-encryption" element={<PayslipAutoEncryptedPage />} />
              <Route path="/workflows/policy-notifications" element={<PolicyChangeNotificationPage />} />
              <Route path="/ai-customer-support" element={<AICustomerSupport />} />
              <Route path="/workflows/product-recommendation" element={<ProductRecommendationPage />} />
              <Route path="/workflows/contract-red-flag" element={<ContractRedFlagDetectorPage />} />
              <Route path="/inventory-management" element={<InventoryManagementPage />} />
              <Route path="/mcq-generator" element={<MCQGeneratorPage />} />
              <Route path="/automated-research" element={<AutomatedResearchPage />} />
              <Route path="/appointment-scheduler" element={<AppointmentSchedulerPage />} />
              <Route path="/interview-panel-assignment" element={<InterviewPanelAssignmentPage />} />
              <Route path="/workflows/product-feedback-summarizer" element={<ProductFeedbackSummarizerPage />} />
              <Route path="/workflows/dynamic-pricing" element={<DynamicPricingAgentPage />} />
              <Route path="/workflows/metrics-business-analytics" element={<MetricsBusinessAnalyticsPage />} />
              <Route path="/monthly-expenditure" element={<MonthlyExpenditurePage />} />
              <Route path="/workflows/monthly-expenditure" element={<MonthlyExpenditurePage />} />
              <Route path="/workflows/fraud-detection" element={<FraudDetectionSystemPage />} />
              <Route path="/workflows/performance-review-summary" element={<PerformanceReviewSummaryPage />} />
              <Route path="/workflows/leave-approval-reminder" element={<LeaveApprovalReminderPage />} />
              <Route path="/workflows/restaurant-order-chatbot" element={<AIPoweredRestaurantOrderChatbotPage />} />
              <Route path="/smart-invoice-ai" element={<SmartInvoiceAIPage />} />
              <Route path="/automate-candidate-acceptance" element={<AutomateCandidateAcceptancePage />} />
              <Route path="/automate-candidate-acceptance/cover" element={<AutomateCandidateAcceptanceCoverPage />} />

              <Route path="/attendance-anomalies" element={<AttendanceAnomaliesPage />} />
              <Route path="/fetch-leads" element={<FetchLeadsPage />} />
              <Route path="/workflows/database-migration-ai" element={<DatabaseMigrationAIPage />} />
              <Route path="/workflows/notion-knowledge-base-ai" element={<NotionKnowledgeBaseAIAssistantPage />} />
              <Route path="/workflows/ats-to-hrms-candidate-status-sync" element={<ATS_TO_HRMS_CANDIDATE_StatusSyncPage />} />
              <Route path="/amazon-web-scrape" element={<AmazonWebScrapePage />} />
              <Route path="/gmail-categorization" element={<GmailCategorizationPage />} />
              <Route path="/resume-analyzer" element={<ResumeAnalyzerPage />} />
              <Route path="/ai-background-verification" element={<AIBackroundVerificationPage />} />
              <Route path="/sentiment-agent-report" element={<SentimentAgentPage />} />
              <Route path="/customer-support-agent" element={<CustomerSupportAgentPage />} />
              <Route path="/pdf-summarizer" element={<PdfSummarizerPage />} />
              <Route path="/leave-balance-chatbot" element={<LeaveBalanceChatbotPage />} />
              <Route path="/pr-summary-agent" element={<PRSummaryAgentPage />} />
              <Route path="/pr-summary-agent/form" element={<PRSummaryAgentFormPage />} />
              <Route path="/pr-reviewer-ai-agent" element={<PRReviewerAIAgentPage />} />
              <Route path="/pr-reviewer-ai-agent/form" element={<PRReviewerAIAgentFormPage />} />
              <Route path="/pr-reviewer-agent" element={<PRReviewerAIAgentPage />} />
              <Route path="/background-verification-agent" element={<BackgroundVerificationAgentPage />} />
              <Route path="/project-coast-reports" element={<ProjectCoastReportsPage />} />
              <Route path="/ai-book-price-tracker" element={<AI_Powered_Book_Price_TrackerPage />} />
              <Route path="/fraud-detection-system" element={<FraudDetectionSystemPage />} />
              <Route path="/sales-forecasting" element={<SalesForecastingPage />} />
              <Route path="/workflows/birthday-anniversary" element={<BirthdayWorkAnniversaryPage />} />
              <Route path="/complaint-handler-agent" element={<ComplaintHandlerAgentPage />} />
              <Route path="/business-intelligence-bot" element={<BusinessIntelligenceBOTPage />} />
              <Route path="/workflows/dynamic-model-selector" element={<DynamicModelSelectorPage />} />
              <Route path="/workflows/testmonial-extractor" element={<TestmonialExtractorPage />} />
            </Routes>
          </main>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
