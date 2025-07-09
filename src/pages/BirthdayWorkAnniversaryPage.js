import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBirthdayCake, FaCalendarAlt, FaUserAlt, FaEnvelope } from 'react-icons/fa';
import axios from 'axios';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';

const BirthdayWorkAnniversaryPageContent = () => {
  const [date, setDate] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [response, setResponse] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const workflowSteps = [
    { icon: FaUserAlt, label: 'Trigger', color: 'bg-blue-500' },
    { icon: FaCalendarAlt, label: 'Check Date', color: 'bg-purple-500' },
    { icon: FaBirthdayCake, label: 'Process', color: 'bg-pink-500' },
    { icon: FaEnvelope, label: 'Send Email', color: 'bg-green-500' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsExecuting(true);
    setResponse(null);
    setCurrentStep(0);

    try {
      const formData = new FormData();
      if (date) formData.append('date', date);
      formData.append('trigger', 'api');

      // Simulate workflow steps
      for (let i = 0; i < workflowSteps.length; i++) {
        setCurrentStep(i);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      const response = await axios.post('http://localhost:5678/webhook/birthday-anniversary', formData);
      setResponse(response.data);
    } catch (error) {
      console.error('Error executing workflow:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-8 text-anthropic-dark drop-shadow-lg"
        >
          Birthday & Work Anniversary Workflow
        </motion.h1>
        <div className="relative z-10 w-full max-w-2xl mx-auto">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 space-y-6 border border-gray-200 w-full mb-8"
          >
            <h2 className="text-xl font-semibold mb-4">Execute Workflow</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex-1 flex flex-col gap-2">
                <label className="font-semibold">Date (Optional)</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={isExecuting}
                className="w-full bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition-colors disabled:opacity-50"
              >
                {isExecuting ? 'Executing...' : 'Execute Workflow'}
              </motion.button>
            </form>
          </motion.div>
          {/* Workflow Visualization */}
          <motion.div className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 space-y-6 border border-gray-200 w-full mb-8">
            <h2 className="text-xl font-semibold mb-4">Workflow Steps</h2>
            <div className="flex justify-between items-center">
              {workflowSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <motion.div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${step.color} ${isExecuting && currentStep >= index ? 'ring-4 ring-primary-500' : ''}`}
                    animate={isExecuting && currentStep === index ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <span className="mt-2 text-sm text-anthropic-dark font-semibold">{step.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
          {/* Response Section */}
          <AnimatePresence>
            {response && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="mt-10 bg-gray-50 rounded-2xl p-8 shadow-inner border border-gray-200"
              >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Results</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-white rounded-lg shadow-sm text-center">
                    <h3 className="text-sm font-medium text-gray-500">Today's Birthdays</h3>
                    <p className="text-3xl font-bold text-blue-600">{response.stats.todayBirthdays}</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm text-center">
                    <h3 className="text-sm font-medium text-gray-500">Today's Anniversaries</h3>
                    <p className="text-3xl font-bold text-purple-600">{response.stats.todayAnniversaries}</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg shadow-sm text-center">
                    <h3 className="text-sm font-medium text-gray-500">Total Celebrations</h3>
                    <p className="text-3xl font-bold text-green-600">{response.stats.totalCelebrations}</p>
                  </div>
                </div>
                {response.todayCelebrations.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Today's Celebrations</h3>
                    <div className="space-y-3">
                      {response.todayCelebrations.map((celebration) => (
                        <div key={celebration.id} className="p-4 bg-white rounded-lg shadow-sm flex items-center space-x-4">
                          {celebration.type === 'BIRTHDAY' ? (
                            <FaBirthdayCake className="text-pink-500 text-xl" />
                          ) : (
                            <FaCalendarAlt className="text-purple-500 text-xl" />
                          )}
                          <span className="text-gray-800 font-medium">
                            {celebration.employeeName}'s {celebration.type.toLowerCase()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const BirthdayWorkAnniversaryPage = () => {
  return (
    <PageRevealWrapper
      heading="🎉Birthday & Work Anniversary Notification Workflow"
      description="An automation workflow that celebrates employees by sending personalized birthday and work anniversary messages via Gmail. It pulls data from a Google Sheet, filters events for today (or previous weekend if run on Monday), and ensures each celebration is recognized promptly and professionally."
      details={
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-blue-700 mb-2">📆 Trigger & Scheduling</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li><b>Daily Trigger:</b> Every weekday at 9:00 AM.</li>
              <li><b>Weekend Handling:</b> Skips Saturday/Sunday and rechecks on Monday for any missed events.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-blue-700 mb-2">🧩 Workflow Steps</h2>
            <ol className="list-decimal list-inside text-gray-700 text-sm space-y-1">
              <li><b>Schedule Trigger</b>
                <ul className="list-disc ml-6">
                  <li>Runs every weekday morning.</li>
                  <li>Uses a date/time filter to avoid weekends.</li>
                </ul>
              </li>
              <li><b>Google Sheets Fetch</b>
                <ul className="list-disc ml-6">
                  <li>Retrieves employee data including Name, Birthday, Work Anniversary Date.</li>
                </ul>
              </li>
              <li><b>Date Comparison Logic</b>
                <ul className="list-disc ml-6">
                  <li>Checks if today's date matches Birthday or Work Anniversary (MM-DD format).</li>
                  <li>Includes weekend catch-up logic on Mondays.</li>
                </ul>
              </li>
              <li><b>Message Generation</b>
                <ul className="list-disc ml-6">
                  <li>Creates messages such as: "Happy Birthday, [Name]!" or "Happy [X] Year Work Anniversary!"</li>
                </ul>
              </li>
              <li><b>Filtering</b>
                <ul className="list-disc ml-6">
                  <li>Only continues if either birthday or work anniversary is flagged for today.</li>
                </ul>
              </li>
              <li><b>Email Notification</b>
                <ul className="list-disc ml-6">
                  <li>Sends Gmail notification to recipient (e.g. HR, manager).</li>
                  <li>Subject: "Today's Celebrations"</li>
                  <li>Body: Custom message for each employee.</li>
                </ul>
              </li>
              <li><b>Google Sheets Logging</b>
                <ul className="list-disc ml-6">
                  <li>Appends details into another tab or document: Name, Date, Event Type (Birthday/Anniversary), Message</li>
                </ul>
              </li>
            </ol>
          </div>
          <div>
            <h2 className="font-semibold text-blue-700 mb-2">🔍 Example Messages</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Happy Birthday, Priya!</li>
              <li>Happy 3 Year Work Anniversary, Raj!</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-purple-700 mb-2">⚙️ Smart Features</h2>
            <table className="min-w-full text-sm text-left border border-gray-200">
              <tbody>
                <tr className="border-b"><td className="font-semibold">Scheduled Runs</td><td>Automatically triggers each weekday morning</td></tr>
                <tr className="border-b"><td className="font-semibold">Sheet Integration</td><td>Connects directly to Google Sheets to fetch employee data</td></tr>
                <tr className="border-b"><td className="font-semibold">Weekend CatchUp</td><td>Backfills missed events from Sat/Sun when running Monday</td></tr>
                <tr className="border-b"><td className="font-semibold">Email Alerts</td><td>Automatically emails celebration messages</td></tr>
                <tr className="border-b"><td className="font-semibold">Logging</td><td>Records messages sent to avoid duplicates or for reporting</td></tr>
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="font-semibold text-blue-700 mb-2">✅ Integration Use Cases</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>HR Teams: Automate internal celebration emails.</li>
              <li>Startups: Build company culture without extra manual effort.</li>
              <li>Remote Teams: Foster engagement across distributed staff.</li>
            </ul>
          </div>
          <div className="mt-6 text-center">
            <span className="inline-block bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg">Keep your team happy, seen, and celebrated with zero effort. Set up your birthday and anniversary reminders once—and enjoy it forever!</span>
          </div>
        </div>
      }
    >
      <BirthdayWorkAnniversaryPageContent />
    </PageRevealWrapper>
  );
};

export default BirthdayWorkAnniversaryPage; 