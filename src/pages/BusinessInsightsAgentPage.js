import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChartLine, FaCheckCircle, FaExclamationTriangle, FaFileCsv } from 'react-icons/fa';
import { triggerBusinessInsightsWorkflow } from '../services/workflows/businessInsights';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';

const workflowSteps = [
  { icon: FaFileCsv, label: 'Upload CSV', color: 'bg-indigo-500' },
  { icon: FaChartLine, label: 'Processing', color: 'bg-blue-500' },
  { icon: FaCheckCircle, label: 'Complete', color: 'bg-green-500' },
];

const BusinessInsightsAgentPageContent = () => {
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
      setError('Please select a sales CSV file to upload.');
      setIsExecuting(false);
      return;
    }
    try {
      const result = await triggerBusinessInsightsWorkflow(file);
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
        {/* <h2 className="text-2xl font-bold mb-4 text-gray-900">Business Insights Agent</h2> */}
        <div className="relative z-10 w-full max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-anthropic-dark drop-shadow-lg"
          >
            Business Insights Agent
          </motion.h1>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 space-y-6 border border-gray-200 w-full">
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Upload Sales CSV</label>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full"
                required
              />
            </div>
            {error && <div className="bg-red-500 text-white p-3 rounded-lg flex items-center gap-2"><FaExclamationTriangle /> {error}</div>}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 8px 32px 0 #6366f133' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isExecuting}
              className="w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-green-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-indigo-600 hover:to-blue-600 transition-colors disabled:opacity-50"
            >
              {isExecuting ? 'Processing...' : 'Get Insights'}
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
                      <div className={`p-4 rounded-full shadow-xl border-4 border-gray-200 ${step.color} ${currentStep === idx ? 'ring-4 ring-indigo-400' : ''}`}>
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
                <h3 className="text-xl font-bold mb-4 text-center">Business Insights Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {response.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 border border-gray-200">
                      <div>
                        <span className="font-semibold text-indigo-700">Time Stamp:</span> {item["Time Stamp"] ? new Date(item["Time Stamp"]).toLocaleString() : ''}
                      </div>
                      <div>
                        <span className="font-semibold text-indigo-700">Summary:</span>
                        <ul className="list-disc pl-6 mt-1 text-gray-800">
                          <li>Total Revenue: <b>₹{item.Summary?.totalRevenue}</b></li>
                          <li>Average Revenue: <b>₹{item.Summary?.averageRevenue}</b></li>
                          <li>Min Revenue: <b>₹{item.Summary?.minRevenue}</b></li>
                          <li>Max Revenue: <b>₹{item.Summary?.maxRevenue}</b></li>
                          <li>Rows: <b>{item.Summary?.rowCount}</b></li>
                        </ul>
                      </div>
                      <div>
                        <span className="font-semibold text-red-600">Errors:</span>
                        <div className="text-gray-800 mt-1">{item.Errors}</div>
                      </div>
                      <div>
                        <span className="font-semibold text-green-700">Suggestion:</span>
                        <div className="text-gray-800 mt-1">{item.Suggestion}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const BusinessInsightsAgentPage = () => (
  <PageRevealWrapper
    heading="Business Intelligence Explainer Bot"
    description="Transform raw business data into insightful, human-readable reports—automatically and intelligently. Our AI-powered Business Intelligence Assistant ingests structured datasets (CSV, Excel, Google Sheets), detects key KPIs such as revenue, top products, and regional performance, and generates clear summaries with recommendations, trends, and issue detection—all delivered via email or your preferred reporting destination. Built for business teams, analysts, and decision-makers, this assistant removes manual work, minimizes errors, and accelerates decision-making with data-driven insights. Whether triggered by upload, webhook, or schedule, this AI agent functions as your round-the-clock data analyst—no coding required. With automatic anomaly detection, logging, and semantic summary generation using OpenAI, it plugs directly into your reporting stack, supporting spreadsheet integrations, email delivery, and custom visual output."
    details={
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-blue-700 mb-2">Example Use Cases</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Sales Reporting: Automatically summarize weekly/monthly sales with KPIs like total revenue, top product, and region growth.</li>
            <li>Marketing Performance: Generate campaign reports showing performance shifts, spikes, and suggestions.</li>
            <li>Executive Dashboards: Deliver simplified summaries directly to executives' inboxes or Notion pages.</li>
            <li>Ops & Logistics Teams: Track metrics like costs, complaints, or delivery delays, and highlight anomalies.</li>
            <li>BI Automation: Use as a preprocessing layer to summarize data before loading into dashboards or vector databases.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-purple-700 mb-2">Why This Stands Out</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Multi-Channel Data Intake: Ingests files via webhook, Google Sheets, cloud storage, or scheduled runs.</li>
            <li>LLM-Powered Analysis: Uses OpenAI (via LangChain) to analyze trends, detect anomalies, and summarize KPIs.</li>
            <li>Structured KPI Outputs: Automatically extracts and logs metrics like revenue, top product, and growth zones to Google Sheets.</li>
            <li>Automated Summary Delivery: Sends plain-English email reports with charts and metric highlights to stakeholders.</li>
            <li>Error Logging & Feedback: Captures issues (like missing fields) and recommends fixes to the user.</li>
            <li>AI-Ready Output Format: Compatible with downstream analytics, dashboards, or semantic search tools.</li>
          </ul>
        </div>
        <div className="mt-6 text-center">
          <span className="inline-block bg-gradient-to-r from-indigo-500 via-blue-500 to-green-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg">Try our Business Intelligence Assistant today—upload your dataset and get your first automated report in minutes. No code. No formulas. Just insights.</span>
        </div>
      </div>
    }
  >
    <BusinessInsightsAgentPageContent />
  </PageRevealWrapper>
);

export default BusinessInsightsAgentPage; 