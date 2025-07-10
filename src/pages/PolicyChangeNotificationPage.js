import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileContract, FaCheckCircle, FaUsers, FaChartBar, FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';

const PolicyChangeNotificationPageContent = () => {
  const [stats, setStats] = useState({ totalPolicies: 0, acknowledgedPolicies: 0, pendingAcknowledgments: 0 });
  const [notifications, setNotifications] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Load initial data from localStorage if available
    const storedData = localStorage.getItem('policyData');
    if (storedData) {
      const data = JSON.parse(storedData);
      setStats(data.stats || { totalPolicies: 0, acknowledgedPolicies: 0, pendingAcknowledgments: 0 });
      setNotifications(data.recentNotifications || []);
    }
  }, []);

  const workflowSteps = [
    { icon: FaFileContract, label: 'File Selection' },
    { icon: FaUsers, label: 'Uploading' },
    { icon: FaChartBar, label: 'Processing' },
    { icon: FaCheckCircle, label: 'Complete' }
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile); // <-- FIXED KEY

    try {
      setLoading(true);
      setUploadProgress(0);
      setCurrentStep(0);
      
      // Simulate workflow steps
      for (let i = 0; i < workflowSteps.length; i++) {
        setCurrentStep(i);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      const response = await axios.post('https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/policy-update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
      });

      // Store the response data in localStorage
      localStorage.setItem('policyData', JSON.stringify(response.data));
      
      // Update the local state with new data
      setStats(response.data.stats || { totalPolicies: 0, acknowledgedPolicies: 0, pendingAcknowledgments: 0 });
      setNotifications(response.data.recentNotifications || []);
      setSelectedFile(null);
      setUploadProgress(0);
      setError(null);
    } catch (err) {
      setError('Failed to upload policy');
      console.error('Error uploading policy:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
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
          Policy Change Notifications
        </motion.h1>
        {/* Stats Display */}
        <div className="flex justify-around mb-8">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-700">{stats.totalPolicies}</div>
            <div className="text-xs text-gray-500">Total Policies</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-700">{stats.acknowledgedPolicies}</div>
            <div className="text-xs text-gray-500">Acknowledged</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-600">{stats.pendingAcknowledgments}</div>
            <div className="text-xs text-gray-500">Pending</div>
          </div>
        </div>
        <div className="relative z-10 w-full max-w-2xl mx-auto">
          {/* File Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 space-y-6 border border-gray-200 w-full mb-8"
          >
            <div className="flex items-center space-x-4 mb-4">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="policy-file"
                accept=".pdf,.doc,.docx"
                ref={fileInputRef}
              />
              <label
                htmlFor="policy-file"
                className="bg-dark-400 text-black px-4 py-2 rounded-lg cursor-pointer hover:bg-dark-500 transition-colors flex-1"
                onClick={e => {
                  e.preventDefault();
                  if (fileInputRef.current) fileInputRef.current.click();
                }}
              >
                {selectedFile ? selectedFile.name : 'Select Policy File'}
              </label>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
                whileTap={{ scale: 0.95 }}
                onClick={e => {
                  e.preventDefault();
                  if (!selectedFile) {
                    if (fileInputRef.current) fileInputRef.current.click();
                  } else {
                    handleUpload();
                  }
                }}
                disabled={loading}
                className="bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white px-6 py-2 rounded-lg font-bold text-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <FaUsers />
                <span>Upload Policy</span>
              </motion.button>
            </div>
            {error && (
              <div className="bg-red-500 text-white p-3 rounded-lg mb-4">{error}</div>
            )}
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mb-4">
                <div className="w-full bg-dark-400 rounded-full h-2.5">
                  <div
                    className="bg-primary-500 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 mt-2">Uploading: {uploadProgress}%</p>
              </div>
            )}
          </motion.div>
          {/* Workflow Animation */}
          <AnimatePresence>
            {loading && (
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
                      key={step.label}
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
            {(notifications && notifications.length > 0) && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="mt-10 bg-gray-50 rounded-2xl p-8 shadow-inner border border-gray-200"
              >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Policy Notifications</h2>
                <div className="space-y-3">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.policyId || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 bg-white rounded-lg shadow-sm flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${notification.status === 'Pending' ? 'bg-yellow-100' : notification.status === 'Solved' ? 'bg-green-100' : 'bg-gray-100'}`}>
                          {notification.status === 'Pending' ? (
                            <FaExclamationCircle className="w-4 h-4 text-yellow-600" />
                          ) : notification.status === 'Solved' ? (
                            <FaCheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <FaFileContract className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-800 truncate">{notification.policyId || 'N/A'}</h3>
                          <p className="text-xs text-gray-500">{notification.pendingAck || 'No pending acknowledgment'}</p>
                          <p className="text-xs text-gray-500">User: {notification.userName} ({notification.email})</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <span className="text-xs font-semibold text-gray-600">{notification.status || 'N/A'}</span>
                      </div>
                    </motion.div>
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

const PolicyChangeNotificationPage = () => {
  return (
    <PageRevealWrapper
      heading="Policy Change Notification & Acknowledgment Tracker"
      description="Ensure every employee sees, reads, and acknowledges updated policies—automatically and with full visibility. Our AI-powered Policy Change Notification & Acknowledgment Tracker handles everything from sending policy documents, generating acknowledgment links, and tracking responses, to sending reminders and escalations—all with zero manual follow-up. Whether your HR team updates a leave policy or releases a new compliance protocol, this no-code agent ensures every employee gets notified, reminded, and logged—with acknowledgment stored in your database and tracked through email confirmations. With form-based triggers, smart acknowledgment links, scheduled follow-ups, and multi-round escalation support, it's the ultimate silent compliance enforcer in your HR automation stack."
      details={
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-blue-700 mb-2">Example Use Cases</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>HR Teams: Automatically notify employees of new or updated policies and collect structured acknowledgments.</li>
              <li>Compliance Officers: Track and prove employee engagement with updated legal or regulatory requirements.</li>
              <li>People Ops: Schedule reminders, handle escalations for missed acknowledgments, and log everything.</li>
              <li>Education & Training: Distribute mandatory policy PDFs and ensure acknowledgment by students or faculty.</li>
              <li>Startups & Enterprises: Scale compliance without chasing responses manually.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-purple-700 mb-2">Why This Stands Out</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Multi-Source Triggering: Accepts policy uploads via webhook or form trigger.</li>
              <li>Auto Email Delivery: Sends acknowledgment request emails to all users in your system (PostgreSQL-based).</li>
              <li>Dynamic Acknowledgment Links: Each employee gets a personalized link to confirm they've read the policy.</li>
              <li>Reminders & Escalations: If acknowledgment is not received within 3 days, sends reminders; escalates after 7.</li>
              <li>Database-Driven: Looks up users, tracks policy IDs, and logs responses directly in your PostgreSQL DB.</li>
              <li>Attachment-Aware: Processes policy attachments, maintains file integrity and naming.</li>
              <li>No Code Required: Fully operational within n8n using built-in nodes and Gmail/DB integrations.</li>
            </ul>
          </div>
          <div className="mt-6 text-center">
            <span className="inline-block bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg">Automate your next policy rollout—track acknowledgments, send reminders, and close the loop without manual follow-up. Try our Policy Acknowledgment Tracker free.</span>
          </div>
        </div>
      }
    >
      <PolicyChangeNotificationPageContent />
    </PageRevealWrapper>
  );
};

export default PolicyChangeNotificationPage;