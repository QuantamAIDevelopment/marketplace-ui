import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaBook } from 'react-icons/fa';

const NOTION_API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/notion';

const parseMarkdownLink = (text) => {
    // Matches [text](url)
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.substring(lastIndex, match.index));
        }
        parts.push(<a key={match[2]} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{match[1]}</a>);
        lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
        parts.push(text.substring(lastIndex));
    }
    return parts.length ? parts : text;
};

const NotionKnowledgeBaseAIAssistant = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setAnswer('');
        try {
            const formData = new FormData();
            formData.append('question', question);
            const response = await fetch(NOTION_API_URL, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            const text = await response.text();
            setAnswer(text);
        } catch (err) {
            setError('Failed to get answer. ' + (err.message || ''));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mx-auto">
            <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold text-center mb-6 text-gray-800 flex items-center justify-center gap-2">
                <FaBook className="text-blue-600" /> Notion Knowledge Base AI Assistant
            </motion.h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={question}
                    onChange={e => setQuestion(e.target.value)}
                    placeholder="Ask a question about your Notion workspace..."
                    className="w-full p-2 border rounded"
                    required
                />
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading || !question}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300 flex items-center justify-center gap-2"
                >
                    <FaPaperPlane /> {loading ? 'Asking...' : 'Ask'}
                </motion.button>
            </form>
            {error && <div className="text-red-500 mt-4">{error}</div>}
            {answer && (
                <div className="mt-6 bg-gray-50 p-4 rounded shadow-inner border">
                    <div className="text-gray-800 text-base leading-relaxed">
                        {parseMarkdownLink(answer)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotionKnowledgeBaseAIAssistant;
