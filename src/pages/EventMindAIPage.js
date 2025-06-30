import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaExclamationTriangle } from 'react-icons/fa';
import CoverScreen from '../components/CoverScreen';
import { triggerEventMindAI } from '../services/workflows/eventMindAI';

const defaultForm = {
  event_type: 'Team Outing',
  event_date: '',
  location: '',
  team_size: '',
  budget: '',
  preferences: '', // comma separated string
  team_name: '',
};

const eventMindAIDetails = (
  <>
    <section>
      <h2>What is EventMind AI?</h2>
      <p>
        EventMind AI is your smart assistant for planning memorable team events. Instantly get creative suggestions for themes, venues, activities, and logistics—tailored to your team's preferences and budget.
      </p>
    </section>
    <section>
      <h2>Example Use Cases</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <b>Team Outing:</b> <br/>
          <span className="text-sm">Type: Team Outing, Date: 2025-07-03, Location: Hyderabad, Team Size: 25, Budget: ₹30,000, Preferences: outdoor, games, Nonveg only</span>
        </li>
        <li>
          <b>Annual Hackathon:</b> <br/>
          <span className="text-sm">Type: Hackathon, Date: 2025-09-15, Location: Bangalore, Team Size: 50, Budget: ₹1,00,000, Preferences: indoor, tech, snacks</span>
        </li>
        <li>
          <b>Festival Celebration:</b> <br/>
          <span className="text-sm">Type: Diwali Party, Date: 2025-11-01, Location: Office, Team Size: 100, Budget: ₹50,000, Preferences: traditional, sweets, music</span>
        </li>
      </ul>
    </section>
    <section>
      <h2>How it Works</h2>
      <ol className="list-decimal pl-6 space-y-1">
        <li>Enter your event details (type, date, location, team size, budget, preferences).</li>
        <li>Click "Generate Event Plan".</li>
        <li>Get a ready-to-use plan with theme, venue, activities, logistics, and budget breakdown.</li>
      </ol>
    </section>
    <section>
      <h2>What Makes It Stand Out</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>AI-powered, creative, and practical suggestions</li>
        <li>Instant logistics checklist and budget estimation</li>
        <li>Easy to use—no event planning experience needed</li>
      </ul>
    </section>
  </>
);

const EventMindAIPageContent = () => {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    // Prepare preferences as array
    let payload = { ...form };
    if (typeof payload.preferences === 'string') {
      payload.preferences = payload.preferences.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (payload.team_size) payload.team_size = Number(payload.team_size);
    if (payload.budget) payload.budget = Number(payload.budget);
    try {
      const response = await triggerEventMindAI(payload);
      setResult(response.output);
    } catch (err) {
      setError('Failed to generate event plan. Please check your input and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-anthropic-dark drop-shadow-lg"
        >
          EventMind AI – Event Planning & Suggestion
        </motion.h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Event Type</label>
              <input type="text" name="event_type" value={form.event_type} onChange={handleChange} className="bg-gray-100 rounded-lg px-4 py-2" required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Event Date</label>
              <input type="date" name="event_date" value={form.event_date} onChange={handleChange} className="bg-gray-100 rounded-lg px-4 py-2" required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Location</label>
              <input type="text" name="location" value={form.location} onChange={handleChange} className="bg-gray-100 rounded-lg px-4 py-2" required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Team Size</label>
              <input type="number" name="team_size" value={form.team_size} onChange={handleChange} className="bg-gray-100 rounded-lg px-4 py-2" required min={1} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Budget (₹)</label>
              <input type="number" name="budget" value={form.budget} onChange={handleChange} className="bg-gray-100 rounded-lg px-4 py-2" required min={0} />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="font-semibold">Preferences <span className="text-xs text-gray-500">(comma separated, e.g. outdoor, games, Nonveg only)</span></label>
              <input type="text" name="preferences" value={form.preferences} onChange={handleChange} className="bg-gray-100 rounded-lg px-4 py-2" />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="font-semibold">Team Name</label>
              <input type="text" name="team_name" value={form.team_name} onChange={handleChange} className="bg-gray-100 rounded-lg px-4 py-2" />
            </div>
          </div>
          {error && <div className="bg-red-500 text-white p-3 rounded-lg flex items-center gap-2"><FaExclamationTriangle /> {error}</div>}
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: '0 8px 32px 0 #6366f133' }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Generating Plan...' : 'Generate Event Plan'}
          </motion.button>
        </form>
        <AnimatePresence>
          {result && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="mt-10 bg-gray-50 rounded-2xl p-8 shadow-inner border border-gray-200 whitespace-pre-line font-mono text-base text-gray-800"
            >
              {result}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const EventMindAIPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const showFunctional = searchParams.get('start') === '1';

  if (!showFunctional) {
    return (
      <CoverScreen
        heading="EventMind AI – Event Planning & Suggestion"
        description="Plan your next team event in seconds. Get AI-powered suggestions for themes, venues, activities, logistics, and more!"
        details={eventMindAIDetails}
        onStart={() => navigate('/eventmind-ai?start=1', { replace: true })}
      />
    );
  }
  return <EventMindAIPageContent />;
};

export default EventMindAIPage; 