import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWarehouse, FaTruckLoading, FaClipboardList, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { triggerInventoryManagementWorkflow } from '../services/workflows/inventoryManagement';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';

const workflowSteps = [
  { icon: FaClipboardList, label: 'Input Data', color: 'bg-blue-500' },
  { icon: FaTruckLoading, label: 'Processing', color: 'bg-yellow-500' },
  { icon: FaWarehouse, label: 'Checking Stock', color: 'bg-pink-500' },
  { icon: FaCheckCircle, label: 'Complete', color: 'bg-green-500' },
];

const parseProductEffected = (str) => {
    if (!str) return {};
    const parts = str.split(',');
    const product = {};
    parts.forEach(part => {
        const [key, ...value] = part.split(':');
        if (key) {
            product[key.trim()] = value.join(':').trim();
        }
    });
    return product;
};


const InventoryManagementPageContent = () => {
    const [formData, setFormData] = useState({
        STATUS: '',
        SKU: '',
        Returnstock: '',
        productName: '',
        CurrentStock: '',
        Threshold: '',
        reorderQuantity: '',
        Warehouse: '',
        supplierName: '',
        supplierContact: '',
    });
    const [isExecuting, setIsExecuting] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    React.useEffect(() => {
        let interval;
        if (isExecuting) {
        interval = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % workflowSteps.length);
        }, 900);
        }
        return () => clearInterval(interval);
    }, [isExecuting]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsExecuting(true);
        setCurrentStep(0);
        setResponse(null);

        try {
            const result = await triggerInventoryManagementWorkflow(formData);
            setResponse(result);
        } catch (err) {
            setError('Failed to run workflow. Check the console for more details.');
            setResponse(null);
        } finally {
            setIsExecuting(false);
            setCurrentStep(0);
        }
    };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl mx-auto">
        {/* <h2 className="text-2xl font-bold mb-4 text-gray-900">Inventory Management</h2> */}
        <div className="relative z-10 w-full max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-anthropic-dark drop-shadow-lg"
          >
            Inventory Management
          </motion.h1>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 space-y-6 border border-gray-200 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(formData).map(key => (
                <div className="flex flex-col gap-2" key={key}>
                  <label className="font-semibold">{key}</label>
                  <input
                    type={key === 'CurrentStock' || key === 'Threshold' || key === 'reorderQuantity' || key === 'Returnstock' ? "number" : "text"}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                    placeholder={`Enter ${key}`}
                  />
                </div>
              ))}
            </div>
            {error && <div className="bg-red-500 text-white p-3 rounded-lg flex items-center gap-2"><FaExclamationTriangle /> {error}</div>}
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 8px 32px 0 #61868d33' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isExecuting}
              className="w-full bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition-colors disabled:opacity-50"
            >
              {isExecuting ? 'Processing...' : 'Run Workflow'}
            </motion.button>
          </form>

          <AnimatePresence>
            {isExecuting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-8 bg-white rounded-2xl p-6 shadow-2xl flex flex-col items-center border border-gray-200"
              >
                <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center text-anthropic-dark">Executing Workflow...</h2>
                <div className="flex flex-wrap justify-center items-center w-full gap-4">
                  {workflowSteps.map((step, idx) => (
                    <motion.div
                      key={idx}
                      animate={{
                        scale: currentStep === idx ? 1.2 : 0.95,
                        opacity: currentStep === idx ? 1 : 0.5
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center space-y-2"
                    >
                      <div className={`p-4 rounded-full shadow-xl border-4 border-gray-200 ${step.color} ${currentStep === idx ? 'ring-4 ring-pink-400' : ''}`}>
                        <step.icon className="w-8 h-8 text-white drop-shadow-lg" />
                      </div>
                      <span className="text-xs md:text-sm text-anthropic-dark font-semibold">{step.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {response && !isExecuting && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="mt-10 bg-gray-50 rounded-2xl p-8 shadow-inner border border-gray-200"
              >
                <h3 className="text-xl font-bold mb-4 text-center">Workflow Response</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4 text-left">Product Name</th>
                                <th className="py-2 px-4 text-left">SKU</th>
                                <th className="py-2 px-4 text-left">Current Stock</th>
                                <th className="py-2 px-4 text-left">Threshold</th>
                                <th className="py-2 px-4 text-left">Action</th>
                                <th className="py-2 px-4 text-left">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {response.map((item, index) => {
                                const product = parseProductEffected(item.productseffected);
                                return (
                                    <tr key={index} className="border-b">
                                        <td className="py-2 px-4">{product.ProductName}</td>
                                        <td className="py-2 px-4">{product.SKU}</td>
                                        <td className="py-2 px-4">{product.CurrentStock}</td>
                                        <td className="py-2 px-4">{product.Threshold}</td>
                                        <td className="py-2 px-4">{product.Action}</td>
                                        <td className="py-2 px-4">{new Date(item.timestamp).toLocaleString()}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const InventoryManagementPage = () => (
  <PageRevealWrapper
    heading="Inventory Management Automation Assistant"
    description="Streamline and automate inventory operations—without lifting a finger. This AI-powered Inventory Management Assistant continuously monitors your stock levels, flags low and overstocked items, sends alerts, updates your database, and communicates with suppliers—all without manual intervention. With multi-channel triggers, automated decision-making, and smart restocking logic, it ensures you're never under or over-stocked. The assistant responds to return orders, calculates restocking needs, alerts inventory managers, emails suppliers, and logs every detail into Google Sheets for auditing. With retry logic and built-in error handling, it's a robust plug-and-play solution for any business that holds physical inventory."
    details={
      <div className="space-y-6">
        <div>
          <h2 className="font-semibold text-blue-700 mb-2">Example Use Cases</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>E-Commerce & Retailers: Automatically restock popular items and avoid stockouts.</li>
            <li>Warehousing Operations: Weekly overstock alerts help reduce carrying costs and deadstock.</li>
            <li>Manufacturing Units: Instantly update inventory from returned raw materials or components.</li>
            <li>Supply Chain Teams: Forward database changes and auto-email suppliers based on live inventory signals.</li>
            <li>Inventory Auditors: Get structured log entries in Google Sheets for every system action.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-purple-700 mb-2">⚡Why This Stands Out (based on your workflow)</h2>
          <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
            <li>Multi-channel Triggers: Supports webhook-based return updates, scheduled stock checks, and manual triggers.</li>
            <li>Intelligent Logic:
              <ul className="list-disc ml-6">
                <li>Automatically checks low stock using DB queries.</li>
                <li>Compares stock levels with reorder thresholds.</li>
                <li>Calculates restocking units precisely.</li>
              </ul>
            </li>
            <li>Structured Output:
              <ul className="list-disc ml-6">
                <li>Logs inventory actions (stock added, email sent, alert triggered) into Google Sheets.</li>
                <li>Stores product metadata, timestamps, trigger type, and errors.</li>
              </ul>
            </li>
            <li>Smart Automation:
              <ul className="list-disc ml-6">
                <li>Sends Slack alerts for low stock.</li>
                <li>Sends supplier emails with auto-generated restock details.</li>
                <li>Flags overstock via Trello.</li>
              </ul>
            </li>
            <li>Built-In Feedback & Error Handling:
              <ul className="list-disc ml-6">
                <li>Sends emails for system errors.</li>
                <li>Retries failed workflows up to 3 times with delay.</li>
              </ul>
            </li>
            <li>Plug & Play Design:
              <ul className="list-disc ml-6">
                <li>Connects to Postgres, Gmail, Slack, Google Sheets, and Trello.</li>
                <li>Includes deduplication, retry loops, and semantic action logging.</li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="mt-6 text-center">
          <span className="inline-block bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg">Deploy your Inventory Management Assistant and automate your stock flow in minutes—no code, no worries.</span>
        </div>
      </div>
    }
  >
    <InventoryManagementPageContent />
  </PageRevealWrapper>
);
  
export default InventoryManagementPage; 