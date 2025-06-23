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
            heading="Secure & Automate Payslip Distribution"
            description="Encrypt and distribute payslips securely with our automated workflow. Ensure confidentiality and compliance effortlessly."
        >
            <PayslipAutoEncryptedPageContent />
        </PageRevealWrapper>
    );
};

export default PayslipAutoEncryptedPage; 