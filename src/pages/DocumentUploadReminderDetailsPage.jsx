import React from 'react';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';
import DocumentUploadReminderDetails from '../components/workflows/DocumentUploadReminderDetails';

const DocumentUploadReminderDetailsPage = () => (
  <PageRevealWrapper
    heading="Document Upload Reminder Details"
    description="Check the current status of onboarding document uploads for employees. Instantly see missing documents, overdue status, and employee details."
  >
    <DocumentUploadReminderDetails />
  </PageRevealWrapper>
);

export default DocumentUploadReminderDetailsPage; 