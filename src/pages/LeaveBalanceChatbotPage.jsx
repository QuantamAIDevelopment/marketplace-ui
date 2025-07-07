import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaEnvelope, FaUser, FaClock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import PageRevealWrapper from '../components/PageRevealWrapper';
import { getLeaveBalance, validateEmail, formatDate } from '../services/workflows/leaveBalanceChatbot';

const LeaveBalanceForm = () => {
    const [formData, setFormData] = useState({
        Subject: 'Leave Balance Inquiry',
        snippet: '',
        From: '',
        Date: formatDate(new Date())
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.From.trim()) {
            setError('Email address is required.');
            return;
        }
        
        if (!validateEmail(formData.From)) {
            setError('Please enter a valid email address.');
            return;
        }
        
        if (!formData.snippet.trim()) {
            setError('Please provide a message or inquiry.');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await getLeaveBalance(formData);
            setResult(response);
        } catch (err) {
            setError(err.message || 'Failed to fetch leave balance. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderLeaveBalanceResult = () => {
        if (!result) return null;

        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="bg-white p-6 rounded-lg shadow-lg border border-green-200"
            >
                <div className="flex items-center space-x-2 mb-4">
                    <FaCheckCircle className="text-green-500 text-xl" />
                    <h3 className="text-xl font-bold text-gray-800">Leave Balance Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <FaUser className="text-blue-500" />
                            <span className="font-semibold">Employee ID:</span>
                            <span className="text-gray-700">{result.Employee_id}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaEnvelope className="text-blue-500" />
                            <span className="font-semibold">Email:</span>
                            <span className="text-gray-700">{result['Email ']}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaClock className="text-blue-500" />
                            <span className="font-semibold">Last Updated:</span>
                            <span className="text-gray-700">{result.timestamp}</span>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="bg-green-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-green-800">Casual Leaves Remaining:</span>
                                <span className="text-2xl font-bold text-green-600">{result['Remaining Causal leaves']}</span>
                            </div>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-yellow-800">Sick Leaves Remaining:</span>
                                <span className="text-2xl font-bold text-yellow-600">{result['Remaining Sick Leaves']}</span>
                            </div>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-blue-800">Total Leaves Used:</span>
                                <span className="text-2xl font-bold text-blue-600">{result['Total leaves used']}</span>
                            </div>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg">
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-purple-800">Total Remaining:</span>
                                <span className="text-2xl font-bold text-purple-600">{result['Remaining Leaves']}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FaEnvelope className="inline mr-2" />
                            Employee Email *
                        </label>
                        <input
                            type="email"
                            name="From"
                            value={formData.From}
                            onChange={handleInputChange}
                            placeholder="employee@company.com"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FaCalendarAlt className="inline mr-2" />
                            Date
                        </label>
                        <input
                            type="date"
                            name="Date"
                            value={formData.Date}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <FaUser className="inline mr-2" />
                        Subject
                    </label>
                    <input
                        type="text"
                        name="Subject"
                        value={formData.Subject}
                        onChange={handleInputChange}
                        placeholder="Leave Balance Inquiry"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message/Inquiry *
                    </label>
                    <textarea
                        name="snippet"
                        value={formData.snippet}
                        onChange={handleInputChange}
                        placeholder="Please provide details about your leave balance inquiry..."
                        rows="4"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>
                
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                    {loading ? (
                        <div className="flex items-center justify-center space-x-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Fetching Leave Balance...</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center space-x-2">
                            <FaCalendarAlt />
                            <span>Get Leave Balance</span>
                        </div>
                    )}
                </motion.button>
            </form>
            
            {error && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                    <FaExclamationTriangle className="text-red-500" />
                    <span className="text-red-700">{error}</span>
                </motion.div>
            )}
            
            <AnimatePresence>
                {renderLeaveBalanceResult()}
            </AnimatePresence>
        </div>
    );
};

const LeaveBalanceChatbotPageContent = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl mx-auto">
            <motion.h1 
                initial={{ opacity: 0, y: -30 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="text-3xl font-bold text-center mb-6 text-gray-800"
            >
                Leave Balance Chatbot
            </motion.h1>
            
            <motion.p 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1 }}
                className="text-center text-gray-600 mb-8"
            >
                Get instant access to your leave balance information through our AI-powered HR assistant.
            </motion.p>
            
            <LeaveBalanceForm />
        </div>
    );
};

const LeaveBalanceChatbotPage = () => (
    <PageRevealWrapper
        heading="AI-Powered Leave Balance Assistant"
        description="Transform HR inquiries into instant responses with our intelligent Leave Balance Chatbot. This AI-powered system processes email inquiries, extracts employee information, and provides real-time leave balance updates. Built for HR departments and employees, it reduces manual workload, improves response times, and ensures accurate leave tracking. The system integrates with Google Sheets for data storage and Gmail for automated responses, creating a seamless experience for both employees and HR teams."
        details={
            <div className="space-y-6">
                <div>
                    <h2 className="font-semibold text-blue-700 mb-2">Features</h2>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                        <li>Email Intent Classification: AI automatically detects leave balance inquiries from email content.</li>
                        <li>Real-time Data Retrieval: Fetches current leave balance from Google Sheets database.</li>
                        <li>Automated Email Responses: Sends formatted leave balance information via Gmail.</li>
                        <li>Employee Data Validation: Verifies employee information and handles missing data gracefully.</li>
                        <li>Leave Type Breakdown: Provides detailed breakdown of casual, sick, and total leave balances.</li>
                        <li>Timestamp Tracking: Records when leave balance was last checked for audit purposes.</li>
                        <li>Error Handling: Sends appropriate error messages when employee data is not found.</li>
                        <li>Google Sheets Integration: Stores and retrieves leave data from centralized HR database.</li>
                    </ul>
                </div>
                
                <div>
                    <h2 className="font-semibold text-purple-700 mb-2">Example Use Cases</h2>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                        <li>HR Departments: Automate leave balance inquiries and reduce manual workload.</li>
                        <li>Employees: Get instant leave balance information without waiting for HR response.</li>
                        <li>Managers: Quickly check team member leave availability for project planning.</li>
                        <li>Payroll Teams: Verify leave balances for accurate salary calculations.</li>
                        <li>Compliance: Maintain audit trails of leave balance checks and updates.</li>
                    </ul>
                </div>
                
                <div>
                    <h2 className="font-semibold text-blue-700 mb-2">⚡ Why This Stands Out</h2>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                        <li>Natural Language Processing: Understands leave balance requests in natural email language.</li>
                        <li>Instant Response: Provides leave balance information within seconds of inquiry.</li>
                        <li>Multi-channel Integration: Works with email systems and Google Sheets for seamless data flow.</li>
                        <li>Scalable Architecture: Handles multiple employee inquiries simultaneously.</li>
                        <li>Data Accuracy: Ensures leave balance information is always up-to-date and accurate.</li>
                        <li>User-friendly Interface: Simple form-based interface for testing and demonstration.</li>
                        <li>Comprehensive Reporting: Tracks all leave balance inquiries and responses.</li>
                        <li>Error Recovery: Gracefully handles missing or invalid employee data.</li>
                    </ul>
                </div>
            </div>
        }
    >
        <LeaveBalanceChatbotPageContent />
    </PageRevealWrapper>
);

export default LeaveBalanceChatbotPage; 