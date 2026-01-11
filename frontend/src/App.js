import { useState } from "react";

function App() {
  const [policyText, setPolicyText] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const togglePermission = (perm) => {
    setPermissions((prev) =>
      prev.includes(perm)
        ? prev.filter((p) => p !== perm)
        : [...prev, perm]
    );
  };

  const analyzeConsent = async () => {
    setLoading(true);
    setResult(null);

    const response = await fetch("http://127.0.0.1:8000/analyze-consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        app_name: "User Submitted App",
        permissions: permissions,
        policy_text: policyText
      })
    });

    const data = await response.json();
    setResult(data);
    setLoading(false);
  };

  const riskColor = (level) => {
    if (level === "High") return "red";
    if (level === "Medium") return "orange";
    return "green";
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial", maxWidth: 800 }}>
      <h2>Consent Transparency Engine</h2>
      <p>Analyze what you actually consented to.</p>

      {/* Policy Input */}
      <label><strong>Paste Privacy Policy / Consent Text</strong></label>
      <textarea
        rows="10"
        style={{ width: "100%", fontSize: 14 }}
        placeholder="Paste a privacy policy or consent agreement here..."
        value={policyText}
        onChange={(e) => setPolicyText(e.target.value)}
      />

      <button
        style={{ marginTop: 16 }}
        onClick={analyzeConsent}
        disabled={!policyText || loading}
      >
        {loading ? "Analyzing..." : "Analyze Agreement"}
      </button>

      {/* Result */}
      {result && (
        <div style={{ marginTop: 30, border: "1px solid #ddd", padding: 20 }}>
          <h3>{result.app}</h3>

          <p><strong>Summary</strong></p>
          <p>{result.plain_english_summary}</p>

          <p>
            <strong>Risk Level:</strong>{" "}
            <span style={{ color: riskColor(result.risk_level) }}>
              {result.risk_level}
            </span>{" "}
            ({result.risk_score})
          </p>

          <p><strong>Why this matters:</strong></p>
          <ul>
            {result.why_it_matters.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
