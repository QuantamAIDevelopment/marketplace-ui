import React from 'react';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';
import InventoryForecastingAgent from '../components/workflows/InventoryForecastingAgent';

const InventoryForecastingAgentPage = () => (
  <PageRevealWrapper
    heading="Inventory Forecasting Agent"
    description="Upload your inventory CSV to get AI-powered sales forecasts, stockout/overstock risks, and actionable suggestions for each product."
  >
    <InventoryForecastingAgent />
  </PageRevealWrapper>
);

export default InventoryForecastingAgentPage; 