import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserAlt, FaSync, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';
import PageRevealWrapper from '../components/PageRevealWrapper';

const CandidateDetailsSyncPageContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [syncData, setSyncData] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const workflowSteps = [
    { icon: FaSync, label: 'Fetching Data' },
    { icon: FaUserAlt, label: 'Processing' },
    { icon: FaExclamationTriangle, label: 'Syncing' },
    { icon: FaCheckCircle, label: 'Complete' }
  ];

  const fetchSyncData = useCallback(async () => {
    setIsLoading(true);
    setCurrentStep(0);

    try {
      const response = await axios.get('http://localhost:5678/webhook/details-sync');
      
      // Simulate workflow steps
      for (let i = 0; i < workflowSteps.length; i++) {
        setCurrentStep(i);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      setSyncData(response.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [workflowSteps.length]);

  useEffect(() => {
    fetchSyncData();
  }, [fetchSyncData]);

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-8 text-anthropic-dark drop-shadow-lg"
        >
          Candidate Details Sync
        </motion.h1>
        <div className="relative z-10 w-full max-w-2xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchSyncData}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition-colors disabled:opacity-50 mb-8"
          >
            {isLoading ? 'Syncing...' : 'Sync Now'}
          </motion.button>
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
          {/* Stats Cards */}
          {syncData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-lg p-6 shadow-sm flex flex-col items-center text-center border border-gray-200">
                <div className="p-3 rounded-full bg-green-100 mb-2"><FaCheckCircle className="w-6 h-6 text-green-600" /></div>
                <h4 className="text-sm font-medium text-gray-500">Successfully Synced</h4>
                <p className="text-3xl font-bold text-gray-800">{syncData.stats.successCount}</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-lg p-6 shadow-sm flex flex-col items-center text-center border border-gray-200">
                <div className="p-3 rounded-full bg-yellow-100 mb-2"><FaSync className="w-6 h-6 text-yellow-600" /></div>
                <h4 className="text-sm font-medium text-gray-500">Pending Sync</h4>
                <p className="text-3xl font-bold text-gray-800">{syncData.stats.pendingCount}</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-lg p-6 shadow-sm flex flex-col items-center text-center border border-gray-200">
                <div className="p-3 rounded-full bg-red-100 mb-2"><FaExclamationTriangle className="w-6 h-6 text-red-600" /></div>
                <h4 className="text-sm font-medium text-gray-500">Failed Sync</h4>
                <p className="text-3xl font-bold text-gray-800">{syncData.stats.failedCount}</p>
              </motion.div>
            </div>
          )}
          {/* Sync Status List */}
          {syncData && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="mt-10 bg-gray-50 rounded-2xl p-8 shadow-inner overflow-hidden border border-gray-200"
            >
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sync Status</h2>
              <div className="space-y-3">
                {syncData.syncStatus.map((status, index) => (
                  <motion.div
                    key={status.profileId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div className="flex items-center space-x-4">
                      {status.type === 'error' ? (
                        <FaExclamationTriangle className="text-red-500 text-xl" />
                      ) : (
                        <FaSync className="text-yellow-500 text-xl animate-spin" />
                      )}
                      <div>
                        <p className="font-medium text-gray-800">Profile #{status.profileId}</p>
                        <p className="text-sm text-gray-600">{status.message}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${status.type === 'error' ? 'text-red-600' : 'text-yellow-600'}`}>{status.status}</p>
                      <p className="text-xs text-gray-500">{status.type === 'error' ? 'Needs attention' : 'In progress'}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const CandidateDetailsSyncPage = () => {
  return (
    <PageRevealWrapper
      heading="Sync Candidate Details Seamlessly"
      description="Keep your candidate database updated in real-time. Automatically sync details from various sources into one centralized system."
    >
      <CandidateDetailsSyncPageContent />
    </PageRevealWrapper>
  );
};

export default CandidateDetailsSyncPage; 