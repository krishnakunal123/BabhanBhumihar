import React from "react";

export default function ArticleCard({ article, onOpen }) {
  return (
    <article className="article-card">
      <h3 className="article-title">{article.title}</h3>
      <div className="article-meta">
        <span className="by">By {article.author}</span>
        <span>{article.date}</span>
      </div>
      <p className="article-excerpt">{article.excerpt}</p>
      <div style={{ marginTop: 12 }}>
        <button className="read-btn" onClick={() => onOpen(article.slug)}>Read</button>
      </div>
    </article>
  );
}
