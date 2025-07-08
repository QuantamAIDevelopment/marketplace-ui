import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaCheckCircle, FaExclamationTriangle, FaRobot, FaUserCircle, FaExternalLinkAlt } from 'react-icons/fa';

const PR_REVIEWER_API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/PR_rewiewer';

const PRReviewerAIAgent = () => {
  const [form, setForm] = useState({
    owner: '',
    repo: '',
    githubToken: '',
    gmail: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    setResponse(null);
    try {
      const res = await fetch(PR_REVIEWER_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to fetch PR review');
      const text = await res.text();
      if (!text) throw new Error('No response received from server.');
      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonErr) {
        throw new Error('Server response was not valid JSON.');
      }
      setResponse(Array.isArray(data) ? data[0] : data);
    } catch (err) {
      setError(err.message || 'Unknown error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl mx-auto">
        <div className="relative z-10 w-full max-w-2xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-anthropic-dark drop-shadow-lg flex items-center justify-center gap-3"
          >
            <FaRobot className="inline-block text-blue-500 mb-1" /> PR Reviewer AI Agent
          </motion.h1>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 space-y-6 border border-gray-200 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" name="owner" value={form.owner} onChange={handleInputChange} placeholder="GitHub Owner" className="bg-gray-100 rounded-lg px-4 py-2 w-full" required />
              <input type="text" name="repo" value={form.repo} onChange={handleInputChange} placeholder="Repository Name" className="bg-gray-100 rounded-lg px-4 py-2 w-full" required />
              <input type="text" name="githubToken" value={form.githubToken} onChange={handleInputChange} placeholder="GitHub Token" className="bg-gray-100 rounded-lg px-4 py-2 w-full" required />
              <input type="email" name="gmail" value={form.gmail} onChange={handleInputChange} placeholder="Notification Email" className="bg-gray-100 rounded-lg px-4 py-2 w-full" required />
            </div>
            {error && <div className="bg-red-500 text-white p-3 rounded-lg flex items-center gap-2"><FaExclamationTriangle /> {error}</div>}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 8px 32px 0 #61868d33' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : 'Run PR Reviewer Agent'}
            </motion.button>
          </form>

          <AnimatePresence>
            {response && !isSubmitting && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="mt-10 bg-gray-50 rounded-2xl p-8 shadow-inner border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaGithub className="text-black text-2xl" />
                  <a href={response.html_url || response._links?.html?.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline flex items-center gap-1">
                    View Review <FaExternalLinkAlt className="inline-block text-xs" />
                  </a>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <FaUserCircle className="text-gray-500" />
                  <span className="font-semibold">{response.user?.login}</span>
                </div>
                <div className="mb-2"><b>Status:</b> <span className={response.state === 'COMMENTED' || response.status === 'success' ? 'text-green-600' : 'text-red-600'}>{response.state || response.status}</span></div>
                <div className="mb-2"><b>Submitted At:</b> {response.submitted_at && !isNaN(Date.parse(response.submitted_at)) ? new Date(response.submitted_at).toLocaleString() : (response.timestamp && !isNaN(Date.parse(response.timestamp)) ? new Date(response.timestamp).toLocaleString() : 'N/A')}</div>
                <div className="mb-2"><b>PR Link:</b> <a href={(response.pull_request_url ? response.pull_request_url.replace('api.github.com/repos', 'github.com').replace('/pulls/', '/pull/') : (response._links?.pull_request?.href || '#'))} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Open PR</a></div>
                <div className="mb-4 whitespace-pre-line text-gray-800 text-base border-l-4 border-blue-400 pl-4 bg-blue-50 rounded">
                  {response.body || response.summary || 'No summary available.'}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PRReviewerAIAgent;
