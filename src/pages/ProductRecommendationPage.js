import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaSearch, FaList, FaCheckCircle, FaBoxOpen, FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
import PageRevealWrapper from '../components/PageRevealWrapper';

const workflowSteps = [
  { icon: FaSearch, label: 'Input Query', color: 'bg-blue-500' },
  { icon: FaRobot, label: 'AI Recommendation', color: 'bg-yellow-500' },
  { icon: FaList, label: 'Filter Products', color: 'bg-pink-500' },
  { icon: FaBoxOpen, label: 'Prepare Results', color: 'bg-green-500' },
  { icon: FaCheckCircle, label: 'Complete', color: 'bg-purple-500' },
];

const dummyProducts = [
  {
    product_name: 'Honorable',
    description: 'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    price: '8.78',
    product_url: 'https://businessinsider.com/sociis/natoque/penatibus/et.png',
  },
  {
    product_name: 'TechGadget',
    description: 'A high-quality electronic gadget for your daily needs.',
    price: '26.76',
    product_url: 'https://example.com/product/techgadget',
  },
  {
    product_name: 'SmartWidget',
    description: 'Smart widget with AI features and seamless integration.',
    price: '19.99',
    product_url: 'https://example.com/product/smartwidget',
  },
];

const ProductCard = ({ product }) => (
  <motion.div
    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col gap-2"
    whileHover={{ scale: 1.05, boxShadow: '0 4px 12px 0 rgba(0,0,0,0.1)' }}
    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
  >
    <div className="flex items-center gap-3 mb-2">
      <FaShoppingCart className="w-5 h-5 text-blue-500" />
      <h3 className="font-bold text-md text-gray-800 truncate">{product.product_name}</h3>
    </div>
    <p className="text-sm text-gray-600 flex-grow">{product.description}</p>
    <div className="flex flex-wrap items-center justify-between mt-2">
      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
        Price: ₹{product.price}
      </span>
      <a 
        href={product.product_url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold hover:bg-green-200 transition-colors"
      >
        View Product
      </a>
    </div>
  </motion.div>
);

const ProductRecommendationPageContent = () => {
  const [input, setInput] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input || !category || !price) {
      setError('All fields are required.');
      return;
    }
    setError(null);
    setIsExecuting(true);
    setCurrentStep(0);
    setResponse(null);

    let isApiDone = false;
    let timeoutId;

    // Start API call (with timeout)
    const apiPromise = (async () => {
      try {
        const payload = { input, category, price };
        // Set a timeout for 40 seconds
        const source = axios.CancelToken.source();
        timeoutId = setTimeout(() => {
          source.cancel('API request timed out');
        }, 40000);

        const res = await axios.post('http://localhost:5678/webhook/product', payload, {
          headers: { 'Content-Type': 'application/json' },
          cancelToken: source.token,
        });
        setResponse(res.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          setError('API request timed out.');
        } else {
          setError('Failed to get recommendations.');
        }
        setResponse(null);
      } finally {
        clearTimeout(timeoutId);
        isApiDone = true;
        setIsExecuting(false);
        setCurrentStep(0);
      }
    })();

    // Animate workflow steps in a loop until API is done
    let step = 0;
    while (!isApiDone) {
      setCurrentStep(step);
      // eslint-disable-next-line no-await-in-loop
      await new Promise(resolve => setTimeout(resolve, 700));
      step = (step + 1) % workflowSteps.length;
    }

    // Wait for API to finish (in case it finished during the last loop)
    await apiPromise;
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl mx-auto">
        {/* <h2 className="text-2xl font-bold mb-4 text-gray-900">Product Recommendation Agent</h2> */}
        <div className="relative z-10 w-full max-w-2xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-anthropic-dark drop-shadow-lg"
          >
            Product Recommendation Agent
          </motion.h1>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 space-y-6 border border-gray-200 w-full">
            <div className="flex flex-col md:flex-row md:gap-4 gap-2">
              <div className="flex-1 flex flex-col gap-2">
                <label className="font-semibold">Product Name / Query</label>
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                  placeholder="e.g. Honorable"
                  required
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label className="font-semibold">Category</label>
                <input
                  type="text"
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                  placeholder="e.g. Electronics"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:gap-4 gap-2">
              <div className="flex-1 flex flex-col gap-2">
                <label className="font-semibold">Price</label>
                <input
                  type="number"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  className="bg-gray-100 rounded-lg px-4 py-2 text-anthropic-dark focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                  placeholder="e.g. 26.76"
                  required
                />
              </div>
            </div>
            {error && <div className="bg-red-500 text-white p-3 rounded-lg">{error}</div>}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 8px 32px 0 #61868d33' }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isExecuting}
              className="w-full bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition-colors disabled:opacity-50"
            >
              {isExecuting ? 'Processing...' : 'Get Recommendations'}
            </motion.button>
          </form>
          {/* Workflow Animation */}
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
          {/* Dummy Product Cards */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
            {dummyProducts.map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))}
          </div>
          {/* Response Display */}
          <AnimatePresence>
            {response && !isExecuting && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="mt-10 bg-gray-50 rounded-2xl p-8 shadow-inner border border-gray-200"
              >
                {Array.isArray(response) && response.length > 0 && response[0].recommendations ? (
                  <>
                    <div className="mb-6 text-lg text-gray-700 font-semibold text-center whitespace-pre-line">
                      {response[0].message}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full mb-4">
                      {response[0].recommendations.map((product, idx) => (
                        <ProductCard key={idx} product={product} />
                      ))}
                    </div>
                    {response[0].footer && (
                      <div className="mt-6 text-center text-gray-600 font-medium whitespace-pre-line">
                        {response[0].footer}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center text-gray-600">No recommendations found.</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const ProductRecommendationPage = () => {
  return (
    <PageRevealWrapper
      heading="AI-Powered Product Recommendations"
      description="Deliver personalized product recommendations to your customers with our intelligent recommendation engine. Boost sales and customer satisfaction."
    >
      <ProductRecommendationPageContent />
    </PageRevealWrapper>
  );
};

export default ProductRecommendationPage; 