import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaArrowRight, FaUser } from 'react-icons/fa';
import axios from 'axios';
import CoverScreen from '../components/CoverScreen';
import AICustomerSupportWorkflowSVG from '../components/AICustomerSupportWorkflowSVG';

// Workflow node icons
const workflowNodes = [
  { id: 'webhook', icon: '🌐', label: 'Webhook' },
  { id: 'code', icon: '💻', label: 'Code' },
  { id: 'switch', icon: '🔄', label: 'Switch' },
  { id: 'ai', icon: '🤖', label: 'AI Agent' },
  { id: 'response', icon: '📤', label: 'Response' },
];

const details = (
  <div className="space-y-6">
    <div>
      <h2 className="font-semibold text-blue-700 mb-2">Example Use Cases</h2>
      <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
        <li>Customer Portals: Handle product queries via AI-powered live chat.</li>
        <li>Internal Helpdesks: Route and resolve common employee questions automatically.</li>
        <li>Knowledge Base Enhancer: Pulls dynamic answers from Google Sheets without coding.</li>
        <li>E-learning Support: Assist learners using pre-filled knowledge queries.</li>
        <li>Form-Free Support: Eliminate the need for ticket forms.</li>
      </ul>
    </div>
    <div>
      <h2 className="font-semibold text-purple-700 mb-2">Why This Stands Out</h2>
      <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
        <li>Instant Conversations: Reacts when a message is received, no delay.</li>
        <li>Google Sheets Query Integration: Easily configurable query-response model.</li>
        <li>Memory Buffer Window: Context-aware replies across long sessions.</li>
        <li>Zero Setup Training: Just fill in the sheet—no NLP training needed.</li>
        <li>Low-Code, High-Flexibility: Plug-and-play into any website or dashboard.</li>
      </ul>
    </div>
    <div className="mt-6 text-center">
      <span className="inline-block bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg">Launch your AI customer agent in 5 minutes—turn support into satisfaction with no coding.</span>
    </div>
  </div>
);

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
    setChatHistory(prev => [...prev, { type: 'user', content: userMessage, timestamp: new Date() }]);

    // Simulate workflow animation (optional, can be removed for speed)
    for (const node of workflowNodes) {
      setCurrentNode(node.id);
      await new Promise(resolve => setTimeout(resolve, 400));
    }

    try {
      const formData = new FormData();
      formData.append('chat', userMessage); // Use 'chat' as the field name

      const result = await axios.post(
        'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/chat',
        formData
      );
      const aiResponse = result.data.output || 'No response received';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Modern Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-br from-blue-500 via-pink-500 to-purple-500 p-3 rounded-2xl shadow-lg">
            <FaRobot className="text-white text-2xl drop-shadow" />
          </div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-pink-500 to-purple-600 text-transparent bg-clip-text drop-shadow-lg tracking-tight">AI Customer Support</h1>
        </div>
        {/* Details Section */}
        <div className="bg-white bg-opacity-80 rounded-3xl shadow-xl p-6 mb-8">
          {details}
        </div>
        {/* Modern Chat UI */}
        <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-3xl shadow-xl p-6 min-h-[400px] flex flex-col">
          <div className="flex-1 overflow-y-auto mb-4" style={{ maxHeight: 350 }}>
            {chatHistory.length === 0 && (
              <div className="text-gray-400 text-center mt-20">Start the conversation by asking a question...</div>
            )}
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                <div className={`rounded-2xl px-5 py-3 max-w-[70%] shadow-lg flex items-end gap-2 ${msg.type === 'user' ? 'bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white rounded-br-3xl' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-3xl'}`}>
                  {msg.type === 'user' && <FaUser className="text-white text-lg mr-1" />}
                  <span>{msg.content}</span>
                  {msg.type === 'ai' && <FaRobot className="text-blue-500 text-lg ml-1" />}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-2">
                <div className="rounded-2xl px-5 py-3 max-w-[70%] bg-gray-100 text-gray-500 animate-pulse shadow-lg">AI is typing...</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {/* Workflow Animation */}
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
          {/* Input Area */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-auto">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isLoading}
              placeholder="Type your message..."
              className="flex-1 rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-md text-base"
              autoFocus
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-white px-5 py-3 rounded-xl font-bold shadow-lg hover:from-blue-600 hover:to-purple-600 transition-colors flex items-center gap-2 disabled:opacity-60 text-base"
              disabled={isLoading || !message.trim()}
            >
              <span>Send</span>
              <FaArrowRight />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const AICustomerSupport = () => {
  const [showCover, setShowCover] = useState(true);

  return showCover ? (
    <CoverScreen
      heading="AI Chat-Driven Support Agent"
      description="This agent provides real-time, AI-powered responses to user queries using a simple chat interface. It intelligently queries Google Sheets based on user questions and replies with relevant, accurate, and human-like answers—perfect for customer support or FAQ automation. Ideal for SaaS businesses, product teams, or service portals that want instant responses without heavy manual tagging or chatbot programming."
      details={details}
      workflowSVG={AICustomerSupportWorkflowSVG}
      onStart={() => setShowCover(false)}
    />
  ) : (
    <AICustomerSupportContent />
  );
};

export default AICustomerSupport; 