import React from 'react';
import PageRevealWrapper from '../components/PageRevealWrapper';
import LeaveApprovalReminder from '../components/workflows/LeaveApprovalReminder';

const LeaveApprovalReminderPage = () => (
  <PageRevealWrapper
    heading="Leave Approval Reminder"
    description="Upload Excel files containing leave requests to automatically process reminders and send notifications to managers and HR."
    details={
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-green-700 mb-2">Features</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Upload Excel (.xlsx) files with leave request data.</li>
            <li>Automatic processing of leave reminders based on pending days.</li>
            <li>Email notifications sent to managers for approval.</li>
            <li>Escalation to HR for requests pending more than 5 days.</li>
            <li>Real-time status tracking and response display.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-purple-700 mb-2">Workflow Process</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Upload leave request Excel file via webhook.</li>
            <li>System checks pending days for each request.</li>
            <li>If pending &gt; 2 days: Send reminder to manager.</li>
            <li>If pending &gt; 5 days: Escalate to HR.</li>
            <li>Update Google Sheets with processed status.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-blue-700 mb-2">Example Use Cases</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>HR departments managing employee leave approvals.</li>
            <li>Automated reminder systems for pending requests.</li>
            <li>Compliance tracking for leave approval timelines.</li>
            <li>Manager notification systems for urgent approvals.</li>
          </ul>
        </div>
      </div>
    }
  >
    <div className="w-full max-w-2xl mx-auto">
      <LeaveApprovalReminder />
    </div>
  </PageRevealWrapper>
);

export default LeaveApprovalReminderPage; 