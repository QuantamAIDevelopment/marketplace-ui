import React, { useState } from "react";

const API_URL = "https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/ResumeAnalyzer";

export default function ResumeAnalyzer() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("JD", jd);
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("API error");
      const text = await response.text();
      setResult(text);
    } catch (err) {
      setError("Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-center">Resume Analyzer</h2>
      <p className="mb-4 text-gray-600 text-center">
        Upload a resume PDF and enter a job description to get an AI-based screening and score.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center justify-center mb-6">
        <div className="w-full">
          <label className="block text-sm font-medium mb-1">Resume (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            className="border rounded px-3 py-2 w-full"
            onChange={e => setResumeFile(e.target.files[0])}
            required
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium mb-1">Job Description</label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            value={jd}
            onChange={e => setJd(e.target.value)}
            placeholder="e.g. Java Developer"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 min-w-[120px]"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </form>
      {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
      {result && (
        <div className="bg-gray-50 border rounded p-4 mt-4 whitespace-pre-line">
          {result}
        </div>
      )}
    </div>
  );
}
