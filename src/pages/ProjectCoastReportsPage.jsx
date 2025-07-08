import React from 'react';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';
import ProjectCoastReports from '../components/workflows/ProjectCoastReports';

const ProjectCoastReportsPage = () => {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gradient mb-6">AI Project Coast Reports</h1>
      <p className="text-lg text-center text-gray-700 mb-8">
        Upload your project data file to generate a detailed weekly project cost report. The AI will parse, calculate, and summarize costs for each project and team member.
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">Example Use Cases</h2>
        <ul className="list-disc list-inside text-blue-900 space-y-1">
          <li>Project Managers: Instantly generate weekly cost reports for all ongoing projects.</li>
          <li>Finance Teams: Track project expenses, team member costs, and budget utilization.</li>
          <li>Consulting Firms: Provide clients with transparent, itemized project cost breakdowns.</li>
          <li>Agencies: Automate reporting for multiple clients and projects with a single upload.</li>
        </ul>
      </div>
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-green-700 mb-2">Why This Stands Out</h2>
        <ul className="list-disc list-inside text-green-900 space-y-1">
          <li>Automated Parsing: No manual data entry—just upload your file and get instant results.</li>
          <li>Detailed Breakdown: See costs by project, team member, category, and date.</li>
          <li>Accurate Calculations: AI computes total costs, rates, and summaries for you.</li>
          <li>Professional Output: Share or export reports for stakeholders and clients.</li>
        </ul>
      </div>
      <ProjectCoastReports />
    </div>
  );
};

export default ProjectCoastReportsPage; 