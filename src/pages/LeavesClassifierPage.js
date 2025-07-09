import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaUserAlt, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import PageRevealWrapper from '../components/PageRevealWrapper';

const LeavesClassifierPageContent = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const workflowSteps = [
    { icon: FaCalendarAlt, label: 'Date Selection' },
    { icon: FaUserAlt, label: 'Processing' },
    { icon: FaExclamationTriangle, label: 'Analyzing' },
    { icon: FaCheckCircle, label: 'Complete' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setCurrentStep(0);

    try {
      const response = await axios.get('http://localhost:5678/webhook/leaves-classifier', {
        params: formData
      });
      
      // Simulate workflow steps
      for (let i = 0; i < workflowSteps.length; i++) {
        setCurrentStep(i);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      setResponse(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-8 text-anthropic-dark drop-shadow-lg"
        >
          Leaves Classifier Workflow
        </motion.h1>
        <div className="relative z-10 w-full max-w-2xl mx-auto">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 space-y-6 border border-gray-200 w-full"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row md:gap-4 gap-2">
                <div className="flex-1 flex flex-col gap-2">
                  <label className="font-semibold">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <label className="font-semibold">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                    required
                  />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : 'Submit'}
              </motion.button>
            </form>
          </motion.div>
          {/* Workflow Animation */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-8 bg-white rounded-2xl p-6 shadow-2xl flex flex-col items-center border border-gray-200"
              >
                <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center text-anthropic-dark">Executing Workflow...</h2>
                <div className="flex flex-wrap justify-center items-center w-full gap-4">
                  {workflowSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      animate={{
                        scale: currentStep === index ? 1.2 : 0.95,
                        opacity: currentStep === index ? 1 : 0.5
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center space-y-2"
                    >
                      <div className={`p-4 rounded-full shadow-xl border-4 border-gray-200 ${currentStep === index ? 'bg-primary-500' : 'bg-dark-400'} ${currentStep === index ? 'ring-4 ring-pink-400' : ''}`}> 
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
            {response && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="mt-10 bg-gray-50 rounded-2xl p-8 shadow-inner border border-gray-200"
              >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Leave Classification Results</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-white rounded-lg shadow-sm text-center">
                    <h3 className="text-sm font-medium text-gray-500">Casual Leaves</h3>
                    <p className="text-3xl font-bold text-blue-600">{response.stats.casualLeaves}</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm text-center">
                    <h3 className="text-sm font-medium text-gray-500">Sick Leaves</h3>
                    <p className="text-3xl font-bold text-purple-600">{response.stats.sickLeaves}</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm text-center">
                    <h3 className="text-sm font-medium text-gray-500">Total Employees</h3>
                    <p className="text-3xl font-bold text-gray-800">{response.stats.totalEmployees}</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm text-center">
                    <h3 className="text-sm font-medium text-gray-500">Active Requests</h3>
                    <p className="text-3xl font-bold text-yellow-600">{response.stats.activeRequests}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Recent Activity</h3>
                  <div className="space-y-3">
                    {response.recentActivity.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-white rounded-lg shadow-sm flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-4">
                          <FaUserAlt className="text-gray-400 text-xl" />
                          <div>
                            <p className="font-medium text-gray-800">{activity.employeeName}</p>
                            <p className="text-sm text-gray-600">{activity.leaveType}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-semibold ${
                            activity.status === 'Approved' ? 'text-green-600' : 
                            activity.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'
                          }`}>{activity.status}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(activity.startDate).toLocaleDateString()} - {new Date(activity.endDate).toLocaleDateString()}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const LeavesClassifierPage = () => {
  return (
    <PageRevealWrapper
      heading="Leave Balance Chatbot Agent"
      description="Instantly respond to employee leave balance queries—without human involvement. The Leave Balance Chatbot Agent reads emails from your team, identifies the requesting employee, and automatically fetches their leave data from a connected Postgres database. It calculates used, remaining casual, and sick leaves—then sends back a friendly, formatted summary via email. Powered by GPT and integrated with Gmail and databases, this agent acts as a virtual HR helpdesk available 24/7. It handles both successful and failed requests (e.g., invalid email IDs), logs everything for transparency, and even stores responses in audit tables for historical tracking. Built for HR teams looking to modernize employee support and reduce repetitive queries, it turns leave requests into delightful, automated conversations."
      details={
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-blue-700 mb-2">Example Use Cases</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>HR Automation: Stop manually checking leave records. Let employees email their requests and get instant replies.</li>
              <li>Internal Self-Service Portals: Plug into your helpdesk or intranet to enable real-time leave queries.</li>
              <li>Audit Logging: Store every query and system-generated response into a Postgres database for compliance tracking.</li>
              <li>Error Handling with Feedback: Notify employees if their ID/email is missing or unmatched, with a polite message and log for HR review.</li>
              <li>Employee Onboarding Kits: Include this chatbot as a smart assistant in welcome documentation and employee handbooks.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-purple-700 mb-2">Why This Stands Out</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Email-Based Trigger: Activates automatically when employees send leave queries via Gmail.</li>
              <li>GPT-Driven Search Matching: Uses OpenAI to match email text to relevant employee records in the database.</li>
              <li>Real-Time Leave Calculation: Dynamically calculates total used, remaining sick and casual leaves for each employee.</li>
              <li>Personalized Email Replies: Crafts friendly, branded emails tailored to the employee with a clean leave summary.</li>
              <li>Error Messaging & Logging: Sends alternate response if email is unmatched and logs it into a fallback table.</li>
              <li>Dual Postgres Integration: One for leave data fetch, another for logging both success and failure events.</li>
              <li>Auto Timestamped Replies: Every response includes a date reference, formatted for clarity and HR records.</li>
            </ul>
          </div>
          <div className="mt-6 text-center">
            <span className="inline-block bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg">Automate your HR helpdesk now—let your team ask for leave balances via email and get instant responses, 100% powered by AI.</span>
          </div>
        </div>
      }
    >
      <LeavesClassifierPageContent />
    </PageRevealWrapper>
  );
};

export default LeavesClassifierPage; 