import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUsers, FaCalendarAlt, FaUserTie, FaBuilding, FaClock, FaEnvelope, FaCheckCircle, FaTimesCircle, FaBolt } from 'react-icons/fa';
import PageRevealWrapper from '../components/PageRevealWrapper';
import { assignInterview } from '../services/workflows/interviewPanelAutoAssignment';

const InterviewPanelAssignmentPage = () => {
  const [formData, setFormData] = useState({
    'Candidate Name': '',
    'Role': '',
    'Department': '',
    'Preferred Time': ''
  });
  const [assignedInterviewers, setAssignedInterviewers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData['Candidate Name'] || !formData['Role'] || !formData['Department'] || !formData['Preferred Time']) {
      setError('All fields are required.');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(false);
    setAssignedInterviewers([]);
    try {
      const dateTime = new Date(formData['Preferred Time']);
      const formattedDateTime = dateTime.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      const requestData = {
        ...formData,
        'Preferred Time': formattedDateTime
      };
      const result = await assignInterview(requestData);
      setAssignedInterviewers(result);
      setSuccess(true);
    } catch (err) {
      setError('Failed to assign interviewers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartNow = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderInterviewer = (interviewer, index) => (
    <motion.div 
      key={interviewer.Id || index}
      className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-purple-100 p-2 rounded-full">
            <FaUserTie className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{interviewer.name || interviewer['Candidate Name']}</h3>
            <p className="text-sm text-gray-600">{interviewer.role || interviewer['Role']}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <FaCheckCircle className="w-5 h-5 text-green-500" />
          <span className="text-sm font-medium text-green-600">{interviewer.status || 'Available'}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <FaBuilding className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Department:</span>
          <span className="font-medium">{interviewer.department || interviewer['Department']}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaClock className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Available:</span>
          <span className="font-medium">{interviewer['Availability time'] || interviewer.availability}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaEnvelope className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Email:</span>
          <span className="font-medium">{interviewer.email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaUsers className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Assigned to:</span>
          <span className="font-medium">{interviewer['Interviewers Assigned'] || formData['Candidate Name']}</span>
        </div>
      </div>
      {interviewer.Id && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">ID: {interviewer.Id}</span>
        </div>
      )}
    </motion.div>
  );

  return (
    <PageRevealWrapper>
      {/* HERO SECTION */}
      <div className="w-full flex justify-center items-center py-12 px-2 bg-gradient-to-br from-purple-100 via-white to-indigo-100 rounded-b-3xl">
        <div className="max-w-3xl w-full text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-full shadow-lg mr-3">
              <FaBolt className="w-7 h-7 text-white" />
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Why This <span className="text-purple-600">Stands Out</span>
            </h2>
          </div>
          <ul className="text-left text-lg text-gray-700 font-medium space-y-2 mb-8 mx-auto max-w-2xl">
            <li><span className="text-purple-500 font-bold">•</span> <b>AI-Powered Panel Assignment:</b> Instantly matches candidates with the best interviewers based on role, department, and availability.</li>
            <li><span className="text-purple-500 font-bold">•</span> <b>Smart Scheduling:</b> Avoids conflicts and ensures interviewers are available at the candidate’s preferred time.</li>
            <li><span className="text-purple-500 font-bold">•</span> <b>Google Sheets Integration:</b> Logs all assignments for easy tracking and reporting.</li>
            <li><span className="text-purple-500 font-bold">•</span> <b>Automated Notifications:</b> Notifies selected interviewers and HR via email—no manual follow-up needed.</li>
            <li><span className="text-purple-500 font-bold">•</span> <b>No Code Needed:</b> Seamlessly connects with your existing HR tools and calendars.</li>
            <li><span className="text-purple-500 font-bold">•</span> <b>Secure & Compliant:</b> Keeps candidate and interviewer data safe and private.</li>
          </ul>
          <div className="mb-8">
            <div className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 py-6 px-4 shadow-lg flex flex-col items-center">
              <span className="text-lg sm:text-xl font-semibold text-white mb-2 text-center">
                Let your AI assistant build the perfect interview panel—just enter candidate details and let automation handle the rest!
              </span>
            </div>
          </div>
          <button
            onClick={handleStartNow}
            className="mt-2 px-10 py-3 text-lg font-bold rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-all"
          >
            Start Now
          </button>
        </div>
      </div>

      {/* FORM & RESULTS SECTION */}
      <div ref={formRef} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-4">
              <div className="bg-purple-500 p-4 rounded-full shadow-lg">
                <FaUsers className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Interview Panel Auto Assignment</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Automatically assign the best interviewers for your candidates based on role, department, and availability using AI-powered matching.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FaCalendarAlt className="w-6 h-6 text-purple-500 mr-3" />
                Candidate Details
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Candidate Name *
                  </label>
                  <input
                    type="text"
                    name="Candidate Name"
                    value={formData['Candidate Name']}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter candidate name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role *
                  </label>
                  <input
                    type="text"
                    name="Role"
                    value={formData['Role']}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Data Analyst, Software Engineer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department *
                  </label>
                  <input
                    type="text"
                    name="Department"
                    value={formData['Department']}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., Analytics, Engineering, HR"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time *
                  </label>
                  <input
                    type="datetime-local"
                    name="Preferred Time"
                    value={formData['Preferred Time']}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:from-purple-600 hover:to-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Assigning Interviewers...
                    </div>
                  ) : (
                    'Assign Interview Panel'
                  )}
                </motion.button>
              </form>

              {error && (
                <motion.div 
                  className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FaTimesCircle className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-red-700">{error}</span>
                </motion.div>
              )}

              {success && (
                <motion.div 
                  className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FaCheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-green-700">Interviewers assigned successfully!</span>
                </motion.div>
              )}
            </motion.div>

            {/* Results Section */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <FaUsers className="w-5 h-5 text-purple-500 mr-2" />
                  Assigned Interviewers
                </h3>
                
                {assignedInterviewers.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FaUsers className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No interviewers assigned yet.</p>
                    <p className="text-sm">Fill out the form and submit to assign interviewers.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <AnimatePresence>
                      {assignedInterviewers.map(renderInterviewer)}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Summary Card */}
              {assignedInterviewers.length > 0 && (
                <motion.div 
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-xl shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h4 className="text-lg font-semibold mb-3">Assignment Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="opacity-80">Total Interviewers:</span>
                      <span className="block font-semibold">{assignedInterviewers.length}</span>
                    </div>
                    <div>
                      <span className="opacity-80">Candidate:</span>
                      <span className="block font-semibold">{formData['Candidate Name']}</span>
                    </div>
                    <div>
                      <span className="opacity-80">Department:</span>
                      <span className="block font-semibold">{formData['Department']}</span>
                    </div>
                    <div>
                      <span className="opacity-80">Interview Time:</span>
                      <span className="block font-semibold">{formData['Preferred Time']}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </PageRevealWrapper>
  );
};

export default InterviewPanelAssignmentPage; 