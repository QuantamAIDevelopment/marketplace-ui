import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBirthdayCake, FaCalendarAlt, FaUserAlt, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';
import PageRevealWrapper from '../components/PageRevealWrapper';

const BirthdayWorkAnniversaryPageContent = () => {
  const [date, setDate] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [response, setResponse] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const workflowSteps = [
    { icon: FaUserAlt, label: 'Trigger', color: 'bg-blue-500' },
    { icon: FaCalendarAlt, label: 'Check Date', color: 'bg-purple-500' },
    { icon: FaBirthdayCake, label: 'Process', color: 'bg-pink-500' },
    { icon: FaEnvelope, label: 'Send Email', color: 'bg-green-500' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsExecuting(true);
    setResponse(null);
    setCurrentStep(0);

    try {
      const formData = new FormData();
      if (date) formData.append('date', date);
      formData.append('trigger', 'api');

      // Simulate workflow steps
      for (let i = 0; i < workflowSteps.length; i++) {
        setCurrentStep(i);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      const response = await axios.post('http://localhost:5678/webhook/birthday-anniversary', formData);
      setResponse(response.data);
    } catch (error) {
      console.error('Error executing workflow:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-8 text-anthropic-dark drop-shadow-lg"
        >
          Birthday & Work Anniversary Workflow
        </motion.h1>
        <div className="relative z-10 w-full max-w-2xl mx-auto">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 space-y-6 border border-gray-200 w-full mb-8"
          >
            <h2 className="text-xl font-semibold mb-4">Execute Workflow</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex-1 flex flex-col gap-2">
                <label className="font-semibold">Date (Optional)</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={isExecuting}
                className="w-full bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition-colors disabled:opacity-50"
              >
                {isExecuting ? 'Executing...' : 'Execute Workflow'}
              </motion.button>
            </form>
          </motion.div>
          {/* Workflow Visualization */}
          <motion.div className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 space-y-6 border border-gray-200 w-full mb-8">
            <h2 className="text-xl font-semibold mb-4">Workflow Steps</h2>
            <div className="flex justify-between items-center">
              {workflowSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <motion.div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${step.color} ${isExecuting && currentStep >= index ? 'ring-4 ring-primary-500' : ''}`}
                    animate={isExecuting && currentStep === index ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <span className="mt-2 text-sm text-anthropic-dark font-semibold">{step.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
          {/* Response Section */}
          <AnimatePresence>
            {response && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="mt-10 bg-gray-50 rounded-2xl p-8 shadow-inner border border-gray-200"
              >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Results</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-white rounded-lg shadow-sm text-center">
                    <h3 className="text-sm font-medium text-gray-500">Today's Birthdays</h3>
                    <p className="text-3xl font-bold text-blue-600">{response.stats.todayBirthdays}</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm text-center">
                    <h3 className="text-sm font-medium text-gray-500">Today's Anniversaries</h3>
                    <p className="text-3xl font-bold text-purple-600">{response.stats.todayAnniversaries}</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm text-center">
                    <h3 className="text-sm font-medium text-gray-500">Total Celebrations</h3>
                    <p className="text-3xl font-bold text-green-600">{response.stats.totalCelebrations}</p>
                  </div>
                </div>
                {response.todayCelebrations.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Today's Celebrations</h3>
                    <div className="space-y-3">
                      {response.todayCelebrations.map((celebration) => (
                        <div key={celebration.id} className="p-4 bg-white rounded-lg shadow-sm flex items-center space-x-4">
                          {celebration.type === 'BIRTHDAY' ? (
                            <FaBirthdayCake className="text-pink-500 text-xl" />
                          ) : (
                            <FaCalendarAlt className="text-purple-500 text-xl" />
                          )}
                          <span className="text-gray-800 font-medium">
                            {celebration.employeeName}'s {celebration.type.toLowerCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const BirthdayWorkAnniversaryPage = () => {
  return (
    <PageRevealWrapper
      heading="Celebrate Your Team's Milestones"
      description="Never miss a birthday or work anniversary again. Automate personalized greetings and recognitions to boost team morale."
    >
      <BirthdayWorkAnniversaryPageContent />
    </PageRevealWrapper>
  );
};

export default BirthdayWorkAnniversaryPage; 