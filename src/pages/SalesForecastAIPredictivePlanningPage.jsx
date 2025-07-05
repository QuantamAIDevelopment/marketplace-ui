import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileUpload, FaChartLine, FaExclamationTriangle } from 'react-icons/fa';
import PageRevealWrapper from '../components/PageRevealWrapper';
import { triggerSalesForecastAIWorkflow } from '../services/workflows/salesForecastAI';

const useCases = [
  'Sales Teams: Instantly forecast pipeline revenue and identify top deals to focus on.',
  'Revenue Operations: Monitor risk of shortfall and optimize sales strategies in real time.',
  'Regional Managers: Compare performance across products, reps, and territories.',
  'Executives: Get a clear, AI-powered summary of expected revenue for the week, month, and quarter.',
  'Analysts: Download and visualize forecast data for deeper business insights.',
];

const SalesForecastAIPredictivePlanningPage = () => {
  const [pipelineFile, setPipelineFile] = useState(null);
  const [historicalFile, setHistoricalFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e, type) => {
    if (type === 'pipeline') setPipelineFile(e.target.files[0]);
    else setHistoricalFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pipelineFile || !historicalFile) {
      setError('Both pipeline and historical files are required.');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await triggerSalesForecastAIWorkflow(pipelineFile, historicalFile);
      setResult(data);
    } catch (err) {
      setError('Failed to get forecast. Please check your files and try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderTopDeals = (deals = []) => (
    <div className="space-y-2">
      {deals.map((deal, idx) => (
        <div key={deal.id} className="bg-white border rounded-lg p-3 flex items-center gap-4 shadow">
          <span className="font-bold text-indigo-600">#{deal.id}</span>
          <span className="text-gray-700">₹{deal.value.toLocaleString()}</span>
          <span className="text-sm text-gray-500">{deal.stage}</span>
          <span className="text-sm text-blue-500">Rep: {deal.rep}</span>
          <span className="text-sm text-green-600">Confidence: {(deal.confidence * 100).toFixed(0)}%</span>
        </div>
      ))}
    </div>
  );

  const renderStageFunnel = (funnel = {}) => (
    <div className="flex gap-4">
      {Object.entries(funnel).map(([stage, count]) => (
        <div key={stage} className="flex flex-col items-center">
          <span className="font-bold text-indigo-700">{count}</span>
          <span className="text-xs text-gray-600">{stage}</span>
        </div>
      ))}
    </div>
  );

  const renderForecastVsTarget = (data = {}) => (
    <div className="flex flex-col items-center">
      <span className="text-2xl font-bold text-indigo-700">₹{data.forecast?.toLocaleString() || 0}</span>
      <span className="text-sm text-gray-600">Forecast vs Target: <b>₹{data.target?.toLocaleString() || 0}</b></span>
    </div>
  );

  const renderHeatmap = (heatmap = {}) => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {Object.entries(heatmap).map(([key, count]) => (
        <div key={key} className="bg-blue-50 border border-blue-200 rounded p-2 text-xs text-blue-900">
          <span className="font-bold">{count}</span> {key.replace(/__/g, ' / ')}
        </div>
      ))}
    </div>
  );

  return (
    <PageRevealWrapper>
      <div className="min-h-screen flex flex-col items-center justify-start py-8 px-2 bg-gradient-to-r from-indigo-50 via-blue-50 to-purple-100 w-full">
        {/* Intro Section */}
        <div className="max-w-3xl w-full mx-auto rounded-2xl p-8 mb-10 shadow-xl bg-white/80 border border-indigo-100 flex flex-col items-center">
          <div className="flex flex-col items-center mb-4">
            <FaChartLine className="w-16 h-16 text-indigo-500 mb-2 drop-shadow-lg" />
            <h1 className="text-4xl md:text-5xl font-extrabold text-center text-indigo-600 mb-2" style={{ letterSpacing: 1 }}>SalesForecast AI Predictive Planning</h1>
          </div>
          <p className="text-lg text-center text-gray-700 mb-6 max-w-2xl">
            Unlock the power of predictive sales planning with AI. Upload your CRM pipeline and historical sales data to instantly forecast revenue, assess risk, and identify your top deals. Get actionable insights for your team, region, or product—so you can focus on what matters most.
          </p>
          <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="AI Assistant" className="w-24 h-24 mx-auto mb-4 rounded-full shadow-lg bg-white object-contain" style={{ border: '4px solid #a5b4fc' }} />
          <div className="w-full mt-2">
            <h2 className="text-2xl font-bold text-indigo-700 mb-2">Example <span className="text-purple-600">Use Cases</span></h2>
            <ul className="list-disc pl-6 space-y-1 text-base text-gray-800">
              {useCases.map((uc, i) => (
                <li key={i}><span className="font-semibold text-indigo-600">•</span> {uc}</li>
              ))}
            </ul>
          </div>
          {/* Why This Stands Out Section */}
          <div className="w-full mt-8">
            <h2 className="text-2xl font-bold mb-2 text-indigo-700">Why This <span className="text-purple-600">Stands Out</span></h2>
            <ul className="list-disc pl-6 space-y-1 text-base text-gray-800">
              <li><span className="font-semibold text-indigo-600">•</span> <b>AI-Powered Forecasting:</b> Uses advanced models for accurate sales predictions.</li>
              <li><span className="font-semibold text-indigo-600">•</span> <b>Real-Time Risk Analysis:</b> Instantly highlights risk of shortfall and top opportunities.</li>
              <li><span className="font-semibold text-indigo-600">•</span> <b>Multi-Dimensional Insights:</b> Breakdowns by rep, region, product, and stage.</li>
              <li><span className="font-semibold text-indigo-600">•</span> <b>Seamless File Upload:</b> Accepts CRM pipeline and historical data in multiple formats.</li>
              <li><span className="font-semibold text-indigo-600">•</span> <b>Visual Dashboards:</b> Instantly see forecast vs. target, funnel, and heatmap visualizations.</li>
              <li><span className="font-semibold text-indigo-600">•</span> <b>Automated Reporting:</b> Download or share results with your team.</li>
            </ul>
          </div>
        </div>

        {/* Main Form & Results Section */}
        <div className="max-w-2xl w-full mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow border mb-8">
            <div>
              <label className="block font-semibold mb-1">Pipeline File</label>
              <input type="file" accept=".csv,.xlsx,.xls,.json" onChange={e => handleFileChange(e, 'pipeline')} className="w-full border rounded p-2" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Historical Deals File</label>
              <input type="file" accept=".csv,.xlsx,.xls,.json" onChange={e => handleFileChange(e, 'historical')} className="w-full border rounded p-2" />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white p-2 rounded font-bold hover:bg-indigo-700 disabled:bg-indigo-300"
            >
              {loading ? 'Forecasting...' : 'Get Forecast'}
            </motion.button>
            {error && (
              <div className="flex items-center text-red-600 mt-2"><FaExclamationTriangle className="mr-2" />{error}</div>
            )}
          </form>
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                className="bg-white p-6 rounded-xl shadow-xl border space-y-6"
              >
                <h2 className="text-2xl font-bold mb-2 text-indigo-700">Forecast Summary</h2>
                <div className="mb-4">
                  <div className="text-lg font-semibold">Expected Revenue Range: <span className="text-green-700">{result.summary.expected_revenue_range}</span></div>
                  <div className="text-sm text-gray-700 mt-1">This Week: <b>₹{result.summary.forecast_this_week?.toLocaleString()}</b> | This Month: <b>₹{result.summary.forecast_this_month?.toLocaleString()}</b> | This Quarter: <b>₹{result.summary.forecast_this_quarter?.toLocaleString()}</b></div>
                  <div className="text-sm text-red-600 mt-1">Risk of Shortfall: <b>{result.summary.risk_of_shortfall}</b></div>
                  <div className="text-xs text-gray-400 mt-1">Last updated: {new Date(result.summary.timestamp).toLocaleString()}</div>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Top 5 Deals</h3>
                  {renderTopDeals(result.summary.top_5_deals)}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-indigo-600">Forecast vs Target</h4>
                    {renderForecastVsTarget(result.visualizations.forecast_vs_target)}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-indigo-600">Stage Funnel</h4>
                    {renderStageFunnel(result.visualizations.stage_funnel)}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-indigo-600">Region/Product Heatmap</h4>
                    {renderHeatmap(result.visualizations.region_product_heatmap)}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageRevealWrapper>
  );
};

export default SalesForecastAIPredictivePlanningPage; 