import React from "react";

export default function About() {
  return (
    <div className="page">
      <div className="hero">
        <h1 style={{ margin: 0 }}>About</h1>
        <p style={{ color: "var(--muted)" }}>About this site and the project.</p>
      </div>

      <div className="section">
        <h3>Purpose</h3>
        <p>Explain the academic or historical focus, licensing for content, and any disclaimers.</p>
      </div>
    </div>
  );
}
