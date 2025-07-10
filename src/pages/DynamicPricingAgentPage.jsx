import React from 'react';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';
import DynamicPricingAgent from '../components/workflows/DynamicPricingAgent';

const DynamicPricingAgentPage = () => {
  return (
    <PageRevealWrapper
      heading="Dynamic Pricing Agent"
      description="Upload your product inventory CSV to automatically calculate optimal prices using AI-driven rules. Get instant pricing recommendations and reasons for each change."
      details={
        <div>
          <section>
            <h2>Features</h2>
            <ul className="list-disc ml-6">
              <li>Bulk Upload: Process thousands of products in seconds with a single file.</li>
              <li>AI + Rules: Combines machine learning and business logic for optimal pricing.</li>
              <li>Transparent Explanations: Every price change comes with a clear, human-readable reason.</li>
              <li>Audit Trail: Downloadable reports with timestamps for compliance and review.</li>
              <li>No Coding Needed: Simple upload-and-go interface for all users.</li>
            </ul>
          </section>
          <section>
            <h2>Example Use Case</h2>
            <p>
              An e-commerce manager wants to optimize prices for 500+ products based on inventory levels, competitor pricing, and sales trends. By uploading a CSV of their current catalog, the Dynamic Pricing Agent instantly recommends new prices, explains the rationale (e.g., "Stock running low, price increased by 10%"), and provides a timestamped audit trail. This enables rapid, data-driven pricing decisions that maximize revenue and reduce manual effort.
            </p>
          </section>
          <section>
            <h2>Why This Stands Out</h2>
            <ul className="list-disc ml-6">
              <li>Combines AI and business rules for highly accurate, context-aware pricing.</li>
              <li>Explains every price change with clear, human-readable reasons.</li>
              <li>Works with bulk uploads—process thousands of products in seconds.</li>
              <li>Provides a transparent audit trail for compliance and review.</li>
            </ul>
          </section>
        </div>
      }
    >
      <DynamicPricingAgent />
    </PageRevealWrapper>
  );
};

export default DynamicPricingAgentPage; 