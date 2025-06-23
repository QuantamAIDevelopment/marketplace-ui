import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChartBar, FaCheckCircle, FaExclamationTriangle, FaFileCsv } from 'react-icons/fa';
import { triggerMetricsBusinessAnalyticsWorkflow } from '../services/workflows/metricsBusinessAnalytics';
import PageRevealWrapper from '../components/PageRevealWrapper';

const workflowSteps = [
  { icon: FaFileCsv, label: 'Upload Quarterly CSVs', color: 'bg-orange-500' },
  { icon: FaChartBar, label: 'Processing', color: 'bg-pink-500' },
  { icon: FaCheckCircle, label: 'Complete', color: 'bg-green-500' },
];

const MetricsBusinessAnalyticsPageContent = () => {
  const [files, setFiles] = useState([]);
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
    setFiles(Array.from(e.target.files));
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
              >
                <h3 className="text-xl font-bold mb-4 text-center">Quarterly Business Summary</h3>
                <div className="prose prose-sm md:prose-base max-w-none text-anthropic-dark whitespace-pre-line bg-white rounded-xl p-6 border border-orange-200 shadow">
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
  <PageRevealWrapper>
    <MetricsBusinessAnalyticsPageContent />
  </PageRevealWrapper>
);

export default MetricsBusinessAnalyticsPage; 