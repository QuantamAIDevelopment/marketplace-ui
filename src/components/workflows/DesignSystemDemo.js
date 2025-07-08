import React from 'react';
import { motion } from 'framer-motion';

const DesignSystemDemo = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section">
        <div className="section-content">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-gradient">
                Transform Your Workflow
              </h1>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Discover powerful AI-driven automation tools that streamline your business processes 
                with intelligent workflows and seamless integrations.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button className="btn-primary">
                Get Started Free
              </button>
              <button className="btn-secondary">
                View Demo
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-white/20 backdrop-blur-sm">
        <div className="section-content">
          <div className="text-center mb-16">
            <h2 className="text-gradient mb-4">
              Powerful Features
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Everything you need to automate and optimize your business workflows
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card-hover"
            >
              <div className="w-12 h-12 bg-gradient-button rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-h3 mb-4">AI-Powered Automation</h3>
              <p className="text-text-secondary">
                Leverage advanced machine learning algorithms to automate complex tasks 
                and decision-making processes with unprecedented accuracy.
              </p>
            </motion.div>

            {/* Feature Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="card-hover"
            >
              <div className="w-12 h-12 bg-gradient-button rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-h3 mb-4">Smart Integrations</h3>
              <p className="text-text-secondary">
                Seamlessly connect with your existing tools and platforms through 
                our comprehensive API and pre-built integrations.
              </p>
            </motion.div>

            {/* Feature Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="card-hover"
            >
              <div className="w-12 h-12 bg-gradient-button rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-h3 mb-4">Analytics & Insights</h3>
              <p className="text-text-secondary">
                Get deep insights into your workflow performance with real-time 
                analytics and actionable recommendations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="section-content">
          <div className="card text-center max-w-4xl mx-auto">
            <h2 className="text-gradient mb-6">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              Join thousands of businesses that have already streamlined their operations 
              with our AI-powered automation platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Start Free Trial
              </button>
              <button className="btn-ghost">
                Schedule Demo
              </button>
            </div>
            <p className="text-sm text-text-muted mt-6">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Three.js Container Example */}
      <section className="section">
        <div className="section-content">
          <div className="text-center mb-12">
            <h2 className="text-gradient mb-4">
              3D Interactive Experience
            </h2>
            <p className="text-lg text-text-secondary">
              Immerse yourself in our interactive 3D dashboard
            </p>
          </div>
          
          <div className="three-container h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-button rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
              </div>
              <p className="text-text-secondary">
                Three.js content would be rendered here
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesignSystemDemo; 