import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileAlt, FaClock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios';
import PageRevealWrapper from '../components/PageRevealWrapper';

const DocumentUploadReminderPageContent = () => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [response, setResponse] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const workflowSteps = [
    { icon: FaFileAlt, label: 'Check Documents', color: 'bg-blue-500' },
    { icon: FaClock, label: 'Check Due Date', color: 'bg-yellow-500' },
    { icon: FaExclamationCircle, label: 'Process Reminders', color: 'bg-red-500' },
    { icon: FaCheckCircle, label: 'Send Notifications', color: 'bg-green-500' }
  ];

  const executeWorkflow = async () => {
    setIsExecuting(true);
    setResponse(null);
    setCurrentStep(0);

    try {
      // Simulate workflow steps
      for (let i = 0; i < workflowSteps.length; i++) {
        setCurrentStep(i);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      const response = await axios.get('http://localhost:5678/webhook/documents-status');
      setResponse(response.data);
    } catch (error) {
      console.error('Error executing workflow:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Document Upload Reminder Content</h1>
      <p>Here is the main content for the document upload reminder page.</p>

      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
        whileTap={{ scale: 0.97 }}
        onClick={executeWorkflow}
        disabled={isExecuting}
        className="w-full mb-8 bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition-colors disabled:opacity-50"
      >
        {isExecuting ? 'Checking...' : 'Check Status'}
      </motion.button>

      {/* Workflow Visualization */}
      <div className="bg-dark-300 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Workflow Steps</h2>
        <div className="flex justify-between items-center">
          {workflowSteps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <motion.div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${step.color} ${
                  isExecuting && currentStep >= index ? 'ring-4 ring-primary-500' : ''
                }`}
                animate={isExecuting && currentStep === index ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <step.icon className="w-8 h-8 text-white" />
              </motion.div>
              <span className="mt-2 text-sm text-gray-300">{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Response Section */}
      <AnimatePresence>
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8 bg-gray-50 rounded-2xl p-8 shadow-inner border border-gray-200"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-white rounded-lg shadow-sm text-center">
                <h3 className="text-sm font-medium text-gray-500">Pending Uploads</h3>
                <p className="text-3xl font-bold text-yellow-600">{response.stats.pendingUploads}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm text-center">
                <h3 className="text-sm font-medium text-gray-500">Completed Uploads</h3>
                <p className="text-3xl font-bold text-green-600">{response.stats.completedUploads}</p>
              </div>
              <div className="p-4 bg-white rounded-lg shadow-sm text-center">
                <h3 className="text-sm font-medium text-gray-500">Total Documents</h3>
                <p className="text-3xl font-bold text-gray-800">{response.stats.totalDocuments}</p>
              </div>
            </div>

            {response.recentActivity.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Recent Activity</h3>
                <div className="space-y-3">
                  {response.recentActivity.map((activity) => (
                    <div key={activity.id} className="p-4 bg-white rounded-lg shadow-sm flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {activity.status === 'PENDING' ? (
                          <FaExclamationCircle className="text-yellow-500 text-xl" />
                        ) : (
                          <FaCheckCircle className="text-green-500 text-xl" />
                        )}
                        <div>
                          <p className="font-medium text-gray-800">{activity.employeeName}</p>
                          <p className="text-sm text-gray-600">{activity.documentType}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        Last Reminder: {new Date(activity.lastReminder).toLocaleDateString()}
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
  );
};

const DocumentUploadReminderPage = () => {
  return (
    <PageRevealWrapper
      heading="Automate Document Upload Reminders"
      description="Ensure timely document submission by sending automated reminders to employees. Track compliance and manage documents effortlessly."
    >
      <DocumentUploadReminderPageContent />
    </PageRevealWrapper>
  );
};

export default DocumentUploadReminderPage; 