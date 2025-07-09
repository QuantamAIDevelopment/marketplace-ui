import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChartLine, FaExclamationTriangle, FaUsers, FaCalendarAlt, FaBullseye, FaPercentage } from 'react-icons/fa';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';
import { generateSalesForecast } from '../services/workflows/salesForecasting';

const SalesForecastingContent = () => {
    const [pipelineFile, setPipelineFile] = useState(null);
    const [historicalFile, setHistoricalFile] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePipelineFileChange = (e) => {
        setPipelineFile(e.target.files[0]);
    };

    const handleHistoricalFileChange = (e) => {
        setHistoricalFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!pipelineFile || !historicalFile) {
            setError('Both pipeline and historical files are required.');
            return;
        }

        setLoading(true);
        setError(null);
        setForecastData(null);

        try {
            const result = await generateSalesForecast(pipelineFile, historicalFile);
            setForecastData(result);
        } catch (err) {
            setError('Failed to generate sales forecast. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderForecastSummary = () => {
        if (!forecastData?.summary) return null;

        const { summary } = forecastData;
        
        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="bg-white p-6 rounded-lg shadow-lg border"
            >
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <FaChartLine className="mr-2 text-blue-500" />
                    Sales Forecast Summary
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Revenue Range */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                            <FaChartLine className="text-blue-600 mr-2" />
                            <h4 className="font-semibold text-blue-800">Expected Revenue Range</h4>
                        </div>
                        <p className="text-2xl font-bold text-blue-900">{summary.expected_revenue_range}</p>
                    </div>

                    {/* Risk of Shortfall */}
                    <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                            <FaExclamationTriangle className="text-red-600 mr-2" />
                            <h4 className="font-semibold text-red-800">Risk of Shortfall</h4>
                        </div>
                        <p className="text-2xl font-bold text-red-900">{summary.risk_of_shortfall}</p>
                    </div>

                    {/* Forecast This Week */}
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                            <FaCalendarAlt className="text-green-600 mr-2" />
                            <h4 className="font-semibold text-green-800">This Week</h4>
                        </div>
                        <p className="text-2xl font-bold text-green-900">₹{summary.forecast_this_week?.toLocaleString()}</p>
                    </div>

                    {/* Forecast This Month */}
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                            <FaCalendarAlt className="text-purple-600 mr-2" />
                            <h4 className="font-semibold text-purple-800">This Month</h4>
                        </div>
                        <p className="text-2xl font-bold text-purple-900">₹{summary.forecast_this_month?.toLocaleString()}</p>
                    </div>

                    {/* Forecast This Quarter */}
                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                            <FaCalendarAlt className="text-indigo-600 mr-2" />
                            <h4 className="font-semibold text-indigo-800">This Quarter</h4>
                        </div>
                        <p className="text-2xl font-bold text-indigo-900">₹{summary.forecast_this_quarter?.toLocaleString()}</p>
                    </div>

                    {/* Timestamp */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                            <FaCalendarAlt className="text-gray-600 mr-2" />
                            <h4 className="font-semibold text-gray-800">Generated</h4>
                        </div>
                        <p className="text-sm text-gray-700">
                            {new Date(summary.timestamp).toLocaleString()}
                        </p>
                    </div>
                </div>
            </motion.div>
        );
    };

    const renderTopDeals = () => {
        if (!forecastData?.summary?.top_5_deals) return null;

        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-lg shadow-lg border mt-6"
            >
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <FaUsers className="mr-2 text-blue-500" />
                    Top 5 High-Confidence Deals
                </h3>
                
                <div className="space-y-4">
                    {forecastData.summary.top_5_deals.map((deal, index) => (
                        <div key={deal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-4">
                                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                                    {index + 1}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">Lead #{deal.id}</p>
                                    <p className="text-sm text-gray-600">Rep: {deal.rep} | Stage: {deal.stage}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-green-600">₹{deal.value?.toLocaleString()}</p>
                                <p className="text-sm text-gray-600">Confidence: {(deal.confidence * 100).toFixed(0)}%</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        );
    };

    const renderVisualizations = () => {
        if (!forecastData?.visualizations) return null;

        const { visualizations } = forecastData;
        
        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.4 }}
                className="bg-white p-6 rounded-lg shadow-lg border mt-6"
            >
                <h3 className="text-xl font-bold text-gray-800 mb-6">Forecast Analytics</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Forecast vs Target */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                            <FaBullseye className="mr-2" />
                            Forecast vs Target
                        </h4>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Forecast:</span>
                                <span className="font-bold">₹{visualizations.forecast_vs_target?.forecast?.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Target:</span>
                                <span className="font-bold">₹{visualizations.forecast_vs_target?.target?.toLocaleString()}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                <div 
                                    className="bg-blue-600 h-2 rounded-full" 
                                    style={{ 
                                        width: `${Math.min((visualizations.forecast_vs_target?.forecast / visualizations.forecast_vs_target?.target) * 100, 100)}%` 
                                    }}
                                ></div>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">
                                {((visualizations.forecast_vs_target?.forecast / visualizations.forecast_vs_target?.target) * 100).toFixed(1)}% of target
                            </p>
                        </div>
                    </div>

                    {/* Stage Funnel */}
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                            <FaPercentage className="mr-2" />
                            Sales Stage Funnel
                        </h4>
                        <div className="space-y-2">
                            {Object.entries(visualizations.stage_funnel || {}).map(([stage, count]) => (
                                <div key={stage} className="flex justify-between items-center">
                                    <span className="text-sm">{stage}:</span>
                                    <span className="font-bold text-lg">{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Region Product Heatmap */}
                {visualizations.region_product_heatmap && Object.keys(visualizations.region_product_heatmap).length > 0 && (
                    <div className="mt-6 bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-3">Region & Product Distribution</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {Object.entries(visualizations.region_product_heatmap).map(([key, count]) => {
                                const [region, product] = key.split('__');
                                return (
                                    <div key={key} className="bg-white p-3 rounded-lg shadow-sm">
                                        <p className="font-semibold text-sm">{region || 'Unknown'}</p>
                                        <p className="text-xs text-gray-600">{product || 'Unknown'}</p>
                                        <p className="text-lg font-bold text-purple-600">{count}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </motion.div>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-6xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Pipeline Data (CSV)
                        </label>
                        <input 
                            type="file" 
                            accept=".csv"
                            onChange={handlePipelineFileChange} 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Historical Data (CSV)
                        </label>
                        <input 
                            type="file" 
                            accept=".csv"
                            onChange={handleHistoricalFileChange} 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
                
                <motion.button 
                    whileHover={{ scale: 1.02 }} 
                    whileTap={{ scale: 0.98 }} 
                    type="submit" 
                    disabled={loading} 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg font-bold hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                    {loading ? 'Generating Forecast...' : 'Generate Sales Forecast'}
                </motion.button>
            </form>

            {error && (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
                >
                    {error}
                </motion.div>
            )}

            <AnimatePresence>
                {forecastData && (
                    <div className="space-y-6">
                        {renderForecastSummary()}
                        {renderTopDeals()}
                        {renderVisualizations()}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const SalesForecastingPage = () => {
  const workflowRef = useRef(null);

  const handleStartNavigation = () => {
    if (workflowRef.current) {
      workflowRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PageRevealWrapper
      heading="Sales Forecasting Agent"
      description="Instantly forecast your sales pipeline using AI. Upload your pipeline and historical data to receive actionable forecasts, risk analysis, and insights—no data science expertise required."
      details={
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-blue-700 mb-2">Example Use Cases</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Sales Teams: Predict revenue and identify at-risk deals.</li>
              <li>Management: Set realistic targets and monitor progress.</li>
              <li>Startups: Plan cash flow and growth with confidence.</li>
              <li>Finance: Align forecasts with budgeting and resource allocation.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-purple-700 mb-2">Why This Stands Out</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>AI-Powered Forecasting<br/>Leverages advanced models for accurate sales predictions.</li>
              <li>Actionable Insights<br/>Highlights risks, opportunities, and next steps.</li>
              <li>Visual Analytics<br/>Interactive charts and summaries for quick understanding.</li>
              <li>Secure & Confidential<br/>Your data is processed securely and never stored.</li>
            </ul>
          </div>
          <div className="mt-6 text-center">
            <span className="inline-block bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg mb-4">Use the Sales Forecasting Agent to drive revenue growth and make informed decisions—instantly and effortlessly!</span>
            <br />
            {/* Remove Start Navigation button, keep Start Now if present */}
          </div>
        </div>
      }
    >
      <div ref={workflowRef} className="max-w-2xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Sales Forecasting Agent</h1>
        {/* Existing workflow content below */}
        <SalesForecastingContent />
      </div>
    </PageRevealWrapper>
  );
};

export default SalesForecastingPage; 