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
    <>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xl mx-auto">
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
    </>
  );
};

const AppointmentSchedulerPage = () => (
  <PageRevealWrapper
    heading="AI-Powered Appointment Scheduler: Smart, Seamless, and Automated"
    description="Effortlessly manage and book appointments with our intelligent AI-driven scheduler. This workflow leverages advanced LLMs, Google Calendar, and Google Sheets to automate the entire process—from capturing user details to checking availability, booking slots, and storing contact information. Designed for businesses, clinics, consultants, and community managers, this system ensures a frictionless experience for both users and administrators."
    details={
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-blue-700 mb-2">Features</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Multi-Channel Input: Accepts appointment requests via web forms and API/webhooks.</li>
            <li>LLM-Driven Validation: Uses AI to validate required fields and interpret user intent.</li>
            <li>Google Calendar Integration: Checks real-time slot availability and books appointments directly.</li>
            <li>Google Sheets Sync: Automatically stores user contact details for future reference and analytics.</li>
            <li>Customizable Prompts: AI agent tailors responses and actions based on user requests.</li>
            <li>Timezone Handling: Ensures all bookings are made in IST (Asia/Kolkata) with accurate time conversion.</li>
            <li>Error Handling: Provides instant feedback for missing or invalid information.</li>
            <li>Secure & Scalable: Built for privacy, reliability, and easy scaling across teams or locations.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-purple-700 mb-2">Example Use Cases</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Clinics & Healthcare: Patients book doctor appointments online, with instant calendar sync and reminders.</li>
            <li>Consultants & Agencies: Clients schedule meetings, discovery calls, or demos without back-and-forth emails.</li>
            <li>Community Managers: Organize events, workshops, or interviews with automated slot management.</li>
            <li>Educational Institutions: Students or parents book counseling, admissions, or parent-teacher meetings.</li>
            <li>Service Providers: Salons, repair shops, or trainers automate their booking process and reduce no-shows.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-blue-700 mb-2">⚡ Why This Stands Out</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>End-to-End Automation: From user input to calendar booking and contact storage—no manual steps needed.</li>
            <li>AI-Powered Flexibility: Handles ambiguous requests, validates data, and adapts to custom workflows.</li>
            <li>Seamless Integrations: Connects with Google Calendar, Sheets, and vector search for context-aware actions.</li>
            <li>Instant Feedback: Users receive immediate confirmation or error messages for a smooth experience.</li>
            <li>Timezone Intelligence: All bookings are managed in IST, reducing confusion and missed appointments.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-green-700 mb-2">Get Started</h2>
          <p className="text-gray-700 text-sm">Fill out the form below to book your appointment. The AI agent will handle the rest—validating your details, checking availability, and confirming your slot instantly!</p>
        </div>
      </div>
    }
  >
    <AppointmentSchedulerPageContent />
  </PageRevealWrapper>
);

export default AppointmentSchedulerPage; 