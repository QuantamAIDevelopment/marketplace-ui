import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaClock, FaClipboardList } from 'react-icons/fa';
import PageRevealWrapper from '../components/PageRevealWrapper';
import { bookAppointment } from '../services/workflows/appointmentScheduler';

const AppointmentSchedulerPageContent = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    request: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await bookAppointment(form);
      setResult(response.output);
    } catch (err) {
      setError('Failed to book appointment. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl mx-auto">
      <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-center mb-6 text-gray-800">
        Appointment Scheduler
      </motion.h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="font-semibold flex items-center gap-2"><FaUser /> Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} className="bg-gray-100 rounded-lg px-4 py-2" required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold flex items-center gap-2"><FaEnvelope /> Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} className="bg-gray-100 rounded-lg px-4 py-2" required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold flex items-center gap-2"><FaPhone /> Phone</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="bg-gray-100 rounded-lg px-4 py-2" required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold flex items-center gap-2"><FaCalendarAlt /> Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} className="bg-gray-100 rounded-lg px-4 py-2" required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold flex items-center gap-2"><FaClock /> Time (24h, IST)</label>
          <input type="time" name="time" value={form.time} onChange={handleChange} className="bg-gray-100 rounded-lg px-4 py-2" required />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold flex items-center gap-2"><FaClipboardList /> Request</label>
          <input type="text" name="request" value={form.request} onChange={handleChange} className="bg-gray-100 rounded-lg px-4 py-2" required />
        </div>
        {error && <div className="bg-red-500 text-white p-3 rounded-lg">{error}</div>}
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-green-600 transition-colors disabled:opacity-50">
          {loading ? 'Booking...' : 'Book Appointment'}
        </motion.button>
      </form>
      <AnimatePresence>
        {result && !loading && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} className="mt-8 bg-gray-50 rounded-2xl p-6 shadow-inner border border-gray-200">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br/>') }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AppointmentSchedulerPage = () => (
  <PageRevealWrapper>
    <AppointmentSchedulerPageContent />
  </PageRevealWrapper>
);

export default AppointmentSchedulerPage; 