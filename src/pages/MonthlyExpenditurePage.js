import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRupeeSign, FaFileUpload, FaRobot, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { submitManualBill, uploadBillFile, chatExpenditure } from '../services/workflows/monthlyExpenditure';
import PageRevealWrapper from '../components/PageRevealWrapper';

const tabs = [
  { label: 'Manual Bill Entry', icon: FaRupeeSign },
  { label: 'Upload Bill File', icon: FaFileUpload },
  { label: 'Chatbot', icon: FaRobot },
];

const workflowSteps = [
  { icon: FaRupeeSign, label: 'Input', color: 'bg-teal-500' },
  { icon: FaCheckCircle, label: 'Processing', color: 'bg-blue-500' },
  { icon: FaCheckCircle, label: 'Complete', color: 'bg-green-500' },
];

const MonthlyExpenditurePageContent = () => {
  const [activeTab, setActiveTab] = useState(0);
  // Manual Bill Entry
  const [manualForm, setManualForm] = useState({ amount: '', merchant: '', transaction: '' });
  // Upload Bill File
  const [billFile, setBillFile] = useState(null);
  // Chatbot
  const [chatInput, setChatInput] = useState('');

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

  // Handlers for each tab
  const handleManualChange = (e) => {
    const { name, value } = e.target;
    setManualForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsExecuting(true);
    setCurrentStep(0);
    setResponse(null);
    if (!manualForm.amount || !manualForm.merchant || !manualForm.transaction) {
      setError('All fields are required.');
      setIsExecuting(false);
      return;
    }
    try {
      const result = await submitManualBill(manualForm);
      setResponse(result);
    } catch (err) {
      setError('Failed to submit bill. Check the console for more details.');
      setResponse(null);
    } finally {
      setIsExecuting(false);
      setCurrentStep(0);
    }
  };

  const handleBillFileChange = (e) => {
    setBillFile(e.target.files[0]);
  };

  const handleBillFileSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsExecuting(true);
    setCurrentStep(0);
    setResponse(null);
    if (!billFile) {
      setError('Please select a bill file to upload.');
      setIsExecuting(false);
      return;
    }
    try {
      const result = await uploadBillFile(billFile);
      setResponse(result);
    } catch (err) {
      setError('Failed to upload bill file. Check the console for more details.');
      setResponse(null);
    } finally {
      setIsExecuting(false);
      setCurrentStep(0);
    }
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsExecuting(true);
    setCurrentStep(0);
    setResponse(null);
    if (!chatInput) {
      setError('Please enter a message.');
      setIsExecuting(false);
      return;
    }
    try {
      const result = await chatExpenditure(chatInput);
      setResponse(result);
    } catch (err) {
      setError('Failed to chat with expenditure bot. Check the console for more details.');
      setResponse(null);
    } finally {
      setIsExecuting(false);
      setCurrentStep(0);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl mx-auto">
        {/* <h2 className="text-2xl font-bold mb-4 text-gray-900">Monthly Expenditure</h2> */}
        <div className="relative z-10 w-full max-w-2xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-anthropic-dark drop-shadow-lg"
          >
            Monthly Expenditure
          </motion.h1>
          <div className="flex gap-2 mb-6 justify-center">
            {tabs.map((tab, idx) => (
              <button
                key={tab.label}
                onClick={() => { setActiveTab(idx); setResponse(null); setError(null); }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-colors ${activeTab === idx ? 'bg-teal-500 text-white' : 'bg-gray-100 text-anthropic-dark hover:bg-teal-100'}`}
              >
                <tab.icon className="w-5 h-5" /> {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 space-y-6 border border-gray-200 w-full">
            {activeTab === 0 && (
              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Amount (₹)</label>
                    <input
                      type="number"
                      name="amount"
                      value={manualForm.amount}
                      onChange={handleManualChange}
                      className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-teal-400 w-full"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Merchant / Paid To</label>
                    <input
                      type="text"
                      name="merchant"
                      value={manualForm.merchant}
                      onChange={handleManualChange}
                      className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-teal-400 w-full"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2 md:col-span-2">
                    <label className="font-semibold">Transaction Date</label>
                    <input
                      type="date"
                      name="transaction"
                      value={manualForm.transaction}
                      onChange={handleManualChange}
                      className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-teal-400 w-full"
                      required
                    />
                  </div>
                </div>
                {error && <div className="bg-red-500 text-white p-3 rounded-lg flex items-center gap-2"><FaExclamationTriangle /> {error}</div>}
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 32px 0 #14b8a633' }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isExecuting}
                  className="w-full bg-gradient-to-r from-teal-500 via-blue-500 to-green-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-teal-600 hover:to-blue-600 transition-colors disabled:opacity-50"
                >
                  {isExecuting ? 'Processing...' : 'Submit Bill'}
                </motion.button>
              </form>
            )}
            {activeTab === 1 && (
              <form onSubmit={handleBillFileSubmit} className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">Upload Bill File (Image/PDF)</label>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleBillFileChange}
                    className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-teal-400 w-full"
                    required
                  />
                </div>
                {error && <div className="bg-red-500 text-white p-3 rounded-lg flex items-center gap-2"><FaExclamationTriangle /> {error}</div>}
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 32px 0 #14b8a633' }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isExecuting}
                  className="w-full bg-gradient-to-r from-teal-500 via-blue-500 to-green-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-teal-600 hover:to-blue-600 transition-colors disabled:opacity-50"
                >
                  {isExecuting ? 'Processing...' : 'Upload Bill'}
                </motion.button>
              </form>
            )}
            {activeTab === 2 && (
              <form onSubmit={handleChatSubmit} className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">Ask a Question</label>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-teal-400 w-full"
                    placeholder="e.g. How much did I spend on Groceries in May?"
                    required
                  />
                </div>
                {error && <div className="bg-red-500 text-white p-3 rounded-lg flex items-center gap-2"><FaExclamationTriangle /> {error}</div>}
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 8px 32px 0 #14b8a633' }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isExecuting}
                  className="w-full bg-gradient-to-r from-teal-500 via-blue-500 to-green-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-teal-600 hover:to-blue-600 transition-colors disabled:opacity-50"
                >
                  {isExecuting ? 'Processing...' : 'Ask'}
                </motion.button>
              </form>
            )}
          </div>

          {/* Workflow Animation */}
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
                      <div className={`p-4 rounded-full shadow-xl border-4 border-gray-200 ${step.color} ${currentStep === idx ? 'ring-4 ring-teal-400' : ''}`}>
                        <step.icon className="w-8 h-8 text-white drop-shadow-lg" />
                      </div>
                      <span className="text-xs md:text-sm text-anthropic-dark font-semibold">{step.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Response Display */}
          <AnimatePresence>
            {response && !isExecuting && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="mt-10 bg-gray-50 rounded-2xl p-8 shadow-inner border border-gray-200"
              >
                <h3 className="text-xl font-bold mb-4 text-center">Response</h3>
                <div className="prose prose-sm md:prose-base max-w-none text-anthropic-dark whitespace-pre-line bg-white rounded-xl p-6 border border-teal-200 shadow">
                  {typeof response === 'string' ? response : response.output ? response.output : (
                    <ul>
                      {Object.entries(response).map(([key, value]) => (
                        <li key={key}><b>{key}:</b> {String(value)}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const MonthlyExpenditurePage = () => (
  <PageRevealWrapper>
    <MonthlyExpenditurePageContent />
  </PageRevealWrapper>
);

export default MonthlyExpenditurePage; 