import React from "react";

export default function Header({ current }) {
  const nav = [
    { id: "home", label: "Home" },
    { id: "origin", label: "Origin" },
    { id: "articles", label: "Articles" },
    { id: "about", label: "About" },
  ];

  return (
    <header className="site-header">
      
        

      <div className="nav-band">
        <div className="nav-inner">
          <div className="nav-left">
            <a href="#home" className="brand-link">
              <div className="brand-wrap">
                <div className="crest">BABHAN.BHUMIHAR</div>
                
              </div>
            </a>
          </div>

          <nav className="nav-center" aria-label="Primary">
            {nav.map(n => (
              <a key={n.id} href={`#${n.id}`} className={`nav-item ${current === n.id ? "active" : ""}`}>{n.label}</a>
            ))}
          </nav>

          <div className="nav-right">
            
            
          </div>
        </div>
      </div>

      <div className="breadcrumb-row">
        <div className="breadcrumb-inner">
          <nav className="breadcrumb">
            <a href="#home">Home</a>
            <span className="sep">›</span>
            <span>Bhumihar Origin</span>
          </nav>
        </div>
      </div>
    </header>
  );
}



