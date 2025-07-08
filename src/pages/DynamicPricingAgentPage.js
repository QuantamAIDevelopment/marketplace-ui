import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoneyBillWave, FaCheckCircle, FaExclamationTriangle, FaFileCsv } from 'react-icons/fa';
import { triggerDynamicPricingWorkflow } from '../services/workflows/dynamicPricing';
import PageRevealWrapper from '../components/PageRevealWrapper';

const workflowSteps = [
  { icon: FaFileCsv, label: 'Upload CSV', color: 'bg-green-500' },
  { icon: FaMoneyBillWave, label: 'Processing', color: 'bg-blue-500' },
  { icon: FaCheckCircle, label: 'Complete', color: 'bg-purple-500' },
];

const DynamicPricingAgentPageContent = () => {
  const [file, setFile] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    let interval;
    if (isExecuting) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % workflowSteps.length);
      }, 900);
    }
    return () => clearInterval(interval);
  }, [isExecuting]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsExecuting(true);
    setCurrentStep(0);
    setResponse(null);
    if (!file) {
      setError('Please select a CSV file to upload.');
      setIsExecuting(false);
      return;
    }
    try {
      const result = await triggerDynamicPricingWorkflow(file);
      setResponse(result);
    } catch (err) {
      setError('Failed to run workflow. Check the console for more details.');
      setResponse(null);
    } finally {
      setIsExecuting(false);
      setCurrentStep(0);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-anthropic-dark drop-shadow-lg"
        >
          Dynamic Pricing Agent
        </motion.h1>
        <div className="relative z-10 w-full max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 space-y-6 border border-gray-200 w-full">
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Upload Product Pricing CSV</label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
                required
              />
            </div>
            {error && <div className="bg-red-500 text-white p-3 rounded-lg flex items-center gap-2"><FaExclamationTriangle /> {error}</div>}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 8px 32px 0 #22c55e33' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isExecuting}
              className="w-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-green-600 hover:to-blue-600 transition-colors disabled:opacity-50"
            >
              {isExecuting ? 'Processing...' : 'Get Dynamic Prices'}
            </motion.button>
          </form>

          <AnimatePresence>
            {isExecuting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-8 bg-white rounded-2xl p-6 shadow-2xl flex flex-col items-center border border-gray-200"
              >
                <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center text-anthropic-dark">Executing Workflow...</h2>
                <div className="flex flex-wrap justify-center items-center w-full gap-4">
                  {workflowSteps.map((step, idx) => (
                    <motion.div
                      key={idx}
                      animate={{
                        scale: currentStep === idx ? 1.2 : 0.95,
                        opacity: currentStep === idx ? 1 : 0.5
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center space-y-2"
                    >
                      <div className={`p-4 rounded-full shadow-xl border-4 border-gray-200 ${step.color} ${currentStep === idx ? 'ring-4 ring-green-400' : ''}`}>
                        <step.icon className="w-8 h-8 text-white drop-shadow-lg" />
                      </div>
                      <span className="text-xs md:text-sm text-anthropic-dark font-semibold">{step.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {response && !isExecuting && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="mt-10 bg-gray-50 rounded-2xl p-8 shadow-inner border border-gray-200"
              >
                <h3 className="text-xl font-bold mb-4 text-center">Dynamic Pricing Results</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg shadow">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="py-2 px-4 text-left">Product ID</th>
                        <th className="py-2 px-4 text-left">Product Name</th>
                        <th className="py-2 px-4 text-left">Old Price</th>
                        <th className="py-2 px-4 text-left">New Price</th>
                        <th className="py-2 px-4 text-left">Reason</th>
                        <th className="py-2 px-4 text-left">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {response.map((item, idx) => (
                        <tr key={idx} className="border-b">
                          <td className="py-2 px-4 font-bold">{item.productId}</td>
                          <td className="py-2 px-4">{item.productName}</td>
                          <td className="py-2 px-4">₹{item.oldPrice}</td>
                          <td className="py-2 px-4 font-bold text-green-700">₹{item.newPrice}</td>
                          <td className="py-2 px-4">{item.reason}</td>
                          <td className="py-2 px-4">{item.timestamp ? new Date(item.timestamp).toLocaleString() : ''}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const DynamicPricingAgentPage = () => (
  <PageRevealWrapper
    heading="Dynamic Pricing Agent"
    description="The Dynamic Pricing Agent is a smart, rule-driven pricing automation system designed for eCommerce businesses. It automatically reads live product and market data from sources like Google Sheets, evaluates pricing using AI, and updates pricing while logging changes, generating reports, and alerting stakeholders. This agent eliminates manual pricing guesswork by using an AI-powered decision engine to apply predefined pricing rules (e.g., competitor undercutting, stock aging, demand surges). It integrates seamlessly with your spreadsheets, APIs, and email for full-cycle pricing management. With built-in deduplication, audit logging, failure alerts, and formatted reporting, this no-code pricing agent helps eCommerce teams scale pricing intelligently and effortlessly."
    details={
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-blue-700 mb-2">Example Use Cases</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>eCommerce Platforms: Automatically adjust product prices on Shopify/WooCommerce based on inventory, views, or competitor pricing.</li>
            <li>B2B Catalog Management: Keep large product catalogs competitively priced in real-time without human intervention.</li>
            <li>Promotional Campaign Scheduling: Enable automatic time/day-based discounts or surge pricing logic.</li>
            <li>Data-Driven Decisioning: Generate structured logs and visual reports for audit or analytics.</li>
            <li>Pricing API Gateway: Expose an endpoint for external systems to submit product data for real-time pricing suggestions.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-purple-700 mb-2">Why This Stands Out</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Multi-Channel Data Sync<br/>Reads product details from spreadsheets, API files, and webhook payloads—ensuring wide compatibility.</li>
            <li>AI-Driven Pricing Brain<br/>Applies rules using a GPT-based LLM that interprets product context to recommend smart prices.</li>
            <li>Structured Output and Logging<br/>Saves price changes and reasoning to different Google Sheets (e.g., pricing history, audit logs).</li>
            <li>Conditional Routing<br/>Only logs or notifies when pricing changes occur. Otherwise, it explains the reason for no change.</li>
            <li>Automated Reports<br/>Generates HTML tables with all changes and sends them via Gmail as formatted emails.</li>
            <li>🛡 Error Alerts & Audit Trails<br/>Emails the team on pricing failures and saves reasoning for audit compliance.</li>
            <li>Webhook & API Integration<br/>Includes webhook for external trigger and uses append/update logic to maintain up-to-date records.</li>
            <li>LLM & Groq Integration<br/>Uses LLM nodes with Groq for fast and cost-efficient AI processing with strict JSON output enforcement.</li>
          </ul>
        </div>
        <div className="mt-6 text-center">
          <span className="inline-block bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg">Use the Dynamic Pricing Agent to automate your pricing decisions today. Launch in minutes, no code required—just connect your sheet and go!</span>
        </div>
      </div>
    }
  >
    <DynamicPricingAgentPageContent />
  </PageRevealWrapper>
);

export default DynamicPricingAgentPage; 