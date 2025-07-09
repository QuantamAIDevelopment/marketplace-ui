import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCommentDots, FaUpload, FaChartBar, FaThumbsUp, FaThumbsDown, FaClock, FaTag } from 'react-icons/fa';
import PageRevealWrapper from '../components/PageRevealWrapper';
import { triggerProductFeedbackSummarizer } from '../services/workflows/productFeedbackSummarizer';

const defaultRow = () => ({
    productId: '',
    feedback: '',
    timestamp: '',
    rating: ''
});

const ProductFeedbackSummarizerContent = () => {
    const [rows, setRows] = useState([
        defaultRow(),
    ]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRowChange = (idx, field, value) => {
        setRows(prev => prev.map((row, i) => i === idx ? { ...row, [field]: value } : row));
    };

    const handleAddRow = () => {
        setRows(prev => [...prev, defaultRow()]);
    };

    const handleRemoveRow = (idx) => {
        setRows(prev => prev.length === 1 ? prev : prev.filter((_, i) => i !== idx));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setResults([]);

        // Validate rows
        for (let row of rows) {
            if (!row.productId || !row.feedback || !row.timestamp || !row.rating) {
                setError('Please fill all fields in every row.');
                return;
            }
        }

        setLoading(true);
        try {
            // Format data for API
            const payload = rows.map(row => ({
                "Product ID": row.productId,
                "Feedback": row.feedback,
                "Timestamp (Date)": row.timestamp,
                "Rating": Number(row.rating)
            }));
            const result = await triggerProductFeedbackSummarizer(payload);
            setResults(result);
        } catch (err) {
            setError('Failed to process feedback. Please try again.');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const renderProductSummary = (product, index) => {
        // Defensive fallback for all fields
        let praises = [];
        let complaints = [];
        let keywords = [];
        let sentimentBreakdown = { positive: 0, neutral: 0, negative: 0 };

        try {
            praises = product.praises ? (typeof product.praises === 'string' ? JSON.parse(product.praises) : product.praises) : [];
        } catch { praises = []; }
        try {
            complaints = product.complaints ? (typeof product.complaints === 'string' ? JSON.parse(product.complaints) : product.complaints) : [];
        } catch { complaints = []; }
        try {
            keywords = product.keywords ? (typeof product.keywords === 'string' ? JSON.parse(product.keywords) : product.keywords) : [];
        } catch { keywords = []; }
        try {
            sentimentBreakdown = product.sentimentBreakdown ? (typeof product.sentimentBreakdown === 'string' ? JSON.parse(product.sentimentBreakdown) : product.sentimentBreakdown) : { positive: 0, neutral: 0, negative: 0 };
            if (!sentimentBreakdown) sentimentBreakdown = { positive: 0, neutral: 0, negative: 0 };
        } catch { sentimentBreakdown = { positive: 0, neutral: 0, negative: 0 }; }

        return (
            <motion.div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: index * 0.1 }}
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <FaTag className="text-blue-500" />
                        Product ID: {product.productid}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaClock className="text-gray-400" />
                        {product.timestamp ? new Date(product.timestamp).toLocaleDateString() : 'N/A'}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Praises Section */}
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-3">
                            <FaThumbsUp className="text-green-600" />
                            <h4 className="font-semibold text-green-800">Praises</h4>
                        </div>
                        <ul className="space-y-2">
                            {Array.isArray(praises) && praises.length > 0 ? praises.map((praise, idx) => (
                                <li key={idx} className="text-sm text-green-700 flex items-start gap-2">
                                    <span className="text-green-500 mt-1">•</span>
                                    {praise}
                                </li>
                            )) : (
                                <li className="text-sm text-green-700">No praises found</li>
                            )}
                        </ul>
                    </div>

                    {/* Complaints Section */}
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <div className="flex items-center gap-2 mb-3">
                            <FaThumbsDown className="text-red-600" />
                            <h4 className="font-semibold text-red-800">Complaints</h4>
                        </div>
                        <ul className="space-y-2">
                            {Array.isArray(complaints) && complaints.length > 0 ? complaints.map((complaint, idx) => (
                                <li key={idx} className="text-sm text-red-700 flex items-start gap-2">
                                    <span className="text-red-500 mt-1">•</span>
                                    {complaint}
                                </li>
                            )) : (
                                <li className="text-sm text-red-700">No complaints found</li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Sentiment Analysis */}
                <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-3">
                        <FaChartBar className="text-blue-600" />
                        <h4 className="font-semibold text-blue-800">Sentiment Analysis</h4>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{sentimentBreakdown.positive ?? 0}%</div>
                            <div className="text-sm text-gray-600">Positive</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-600">{sentimentBreakdown.neutral ?? 0}%</div>
                            <div className="text-sm text-gray-600">Neutral</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-red-600">{sentimentBreakdown.negative ?? 0}%</div>
                            <div className="text-sm text-gray-600">Negative</div>
                        </div>
                    </div>
                </div>

                {/* Keywords */}
                {Array.isArray(keywords) && keywords.length > 0 && (
                    <div className="mt-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Key Terms</h4>
                        <div className="flex flex-wrap gap-2">
                            {keywords.map((keyword, idx) => (
                                <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-6xl mx-auto">
            <motion.h1 
                initial={{ opacity: 0, y: -30 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="text-3xl font-bold text-center mb-6 text-gray-800"
            >
                Product Feedback Summarizer
            </motion.h1>

            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border rounded-lg">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border-b">Product ID</th>
                                <th className="px-4 py-2 border-b">Feedback</th>
                                <th className="px-4 py-2 border-b">Timestamp (Date)</th>
                                <th className="px-4 py-2 border-b">Rating</th>
                                <th className="px-4 py-2 border-b">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, idx) => (
                                <tr key={idx}>
                                    <td className="px-2 py-1 border-b">
                                        <input
                                            type="text"
                                            className="w-full border rounded p-1"
                                            value={row.productId}
                                            onChange={e => handleRowChange(idx, 'productId', e.target.value)}
                                            placeholder="e.g. ZX100"
                                            required
                                        />
                                    </td>
                                    <td className="px-2 py-1 border-b">
                                        <input
                                            type="text"
                                            className="w-full border rounded p-1"
                                            value={row.feedback}
                                            onChange={e => handleRowChange(idx, 'feedback', e.target.value)}
                                            placeholder="Feedback"
                                            required
                                        />
                                    </td>
                                    <td className="px-2 py-1 border-b">
                                        <input
                                            type="date"
                                            className="w-full border rounded p-1"
                                            value={row.timestamp}
                                            onChange={e => handleRowChange(idx, 'timestamp', e.target.value)}
                                            required
                                        />
                                    </td>
                                    <td className="px-2 py-1 border-b">
                                        <input
                                            type="number"
                                            min="1"
                                            max="5"
                                            className="w-full border rounded p-1"
                                            value={row.rating}
                                            onChange={e => handleRowChange(idx, 'rating', e.target.value)}
                                            required
                                        />
                                    </td>
                                    <td className="px-2 py-1 border-b text-center">
                                        <button
                                            type="button"
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                            onClick={() => handleRemoveRow(idx)}
                                            disabled={rows.length === 1}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button
                    type="button"
                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 font-semibold"
                    onClick={handleAddRow}
                >
                    Add Row
                </button>
                <motion.button 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }} 
                    type="submit" 
                    disabled={loading} 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg hover:from-blue-600 hover:to-purple-600 disabled:bg-gray-400 font-semibold mt-4"
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Fetching Feedback Summary...
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            <FaCommentDots />
                            Fetch Feedback Summary
                        </div>
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

            {results.length > 0 && (
                <div className="space-y-6">
                    <motion.h2 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl font-bold text-gray-800 mb-4"
                    >
                        Analysis Results ({results.length} products)
                    </motion.h2>
                    {results.map(renderProductSummary)}
                </div>
            )}
        </div>
    );
};

const ProductFeedbackSummarizerPage = () => (
    <PageRevealWrapper
        heading="Product Feedback Summarizer: AI-Powered Customer Insight Engine"
        description="Transform raw customer feedback into actionable business intelligence. This AI-powered system processes customer reviews, ratings, and comments to extract key insights, sentiment analysis, and trend patterns. It automatically categorizes feedback into praises and complaints, identifies common keywords, and provides sentiment breakdowns to help businesses understand customer satisfaction and areas for improvement."
        details={
            <div className="space-y-6">
                <div>
                    <h2 className="font-semibold text-blue-700 mb-2">Features</h2>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                        <li>Automated Feedback Processing: Handles structured JSON data with timestamps, product IDs, and ratings.</li>
                        <li>AI-Powered Sentiment Analysis: Uses Groq LLM to analyze customer sentiment and categorize feedback.</li>
                        <li>Smart Categorization: Automatically separates praises from complaints for clear insights.</li>
                        <li>Keyword Extraction: Identifies common terms and phrases across feedback data.</li>
                        <li>Sentiment Breakdown: Provides percentage breakdown of positive, neutral, and negative sentiment.</li>
                        <li>Google Sheets Integration: Stores processed data and generates summary reports.</li>
                        <li>Email Reporting: Sends formatted HTML reports via Gmail for easy sharing.</li>
                        <li>Error Handling: Robust error detection and alerting system for failed processing.</li>
                    </ul>
                </div>
                
                <div>
                    <h2 className="font-semibold text-purple-700 mb-2">Example Use Cases</h2>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                        <li>E-commerce Platforms: Analyze product reviews to identify improvement opportunities.</li>
                        <li>Product Teams: Understand customer pain points and feature requests.</li>
                        <li>Customer Success: Track satisfaction trends and identify at-risk customers.</li>
                        <li>Marketing Teams: Extract positive testimonials and success stories.</li>
                        <li>Quality Assurance: Monitor product quality issues and defect patterns.</li>
                    </ul>
                </div>
                
                <div>
                    <h2 className="font-semibold text-blue-700 mb-2">⚡ Why This Stands Out</h2>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                        <li>Real-time Processing: Handles feedback data as it comes in via webhook or scheduled triggers.</li>
                        <li>Intelligent Filtering: Groups feedback by product and applies configurable filters.</li>
                        <li>Comprehensive Analysis: Provides both qualitative (praises/complaints) and quantitative (sentiment) insights.</li>
                        <li>Automated Reporting: Generates professional HTML reports and sends via email.</li>
                        <li>Scalable Architecture: Built on n8n workflow engine for enterprise-grade reliability.</li>
                        <li>Data Persistence: Stores results in Google Sheets for historical analysis and tracking.</li>
                    </ul>
                </div>
            </div>
        }
    >
        <ProductFeedbackSummarizerContent />
    </PageRevealWrapper>
);

export default ProductFeedbackSummarizerPage; 