import React from 'react';
import PageRevealWrapper from '../components/PageRevealWrapper';
import PayslipAutoEncrypted from '../components/workflows/PayslipAutoEncrypted';

const PayslipAutoEncryptedPageContent = () => {
    return (
        <div className="section">
            <div className="section-content">
                <PayslipAutoEncrypted />
            </div>
        </div>
    );
};

const PayslipAutoEncryptedPage = () => {
    return (
        <PageRevealWrapper
            heading="Automated Payslip Distributor with Encryption & Reporting"
            description="Secure. Scheduled. Scalable. This workflow automates the monthly distribution of employee payslips—securely and with zero manual intervention. Triggered on the 28th of each month at 9 AM, it fetches all PDF payslips from a designated Google Drive folder, encrypts each one using PDF.co (with the employee's DOB as the password), and emails the file using Gmail. It identifies the correct employee from filename metadata (via PostgreSQL and Airtable lookup), ensures strict matching, and sends the encrypted document with personalized instructions. Each email's delivery status (sent/failed) is logged into Airtable for traceability, audit, and compliance. A complete, error-tolerant system for HR and finance teams."
            details={
                <div className="space-y-6">
                    <div>
                        <h2 className="font-semibold text-blue-700 mb-2">Example Use Cases</h2>
                        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                            <li>Corporate HR Teams: Automate monthly salary slip distribution to hundreds of employees.</li>
                            <li>Payroll Service Providers: Offer encrypted payslip delivery as a managed service.</li>
                            <li>SMEs & Startups: Ensure every employee receives their confidential documents securely and on time.</li>
                            <li>Auditable HR Pipelines: Maintain delivery logs with success/failure status in Airtable.</li>
                            <li>Secure Record-Keeping: Encrypt files with AES-256 and log sensitive metadata in PostgreSQL.</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold text-purple-700 mb-2">Why This Stands Out</h2>
                        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                            <li>Fully Automated Scheduling: Runs monthly without manual triggers.</li>
                            <li>PDF Encryption: Protects sensitive salary data using AES-256 encryption.</li>
                            <li>Personalized Emailing: Sends encrypted documents directly to individual inboxes with auto-instructions.</li>
                            <li>Error-Resilient Logging: Tracks outcomes (SENT/FAILED) and logs reports in Airtable.</li>
                            <li>Smart Matching Logic: Uses filename parsing and DB lookups to match employees precisely.</li>
                            <li>Looping & Batch Handling: Iterates over files with built-in batching and retry logic.</li>
                        </ul>
                    </div>
                    <div className="mt-6 text-center">
                        <span className="inline-block bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg">Automate secure payslip delivery with zero effort. Try the Payslip AutoMailer and remove the stress from month-end processing.</span>
                    </div>
                </div>
            }
        >
            <PayslipAutoEncryptedPageContent />
        </PageRevealWrapper>
    );
};

export default PayslipAutoEncryptedPage; 