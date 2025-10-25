import React from "react";

function Section({ id, title, children }) {
  return (
    <section id={id} className="section">
      <h2 style={{ marginTop: 0 }}>{title}</h2>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <div className="page">
      <div className="hero">
        <h1 style={{ margin: 0 }}>Welcome — Home</h1>
        <p style={{ color: "var(--muted)" }}>Use the left grid to jump between sections on this page.</p>
      </div>

      <Section id="intro" title="Introduction">
        <p>This is the intro section. It briefly explains the site's purpose and provides an overview.</p>
      </Section>

      <Section id="history" title="History">
        <p>A concise history — replace with your article content or data-driven content.</p>
      </Section>

      <Section id="research" title="Research & Sources">
        <p>Research summaries, citations or embeds go here.</p>
      </Section>

      <Section id="gallery" title="Gallery">
        <p>Placeholder for images or charts.</p>
      </Section>

      <Section id="sources" title="Sources & Notes">
        <p>Bibliographic sources or dataset references.</p>
      </Section>

      <Section id="contact" title="Contact">
        <p>Contact details or author profile links.</p>
      </Section>
    </div>
  );
}

