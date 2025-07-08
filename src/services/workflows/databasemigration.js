// Service for Database Migration AI Agent

const API_URL = 'http://localhost:5678/webhook/migrate_table';

export async function migrateDatabase({ sourceDatabase, destinationDatabase }) {
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
  return data;
}
