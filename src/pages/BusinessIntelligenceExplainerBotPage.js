import React, { useState } from "react";

const API_URL = "https://qaid-marketplace-ayf0bggnfxbyckg5.australiaeast-01.azurewebsites.net/webhook/Sales";

const sampleCSV = `Date,Revenue,Product,Region\n2025-07-01,1000,Electronics,North\n2025-07-02,1500,Electronics,North`;

function downloadSampleCSV() {
  const blob = new Blob([sampleCSV], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sample_sales.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function BusinessIntelligenceExplainerBotPage() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    const formData = new FormData();
    formData.append("Sales", file);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });
      let data;
      try {
        data = await response.json();
      } catch (jsonErr) {
        // If not JSON, try to get text
        const text = await response.text();
        setError(`Server error (${response.status}): ${text}`);
        setLoading(false);
        return;
      }
      if (!response.ok) {
        setError(
          (data[0]?.Error || "Failed to process file.") +
          (data[0]?.Suggestion ? " " + data[0].Suggestion : "")
        );
      } else if (data[0]?.Error) {
        setError(data[0].Error + (data[0].Suggestion ? " " + data[0].Suggestion : ""));
      } else {
        setResult(data[0]);
      }
    } catch (err) {
      setError("Network error. Please check your connection or try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #f8fafc 0%, #c7d2fe 100%)" }}>
      <div style={{ background: "#fff", borderRadius: 12, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", padding: 32, minWidth: 350, maxWidth: 400, textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 32, marginRight: 8 }}>📊</span>
          <h2 style={{ margin: 0 }}>Business Intelligence BOT</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label htmlFor="csv-upload" style={{ fontWeight: 500 }}>Upload Sales Data File</label>
            <input
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              style={{ display: "block", margin: "12px auto" }}
            />
          </div>
          <div style={{ fontSize: "0.95em", color: "#555", marginBottom: 8 }}>
            <b>Note:</b> Your CSV must include columns named <code>Date</code> and <code>Revenue</code>.<br />
            <button type="button" style={{ marginTop: 6, fontSize: 13, color: "#2563eb", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }} onClick={downloadSampleCSV}>
              Download Sample CSV
            </button>
          </div>
          <ul style={{ textAlign: "left", fontSize: 13, color: "#666", margin: "0 0 16px 0", paddingLeft: 18 }}>
            <li>First row must be headers: <code>Date, Revenue, ...</code></li>
            <li>Date format: <code>YYYY-MM-DD</code></li>
            <li>Revenue must be a number</li>
          </ul>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px 0",
              background: "linear-gradient(90deg, #3b82f6 0%, #10b981 100%)",
              color: "#fff",
              fontWeight: 600,
              border: "none",
              borderRadius: 6,
              fontSize: 18,
              cursor: loading ? "not-allowed" : "pointer",
              marginBottom: 12,
            }}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </form>
        {error && <div style={{ color: "#ef4444", marginTop: 8, fontWeight: 500, whiteSpace: "pre-wrap" }}>{error}</div>}
        {result && (
          <div style={{ marginTop: 16, textAlign: "left" }}>
            <h4>Analysis Result:</h4>
            <pre style={{ background: "#f3f4f6", padding: 12, borderRadius: 6, fontSize: 14 }}>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
