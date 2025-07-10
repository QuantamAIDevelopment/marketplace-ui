import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChartBar, FaCheckCircle, FaExclamationTriangle, FaFileCsv } from 'react-icons/fa';
import { triggerMetricsBusinessAnalyticsWorkflow } from '../services/workflows/metricsBusinessAnalytics';

import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);

const workflowSteps = [
  { icon: FaFileCsv, label: 'Upload Quarterly CSVs', color: 'bg-orange-500' },
  { icon: FaChartBar, label: 'Processing', color: 'bg-pink-500' },
  { icon: FaCheckCircle, label: 'Complete', color: 'bg-green-500' },
];

function parseSummary(summary) {
  if (typeof summary !== 'string') return null;
  const lines = summary.split('\n').filter(l => l.trim().startsWith('-'));
  return lines.map(l => {
    const match = l.match(/^-\s*([\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1F680}-\u{1F6FF}])\s*(.*)$/u);
    if (match) return { icon: match[1], text: match[2] };
    return { icon: '', text: l.replace(/^-\s*/, '') };
  });
}

const MetricsBusinessAnalyticsPageContent = () => {
  const [files, setFiles] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [uploadedFileNames, setUploadedFileNames] = useState([]);

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
    const filesArr = Array.from(e.target.files);
    setFiles(filesArr);
    setUploadedFileNames(filesArr.map(f => f.name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsExecuting(true);
    setCurrentStep(0);
    setResponse(null);
    if (!files.length) {
      setError('Please select all required quarterly CSV files to upload.');
      setIsExecuting(false);
      return;
    }
    try {
      const result = await triggerMetricsBusinessAnalyticsWorkflow(files);
      setResponse(result);
    } catch (err) {
      setError('Failed to run workflow. Check the console for more details.');
      setResponse(null);
    } finally {
      setIsExecuting(false);
      setCurrentStep(0);
    }
  };

  const downloadSummaryAsPDF = () => {
    const input = document.getElementById('mba-summary-section');
    if (!input) return;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
      pdf.save('Quarterly_Business_Summary.pdf');
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl mx-auto">
        {/* <h2 className="text-2xl font-bold mb-4 text-gray-900">Metrics Business Analytics</h2> */}
        <div className="relative z-10 w-full max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-anthropic-dark drop-shadow-lg"
          >
            Metrics Business Analytics
          </motion.h1>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 space-y-6 border border-gray-200 w-full">
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Upload Quarterly CSVs (orders, inventory, traffic, marketing, customers)</label>
              <input
                type="file"
                accept=".csv"
                multiple
                onChange={handleFileChange}
                className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-orange-400 w-full"
                required
              />
              <div className="text-xs text-gray-500 mt-1">Select all 5 required CSVs at once for best results.</div>
              {uploadedFileNames.length > 0 && (
                <ul className="text-xs text-gray-700 mt-2 flex flex-wrap gap-2">
                  {uploadedFileNames.map((name, idx) => (
                    <li key={idx} className="bg-gray-200 rounded px-2 py-1">{name}</li>
                  ))}
                </ul>
              )}
            </div>
            {error && <div className="bg-red-500 text-white p-3 rounded-lg flex items-center gap-2"><FaExclamationTriangle /> {error}</div>}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 8px 32px 0 #f59e4233' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isExecuting}
              className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-green-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-orange-600 hover:to-pink-600 transition-colors disabled:opacity-50"
            >
              {isExecuting ? 'Processing...' : 'Get Quarterly Summary'}
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
                      <div className={`p-4 rounded-full shadow-xl border-4 border-gray-200 ${step.color} ${currentStep === idx ? 'ring-4 ring-orange-400' : ''}`}>
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
                id="mba-summary-section"
              >
                <h3 className="text-xl font-bold mb-4 text-center">Quarterly Business Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {parseSummary(response)?.map((insight, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white rounded-xl shadow p-4 border-l-4 border-orange-400">
                      <span className="text-2xl md:text-3xl">{insight.icon}</span>
                      <span className="text-sm md:text-base text-anthropic-dark">{insight.text}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white rounded-xl shadow p-4">
                    <h4 className="font-semibold mb-2">Top Selling SKUs</h4>
                    <Bar data={{
                      labels: ['SKU1', 'SKU2', 'SKU3', 'SKU4', 'SKU5'],
                      datasets: [{
                        label: 'Units Sold',
                        data: [120, 95, 80, 60, 45],
                        backgroundColor: 'rgba(255, 159, 64, 0.7)'
                      }]
                    }} options={{ responsive: true, plugins: { legend: { display: false } } }} />
                  </div>
                  <div className="bg-white rounded-xl shadow p-4">
                    <h4 className="font-semibold mb-2">Marketing Campaign Performance</h4>
                    <Pie data={{
                      labels: ['Campaign A', 'Campaign B', 'Campaign C'],
                      datasets: [{
                        label: 'Spend',
                        data: [30000, 20000, 15000],
                        backgroundColor: ['#f59e42', '#ec4899', '#10b981']
                      }]
                    }} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} />
                  </div>
                  <div className="bg-white rounded-xl shadow p-4 col-span-1 md:col-span-2">
                    <h4 className="font-semibold mb-2">Website Traffic & Conversion Trends</h4>
                    <Line data={{
                      labels: ['Mar', 'Apr', 'May'],
                      datasets: [
                        { label: 'Visits', data: [12000, 15000, 17000], borderColor: '#f59e42', backgroundColor: 'rgba(245,158,66,0.2)', tension: 0.4 },
                        { label: 'Conversions', data: [300, 400, 500], borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.2)', tension: 0.4 }
                      ]
                    }} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 justify-center mt-6">
                  <button onClick={downloadSummaryAsPDF} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold shadow">Download as PDF</button>
                </div>
                <div className="prose prose-sm md:prose-base max-w-none text-anthropic-dark whitespace-pre-line bg-white rounded-xl p-6 border border-orange-200 shadow mt-8">
                  {typeof response === 'string' ? response : Array.isArray(response) ? response.join('\n') : JSON.stringify(response)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const MetricsBusinessAnalyticsPage = () => (
  <PageRevealWrapper
    heading="AI Business Insights Agent"
    description="Turn raw business data into executive-ready insights—automatically and accurately. The AI Business Insights Agent ingests quarterly files (orders, inventory, customers, marketing, and traffic), processes them through intelligent logic, and transforms them into a clear, actionable summary. From SKU trends to traffic conversions, this workflow merges analytics, AI summarization, and multi-source aggregation—then delivers a concise quarterly report via email or dashboard. Whether you're a founder, analyst, or marketing lead, get a full picture of your business without touching a spreadsheet. With built-in semantic analysis, funnel drop-off detection, and margin calculations, this agent is your always-on business analyst."
    details={
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-blue-700 mb-2">Example Use Cases</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Startup Growth Teams: Upload quarterly reports and instantly get performance summaries to share with investors or teams.</li>
            <li>Ecommerce Owners: Identify top-selling SKUs, low stock items, and high returns—without Excel.</li>
            <li>Marketing Leaders: See CTR, ROAS, and spend effectiveness across campaigns in one view.</li>
            <li>Product Teams: Understand what's selling, what's stagnating, and what to restock.</li>
            <li>Operations Managers: Get funnel performance and traffic changes to refine user journeys.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-purple-700 mb-2">Why This Stands Out</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Multi-Source Parsing: Reads PDFs, spreadsheets, or raw data—no manual prep needed</li>
            <li>LLM-Powered Summary: Translates complex data into human-readable reports using AI</li>
            <li>End-to-End Funnel Analysis: Includes traffic-to-cart and cart-to-purchase drop-offs</li>
            <li>Inventory & Return Alerts: Detects low stock and high-return items early</li>
            <li>Profitability Insights: Calculates margins, AOV, and customer segments</li>
            <li>Instant Output: Final summary emailed or sent to Notion/Slack in real-time</li>
            <li>Modular Design: Plug in your existing stack—zero-code automation</li>
          </ul>
        </div>
        <div className="mt-6 text-center">
          <span className="inline-block bg-gradient-to-r from-orange-500 via-pink-500 to-green-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg">Try the AI Business Insights Agent for your next quarterly review—just upload your reports and get your insights in minutes.</span>
        </div>
      </div>
    }
  >
    <MetricsBusinessAnalyticsPageContent />
  </PageRevealWrapper>
);

export default MetricsBusinessAnalyticsPage; 