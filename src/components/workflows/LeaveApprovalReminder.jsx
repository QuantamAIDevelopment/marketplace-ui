import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileUpload, FaCalendarAlt, FaUser, FaEnvelope, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { uploadLeaveReminderFile } from '../../services/workflows/leaveApprovalReminder';

const LeaveApprovalReminder = () => {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            setFile(selectedFile);
            setError(null);
        } else {
            setError('Please select a valid Excel (.xlsx) file.');
            setFile(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await uploadLeaveReminderFile(file);
            setResult(response);
        } catch (err) {
            setError('Failed to process leave reminder file. Please try again.');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (excelDate) => {
        if (!excelDate) return 'N/A';
        // Convert Excel date number to JavaScript date
        const date = new Date((excelDate - 25569) * 86400 * 1000);
        return date.toLocaleDateString();
    };

    const renderResult = () => {
        if (!result) return null;

        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="bg-white p-6 rounded-lg shadow-lg border"
            >
                <h3 className="text-xl font-bold mb-4 text-gray-800">Leave Reminder Processed</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <FaUser className="text-blue-500" />
                            <span className="font-semibold">Candidate Name:</span>
                            <span className="text-gray-700">{result['Candidate Name'] || 'N/A'}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <FaCalendarAlt className="text-green-500" />
                            <span className="font-semibold">Leave ID:</span>
                            <span className="text-gray-700">{result['Leave ID'] || 'N/A'}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <FaCalendarAlt className="text-orange-500" />
                            <span className="font-semibold">Leave Start Date:</span>
                            <span className="text-gray-700">{formatDate(result['Leave Start Date'])}</span>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                            <FaCalendarAlt className="text-purple-500" />
                            <span className="font-semibold">Reminder Sent Date:</span>
                            <span className="text-gray-700">{formatDate(result['Reminder Sent Date'])}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <FaEnvelope className="text-red-500" />
                            <span className="font-semibold">Leave Reason:</span>
                            <span className="text-gray-700">{result['Leave Reason'] || 'N/A'}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            {result['STAUS'] === 'Approve' ? (
                                <FaCheckCircle className="text-green-500" />
                            ) : (
                                <FaExclamationTriangle className="text-yellow-500" />
                            )}
                            <span className="font-semibold">Status:</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                result['STAUS'] === 'Approve' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                            }`}>
                                {result['STAUS'] || 'Pending'}
                            </span>
                        </div>
                    </div>
                </div>
                
                {result['Timstamp'] && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                            <span className="font-semibold">Processed at:</span> {new Date(result['Timstamp']).toLocaleString()}
                        </p>
                    </div>
                )}
            </motion.div>
        );
    };

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Leave Approval Reminder</h3>
                <p className="text-sm text-gray-600">
                    Upload an Excel file containing leave requests to automatically process reminders and send notifications to managers.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <FaFileUpload className="mx-auto text-4xl text-gray-400 mb-4" />
                    <input
                        type="file"
                        accept=".xlsx"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="text-lg font-medium text-gray-700 mb-2">
                            {file ? file.name : 'Click to upload Excel file'}
                        </div>
                        <div className="text-sm text-gray-500">
                            {file ? 'File selected' : 'Only .xlsx files are supported'}
                        </div>
                    </label>
                </div>

                {file && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-green-50 p-4 rounded-lg border border-green-200"
                    >
                        <div className="flex items-center space-x-2">
                            <FaCheckCircle className="text-green-500" />
                            <span className="text-green-700 font-medium">File ready for processing</span>
                        </div>
                    </motion.div>
                )}

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading || !file}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200"
                >
                    {loading ? (
                        <div className="flex items-center justify-center space-x-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Processing...</span>
                        </div>
                    ) : (
                        'Process Leave Reminder'
                    )}
                </motion.button>
            </form>

            {error && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
                >
                    <div className="flex items-center space-x-2">
                        <FaExclamationTriangle />
                        <span>{error}</span>
                    </div>
                </motion.div>
            )}

            <AnimatePresence>
                {result && renderResult()}
            </AnimatePresence>
        </div>
    );
};

export default LeaveApprovalReminder; 