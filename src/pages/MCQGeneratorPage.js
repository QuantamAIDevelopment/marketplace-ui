import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaBrain } from 'react-icons/fa';
import PageRevealWrapper from '../components/workflows/PageRevealWrapper';
import { uploadFileAndGetMCQs, getWebMCQs, startQuiz, submitAnswer, getTopics } from '../services/workflows/mcqGenerator';

// Sub-components for different functionalities
const MCQGenerator = ({ topics }) => {
    const [topic, setTopic] = useState('');
    const [file, setFile] = useState(null);
    const [mcqs, setMcqs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [mode, setMode] = useState('file'); // 'file' or 'web'

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!topic) {
            setError('Topic is required.');
            return;
        }
        if (mode === 'file' && !file) {
            // Making file optional as per user request
        }

        setLoading(true);
        setError(null);
        setMcqs([]);

        try {
            let result;
            if (mode === 'file') {
                result = await uploadFileAndGetMCQs(topic, file);
            } else {
                result = await getWebMCQs(topic);
            }
            setMcqs(result);
        } catch (err) {
            setError('Failed to generate MCQs. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    
    const renderMCQ = (mcq, index) => {
        const questionData = mcq.scrapedQuestion || mcq;
        return (
            <motion.div key={index} className="bg-white p-4 rounded-lg shadow border"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                <p className="font-bold">{index + 1}. {questionData.question}</p>
                <div className="mt-2 space-y-1">
                    {questionData.options?.map((opt, i) => (
                        <div key={i} className="text-sm">{typeof opt === 'string' ? opt : opt.option}</div>
                    ))}
                </div>
                {questionData.answer && <p className="text-sm mt-2 text-green-600"><b>Answer:</b> {questionData.answer}</p>}
                {questionData.explanation && <p className="text-sm mt-1 text-gray-600"><b>Explanation:</b> {questionData.explanation}</p>}
                {questionData.tag && <p className="text-sm mt-2"><span className="font-semibold">Tag:</span> <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">{questionData.tag}</span></p>}
            </motion.div>
        );
    }

    return (
        <div>
            <div className="flex justify-center mb-4 border-b">
                <button onClick={() => setMode('file')} className={`px-4 py-2 font-semibold ${mode === 'file' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>From File</button>
                <button onClick={() => setMode('web')} className={`px-4 py-2 font-semibold ${mode === 'web' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>From Web</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'web' ? (
                    <select value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full p-2 border rounded">
                        <option value="">Select a Topic</option>
                        {topics.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                ) : (
                    <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Enter Topic" className="w-full p-2 border rounded" />
                )}
                {mode === 'file' && <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" />}
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300">
                    {loading ? 'Generating...' : 'Generate MCQs'}
                </motion.button>
            </form>
            {error && <div className="text-red-500 mt-4">{error}</div>}
            <div className="mt-6 space-y-4">
                {mcqs.map(renderMCQ)}
            </div>
        </div>
    );
};

const RevisionTrainer = ({ topics }) => {
    const [topic, setTopic] = useState('');
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [quizInProgress, setQuizInProgress] = useState(false);

    const handleStartQuiz = async (e) => {
        e.preventDefault();
        if (!topic) {
            setError('Topic is required to start the quiz.');
            return;
        }
        setLoading(true);
        setError(null);
        setQuestions([]);
        setAnswers({});
        setResults([]);
        try {
            const quizQuestions = await startQuiz(topic);
            setQuestions(quizQuestions);
            setQuizInProgress(true);
        } catch (err) {
            setError('Failed to fetch quiz questions.');
        } finally {
            setLoading(false);
        }
    };
    
    const handleAnswerChange = (questionId, answer) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const handleSubmitQuiz = async () => {
        setLoading(true);
        setError(null);
        try {
            const submittedResults = await Promise.all(
                Object.entries(answers).map(([questionId, userAnswer]) => 
                    submitAnswer(questionId, userAnswer)
                )
            );
            setResults(submittedResults);
            setQuizInProgress(false);
        } catch (err) {
            setError('Failed to submit answers.');
        } finally {
            setLoading(false);
        }
    };

    if (!quizInProgress) {
        return (
            <div>
                <form onSubmit={handleStartQuiz} className="space-y-4">
                    <select value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full p-2 border rounded">
                        <option value="">Select a Topic for the Quiz</option>
                        {topics.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading || !topic} className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-gray-400">
                        {loading ? 'Starting...' : 'Start Quiz'}
                    </motion.button>
                </form>
                {error && <div className="text-red-500 mt-4">{error}</div>}
                {results.length > 0 && (
                    <div className="mt-6 space-y-4">
                        <h3 className="text-xl font-bold">Quiz Results</h3>
                        {results.map((result, index) => (
                             <div key={index} className={`p-4 rounded-lg shadow border ${result.is_correct ? 'border-green-500' : 'border-red-500'}`}>
                                <p><b>Your answer:</b> {result.user_answer}</p>
                                <p><b>Correctness:</b> {result.is_correct ? 'Correct' : 'Incorrect'}</p>
                                <p><b>Explanation:</b> {result.explanation}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div>
            <h3 className="text-xl font-bold mb-4">Quiz on {topic}</h3>
            <div className="space-y-6">
                {questions.map((q, index) => (
                    <div key={q.id}>
                        <p className="font-semibold">{index + 1}. {q.question}</p>
                        <div className="mt-2 space-y-2">
                            {q.options.map((option, i) => {
                                // Extract the letter (A, B, C, D) from the option string
                                const optionLetter = option.match(/^[A-D]/)?.[0];
                                return (
                                    <label key={i} className="flex items-center space-x-2">
                                        <input type="radio" name={`question-${q.id}`} value={optionLetter || ''} onChange={(e) => handleAnswerChange(q.id, e.target.value)} className="form-radio" />
                                        <span>{option}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
            <motion.button onClick={handleSubmitQuiz} disabled={loading} className="mt-6 w-full bg-purple-500 text-white p-2 rounded hover:bg-purple-600 disabled:bg-purple-300">
                {loading ? 'Submitting...' : 'Submit Quiz'}
            </motion.button>
        </div>
    );
};

const MCQGeneratorPageContent = () => {
    const [activeTab, setActiveTab] = useState('generator');
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const fetchedTopics = await getTopics();
                // Filter out empty or "Unknown Topic" and get unique topics
                const uniqueTopics = [...new Set(
                    fetchedTopics
                        .map(t => t.topic)
                        .filter(t => t && t.toLowerCase() !== 'unknown topic')
                )];
                setTopics(uniqueTopics);
            } catch (error) {
                console.error("Could not fetch topics", error);
            }
        };
        fetchTopics();
    }, []);

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl mx-auto">
            <motion.h1 initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-center mb-6 text-gray-800">
                MCQ Agent
            </motion.h1>

            <div className="flex justify-center border-b mb-6">
                <button onClick={() => setActiveTab('generator')} className={`flex items-center space-x-2 px-6 py-3 font-semibold ${activeTab === 'generator' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>
                    <FaBook /><span>Generate MCQs</span>
                </button>
                <button onClick={() => setActiveTab('trainer')} className={`flex items-center space-x-2 px-6 py-3 font-semibold ${activeTab === 'trainer' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}>
                    <FaBrain /><span>Revision Trainer</span>
                </button>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {activeTab === 'generator' && <MCQGenerator topics={topics} />}
                    {activeTab === 'trainer' && <RevisionTrainer topics={topics} />}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};


const MCQGeneratorPage = () => (
    <PageRevealWrapper
        heading="Smart Study Assistant: MCQ Generator & Revision Trainer"
        description="Transform textbooks and topics into exam-ready questions—automatically and intelligently. This AI-powered Study Assistant ingests uploaded PDFs or user-specified topics, understands the content using LLMs and vector search, and outputs structured MCQs with correct answers, explanations, and predicted future questions. Built for students, educators, and edtech platforms, this system reduces manual effort in quiz creation, improves retention through revision modes, and adapts to curriculum changes dynamically. It's not just a generator—it's your always-on learning coach."
        details={
            <div className="space-y-6">
                <div>
                    <h2 className="font-semibold text-blue-700 mb-2">Features</h2>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                        <li>Multi-source Input: Accepts both uploaded files and typed topics via webhooks.</li>
                        <li>LLM-Powered Understanding: Uses Pinecone + Cohere/Groq/OpenRouter to extract deep context.</li>
                        <li>Auto MCQ Generation: Outputs 5 semantically correct, non-duplicate questions per topic.</li>
                        <li>Web Scraping Integration: Finds past questions from Byjus, Unacademy, Quora using SerpAPI.</li>
                        <li>PostgreSQL Storage: Saves and fetches all question data for later tracking and filtering.</li>
                        <li>PDF + Email Reporting: Converts results into downloadable PDFs and sends via Gmail.</li>
                        <li>Quiz Mode & Feedback Loop: Tracks quiz attempts, checks correctness, and stores analytics.</li>
                        <li>Future Prediction Engine: Suggests 3 likely questions for upcoming exams using trend analysis.</li>
                    </ul>
                </div>
                <div>
                    <h2 className="font-semibold text-purple-700 mb-2">Example Use Cases</h2>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                        <li>EdTech Platforms: Auto-generate quizzes and revision material from course PDFs or live web content.</li>
                        <li>Teachers & Trainers: Instantly convert syllabus topics into ready-to-use question sets.</li>
                        <li>Students: Self-quiz on specific chapters with instant feedback and future prediction questions.</li>
                        <li>Academic Publishers: Enhance eBooks with interactive MCQ layers and smart assessments.</li>
                        <li>Coaching Centers: Automate generation of practice sets and track student performance.</li>
                    </ul>
                </div>
                <div>
                    <h2 className="font-semibold text-blue-700 mb-2">⚡ Why This Stands Out</h2>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                        <li>Multi-source Input: Accepts both uploaded files and typed topics via webhooks.</li>
                        <li>LLM-Powered Understanding: Uses Pinecone + Cohere/Groq/OpenRouter to extract deep context.</li>
                        <li>Auto MCQ Generation: Outputs 5 semantically correct, non-duplicate questions per topic.</li>
                        <li>Web Scraping Integration: Finds past questions from Byjus, Unacademy, Quora using SerpAPI.</li>
                        <li>PostgreSQL Storage: Saves and fetches all question data for later tracking and filtering.</li>
                        <li>PDF + Email Reporting: Converts results into downloadable PDFs and sends via Gmail.</li>
                        <li>Quiz Mode & Feedback Loop: Tracks quiz attempts, checks correctness, and stores analytics.</li>
                        <li>Future Prediction Engine: Suggests 3 likely questions for upcoming exams using trend analysis.</li>
                    </ul>
                </div>
            </div>
        }
    >
        <MCQGeneratorPageContent />
    </PageRevealWrapper>
);

export default MCQGeneratorPage;