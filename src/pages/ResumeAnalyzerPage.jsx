import React from "react";
import ResumeAnalyzer from "../components/workflows/ResumeAnalyzer";
import PageRevealWrapper from "../components/workflows/PageRevealWrapper";

const ResumeAnalyzerPage = () => (
  <PageRevealWrapper
    heading="Resume Analyzer: AI-Powered Resume Screening & Skill Extraction"
    description="Upload a resume and enter a job description to get an AI-based screening, candidate score, and extracted skills. Instantly see how well a candidate matches your requirements."
    details={
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-blue-700 mb-2">Features</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>PDF Resume Upload: Analyze any candidate's resume in seconds.</li>
            <li>Job Description Input: Match resumes to your specific requirements.</li>
            <li>AI-Powered Scoring: Get a clear score and skill breakdown.</li>
            <li>Instant Results: No manual screening or parsing required.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-purple-700 mb-2">Example Use Cases</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Recruiters: Instantly shortlist candidates based on job fit.</li>
            <li>HR Teams: Automate resume screening and reduce manual effort.</li>
            <li>Job Seekers: Test your resume against real job descriptions.</li>
          </ul>
        </div>
      </div>
    }
  >
    <ResumeAnalyzer />
  </PageRevealWrapper>
);

export default ResumeAnalyzerPage;
