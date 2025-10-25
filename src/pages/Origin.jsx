// src/pages/Origin.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * Origin page
 * - Full-width hero with parallax
 * - Shrink on scroll
 * - Sections with ids
 * - References table with images that highlight on click
 */

const REFERENCES = [
  {
    id: "ref1",
    title:
      "Mithila account: conversion, reconversion, and Thākurvādin shrines.",
    img: "public/images/picture5.jpg",
  },
  {
    id: "ref2",
    title:
      "Inscriptions & ethnonym notes linking Bābhan/Bhumihāraka to monastic landholding.",
    img: "public/images/picture2.jpg",
  },
  {
    id: "ref3",
    title: "Barra oral testimony about reconversion narratives.",
    img: "public/images/picture1.jpg",
  },
  {
    id: "ref4",
    title:
      "Ghosrawan archaeological report: vihāra remains and village continuity.",
    img: "public/images/picture3.jpg",
  },
  {
    id: "ref5",
    title: "Pilindavaccha traditions and Pilichavāra section links.",
    img: "public/images/picture5.jpg",
  },
];

export default function Origin() {
  const [heroSmall, setHeroSmall] = useState(false);
  const heroRef = useRef(null);
  const imgRef = useRef(null);
  const rafRef = useRef(null);

  // Shrink hero on scroll
  useEffect(() => {
    const onScrollToggle = () => setHeroSmall(window.scrollY > 120);
    window.addEventListener("scroll", onScrollToggle, { passive: true });
    onScrollToggle();
    return () => window.removeEventListener("scroll", onScrollToggle);
  }, []);

  // Parallax image effect
  useEffect(() => {
    const heroEl = heroRef.current;
    const imgEl = imgRef.current;
    if (!heroEl || !imgEl) return;
    let running = false;
    const strength = 0.22;
    const onScroll = () => {
      if (running) return;
      running = true;
      rafRef.current = requestAnimationFrame(() => {
        const heroRect = heroEl.getBoundingClientRect();
        const translateY = Math.round(-heroRect.top * strength);
        imgEl.style.transform = `translateY(${translateY}px) scale(${
          heroSmall ? 1.06 : 1.03
        })`;
        running = false;
      });
    };
    imgEl.style.willChange = "transform, filter";
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [heroSmall]);

  // Scroll to reference row + flash
  const jumpToRef = (refId) => {
    const el = document.getElementById(refId);
    if (!el) return;
    const headerEl =
      document.querySelector(".nav-band") || document.querySelector("header");
    const headerH = headerEl
      ? Math.max(64, headerEl.getBoundingClientRect().height)
      : 110;
    const top =
      window.scrollY + el.getBoundingClientRect().top - headerH - 12;
    window.scrollTo({ top, behavior: "smooth" });
    setTimeout(() => {
      el.classList.remove("flash");
      el.offsetWidth; // reflow
      el.classList.add("flash");
      setTimeout(() => el.classList.remove("flash"), 1200);
    }, 350);
  };

  const handleRefClick = (id) => (e) => {
    if (e?.preventDefault) e.preventDefault();
    jumpToRef(id);
  };

  return (
    <>
      {/* HERO */}
      <div
        ref={heroRef}
        className={`hero-banner ${heroSmall ? "hero-small" : ""}`}
        style={{
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          width: "100vw",
          height: heroSmall ? 220 : 440,
          overflow: "hidden",
          transition: "height 360ms ease",
          zIndex: 1,
        }}
      >
        <img
          ref={imgRef}
          src="public/images/bhumihar_website_banner.jpg"
          alt="Bhumihar Origins Banner"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            transform: `translateY(0px) scale(${heroSmall ? 1.06 : 1.03})`,
            filter: heroSmall
              ? "blur(2px) brightness(0.62)"
              : "blur(3px) brightness(0.75)",
            transition: "filter 320ms ease, transform 360ms ease",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: heroSmall
              ? "linear-gradient(to bottom, rgba(0,0,0,0.30), rgba(0,0,0,0.66))"
              : "linear-gradient(to bottom, rgba(0,0,0,0.18), rgba(0,0,0,0.42))",
            zIndex: 2,
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 3,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            height: "100%",
            paddingBottom: 48,
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 980, padding: "0 16px" }}>
            <h1
              style={{
                color: "#fff",
                fontSize: heroSmall ? 34 : 50,
                margin: 0,
                textShadow: "0 3px 16px rgba(0,0,0,0.45)",
              }}
            >
              Bhumihar Origins
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.95)",
                fontStyle: "italic",
                marginTop: 8,
              }}
            >
              The academically verified Buddhist–Brahmin lineage of Magadha
            </p>
          </div>
        </div>
      </div>

      {/* BREADCRUMB */}
      <div className="breadcrumb-row">
        <div className="breadcrumb-inner">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="#home">homepage</a>
            <span className="sep">›</span>
            <a href="#history">history magazine</a>
            <span className="sep">›</span>
            <span>Bhumihar Origins</span>
          </nav>
        </div>
      </div>

      {/* CONTENT */}
      <div className="content">
        <div className="page" role="main">
          <section id="short-answer" className="section">
            <h3>Short Answer</h3>
            <p>
              Bhumihars are the former native Brahmins of Magadha who lost their
              ritual status upon converting to Buddhism. After the decline of
              Buddhism in Magadha, they reconverted to Hinduism, thereby
              forfeiting their previously held ritual privileges but retaining
              their original gotras, pravaras, and other Brahminical lineages.
            </p>
          </section>

          <section id="long-answer" className="section">
            <h3>Long Answer</h3>
            <p>
              Numerous theories exist regarding the ethnogenesis of the
              Bhumihars, but the most credible and academically supported one
              holds that they were Brahmins of Magadha who converted to
              Buddhism. Upon reconversion, they lost their ritual privileges yet
              retained their lineage identities and became custodians of monastic
              lands — hence <em>Bhūmi + Hāraka</em> (“custodians of the land”).
            </p>
          </section>

          <section id="linguistic-etymological" className="section">
            <h3>1. Linguistic and Etymological Evidence</h3>
            <p>
              Bābhan or Bhumihar preserved the Pāli form of Brāhman from Aśokan
              times, implying Brahmins who remained within Buddhism. The term
              Bhumihāraka recalls land custodianship tied to monasteries.
              <sup>
                <a onClick={handleRefClick("ref2")} className="footnote-link">
                  [2]
                </a>
              </sup>
            </p>
          </section>

          <section id="geographical-continuity" className="section">
            <h3>2. Geographical Continuity in the Buddhist Heartland</h3>
            <p>
              The Magadh region’s Buddhist sites — Ghosrawan, Titrawan, and
              Nālandā’s hinterland — coincide with modern Bhumihar settlements,
              evidencing continuity between monastic and agrarian custodians.
              <sup>
                <a onClick={handleRefClick("ref4")} className="footnote-link">
                  [4]
                </a>
              </sup>
            </p>
          </section>

          <section id="historical-testimony" className="section">
            <h3>3. Historical Testimony from Field Research</h3>
            <p>
              Historian William Dalrymple recorded a Bhumihar village claiming
              Buddhist conversion during Aśoka’s reign (c. 300 BCE).
              <sup>
                <a onClick={handleRefClick("ref3")} className="footnote-link">
                  [3]
                </a>
              </sup>
            </p>
          </section>

          <section id="institutional-legacy" className="section">
            <h3>4. Institutional and Cultural Legacy</h3>
            <p>
              As Buddhism waned in Bihar, converted Brahmins returned to
              Hinduism at a lower rank, maintaining Thakurbadis — shrines
              evolved from monasteries.
              <sup>
                <a onClick={handleRefClick("ref1")} className="footnote-link">
                  [1]
                </a>
              </sup>
            </p>
          </section>

          <section id="lineage-continuity" className="section">
            <h3>5. Lineage Continuity from Early Buddhist Teachers</h3>
            <p>
              Villages linked to Arhant Pilinda-vaccha remain inhabited by
              Bhumihars of the Pilichavāra section, showing lineage continuity
              from Buddhist to Brahmin identities.
              <sup>
                <a onClick={handleRefClick("ref5")} className="footnote-link">
                  [5]
                </a>
              </sup>
            </p>
          </section>

          {/* REFERENCES TABLE */}
          <section id="references" className="section" aria-labelledby="references-heading">
            <h3 id="references-heading">References</h3>
            <div className="references-table-wrap">
              <table className="references-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Description</th>
                    <th>Photo</th>
                  </tr>
                </thead>
                <tbody>
                  {REFERENCES.map((r, i) => (
                    <tr key={r.id} id={r.id} className="ref-row">
                      <td>{i + 1}</td>
                      <td>{r.title}</td>
                      <td>
                        <img
                          src={r.img}
                          alt={r.title}
                          style={{
                            width: 140,
                            height: 80,
                            objectFit: "cover",
                            borderRadius: 8,
                            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                            transition: "transform 0.25s ease",
                            cursor: "zoom-in",
                          }}
                          onClick={() => window.open(r.img, "_blank")}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.transform = "scale(1.05)")
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.transform = "scale(1.0)")
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
