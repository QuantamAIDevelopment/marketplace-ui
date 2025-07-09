import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaDownload, FaFilePdf, FaClock, FaCheckCircle } from 'react-icons/fa';
import PageRevealWrapper from '../components/PageRevealWrapper';
import { startResearch } from '../services/workflows/automatedResearch';

const AutomatedResearchContent = () => {
    const [topic, setTopic] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!topic.trim()) {
            setError('Please enter a topic to research.');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const researchResult = await startResearch(topic);
            setResult(researchResult);
        } catch (err) {
            setError('Failed to generate research report. Please try again.');
            console.error('Research error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (result?.url) {
            window.open(result.url, '_blank');
        }
    };

    const formatDuration = (seconds) => {
        if (seconds < 60) return `${seconds} seconds`;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl mx-auto">
            <motion.h1 
                initial={{ opacity: 0, y: -30 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="text-3xl font-bold text-center mb-6 text-gray-800"
            >
                Automated Research AI Agent
            </motion.h1>

            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                        Research Topic
                    </label>
                    <input
                        type="text"
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Enter any topic (e.g., Gandhi, Quantum Computing, Climate Change)"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        disabled={loading}
                    />
                </div>
                
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading || !topic.trim()}
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-3 rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Generating Research Report...</span>
                        </>
                    ) : (
                        <>
                            <FaSearch />
                            <span>Start Research</span>
                        </>
                    )}
                </motion.button>
            </form>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
                >
                    {error}
                </motion.div>
            )}

            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-6"
                    >
                        <div className="flex items-center space-x-3 mb-4">
                            <FaCheckCircle className="text-green-500 text-xl" />
                            <h3 className="text-xl font-semibold text-gray-800">Research Report Generated!</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-white p-4 rounded-lg border">
                                <div className="flex items-center space-x-2 mb-2">
                                    <FaFilePdf className="text-purple-500" />
                                    <span className="font-medium text-gray-700">Pages</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-800">{result.pageCount}</p>
                            </div>

                            <div className="bg-white p-4 rounded-lg border">
                                <div className="flex items-center space-x-2 mb-2">
                                    <FaClock className="text-blue-500" />
                                    <span className="font-medium text-gray-700">Duration</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-800">{formatDuration(result.duration)}</p>
                            </div>

                            <div className="bg-white p-4 rounded-lg border">
                                <div className="flex items-center space-x-2 mb-2">
                                    <FaDownload className="text-green-500" />
                                    <span className="font-medium text-gray-700">File Name</span>
                                </div>
                                <p className="text-sm font-medium text-gray-800 truncate">{result.name}</p>
                            </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                            <p className="text-sm text-yellow-800">
                                <strong>Note:</strong> This download link is valid until {new Date(result.outputLinkValidTill).toLocaleString()}
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleDownload}
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white p-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 flex items-center justify-center space-x-2"
                        >
                            <FaDownload />
                            <span>Download Research Report (PDF)</span>
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const AutomatedResearchPage = () => (
    <PageRevealWrapper
        heading="Automated Research AI Agent: Intelligent Research Report Generator"
        description="Transform any topic into a comprehensive research report with just one click. This AI-powered research agent analyzes your input topic, generates targeted search queries, conducts thorough research, and delivers a professionally formatted PDF report complete with key findings, recommendations, and sources. Perfect for students, researchers, content creators, and anyone needing quick, comprehensive research on any subject."
        details={
            <div className="space-y-6">
                <div>
                    <h2 className="font-semibold text-purple-700 mb-2">Features</h2>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                        <li>AI-Powered Topic Analysis: Automatically refines your topic into targeted search queries</li>
                        <li>Comprehensive Research: Generates 5 distinct search queries for thorough coverage</li>
                        <li>Structured Report Generation: Creates organized reports with title, summary, sections, and key findings</li>
                        <li>Professional PDF Output: Delivers ready-to-use research reports in PDF format</li>
                        <li>Google Sheets Integration: Stores research data for future reference and analysis</li>
                        <li>Time Tracking: Monitors research duration for performance insights</li>
                        <li>Secure Link Management: Provides time-limited download links for report access</li>
                    </ul>
                </div>
                
                <div>
                    <h2 className="font-semibold text-indigo-700 mb-2">Example Use Cases</h2>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                        <li>Academic Research: Quick literature reviews and topic exploration for students and researchers</li>
                        <li>Content Creation: Generate comprehensive background research for articles, blogs, and presentations</li>
                        <li>Business Intelligence: Research market trends, competitors, and industry insights</li>
                        <li>Educational Resources: Create study materials and reference documents for courses</li>
                        <li>Professional Reports: Generate client-ready research reports for consulting and advisory services</li>
                    </ul>
                </div>
                
                <div>
                    <h2 className="font-semibold text-purple-700 mb-2">⚡ Why This Stands Out</h2>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                        <li>One-Click Research: Simply input a topic and receive a complete research report</li>
                        <li>AI-Enhanced Query Generation: Automatically creates 5 targeted search queries for comprehensive coverage</li>
                        <li>Professional Output: Generates structured reports with proper formatting and organization</li>
                        <li>Instant PDF Delivery: Provides immediate access to research results in downloadable format</li>
                        <li>Data Persistence: Stores research data in Google Sheets for future reference and analysis</li>
                        <li>Performance Monitoring: Tracks research duration and page count for quality assessment</li>
                    </ul>
                </div>
            </div>
        }
    >
        <AutomatedResearchContent />
    </PageRevealWrapper>
);

export default AutomatedResearchPage; 