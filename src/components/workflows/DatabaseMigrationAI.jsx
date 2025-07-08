import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDatabase, FaExchangeAlt } from 'react-icons/fa';

const API_URL = 'http://localhost:5678/webhook/migrate_table';

const DatabaseMigrationAI = () => {
  const [sourceDatabase, setSourceDatabase] = useState('');
  const [destinationDatabase, setDestinationDatabase] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceDatabase, destinationDatabase })
      });
      const text = await response.text();
      // Parse key-value pairs from response
      const data = {};
      text.split('\n').forEach(line => {
        const [key, value] = line.split(':');
        if (key && value) data[key.trim()] = value.trim();
      });
      setResult(data);
    } catch (err) {
      setError('Migration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
      <div className="flex items-center space-x-3 mb-2">
        <div className="bg-blue-600 p-3 rounded-lg shadow">
          <FaDatabase className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Database Migration AI Agent</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Source Database</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={sourceDatabase}
            onChange={e => setSourceDatabase(e.target.value)}
            placeholder="e.g. tcs"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Destination Database</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={destinationDatabase}
            onChange={e => setDestinationDatabase(e.target.value)}
            placeholder="e.g. analytics"
            required
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-green-500 text-white py-2 rounded-lg font-bold text-lg shadow-lg hover:from-blue-700 hover:to-green-600 transition-colors"
          disabled={loading}
        >
          <FaExchangeAlt className="mr-2" />
          {loading ? 'Migrating...' : 'Migrate Tables'}
        </motion.button>
      </form>
      {error && <div className="text-red-600 font-semibold">{error}</div>}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4"
        >
          <div className="font-semibold text-gray-700 mb-2">Migration Result</div>
          <div className="space-y-1">
            <div><b>Source Database:</b> {result.Source_database}</div>
            <div><b>Destination Database:</b> {result.destination_database}</div>
            <div><b>Total Rows Transferred:</b> {result.total_rows_transferred}</div>
            <div><b>Migrated At:</b> {result.migrated_at}</div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DatabaseMigrationAI;
