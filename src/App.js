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
import SalesForecastingPage from './pages/SalesForecastingPage';
import AppointmentSchedulerPage from './pages/AppointmentSchedulerPage';
import ProductFeedbackSummarizerPage from './pages/ProductFeedbackSummarizerPage';
import DynamicPricingAgentPage from './pages/DynamicPricingAgentPage';
import BusinessInsightsAgentPage from './pages/BusinessInsightsAgentPage';
import MetricsBusinessAnalyticsPage from './pages/MetricsBusinessAnalyticsPage';
import MonthlyExpenditurePage from './pages/MonthlyExpenditurePage';
import FraudDetectionPage from './pages/FraudDetectionPage';
import DatabaseMigrationAIPage from './pages/DatabaseMigrationAIPage';

import NotionKnowledgeBaseAIAssistantPage from './pages/NotionKnowledgeBaseAIAssistantPage';
import TestGeneratorPage from './pages/TestGeneratorPage';
import AmazonWebScrapePage from './pages/AmazonWebScrapePage';
import SentimentAgentPage from './pages/SentimentAgentPage';

import './App.css';
import './index.css';

import SmartInvoiceAIPage from './pages/SmartInvoiceAIPage';
import AutomateCandidateAcceptancePage from './pages/AutomateCandidateAcceptancePage';

import GmailCategorizationPage from './pages/GmailCategorizationPage';
import ResumeAnalyzerPage from './pages/ResumeAnalyzerPage';
import CustomerSupportAgentPage from './pages/CustomerSupportAgentPage';
import LeaveBalanceChatbotPage from './pages/LeaveBalanceChatbotPage';
import './App.css';
import './index.css';
import ErrorBoundary from './components/workflows/ErrorBoundary';
import PdfSummarizerPage from './pages/PdfSummarizerPage';


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
              <Route path="/contract-red-flag-detector" element={<ContractRedFlagDetectorPage />} />
              <Route path="/inventory-management" element={<InventoryManagementPage />} />
              <Route path="/mcq-generator" element={<MCQGeneratorPage />} />

              <Route path="/workflows/testmonial-extractor" element={React.createElement(require('./pages/TestmonialExtractorPage.jsx').default)} />
              <Route path="/workflows/dynamic-model-selector" element={React.createElement(require('./pages/DynamicModelSelectorPage.jsx').default)} />
              <Route path="/test-generator" element={<TestGeneratorPage />} />
              <Route path="/sales-forecasting" element={<SalesForecastingPage />} />
              <Route path="/appointment-scheduler" element={<AppointmentSchedulerPage />} />
              <Route path="/workflows/product-feedback-summarizer" element={<ProductFeedbackSummarizerPage />} />
              <Route path="/workflows/dynamic-pricing" element={<DynamicPricingAgentPage />} />
              <Route path="/workflows/business-insights" element={<BusinessInsightsAgentPage />} />
              <Route path="/workflows/metrics-business-analytics" element={<MetricsBusinessAnalyticsPage />} />
              <Route path="/workflows/monthly-expenditure" element={<MonthlyExpenditurePage />} />
              <Route path="/workflows/fraud-detection" element={<FraudDetectionPage />} />

              <Route path="/smart-invoice-ai" element={<SmartInvoiceAIPage />} />
              <Route path="/automate-candidate-acceptance" element={<AutomateCandidateAcceptancePage />} />
              <Route path="/workflows/database-migration-ai" element={<DatabaseMigrationAIPage />} />
              <Route path="/workflows/notion-knowledge-base-ai" element={<NotionKnowledgeBaseAIAssistantPage />} />
              <Route path="/amazon-web-scrape" element={<AmazonWebScrapePage />} />
              <Route path="/gmail-categorization" element={<GmailCategorizationPage />} />
              <Route path="/resume-analyzer" element={<ResumeAnalyzerPage />} />
              <Route path="/sentiment-agent-report" element={<SentimentAgentPage />} />
              <Route path="/customer-support-agent" element={<CustomerSupportAgentPage />} />
              <Route path="/pdf-summarizer" element={<PdfSummarizerPage />} />
              <Route path="/leave-balance-chatbot" element={<LeaveBalanceChatbotPage />} />
            </Routes>
          </main>
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
