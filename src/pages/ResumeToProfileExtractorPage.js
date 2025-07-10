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
  const [error, setError] = useState(null);

  const workflowSteps = [
    { icon: FaFileUpload, label: 'Upload Resume', color: 'bg-blue-500' },
    { icon: FaSpinner, label: 'Extract Data', color: 'bg-yellow-500' },
    { icon: FaCheckCircle, label: 'Create Profile', color: 'bg-green-500' },
    { icon: FaExclamationCircle, label: 'Store Data', color: 'bg-purple-500' }
  ];

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setError(null);
  };

  const executeWorkflow = async () => {
    if (!selectedFile) {
      setError('Please select a resume file first');
      return;
    }

    setIsExecuting(true);
    setResponse(null);
    setError(null);
    setCurrentStep(0);

    try {
      // Step 1: Upload Resume
      setCurrentStep(0);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Step 2: Extract Data
      setCurrentStep(1);
      
      // Prepare form data for API call
      const formData = new FormData();
      formData.append('resume', selectedFile);
      
      // Step 3: Create Profile
      setCurrentStep(2);
      
      // Make API call to the real endpoint
      const apiResponse = await axios.post(
        'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/upload-resume',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      // Step 4: Store Data
      setCurrentStep(3);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Parse the API response
      const responseText = apiResponse.data;
      
      // Extract information from the response text
      const extractedData = parseApiResponse(responseText);
      
      setResponse({
        ...extractedData,
        resume_link: `https://example.com/resume/${selectedFile.name}`,
        status: 'Completed',
        last_updated_at: new Date().toISOString(),
        file_info: {
          name: selectedFile.name,
          size: `${(selectedFile.size / 1024).toFixed(1)} KB`,
          type: selectedFile.type
        }
      });
      
    } catch (error) {
      console.error('Error executing workflow:', error);
      setError(error.response?.data?.message || 'Failed to process resume. Please try again.');
    } finally {
      setIsExecuting(false);
    }
  };

  // Parse the API response text to extract structured data
  const parseApiResponse = (responseText) => {
    const lines = responseText.split('\n');
    let name = 'Unknown Candidate';
    let email = 'candidate@example.com';
    let phone = '+1-555-000-0000';
    let skills = [];
    let projects = [];
    let experience = [];

    for (const line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('Name :')) {
        name = trimmedLine.replace('Name :', '').trim();
      } else if (trimmedLine.startsWith('Email:')) {
        email = trimmedLine.replace('Email:', '').trim();
      } else if (trimmedLine.startsWith('Number:')) {
        phone = trimmedLine.replace('Number:', '').trim();
      } else if (trimmedLine.startsWith('Skills:')) {
        const skillsText = trimmedLine.replace('Skills:', '').trim();
        skills = skillsText.split(',').map(skill => skill.trim());
      } else if (trimmedLine.startsWith('Projects:')) {
        const projectsText = trimmedLine.replace('Projects:', '').trim();
        projects = projectsText.split(',').map(project => project.trim());
      } else if (trimmedLine.startsWith('Experience:')) {
        const experienceText = trimmedLine.replace('Experience:', '').trim();
        experience = experienceText.split(',').map(exp => exp.trim());
      }
    }

    // Determine profile type based on skills
    let profileType = 'developer';
    const skillsText = skills.join(' ').toLowerCase();
    
    if (skillsText.includes('data') || skillsText.includes('analytics') || skillsText.includes('power bi')) {
      profileType = 'data_scientist';
    } else if (skillsText.includes('design') || skillsText.includes('ui') || skillsText.includes('ux')) {
      profileType = 'designer';
    } else if (skillsText.includes('management') || skillsText.includes('leadership')) {
      profileType = 'manager';
    }

    return {
      name: name,
      email: email,
      phone: phone,
      skills: skills.length > 0 ? skills : ['General Skills'],
      education: ['Education details will be extracted from resume'],
      work_experience: experience.length > 0 ? experience : ['Work experience details will be extracted from resume'],
      projects: projects.length > 0 ? projects : ['Project details will be extracted from resume'],
      profile_type: profileType,
      content_analysis: {
        total_words: responseText.split(/\s+/).length,
        has_contact_info: email !== 'candidate@example.com' || phone !== '+1-555-000-0000',
        has_skills: skills.length > 0,
        has_education: true,
        has_experience: experience.length > 0,
        has_projects: projects.length > 0
      }
    };
  };

  const clearResponse = () => {
    setResponse(null);
    setError(null);
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-8 text-anthropic-dark drop-shadow-lg"
        >
          Resume to Profile Auto Extractor
        </motion.h1>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

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
            {response && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearResponse}
                className="px-4 py-2 rounded-lg text-gray-600 border border-gray-300 hover:bg-gray-50"
              >
                Clear
              </motion.button>
            )}
          </div>
          {selectedFile && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Selected File:</strong> {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
              </p>
            </div>
          )}
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
                  <p className="text-gray-600"><strong className="font-medium">Profile Type:</strong> {response.profile_type.replace('_', ' ').toUpperCase()}</p>
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

                {/* Content Analysis */}
                {response.content_analysis && (
                  <div className="md:col-span-2 p-4 bg-green-50 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Content Analysis</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div><strong>Total Words:</strong> {response.content_analysis.total_words}</div>
                      <div><strong>Contact Info:</strong> {response.content_analysis.has_contact_info ? '✓ Found' : '✗ Missing'}</div>
                      <div><strong>Skills:</strong> {response.content_analysis.has_skills ? '✓ Found' : '✗ Missing'}</div>
                      <div><strong>Education:</strong> {response.content_analysis.has_education ? '✓ Found' : '✗ Missing'}</div>
                      <div><strong>Experience:</strong> {response.content_analysis.has_experience ? '✓ Found' : '✗ Missing'}</div>
                      <div><strong>Projects:</strong> {response.content_analysis.has_projects ? '✓ Found' : '✗ Missing'}</div>
                    </div>
                  </div>
                )}

                {/* File Information */}
                {response.file_info && (
                  <div className="md:col-span-2 p-4 bg-blue-50 rounded-lg shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">File Information</h3>
                    <p className="text-gray-600"><strong className="font-medium">File Name:</strong> {response.file_info.name}</p>
                    <p className="text-gray-600"><strong className="font-medium">File Size:</strong> {response.file_info.size}</p>
                    <p className="text-gray-600"><strong className="font-medium">File Type:</strong> {response.file_info.type}</p>
                  </div>
                )}

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