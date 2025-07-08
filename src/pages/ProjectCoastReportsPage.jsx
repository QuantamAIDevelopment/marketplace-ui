import React from 'react';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';
import ProjectCoastReports from '../components/workflows/ProjectCoastReports';

const ProjectCoastReportsPage = () => {
  return (
    <PageRevealWrapper
      heading="AI Project Coast Reports"
      description="Upload your project data file to generate a detailed weekly project cost report. The AI will parse, calculate, and summarize costs for each project and team member."
    >
      <ProjectCoastReports />
    </PageRevealWrapper>
  );
};

export default ProjectCoastReportsPage; 