import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaArrowRight, FaUser } from 'react-icons/fa';
import axios from 'axios';
import PageRevealWrapper from '../components/PageRevealWrapper';

// Workflow node icons
const workflowNodes = [
  { id: 'webhook', icon: '🌐', label: 'Webhook' },
  { id: 'code', icon: '💻', label: 'Code' },
  { id: 'switch', icon: '🔄', label: 'Switch' },
  { id: 'ai', icon: '🤖', label: 'AI Agent' },
  { id: 'response', icon: '📤', label: 'Response' },
];

const AICustomerSupportContent = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentNode, setCurrentNode] = useState(null);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const messagesEndRef = useRef(null);

  // Load chat history from sessionStorage on component mount
  useEffect(() => {
    const savedChat = sessionStorage.getItem('aiSupportChat');
    if (savedChat) {
      setChatHistory(JSON.parse(savedChat));
    }
  }, []);

  // Save chat history to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('aiSupportChat', JSON.stringify(chatHistory));
  }, [chatHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message.trim();
    setMessage('');
    setIsLoading(true);
    setShowWorkflow(true);

    // Add user message to chat history
    setChatHistory(prev => [...prev, { type: 'user', content: userMessage, timestamp: new Date() }]);

    // Simulate workflow execution
    for (const node of workflowNodes) {
      setCurrentNode(node.id);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    try {
      const formData = new FormData();
      formData.append('message', userMessage);

      const result = await axios.post('http://localhost:5678/webhook/chat', formData);
      const aiResponse = result.data.output || 'No response received';
      
      // Add AI response to chat history
      setChatHistory(prev => [...prev, { type: 'ai', content: aiResponse, timestamp: new Date() }]);
    } catch (error) {
      const errorMessage = 'Error: Failed to get response from the server';
      setChatHistory(prev => [...prev, { type: 'ai', content: errorMessage, timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
      setCurrentNode(null);
      setShowWorkflow(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-dark-100 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-dark-300 rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Customer Support</h1>
          <div className="text-gray-700 space-y-4">
            <p>Welcome to AI Customer Support! Please use the following formats for your queries to get the best assistance:</p>
            <ol className="list-decimal pl-6 space-y-4">
              <li>
                <strong className="text-white">General Questions (FAQs)</strong>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Ask about our services, e.g., 'What is your return policy?' or 'Do you offer free shipping?'</li>
                  <li>Use words like 'what is', 'do you', 'explain', or 'hi' to get quick answers</li>
                  <li>Example: 'Explain your loyalty program' or 'Hi, how can I contact support?'</li>
                </ul>
              </li>
              <li>
                <strong className="text-white">Order Tracking</strong>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Provide a 7-digit order ID, e.g., 'Track my order 1234567' or 'What is the order status of 7890123?'</li>
                  <li>Use phrases like 'order status', 'track my order', or 'order id'</li>
                </ul>
              </li>
              <li>
                <strong className="text-white">Issues or Refunds</strong>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Mention your issue with an order ID, e.g., 'I have a problem with order 2348901' or 'I need a refund for 3459012'</li>
                  <li>Use words like 'refund', 'issue', 'problem', or 'complaint'</li>
                </ul>
              </li>
              <li>
                <strong className="text-white">Other Queries</strong>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>For anything else, describe your request clearly, e.g., 'I want to buy shoes'</li>
                  <li>We'll forward complex queries to our support team</li>
                </ul>
              </li>
            </ol>
          </div>
        </div>

        <div className="bg-dark-300 rounded-lg p-6 h-[60vh] flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
            {chatHistory.map((chat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${chat.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`p-2 rounded-full ${chat.type === 'user' ? 'bg-primary-500' : 'bg-green-500'}`}>
                    {chat.type === 'user' ? <FaUser className="w-4 h-4 text-white" /> : <FaRobot className="w-4 h-4 text-white" />}
                  </div>
                  <div className={`rounded-lg p-3 ${chat.type === 'user' ? 'bg-primary-500' : 'bg-dark-400'}`}>
                    <p className="text-white">{chat.content}</p>
                    <span className="text-xs text-gray-400 mt-1 block">{formatTimestamp(chat.timestamp)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {showWorkflow && (
            <div className="flex justify-center items-center mb-4">
              {workflowNodes.map((node) => (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: currentNode === node.id ? 1 : 0.5,
                    scale: currentNode === node.id ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.3 }}
                  className="mx-4 text-center"
                >
                  <div className="text-4xl mb-2">{node.icon}</div>
                  <span className="text-sm text-gray-400">{node.label}</span>
                </motion.div>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isLoading}
              placeholder="Type your message here..."
              className="flex-1 bg-white text-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 border border-gray-200"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
              className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center space-x-2 shadow-md"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Send</span>
                  <FaArrowRight />
                </>
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

const AICustomerSupport = () => {
  return (
    <PageRevealWrapper
      heading="Intelligent AI Customer Support"
      description="Provide instant, 24/7 support to your customers with our advanced AI chatbot. Resolve queries faster and improve customer satisfaction."
    >
      <AICustomerSupportContent />
    </PageRevealWrapper>
  );
};

export default AICustomerSupport; 