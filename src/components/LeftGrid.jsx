// src/components/LeftGrid.jsx
import React, { useEffect, useRef, useState } from "react";
import "./LeftGrid.css";

// Items before numbering starts
const NON_NUMBERED = ["short-answer", "long-answer"];

// Full section list in order
const ITEMS = [
  { id: "short-answer", label: "Short Answer" },
  { id: "long-answer", label: "Long Answer" },
  { id: "linguistic-etymological", label: "Linguistic & Etymological Evidence" },
  { id: "geographical-continuity", label: "Geographical Continuity" },
  { id: "historical-testimony", label: "Historical Testimony" },
  { id: "institutional-legacy", label: "Institutional & Cultural Legacy" },
  { id: "lineage-continuity", label: "Lineage Continuity" },
  { id: "references", label: "References" },
];

export default function LeftGrid({ currentRoute = "home" }) {
  const asideRef = useRef(null);
  const navInnerRef = useRef(null);
  const [activeId, setActiveId] = useState(null);
  const [headerHeight, setHeaderHeight] = useState(110);
  const resizeTimer = useRef(null);

  // compute header height (for sticky offset)
  const computeHeaderHeight = () => {
    const headerEl = document.querySelector(".nav-band") || document.querySelector("header");
    const h = headerEl ? Math.max(56, Math.round(headerEl.getBoundingClientRect().height)) : 110;
    setHeaderHeight(h);
  };

  // place nav to start near first section
  const positionAsideUnderFirstSection = () => {
    const aside = asideRef.current;
    const firstSection = document.getElementById(ITEMS[0].id);
    if (!aside || !firstSection) return;
    const sectionOffset = firstSection.offsetTop || 0;
    aside.style.marginTop = sectionOffset > 10 ? sectionOffset - 10 + "px" : "20px";
    aside.style.top = (headerHeight + 8) + "px";
  };

  useEffect(() => {
    computeHeaderHeight();
    positionAsideUnderFirstSection();

    const onResize = () => {
      if (resizeTimer.current) clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(() => {
        computeHeaderHeight();
        positionAsideUnderFirstSection();
      }, 100);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("load", positionAsideUnderFirstSection);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", positionAsideUnderFirstSection);
      if (resizeTimer.current) clearTimeout(resizeTimer.current);
    };
  }, [headerHeight, currentRoute]);

  // intersection observer for active section
  useEffect(() => {
    const elems = ITEMS.map(i => ({ id: i.id, el: document.getElementById(i.id) })).filter(x => x.el);
    if (!elems.length) return;
    const obs = new IntersectionObserver((entries) => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length) setActiveId(visible[0].target.id);
    }, { rootMargin: `-${headerHeight + 12}px 0px -45% 0px`, threshold: 0.01 });
    elems.forEach(n => obs.observe(n.el));
    return () => obs.disconnect();
  }, [headerHeight, currentRoute]);

  // scroll active into view
  useEffect(() => {
    if (!activeId) return;
    const container = navInnerRef.current;
    const btn = container?.querySelector(`[data-id="${activeId}"]`);
    if (container && btn) {
      const contRect = container.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      const target = container.scrollTop + (btnRect.top - contRect.top) - contRect.height / 2 + btnRect.height / 2;
      container.scrollTo({ top: target, behavior: "smooth" });
    }
  }, [activeId]);

  const goto = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = window.scrollY + el.getBoundingClientRect().top - headerHeight - 12;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
  };

  return (
    <aside
      ref={asideRef}
      className="leftgrid-sticky"
      aria-label="Contents"
      style={{ position: "sticky", alignSelf: "flex-start", width: 260, zIndex: 120 }}
    >
      <div className="leftgrid-box">
        <div className="leftgrid-header">
          <div>
            <h4>Contents</h4>
            <div className="leftgrid-sub">Jump to section</div>
          </div>
          <div className="leftgrid-count">{ITEMS.length}</div>
        </div>

        <nav ref={navInnerRef} className="leftgrid-nav" style={{ maxHeight: "calc(100vh - 220px)", overflow: "auto" }}>
          {ITEMS.map((it, idx) => {
            const active = activeId === it.id;

            // compute numbering: skip first two
            const number = NON_NUMBERED.includes(it.id)
              ? null
              : idx - NON_NUMBERED.length + 1;

            return (
              <button
                key={it.id}
                data-id={it.id}
                onClick={() => goto(it.id)}
                className={`leftgrid-item ${active ? "active" : ""}`}
                aria-current={active ? "true" : "false"}
              >
                {number ? (
                  <div className="leftgrid-number">{number}</div>
                ) : (
                  <div className="leftgrid-number" style={{ background: "#ddd", color: "#555" }}>–</div>
                )}
                <div className="leftgrid-label">{it.label}</div>
              </button>
            );
          })}
        </nav>

        <div className="leftgrid-tip">Tip: use keyboard arrows + Enter to jump</div>
      </div>
    </aside>
  );
}

