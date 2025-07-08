import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileUpload, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';

const ResumeToProfileExtractorPageContent = () => {
  const [isExecuting, setIsExecuting] = useState(false);
  const [response, setResponse] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const workflowSteps = [
    { icon: FaFileUpload, label: 'Upload Resume', color: 'bg-blue-500' },
    { icon: FaSpinner, label: 'Extract Data', color: 'bg-yellow-500' },
    { icon: FaCheckCircle, label: 'Create Profile', color: 'bg-green-500' },
    { icon: FaExclamationCircle, label: 'Store Data', color: 'bg-purple-500' }
  ];

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const executeWorkflow = async () => {
    if (!selectedFile) {
      alert('Please select a resume file first');
      return;
    }

    setIsExecuting(true);
    setResponse(null);
    setCurrentStep(0);

    try {
      const formData = new FormData();
      formData.append('resume', selectedFile);

      // Simulate workflow steps
      for (let i = 0; i < workflowSteps.length; i++) {
        setCurrentStep(i);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      const response = await axios.post('https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/upload-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Transform the response to expected format
      const data = response.data || {};
      setResponse({
        name: data.Name || '',
        email: data.Email || '',
        phone: data.Number || '',
        skills: data.Skills ? data.Skills.split(',').map(s => s.trim()).filter(Boolean) : [],
        education: data.Education ? data.Education.split(',').map(s => s.trim()).filter(Boolean) : [],
        work_experience: data.Experience ? data.Experience.split(',').map(s => s.trim()).filter(Boolean) : [],
        projects: data.Projects ? data.Projects.split(',').map(s => s.trim()).filter(Boolean) : [],
        resume_link: data['Resume link'] || '',
        status: data.Status || 'Completed',
        last_updated_at: data.last_updated_at || new Date().toISOString(),
      });
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
          Resume to Profile Auto Extractor
        </motion.h1>
        {/* File Upload Section */}
        <motion.div className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 space-y-6 border border-gray-200 w-full mb-8">
          <h2 className="text-xl font-semibold mb-4">Upload Resume</h2>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-primary-500 file:text-white
                hover:file:bg-primary-600"
            />
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
              whileTap={{ scale: 0.95 }}
              onClick={executeWorkflow}
              disabled={isExecuting || !selectedFile}
              className={`px-6 py-2 rounded-lg text-white font-medium ${isExecuting || !selectedFile ? 'bg-gray-500' : 'bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'} shadow-lg`}
            >
              {isExecuting ? 'Processing...' : 'Extract Profile'}
            </motion.button>
          </div>
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
              className="mt-10 bg-gray-50 rounded-2xl p-8 shadow-inner overflow-hidden border border-gray-200"
            >
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Extracted Profile</h2>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Personal Information */}
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Personal Information</h3>
                  <p className="text-gray-600"><strong className="font-medium">Name:</strong> {response.name}</p>
                  <p className="text-gray-600"><strong className="font-medium">Email:</strong> {response.email}</p>
                  <p className="text-gray-600"><strong className="font-medium">Phone:</strong> {response.phone}</p>
                </div>
                
                {/* Skills */}
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {(response.skills || []).map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Education</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {(response.education || []).map((edu, index) => <li key={index}>{edu}</li>)}
                  </ul>
                </div>

                {/* Work Experience */}
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Work Experience</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {(response.work_experience || []).map((exp, index) => <li key={index}>{exp}</li>)}
                  </ul>
                </div>

                {/* Projects */}
                <div className="md:col-span-2 p-4 bg-white rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Projects</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {(response.projects || []).map((project, index) => <li key={index}>{project}</li>)}
                  </ul>
                </div>

                {/* Status */}
                <div className="md:col-span-2 mt-4 text-center text-sm text-gray-500">
                  <p><strong className="font-medium">Status:</strong> {response.status}</p>
                  <p>Last Updated: {new Date(response.last_updated_at).toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ResumeToProfileExtractorPage = () => {
  return (
    <PageRevealWrapper
      heading="Resume Auto Extractor & Screening Assistant"
      description="Eliminate resume overload with a powerful AI agent that transforms PDF resumes into clean, structured, searchable candidate profiles—automatically. This Resume Auto Extractor is a smart workflow that listens for resumes arriving via Gmail, reads and extracts meaningful data using GPT-4.1, and stores structured profiles into Supabase and Google Sheets—ready for recruiter access or system integration. It doesn't stop at parsing. This agent checks for duplicates, updates existing entries, and ensures data completeness. If a resume is missing key information, it auto-sends an email to the candidate requesting updates—ensuring every profile is useful. Designed to be your screening co-pilot, this assistant takes resume parsing, deduplication, follow-up, and storage entirely off your plate—so you can focus on selecting the right talent."
      details={
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-blue-700 mb-2">Example Use Cases</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>Campus Hiring Portals: Automatically organize hundreds of student resumes submitted via email.</li>
              <li>Startup HR Teams: Create structured candidate pipelines with no manual data entry.</li>
              <li>Recruiting Agencies: Preprocess and index resumes into Supabase or Sheets for further filtering or AI matching.</li>
              <li>Career Platforms: Accept resume uploads and convert them into formatted profile rows with links and extracted data.</li>
              <li>Candidate Re-engagement: Automatically follow up with applicants whose resumes are incomplete or unreadable.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-purple-700 mb-2">⚡Why This Stands Out</h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
              <li>GPT-4.1 Semantic Extraction: Uses OpenAI's language model to extract name, email, number, skills, projects, and experience—even from unstructured resumes.</li>
              <li>Duplicate Handling: Checks Supabase for existing emails and updates candidate records if found.</li>
              <li>Smart Follow-ups: Triggers a personalized email if important resume fields are missing.</li>
              <li>Google Sheets Integration: Appends full profile details and resume links to a shared sheet for easy browsing.</li>
              <li>Google Drive Upload: Stores all resumes automatically in a specific Drive folder for centralized access.</li>
              <li>Gmail Trigger: Pulls resumes directly from your inbox—fully automated.</li>
              <li>No Code Needed: Built in n8n, it connects modern tools like Supabase, OpenAI, Gmail, and Google Drive effortlessly.</li>
            </ul>
          </div>
          <div className="mt-6 text-center">
            <span className="inline-block bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg">Let your AI assistant handle the first 500 resumes—connect it to your inbox, and let automation build your candidate database today.</span>
          </div>
        </div>
      }
    >
      <ResumeToProfileExtractorPageContent />
    </PageRevealWrapper>
  );
};

export default ResumeToProfileExtractorPage; 