import React from "react";
// Adjust this import if your file is in a different location.
// I expect src/data/articles.js that does: export default [ { id:..., title:..., ... }, ... ]
import articles from "../data/articles";

export default function Articles() {
  return (
    <div className="page">
      <div className="hero">
        <h1 style={{ margin: 0 }}>Articles</h1>
        <p style={{ color: "var(--muted)" }}>A short index of available articles.</p>
      </div>

      {Array.isArray(articles) && articles.length ? (
        articles.map((a, idx) => (
          <article key={a.id ?? idx} className="section" style={{ marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>{a.title ?? a.headline ?? "Untitled"}</h3>
            <div style={{ color: "var(--muted)", fontSize: 13 }}>
              {(a.author ?? a.writer) + " • " + (a.date ?? "")}
            </div>
            <p style={{ marginTop: 8 }}>{a.excerpt ?? (a.content && a.content[0]) ?? "No excerpt."}</p>
            <a href={`#articles?open=${a.id ?? idx}`} style={{ color: "var(--accent)" }}>Read</a>
          </article>
        ))
      ) : (
        <div className="section">No articles found. Check <code>src/data/articles.js</code> export.</div>
      )}
    </div>
  );
}
