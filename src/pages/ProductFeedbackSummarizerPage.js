import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCommentDots, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { triggerProductFeedbackSummarizer } from '../services/workflows/productFeedbackSummarizer';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';

const workflowSteps = [
  { icon: FaCommentDots, label: 'Input Feedback', color: 'bg-pink-500' },
  { icon: FaCheckCircle, label: 'Summarizing', color: 'bg-purple-500' },
  { icon: FaCheckCircle, label: 'Complete', color: 'bg-green-500' },
];

const parseField = (field, fallback = []) => {
  if (!field) return fallback;
  try {
    const parsed = JSON.parse(field);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

const parseSentiment = (field) => {
  if (!field) return { positive: 0, neutral: 0, negative: 0 };
  try {
    const parsed = JSON.parse(field);
    return typeof parsed === 'object' ? parsed : { positive: 0, neutral: 0, negative: 0 };
  } catch {
    return { positive: 0, neutral: 0, negative: 0 };
  }
};

const defaultFeedbackObj = {
  "Timestamp (Date)": "2025-07-07",
  "Product ID": "ZX200",
  "Feedback": "Connectivity drops when moving between rooms",
  "Rating": 2
};

const ProductFeedbackSummarizerPageContent = () => {
  const [formData, setFormData] = useState(defaultFeedbackObj);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'Rating' ? Number(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsExecuting(true);
    setCurrentStep(0);
    setResponse(null);
    // Validate required fields
    if (!formData["Timestamp (Date)"] || !formData["Product ID"] || !formData["Feedback"] || !formData["Rating"]) {
      setError('All fields are required.');
      setIsExecuting(false);
      return;
    }
    try {
      const result = await triggerProductFeedbackSummarizer(formData);
      setResponse(Array.isArray(result) ? result : [result]);
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
          Product Feedback Summarizer
        </motion.h1>
        <div className="relative z-10 w-full max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 space-y-6 border border-gray-200 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Timestamp (Date)</label>
                <input
                  type="date"
                  name="Timestamp (Date)"
                  value={formData["Timestamp (Date)"]}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-pink-400 w-full"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Product ID</label>
                <input
                  type="text"
                  name="Product ID"
                  value={formData["Product ID"]}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-pink-400 w-full"
                  required
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-semibold">Feedback</label>
                <textarea
                  name="Feedback"
                  value={formData["Feedback"]}
                  onChange={handleChange}
                  rows={3}
                  className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-pink-400 w-full"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Rating</label>
                <input
                  type="number"
                  name="Rating"
                  min={1}
                  max={5}
                  value={formData["Rating"]}
                  onChange={handleChange}
                  className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-pink-400 w-full"
                  required
                />
              </div>
            </div>
            {error && <div className="bg-red-500 text-white p-3 rounded-lg flex items-center gap-2"><FaExclamationTriangle /> {error}</div>}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 8px 32px 0 #e7548033' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isExecuting}
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-pink-600 hover:to-purple-600 transition-colors disabled:opacity-50"
            >
              {isExecuting ? 'Processing...' : 'Summarize Feedback'}
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
                      <div className={`p-4 rounded-full shadow-xl border-4 border-gray-200 ${step.color} ${currentStep === idx ? 'ring-4 ring-pink-400' : ''}`}>
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
                <h3 className="text-xl font-bold mb-4 text-center">Summarized Feedback</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg shadow">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="py-2 px-4 text-left">Product ID</th>
                        <th className="py-2 px-4 text-left">Praises</th>
                        <th className="py-2 px-4 text-left">Complaints</th>
                        <th className="py-2 px-4 text-left">Keywords</th>
                        <th className="py-2 px-4 text-left">Sentiment</th>
                        <th className="py-2 px-4 text-left">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {response.map((item, idx) => {
                        const praises = parseField(item.praises);
                        const complaints = parseField(item.complaints);
                        const keywords = parseField(item.keywords);
                        const sentiment = parseSentiment(item.sentimentBreakdown);
                        return (
                          <tr key={idx} className="border-b">
                            <td className="py-2 px-4 font-bold">{item.productid}</td>
                            <td className="py-2 px-4">
                              <ul className="list-disc pl-4">
                                {praises.map((p, i) => <li key={i}>{p}</li>)}
                              </ul>
                            </td>
                            <td className="py-2 px-4">
                              <ul className="list-disc pl-4">
                                {complaints.map((c, i) => <li key={i}>{c}</li>)}
                              </ul>
                            </td>
                            <td className="py-2 px-4">{keywords.join(', ')}</td>
                            <td className="py-2 px-4">
                              <ul>
                                <li>Positive: {sentiment.positive}%</li>
                                <li>Neutral: {sentiment.neutral}%</li>
                                <li>Negative: {sentiment.negative}%</li>
                              </ul>
                            </td>
                            <td className="py-2 px-4">{item.timestamp ? new Date(item.timestamp).toLocaleString() : ''}</td>
                          </tr>
                        );
                      })}
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

const ProductFeedbackSummarizerPage = () => (
  <PageRevealWrapper
    heading="AI Product Feedback Summarizer"
    description="Automatically transforms raw customer feedback from spreadsheets or webhook inputs into structured summaries—including praises, complaints, sentiment, and keywords—ready for decision-makers. Whether triggered manually or on a daily schedule, this AI-powered agent cleans, filters, and semantically summarizes reviews by product. Output is sent as a clean summary to Google Sheets and via email to stakeholders, helping PMs, sellers, and support teams prioritize and act faster."
    details={
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-blue-700 mb-2">Example Use Cases</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Product Teams: Get daily insights on what users love and hate—without manual review.</li>
            <li>Customer Support: Spot emerging pain points in feedback logs.</li>
            <li>SaaS Analytics: Enrich NPS/CSAT data with qualitative analysis.</li>
            <li>E-commerce: Monitor product-level sentiment from reviews and returns.</li>
            <li>AI Copilot for PMs: Plug into tools like Notion or Slack for daily summaries.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-purple-700 mb-2">Why This Stands Out</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Multi-Trigger Flow: Runs daily or on webhook (real-time).</li>
            <li>Data Cleaning Built-In: Automatically strips noise and normalizes feedback.</li>
            <li>LLM Summarization: Not keyword matching—semantic understanding with GPT/Groq.</li>
            <li>Structured Output: Saves JSON summaries with sentiment % and keyword tags.</li>
            <li>HTML Email Digest: Sends a beautiful, table-formatted summary to your inbox.</li>
          </ul>
        </div>
        <div className="mt-6 text-center">
          <span className="inline-block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg">Summarize your customer feedback in minutes—start with 100 free insights today.</span>
        </div>
      </div>
    }
  >
    <ProductFeedbackSummarizerPageContent />
  </PageRevealWrapper>
);

export default ProductFeedbackSummarizerPage; 