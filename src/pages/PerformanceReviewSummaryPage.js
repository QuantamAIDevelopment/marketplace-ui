import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaUserCheck, FaPlus, FaTrash, FaStar, FaChartLine, FaBuilding, FaUser, FaClipboardList } from 'react-icons/fa';
import PageRevealWrapper from '../components/PageRevealWrapper';
import { triggerPerformanceReviewSummary } from '../services/workflows/performanceReviewSummary';

const defaultRow = () => ({
  employee_id: '',
  employee_name: '',
  department: '',
  manager_feedback: '',
  peer_feedback: '',
  kpi_score: '',
  review_status: 'completed',
  timestamp: ''
});

const PerformanceReviewSummaryPageContent = () => {
  const [rows, setRows] = useState([defaultRow()]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const formRef = useRef(null);

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
      if (!row.employee_id || !row.employee_name || !row.department || !row.manager_feedback || !row.peer_feedback || !row.kpi_score || !row.timestamp) {
        setError('Please fill all fields in every row.');
        return;
      }
    }
    setLoading(true);
    try {
      const result = await triggerPerformanceReviewSummary(rows);
      setResults(result);
    } catch (err) {
      setError('Failed to process performance reviews. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderEmployeeSummary = (emp, index) => (
    <motion.div
      key={index}
      className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <FaUser className="text-blue-500" />
          {emp.employee_name} <span className="text-sm text-gray-500">({emp.employee_id})</span>
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaBuilding className="text-gray-400" />
          {emp.department}
        </div>
      </div>
      <div className="mb-2 text-gray-700">
        <FaClipboardList className="inline mr-1 text-green-500" /> <b>Summary:</b> {emp.summary}
      </div>
      <div className="grid md:grid-cols-2 gap-6 mt-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-3">
            <FaStar className="text-yellow-500" />
            <h4 className="font-semibold text-green-800">Strengths</h4>
          </div>
          <ul className="space-y-2">
            {Array.isArray(emp.strengths) && emp.strengths.length > 0 ? emp.strengths.map((s, idx) => (
              <li key={idx} className="text-sm text-green-700 flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span> {s}
              </li>
            )) : <li className="text-sm text-green-700">No strengths found</li>}
          </ul>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center gap-2 mb-3">
            <FaStar className="text-red-500" />
            <h4 className="font-semibold text-red-800">Improvements</h4>
          </div>
          <ul className="space-y-2">
            {Array.isArray(emp.improvements) && emp.improvements.length > 0 ? emp.improvements.map((s, idx) => (
              <li key={idx} className="text-sm text-red-700 flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span> {s}
              </li>
            )) : <li className="text-sm text-red-700">No improvements found</li>}
          </ul>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 text-center">
          <div className="text-xs text-gray-500">AI Rating</div>
          <div className="text-2xl font-bold text-blue-600">{emp.ai_rating ?? '-'}</div>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 text-center">
          <div className="text-xs text-gray-500">KPI Score</div>
          <div className="text-2xl font-bold text-yellow-600">{emp.kpi_score ?? '-'}</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg border border-green-200 text-center">
          <div className="text-xs text-gray-500">Final Rating</div>
          <div className="text-2xl font-bold text-green-600">{emp.applied_rating ?? '-'}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-center">
          <div className="text-xs text-gray-500">Manager Sentiment</div>
          <div className="text-2xl font-bold text-gray-600">{emp.manager_sentiment ?? '-'}</div>
        </div>
      </div>
      <div className="mt-4 text-xs text-gray-500">{emp.timestamp ? new Date(emp.timestamp).toLocaleString() : ''}</div>
    </motion.div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-6xl mx-auto">
      {/* Marketing-style Section */}
      <section className="w-full py-12 px-4 bg-gradient-to-br from-blue-50 via-blue-100 to-purple-50 rounded-3xl shadow mb-12">
        <div className="flex items-center mb-4">
          <span className="bg-blue-600 p-3 rounded-lg mr-3 shadow">
            <FaChartLine className="text-white w-7 h-7" />
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Performance <span className="text-blue-600">Feedback</span>
          </h2>
        </div>
        <p className="text-lg text-gray-700 mb-8">
          Instantly generate AI-powered summaries of employee performance feedback, strengths, and improvement areas. Streamline HR insights and empower your team!
        </p>
        <ul className="list-disc pl-8 space-y-2 text-base text-gray-800 mb-10">
          <li>Summarizes multiple employee feedback entries in seconds</li>
          <li>Highlights top strengths and improvement areas</li>
          <li>Provides clear, actionable ratings and feedback</li>
          <li>Easy export and sharing for HR teams</li>
        </ul>
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-2">Get Started</h3>
          <p className="text-gray-700 mb-6">
            Fill out the form below to generate your performance feedback summary. The AI assistant will handle the rest—analyzing details, highlighting strengths, and providing actionable feedback instantly!
          </p>
          <div className="flex justify-center">
            <button
              className="px-10 py-3 rounded-full text-white font-bold text-lg shadow-lg transition-all"
              style={{ background: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)' }}
              onClick={scrollToForm}
              type="button"
            >
              Start Now
            </button>
          </div>
        </div>
      </section>
      {/* Form and Results */}
      <div ref={formRef} />
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Employee ID</th>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Department</th>
                <th className="px-4 py-2 border-b">Manager Feedback</th>
                <th className="px-4 py-2 border-b">Peer Feedback</th>
                <th className="px-4 py-2 border-b">KPI Score</th>
                <th className="px-4 py-2 border-b">Timestamp</th>
                <th className="px-4 py-2 border-b">Remove</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx}>
                  <td className="px-2 py-1 border-b">
                    <input type="text" value={row.employee_id} onChange={e => handleRowChange(idx, 'employee_id', e.target.value)} className="w-24 p-1 border rounded" required />
                  </td>
                  <td className="px-2 py-1 border-b">
                    <input type="text" value={row.employee_name} onChange={e => handleRowChange(idx, 'employee_name', e.target.value)} className="w-32 p-1 border rounded" required />
                  </td>
                  <td className="px-2 py-1 border-b">
                    <input type="text" value={row.department} onChange={e => handleRowChange(idx, 'department', e.target.value)} className="w-28 p-1 border rounded" required />
                  </td>
                  <td className="px-2 py-1 border-b">
                    <input type="text" value={row.manager_feedback} onChange={e => handleRowChange(idx, 'manager_feedback', e.target.value)} className="w-48 p-1 border rounded" required />
                  </td>
                  <td className="px-2 py-1 border-b">
                    <input type="text" value={row.peer_feedback} onChange={e => handleRowChange(idx, 'peer_feedback', e.target.value)} className="w-48 p-1 border rounded" required />
                  </td>
                  <td className="px-2 py-1 border-b">
                    <input type="number" value={row.kpi_score} onChange={e => handleRowChange(idx, 'kpi_score', e.target.value)} className="w-20 p-1 border rounded" required />
                  </td>
                  <td className="px-2 py-1 border-b">
                    <input type="datetime-local" value={row.timestamp} onChange={e => handleRowChange(idx, 'timestamp', e.target.value)} className="w-40 p-1 border rounded" required />
                  </td>
                  <td className="px-2 py-1 border-b text-center">
                    <button type="button" onClick={() => handleRemoveRow(idx)} className="text-red-500 hover:text-red-700"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-2">
          <button type="button" onClick={handleAddRow} className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">
            <FaPlus /> Add Row
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? 'Processing...' : 'Generate Summary'}
          </motion.button>
        </div>
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      <div className="mt-6 space-y-6">
        {results.map(renderEmployeeSummary)}
      </div>
    </div>
  );
};

const PerformanceReviewSummaryPage = () => (
  <PageRevealWrapper>
    <PerformanceReviewSummaryPageContent />
  </PageRevealWrapper>
);

export default PerformanceReviewSummaryPage; 