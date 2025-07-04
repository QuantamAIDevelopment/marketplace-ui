import React, { useState } from "react";

const API_URL = "https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/leaves-classifier";

export default function LeavesClassifier() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);
    try {
      const formData = new FormData();
      formData.append("start date", startDate);
      formData.append("end date", endDate);
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("API error");
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError("Failed to fetch leave data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-center">Leaves Classifier</h2>
      <p className="mb-4 text-gray-600 text-center">
        Enter a date range to classify and view employee leaves (Sick/Casual) from Google Calendar.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-center justify-center mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            className="border rounded px-3 py-2 w-full"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            className="border rounded px-3 py-2 w-full"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 min-w-[120px]"
          disabled={loading}
        >
          {loading ? "Loading..." : "Classify"}
        </button>
      </form>
      {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
      {results.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Employee Name</th>
                <th className="px-4 py-2 border">Leave Type</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{item.employeeName}</td>
                  <td className="px-4 py-2 border">{item.leaveType}</td>
                  <td className="px-4 py-2 border">{item.status}</td>
                  <td className="px-4 py-2 border">{new Date(item.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {results.length === 0 && !loading && (
        <div className="text-gray-500 text-center mt-4">No leave data to display.</div>
      )}
    </div>
  );
}
