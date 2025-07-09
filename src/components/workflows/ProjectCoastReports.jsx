import React, { useState } from 'react';
import { FaFileUpload, FaTable } from 'react-icons/fa';
import axios from 'axios';

const API_URL = 'https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/Auto';

const ProjectCoastReports = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [report, setReport] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setReport([]);
    try {
      const formData = new FormData();
      if (file) {
        formData.append('datas', file);
      }
      const response = await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setReport(response.data);
    } catch (err) {
      setError('Failed to generate project cost report.');
    } finally {
      setLoading(false);
    }
  };

  const totalCost = report.reduce((sum, row) => sum + (row.total_cost || 0), 0);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow space-y-8">
      <div className="flex items-center space-x-3 mb-4">
        <div className="bg-green-500 p-3 rounded-full shadow">
          <FaTable className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold">AI Project Coast Reports</h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="font-semibold">Upload Project Data File:</label>
        <div className="flex items-center space-x-2">
          <input
            type="file"
            onChange={handleFileChange}
            className="border p-2 rounded flex-1"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !file}
            className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-green-300"
          >
            <FaFileUpload className="mr-2" /> {loading ? 'Generating...' : 'Generate Report'}
          </button>
        </div>
      </form>
      {error && <div className="text-red-500 mt-4">{error}</div>}
      {report.length > 0 && (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full border rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-3 py-2 border">Project Name</th>
                <th className="px-3 py-2 border">Team Member</th>
                <th className="px-3 py-2 border">Category</th>
                <th className="px-3 py-2 border">Report Date</th>
                <th className="px-3 py-2 border">Hours</th>
                <th className="px-3 py-2 border">Rate</th>
                <th className="px-3 py-2 border">Notes</th>
                <th className="px-3 py-2 border">Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {report.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border">{row.project_name}</td>
                  <td className="px-3 py-2 border">{row.team_member}</td>
                  <td className="px-3 py-2 border">{row.category}</td>
                  <td className="px-3 py-2 border">{row.report_date}</td>
                  <td className="px-3 py-2 border">{row.hours}</td>
                  <td className="px-3 py-2 border">₹{row.rate}</td>
                  <td className="px-3 py-2 border">{row.notes}</td>
                  <td className="px-3 py-2 border font-semibold text-green-700">₹{row.total_cost}</td>
                </tr>
              ))}
              <tr className="bg-green-50 font-bold">
                <td colSpan={7} className="px-3 py-2 border text-right">Total Cost</td>
                <td className="px-3 py-2 border text-green-800">₹{totalCost}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProjectCoastReports; 