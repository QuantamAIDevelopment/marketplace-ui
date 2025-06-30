import React from 'react';
import PageRevealWrapper from '../components/PageRevealWrapper';
import InventoryPredictAI from '../components/workflows/InventoryPredictAI';
import { uploadInventoryAndGetForecast } from '../services/workflows/inventoryPredictAI';

const FeaturesSection = () => (
  <div>
    <h2 className="font-semibold text-blue-700 mb-2">Features</h2>
    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
      <li>Upload inventory spreadsheets (CSV, XLSX, Google Sheets export supported).</li>
      <li>AI-powered demand forecasting for each SKU/product.</li>
      <li>Stockout and overstock risk detection with actionable suggestions.</li>
      <li>Lead time and reorder date recommendations.</li>
      <li>Human-readable summary for every product.</li>
      <li>Email alerts for critical stock situations (if configured in backend).</li>
    </ul>
  </div>
);

const UseCasesSection = () => (
  <div>
    <h2 className="font-semibold text-purple-700 mb-2">Example Use Cases</h2>
    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
      <li>Retailers: Prevent stockouts and overstock, optimize inventory turns.</li>
      <li>Warehouse Managers: Get daily/weekly actionable inventory insights.</li>
      <li>eCommerce: Automate inventory planning and replenishment.</li>
      <li>Supply Chain Teams: Identify at-risk SKUs and take action before issues arise.</li>
    </ul>
  </div>
);

const WhyStandsOutSection = () => (
  <div>
    <h2 className="font-semibold text-blue-700 mb-2">⚡ Why This Stands Out</h2>
    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
      <li>Instant, AI-powered inventory forecasting and actionable insights.</li>
      <li>Detects both stockout and overstock risks for every SKU.</li>
      <li>Easy upload: supports CSV, XLSX, and Google Sheets exports.</li>
      <li>Human-readable, actionable summaries for business users.</li>
      <li>Email alerts for critical inventory situations (if enabled).</li>
    </ul>
  </div>
);

const MainCardSection = () => (
  <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Inventory Forecasting Agent</h1>
    <div className="mb-6 text-center text-gray-600">
      Upload your inventory spreadsheet to get AI-powered sales forecasts, stockout/overstock risks, and actionable suggestions for each product. Powered by Evenmind-AI.
    </div>
    <InventoryPredictAI />
  </div>
);

const InventoryPredictAIPage = () => (
  <PageRevealWrapper
    heading="Evenmind-AI: Inventory Forecasting Agent"
    description="Upload your inventory file and get instant, AI-powered forecasts, risk alerts, and actionable suggestions for every product."
    details={
      <>
        <FeaturesSection />
        <UseCasesSection />
        <WhyStandsOutSection />
      </>
    }
  >
    <MainCardSection />
  </PageRevealWrapper>
);

export default InventoryPredictAIPage; 