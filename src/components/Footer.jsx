import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>© {new Date().getFullYear()} Historic Articles — Academic Demo</p>
        <p style={{ fontSize: 13, color: "#6b7280" }}>Use original content or public-domain images only.</p>
      </div>
    </footer>
  );
}
