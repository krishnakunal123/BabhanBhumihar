import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import LeftGrid from "./components/LeftGrid";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import About from "./pages/About";
import Origin from "./pages/Origin";

function getRouteFromHash() {
  const h = (window.location.hash || "#home").replace(/^#/, "").split("?")[0];
  return h || "home";
}

export default function App() {
  const [route, setRoute] = useState(getRouteFromHash());

  useEffect(() => {
    const onHash = () => setRoute(getRouteFromHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div className="app-shell">
      <Header current={route} />

      <div className="layout">
        {/* Always show left navigation grid on all pages */}
        <LeftGrid currentRoute={route} />

        <main className="content">
          {route === "home" && <Home />}
          {route === "articles" && <Articles />}
          {route === "about" && <About />}
          {route === "origin" && <Origin />}
          {!["home", "articles", "about", "origin"].includes(route) && <Home />}
        </main>
      </div>

      <div className="footer">© {new Date().getFullYear()} — Babhan.Bhumihar</div>
    </div>
  );
}



