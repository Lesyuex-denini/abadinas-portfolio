"use client";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { servicesScrollAnimation } from "@/animations/servicesScrollAnimation";
import SectionContainer from "@/components/layout/SectionContainer";
import Container from "@/components/layout/Container";
import FadeReveal from "@/components/motion/FadeReveal";
import Link from "next/link";
/* ═══════════════════════════════════════════
   CSS — original untouched + bg keyframes added
═══════════════════════════════════════════ */
const SERVICES_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@400;500;600&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
.sv-display { font-family:'Playfair Display',serif; }
.sv-sans    { font-family:'DM Sans',sans-serif; }
.sv-serif   { font-family:'Libre Baskerville',serif; }
.sv-section-num {
  font-family:'Playfair Display',serif;
  font-size:clamp(8rem,18vw,16rem);
  font-weight:900;
  line-height:0.8;
  color:rgba(255,249,245,0.04);
  position:absolute;
  top:-2rem; right:-1rem;
  pointer-events:none;
  user-select:none;
}
.sv-royal-card {
  position: relative;
  background: #faf7f2;
  border: 2px solid #d4c3b3;
  clip-path: polygon(
    32px 0, calc(100% - 32px) 0, 100% 32px,
    100% calc(100% - 32px), calc(100% - 32px) 100%,
    32px 100%, 0 calc(100% - 32px), 0 32px
  );
  overflow: hidden;
  transition: box-shadow 0.5s cubic-bezier(.4,0,.2,1), transform 0.5s cubic-bezier(.4,0,.2,1);
}
.sv-royal-card:hover { box-shadow:0 28px 64px rgba(89,56,56,0.16); transform:translateY(-5px) rotate(-0.25deg); }
.sv-royal-card::after { content:''; position:absolute; bottom:0;left:0;right:0; height:3px; background:linear-gradient(90deg,#ecc4c3,#b97d7b,#928e5e); transform:scaleX(0); transform-origin:left; transition:transform 0.5s cubic-bezier(.4,0,.2,1); z-index:2; }
.sv-royal-card:hover::after { transform:scaleX(1); }
.sv-corner { position:absolute; width:36px; height:36px; pointer-events:none; z-index:3; opacity:0.7; transition:opacity 0.4s,transform 0.4s; }
.sv-royal-card:hover .sv-corner { opacity:1; }
.sv-corner-tl { top:-1px; left:-1px; }
.sv-corner-tr { top:-1px; right:-1px; transform:scaleX(-1); }
.sv-corner-bl { bottom:-1px; left:-1px; transform:scaleY(-1); }
.sv-corner-br { bottom:-1px; right:-1px; transform:scale(-1); }
.sv-royal-card:hover .sv-corner-tl { transform:translate(-2px,-2px); }
.sv-royal-card:hover .sv-corner-tr { transform:scaleX(-1) translate(-2px,-2px) scaleX(1) translate(2px,-2px); }
.sv-tape { position:absolute; top:-10px; left:50%; transform:translateX(-50%) rotate(-2deg); width:72px; height:15px; background:rgba(236,196,195,0.60); background-image:repeating-linear-gradient(90deg,transparent,transparent 8px,rgba(255,255,255,0.18) 8px,rgba(255,255,255,0.18) 10px); z-index:4; }
.ex-lace-top { position:absolute; top:0;left:0;right:0; height:4px; background:repeating-linear-gradient(90deg,#4F252E 0px,#4F252E 6px,transparent 6px,transparent 12px,#ecc4c3 12px,#ecc4c3 16px,transparent 16px,transparent 24px); opacity:0.45; z-index:2; }
.sv-fold-wrap { perspective:1200px; }
.sv-fold-panel { transform-origin:top center; transform:rotateX(-90deg); opacity:0; height:0; overflow:hidden; transition:transform 0.65s cubic-bezier(.4,0,.2,1),opacity 0.45s cubic-bezier(.4,0,.2,1); }
.sv-fold-panel.open { transform:rotateX(0deg); opacity:1; height:auto; }
.sv-chevron { display:inline-block; transition:transform 0.4s cubic-bezier(.4,0,.2,1); }
.sv-chevron.open { transform:rotate(180deg); }
.sv-cta-fill { position:relative; background:#fff9f5; color:#575527; border:1px solid #e8ded4; font-family:'DM Sans',sans-serif; font-size:0.65rem; font-weight:600; letter-spacing:0.22em; text-transform:uppercase; padding:0.75rem 1.6rem; cursor:pointer; overflow:hidden; transition:transform 0.2s,box-shadow 0.2s,color 0.35s; display:inline-flex; align-items:center; gap:0.5rem; }
.sv-cta-fill::after { content:''; position:absolute; inset:0; background:#b97d7b; transform:scaleX(0); transform-origin:left; transition:transform 0.35s cubic-bezier(.4,0,.2,1); z-index:0; }
.sv-cta-fill:hover::after { transform:scaleX(1); }
.sv-cta-fill:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(89,56,56,0.18); color:#fff9f5; }
.sv-cta-fill > * { position:relative; z-index:1; }
.sv-ink-path { stroke-dasharray:260; stroke-dashoffset:260; transition:stroke-dashoffset 1.1s 0.4s cubic-bezier(.4,0,.2,1); }
.sv-ink-path.drawn { stroke-dashoffset:0; }
@keyframes sv-ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
.sv-ticker-track { animation:sv-ticker 32s linear infinite; display:flex; gap:2rem; white-space:nowrap; width:max-content; }
.sv-ticker-track:hover { animation-play-state:paused; }
@keyframes sv-float-a { 0%,100%{transform:translateY(0) rotate(12deg)} 50%{transform:translateY(-9px) rotate(10deg)} }
@keyframes sv-float-b { 0%,100%{transform:translateY(0) rotate(-7deg)} 50%{transform:translateY(-7px) rotate(-5deg)} }
.sv-float-a { animation:sv-float-a 5s ease-in-out infinite; }
.sv-float-b { animation:sv-float-b 7s ease-in-out infinite 1.2s; }
.sv-grain { position:absolute;inset:0;pointer-events:none;z-index:0; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E"); }
@keyframes sv-shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
.sv-gold-strip { background:linear-gradient(90deg,transparent 0%,rgba(245,214,122,0.22) 40%,rgba(245,214,122,0.35) 50%,rgba(245,214,122,0.22) 60%,transparent 100%); background-size:200% auto; animation:sv-shimmer 4s linear infinite; }
.sv-glow-spot { position:absolute;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(236,196,195,0.18) 0%,transparent 70%);pointer-events:none;z-index:0;transform:translate(-50%,-50%);transition:left 0.08s,top 0.08s; }
.sv-col-rules { position:absolute;inset:0;display:grid;grid-template-columns:repeat(5,1fr);pointer-events:none;z-index:0;opacity:0.04; }
@media (max-width:1024px) { .sv-section-num{font-size:clamp(6rem,14vw,12rem);} }
@media (max-width:768px) { .sv-fold-inner-grid{grid-template-columns:1fr !important;} .sv-fold-col-rule{display:none !important;} .sv-fold-right{padding-top:1.5rem !important;} .sv-header-grid{grid-template-columns:3.5rem 1fr auto !important;gap:0 1rem !important;} .sv-info-grid{grid-template-columns:1fr !important;} .sv-corner{width:28px;height:28px;} .sv-tape{width:55px;} }
@media (max-width:480px) { .sv-header-grid{grid-template-columns:1fr auto !important;} .sv-num-hide{display:none !important;} .sv-cta-fill{font-size:0.6rem;padding:0.65rem 1.2rem;} }
/* ── NEW: background flower / coquette animations ── */
@keyframes sv-bg-float-1 { 0%,100%{transform:translateY(0px) rotate(0deg);} 33%{transform:translateY(-18px) rotate(4deg);} 66%{transform:translateY(8px) rotate(-3deg);} }
@keyframes sv-bg-float-2 { 0%,100%{transform:translateY(0px) rotate(0deg) scale(1);} 50%{transform:translateY(-22px) rotate(-6deg) scale(1.04);} }
@keyframes sv-bg-float-3 { 0%,100%{transform:translateY(0px) rotate(15deg);} 40%{transform:translateY(-14px) rotate(20deg);} 80%{transform:translateY(6px) rotate(12deg);} }
@keyframes sv-shimmer-line { 0%{opacity:0.1;} 50%{opacity:0.28;} 100%{opacity:0.1;} }
@keyframes sv-bow-pulse { 0%,100%{transform:scale(1) rotate(-8deg);opacity:0.22;} 50%{transform:scale(1.08) rotate(-6deg);opacity:0.3;} }
@keyframes sv-ribbon-drift { 0%,100%{transform:rotate(-12deg) translateY(0);opacity:0.18;} 50%{transform:rotate(-8deg) translateY(-10px);opacity:0.28;} }
@keyframes sv-butterfly-drift { 0%,100%{transform:translateY(0) rotate(-5deg) scaleX(1);} 25%{transform:translateY(-14px) rotate(-2deg) scaleX(-1);} 50%{transform:translateY(-8px) rotate(3deg) scaleX(-1);} 75%{transform:translateY(-18px) rotate(-4deg) scaleX(1);} }
@keyframes sv-sparkle-star { 0%,100%{transform:scale(1) rotate(0deg);opacity:0.5;} 25%{transform:scale(1.15) rotate(90deg);opacity:0.85;} 75%{transform:scale(0.9) rotate(270deg);opacity:0.4;} }
@media (prefers-reduced-motion:reduce) {
  .sv-fold-panel,.sv-royal-card { transition:none !important; }
  .sv-ticker-track,.sv-float-a,.sv-float-b,.sv-gold-strip { animation:none !important; }
}
/* ── NEW: background flower / coquette animations ── */
@keyframes sv-bg-float-1 { 0%,100%{transform:translateY(0px) rotate(0deg);} 33%{transform:translateY(-18px) rotate(4deg);} 66%{transform:translateY(8px) rotate(-3deg);} }
@keyframes sv-bg-float-2 { 0%,100%{transform:translateY(0px) rotate(0deg) scale(1);} 50%{transform:translateY(-22px) rotate(-6deg) scale(1.04);} }
@keyframes sv-bg-float-3 { 0%,100%{transform:translateY(0px) rotate(15deg);} 40%{transform:translateY(-14px) rotate(20deg);} 80%{transform:translateY(6px) rotate(12deg);} }
@keyframes sv-shimmer-line { 0%{opacity:0.1;} 50%{opacity:0.28;} 100%{opacity:0.1;} }
@keyframes sv-bow-pulse { 0%,100%{transform:scale(1) rotate(-8deg);opacity:0.22;} 50%{transform:scale(1.08) rotate(-6deg);opacity:0.3;} }
@keyframes sv-ribbon-drift { 0%,100%{transform:rotate(-12deg) translateY(0);opacity:0.18;} 50%{transform:rotate(-8deg) translateY(-10px);opacity:0.28;} }
@keyframes sv-butterfly-drift { 0%,100%{transform:translateY(0) rotate(-5deg) scaleX(1);} 25%{transform:translateY(-14px) rotate(-2deg) scaleX(-1);} 50%{transform:translateY(-8px) rotate(3deg) scaleX(-1);} 75%{transform:translateY(-18px) rotate(-4deg) scaleX(1);} }
@keyframes sv-sparkle-star { 0%,100%{transform:scale(1) rotate(0deg);opacity:0.5;} 25%{transform:scale(1.15) rotate(90deg);opacity:0.85;} 75%{transform:scale(0.9) rotate(270deg);opacity:0.4;} }

/* ── LAB: shared container ── */
.sv-lab-preview {
  border-top: 1px dashed #d4c3b3;
  background: linear-gradient(135deg, #fdf9f5 0%, #faf4ee 100%);
  padding: 1.5rem 2rem 1.75rem;
  position: relative;
  overflow: hidden;
  transition: opacity 0.4s, max-height 0.55s cubic-bezier(.4,0,.2,1);
}
.sv-lab-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.48rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: #928e5e;
  border: 1px solid #d4c3b3;
  padding: 0.22rem 0.65rem;
  margin-bottom: 1rem;
  background: rgba(255,249,245,0.7);
}
/* Lab 01 — Code Playground */
.sv-lab-editor {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  align-items: start;
}
@media (max-width: 640px) { .sv-lab-editor { grid-template-columns: 1fr; } }
.sv-lab-code-area {
  background: #1e1a14;
  border-radius: 2px;
  padding: 0.85rem 1rem;
  font-family: 'Courier New', monospace;
  font-size: 0.72rem;
  line-height: 1.7;
  color: #ecc4c3;
  border: 1px solid #3a2e22;
  min-height: 110px;
  resize: none;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  caret-color: #ecc4c3;
}
.sv-lab-code-area::placeholder { color: #5a4e3a; }
.sv-lab-output {
  background: #fff9f5;
  border: 1px solid #e8ded4;
  border-radius: 2px;
  padding: 0.85rem 1rem;
  min-height: 110px;
  font-size: 0.8rem;
  color: #2e2a0e;
  line-height: 1.7;
  font-family: 'DM Sans', sans-serif;
}
.sv-lab-run-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.5rem;
  background: #b97d7b;
  color: #fff9f5;
  border: none;
  padding: 0.4rem 1rem;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.58rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.sv-lab-run-btn:hover { background: #9e6a68; transform: translateY(-1px); }

/* Lab 02 — UI Playground */
.sv-lab-ui-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.sv-lab-swatch {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform 0.2s, border-color 0.2s;
  flex-shrink: 0;
}
.sv-lab-swatch:hover { transform: scale(1.18); }
.sv-lab-swatch.active { border-color: #2e2a0e; }
.sv-lab-card-preview {
  border-radius: 3px;
  padding: 1.1rem 1.25rem;
  border: 1.5px solid rgba(0,0,0,0.08);
  transition: background 0.35s, color 0.35s, border-color 0.35s, box-shadow 0.35s;
  cursor: pointer;
  user-select: none;
}
.sv-lab-card-preview:hover { box-shadow: 0 6px 20px rgba(89,56,56,0.12); transform: translateY(-2px); }
.sv-lab-radius-btn {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.52rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  border: 1px solid #d4c3b3;
  background: transparent;
  color: #575527;
  padding: 0.22rem 0.55rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.sv-lab-radius-btn.active, .sv-lab-radius-btn:hover { background: #b97d7b; color: #fff9f5; border-color: #b97d7b; }
.sv-lab-ui-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: start;
}
@media (max-width: 640px) { .sv-lab-ui-grid { grid-template-columns: 1fr; gap: 1.1rem; } }
.sv-lab-card-preview { width: 100%; box-sizing: border-box; }

/* Lab 03 — Data Chart */
@keyframes sv-bar-grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
@keyframes sv-line-draw { from { stroke-dashoffset: 400; } to { stroke-dashoffset: 0; } }
.sv-lab-bar {
  transform-origin: bottom;
  animation: sv-bar-grow 0.7s cubic-bezier(.4,0,.2,1) both;
}
.sv-lab-line-path {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  animation: sv-line-draw 1.2s cubic-bezier(.4,0,.2,1) 0.2s both;
}
.sv-lab-metric {
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  font-weight: 900;
  color: #b97d7b;
  line-height: 1;
}
.sv-lab-metric-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.48rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #928e5e;
  margin-top: 0.15rem;
}
.sv-lab-chart-btn {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.5rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  border: 1px solid #d4c3b3;
  background: transparent;
  color: #575527;
  padding: 0.2rem 0.6rem;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.sv-lab-chart-btn.active { background: #928e5e; color: #fff9f5; border-color: #928e5e; }
`;

const services = [
  {
    num: "01",
    label: "Service",
    title: "Full-Stack\nWeb Development",
    standfirst:
      "From server routes to pixel-perfect interfaces — complete, production-ready applications.",
    body: "Building scalable and responsive web applications from frontend interfaces to backend systems. Solutions designed for maintainability, performance, and long-term growth. Every layer is considered: schema design, API contracts, component architecture, and deployment pipelines.",
    tags: ["Laravel", "Next.js", "React", "PHP", "TypeScript", "MySQL"],
    pullQuote: '"Code is a craft. Every line is a decision."',
    floatLabel: "Full-Stack",
    rot: -1,
    projectId: "businessflow-lite",
  },
  {
    num: "02",
    label: "Service",
    title: "UI/UX &\nFrontend Experiences",
    standfirst:
      "Interfaces that feel inevitable — beautiful, accessible, and purposefully built.",
    body: "Creating intuitive digital experiences that are visually engaging, accessible, and user-focused while maintaining responsiveness and usability. Design systems, interaction patterns, and motion choreography that elevate the whole product.",
    tags: [
      "Responsive Design",
      "Accessibility",
      "UI Design",
      "UX Research",
      "Frontend",
    ],
    pullQuote: '"Design is problem-solving with aesthetics as the medium."',
    floatLabel: "UI / UX",
    rot: 1,
    projectId: "solenne",
  },
  {
    num: "03",
    label: "Service",
    title: "Data-Driven\nSolutions",
    standfirst:
      "Turning raw information into clarity — dashboards, insights, and intelligent workflows.",
    body: "Leveraging data to support better decision-making, identify patterns, improve workflows, and transform information into actionable insights. From analytics integrations to custom reporting dashboards and data visualization layers.",
    tags: ["Analytics", "Dashboards", "Visualization", "Reporting", "Insights"],
    pullQuote: '"Data without context is noise. Context makes it powerful."',
    floatLabel: "Data · Insights",
    rot: -1,
    projectId: "wastewise",
  },
];

/* ═══════════════════════════════════════════════════════
   LAB 01 — Full-Stack Code Playground
   A tiny live HTML renderer. User types in the textarea
   and clicks Run (or edits) to see output in the preview.
═══════════════════════════════════════════════════════ */
function LabFullStack() {
  const DEFAULT_CODE = `<div style="font-family:sans-serif;padding:1rem;background:#fdf9f5;border-radius:4px">
  <h3 style="color:#b97d7b;margin:0 0 .5rem">Hello, World 🌸</h3>
  <p style="color:#575527;font-size:.85rem;margin:0">
    Edit this HTML and click <b>Run</b> to see it live.
  </p>
  <button onclick="this.textContent='✦ Clicked!';this.style.background='#b97d7b';this.style.color='#fff'"
    style="margin-top:.75rem;padding:.35rem .9rem;border:1px solid #b97d7b;background:transparent;color:#b97d7b;cursor:pointer;font-size:.8rem">
    Click me
  </button>
</div>`;
  const [code, setCode] = useState(DEFAULT_CODE);
  const [rendered, setRendered] = useState(DEFAULT_CODE);
  const [ran, setRan] = useState(false);

  const handleRun = () => {
    setRendered(code);
    setRan(true);
    setTimeout(() => setRan(false), 600);
  };

  return (
    <div className="sv-lab-preview">
      <div className="sv-lab-badge">
        <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5" stroke="#928e5e" strokeWidth="1.5" />
          <circle cx="6" cy="6" r="2" fill="#928e5e" />
        </svg>
        Interactive Lab · Live Code Editor
      </div>
      <div className="sv-lab-editor">
        <div>
          <textarea
            className="sv-lab-code-area"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            rows={7}
            aria-label="HTML code editor"
          />
          <button className="sv-lab-run-btn" onClick={handleRun}>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="currentColor">
              <polygon points="2,1 11,6 2,11" />
            </svg>
            Run
          </button>
        </div>
        <div
          className="sv-lab-output"
          style={{
            outline: ran ? "2px solid #b97d7b" : "none",
            transition: "outline 0.3s",
          }}
          dangerouslySetInnerHTML={{ __html: rendered }}
        />
      </div>
      <p
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "0.5rem",
          letterSpacing: "0.16em",
          color: "#928e5e",
          marginTop: "0.65rem",
          textTransform: "uppercase",
        }}
      >
        ↓ Open issue to see the full service details
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   LAB 02 — UI/UX Style Playground
   Pick a color theme + border-radius variant and watch
   a sample card component update in real time.
═══════════════════════════════════════════════════════ */
const UI_THEMES = [
  {
    label: "Rose",
    bg: "#fdf0ef",
    accent: "#b97d7b",
    text: "#2e2a0e",
    border: "#ecc4c3",
  },
  {
    label: "Sage",
    bg: "#f0f4ef",
    accent: "#6b8f71",
    text: "#1a2e1c",
    border: "#b5ceac",
  },
  {
    label: "Slate",
    bg: "#f0f2f5",
    accent: "#5b7fa6",
    text: "#1a2233",
    border: "#a8c0da",
  },
  {
    label: "Gold",
    bg: "#fdf8ef",
    accent: "#b89a3e",
    text: "#2e2a0e",
    border: "#e8d099",
  },
  {
    label: "Mauve",
    bg: "#f5f0f8",
    accent: "#8b6ea8",
    text: "#1e1428",
    border: "#cdb8e0",
  },
];
const UI_RADII = [
  { label: "Sharp", value: "0px" },
  { label: "Soft", value: "6px" },
  { label: "Round", value: "16px" },
];

function LabUIUX() {
  const [themeIdx, setThemeIdx] = useState(0);
  const [radiusIdx, setRadiusIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const theme = UI_THEMES[themeIdx];
  const radius = UI_RADII[radiusIdx].value;

  return (
    <div className="sv-lab-preview">
      <div className="sv-lab-badge">
        <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
          <rect
            x="1"
            y="1"
            width="10"
            height="10"
            rx="2"
            stroke="#928e5e"
            strokeWidth="1.5"
          />
          <rect x="3.5" y="3.5" width="5" height="5" rx="1" fill="#928e5e" />
        </svg>
        Interactive Lab · Style Playground
      </div>
      <div className="sv-lab-ui-grid">
        {/* Controls */}
        <div>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.5rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#928e5e",
              marginBottom: "0.5rem",
            }}
          >
            Color Theme
          </p>
          <div
            className="sv-lab-ui-controls"
            style={{ marginBottom: "0.85rem" }}
          >
            {UI_THEMES.map((t, i) => (
              <button
                key={t.label}
                className={`sv-lab-swatch${themeIdx === i ? " active" : ""}`}
                style={{ background: t.accent }}
                onClick={() => setThemeIdx(i)}
                title={t.label}
                aria-label={`${t.label} theme`}
              />
            ))}
          </div>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.5rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#928e5e",
              marginBottom: "0.5rem",
            }}
          >
            Border Radius
          </p>
          <div style={{ display: "flex", gap: "0.4rem" }}>
            {UI_RADII.map((r, i) => (
              <button
                key={r.label}
                className={`sv-lab-radius-btn${radiusIdx === i ? " active" : ""}`}
                onClick={() => setRadiusIdx(i)}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
        {/* Preview Card */}
        <div
          className="sv-lab-card-preview"
          style={{
            background: theme.bg,
            borderColor: theme.border,
            borderRadius: radius,
            boxShadow: hovered ? `0 8px 24px ${theme.accent}28` : "none",
            transform: hovered ? "translateY(-3px)" : "none",
            transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div
            style={{
              width: "28px",
              height: "3px",
              background: theme.accent,
              borderRadius: "2px",
              marginBottom: "0.65rem",
            }}
          />
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.48rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: theme.accent,
              marginBottom: "0.3rem",
            }}
          >
            {theme.label} · Preview
          </p>
          <p
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "1rem",
              fontWeight: 700,
              color: theme.text,
              lineHeight: 1.2,
              marginBottom: "0.5rem",
            }}
          >
            Sample Card
          </p>
          <p
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.72rem",
              color: theme.text,
              opacity: 0.7,
              lineHeight: 1.5,
              marginBottom: "0.75rem",
            }}
          >
            Hover me to feel the interaction.
          </p>
          <span
            style={{
              display: "inline-block",
              background: theme.accent,
              color: "#fff",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.5rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "0.28rem 0.7rem",
              borderRadius: radius,
            }}
          >
            Action →
          </span>
        </div>
      </div>
      <p
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "0.5rem",
          letterSpacing: "0.16em",
          color: "#928e5e",
          marginTop: "0.65rem",
          textTransform: "uppercase",
        }}
      >
        ↓ Open issue to see the full service details
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   LAB 03 — Data-Driven Chart Explorer
   Toggle between Bar and Line views of animated sample
   metrics. Metrics also tick up on mount.
═══════════════════════════════════════════════════════ */
const CHART_DATA = [
  { label: "Jan", bar: 42, line: 38 },
  { label: "Feb", bar: 58, line: 52 },
  { label: "Mar", bar: 51, line: 61 },
  { label: "Apr", bar: 75, line: 70 },
  { label: "May", bar: 68, line: 74 },
  { label: "Jun", bar: 89, line: 83 },
];
const METRICS = [
  { label: "Avg. Engagement", value: "78%", color: "#b97d7b" },
  { label: "Data Points", value: "12.4K", color: "#928e5e" },
  { label: "Trend", value: "+31%", color: "#6b8f71" },
];

function LabDataDriven() {
  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  const [animKey, setAnimKey] = useState(0);

  const handleSwitch = (type: "bar" | "line") => {
    setChartType(type);
    setAnimKey((k) => k + 1);
  };

  const W = 340,
    H = 110,
    PAD = 28,
    BAR_W = 28;
  const maxVal = 100;
  const colW = (W - PAD * 2) / CHART_DATA.length;

  // Line path
  const points = CHART_DATA.map((d, i) => {
    const x = PAD + i * colW + colW / 2;
    const y = H - PAD - (d.line / maxVal) * (H - PAD * 2);
    return `${x},${y}`;
  });
  const linePath = "M " + points.join(" L ");

  return (
    <div className="sv-lab-preview">
      <div className="sv-lab-badge">
        <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
          <polyline
            points="1,9 4,5 7,7 11,2"
            stroke="#928e5e"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Interactive Lab · Data Explorer
      </div>
      {/* Metric pills */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          marginBottom: "0.85rem",
        }}
      >
        {METRICS.map((m) => (
          <div key={m.label}>
            <div className="sv-lab-metric" style={{ color: m.color }}>
              {m.value}
            </div>
            <div className="sv-lab-metric-label">{m.label}</div>
          </div>
        ))}
      </div>
      {/* Chart type toggle */}
      <div style={{ display: "flex", gap: "0.4rem", marginBottom: "0.6rem" }}>
        <button
          className={`sv-lab-chart-btn${chartType === "bar" ? " active" : ""}`}
          onClick={() => handleSwitch("bar")}
        >
          Bar
        </button>
        <button
          className={`sv-lab-chart-btn${chartType === "line" ? " active" : ""}`}
          onClick={() => handleSwitch("line")}
        >
          Line
        </button>
      </div>
      {/* SVG Chart */}
      <svg
        key={animKey}
        width="100%"
        viewBox={`0 0 ${W} ${H}`}
        style={{ display: "block", overflow: "visible" }}
      >
        {/* Grid lines */}
        {[25, 50, 75, 100].map((pct) => {
          const y = H - PAD - (pct / maxVal) * (H - PAD * 2);
          return (
            <g key={pct}>
              <line
                x1={PAD}
                y1={y}
                x2={W - PAD}
                y2={y}
                stroke="#d4c3b3"
                strokeWidth="0.5"
                strokeDasharray="3 3"
              />
              <text
                x={PAD - 4}
                y={y + 3}
                textAnchor="end"
                fontSize="7"
                fill="#928e5e"
                fontFamily="DM Sans,sans-serif"
              >
                {pct}
              </text>
            </g>
          );
        })}
        {/* X axis */}
        <line
          x1={PAD}
          y1={H - PAD}
          x2={W - PAD}
          y2={H - PAD}
          stroke="#d4c3b3"
          strokeWidth="1"
        />

        {chartType === "bar" &&
          CHART_DATA.map((d, i) => {
            const x = PAD + i * colW + (colW - BAR_W) / 2;
            const barH = (d.bar / maxVal) * (H - PAD * 2);
            const y = H - PAD - barH;
            return (
              <g key={d.label}>
                <rect
                  className="sv-lab-bar"
                  x={x}
                  y={y}
                  width={BAR_W}
                  height={barH}
                  fill="#b97d7b"
                  opacity="0.82"
                  rx="2"
                  style={{ animationDelay: `${i * 0.08}s` }}
                />
                <text
                  x={x + BAR_W / 2}
                  y={H - PAD + 10}
                  textAnchor="middle"
                  fontSize="7.5"
                  fill="#928e5e"
                  fontFamily="DM Sans,sans-serif"
                >
                  {d.label}
                </text>
              </g>
            );
          })}

        {chartType === "line" && (
          <>
            <path
              className="sv-lab-line-path"
              d={linePath}
              stroke="#b97d7b"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={
                linePath +
                ` L ${PAD + (CHART_DATA.length - 1) * colW + colW / 2},${H - PAD} L ${PAD + colW / 2},${H - PAD} Z`
              }
              fill="#b97d7b"
              opacity="0.08"
            />
            {CHART_DATA.map((d, i) => {
              const x = PAD + i * colW + colW / 2;
              const y = H - PAD - (d.line / maxVal) * (H - PAD * 2);
              return (
                <g key={d.label}>
                  <circle
                    cx={x}
                    cy={y}
                    r="3.5"
                    fill="#b97d7b"
                    stroke="#fff9f5"
                    strokeWidth="1.5"
                  />
                  <text
                    x={x}
                    y={H - PAD + 10}
                    textAnchor="middle"
                    fontSize="7.5"
                    fill="#928e5e"
                    fontFamily="DM Sans,sans-serif"
                  >
                    {d.label}
                  </text>
                </g>
              );
            })}
          </>
        )}
      </svg>
      <p
        style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "0.5rem",
          letterSpacing: "0.16em",
          color: "#928e5e",
          marginTop: "0.65rem",
          textTransform: "uppercase",
        }}
      >
        ↓ Open issue to see the full service details
      </p>
    </div>
  );
}

/* ── Map index → lab component ── */
const LAB_COMPONENTS = [LabFullStack, LabUIUX, LabDataDriven];

function ServiceRow({
  svc,
  index,
  inkVis,
}: {
  svc: (typeof services)[0];
  index: number;
  inkVis: boolean;
}) {
  const [open, setOpen] = useState(false);
  const titleLines = svc.title.split("\n");
  const LabComponent = LAB_COMPONENTS[index];

  return (
    <FadeReveal delay={index * 0.12}>
      <div
        className="sv-royal-card"
        style={{ marginBottom: index < services.length - 1 ? "2.5rem" : 0 }}
      >
        <div className="sv-tape" />
        <div className="sv-corner sv-corner-tl"></div>
        <div className="sv-corner sv-corner-tr"></div>
        <div className="sv-corner sv-corner-bl"></div>
        <div className="sv-corner sv-corner-br"></div>
        <button
          onClick={() => setOpen((v) => !v)}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "2rem 2rem 1.5rem",
            textAlign: "left",
            display: "grid",
            gridTemplateColumns: "5rem 1fr auto",
            gap: "0 1.5rem",
            alignItems: "center",
          }}
          className="sv-header-grid"
          aria-expanded={open}
        >
          <div
            className="sv-display sv-num-hide"
            style={{
              fontSize: "clamp(3rem,4.5vw,4.5rem)",
              fontWeight: 900,
              lineHeight: 1,
              color: open ? "#b97d7b22" : "#57552712",
              transition: "color 0.4s",
              userSelect: "none",
            }}
          >
            {svc.num}
          </div>
          <div>
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.52rem",
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                color: "#928e5e",
                marginBottom: "0.35rem",
              }}
            >
              {svc.label} · Chapter 03
            </p>
            <h3
              className="sv-display"
              style={{
                fontSize: "clamp(1.4rem,3vw,2.8rem)",
                fontWeight: 900,
                lineHeight: 1.0,
                color: "#2e2a0e",
                letterSpacing: "-0.01em",
              }}
            >
              {titleLines.map((line, i) => (
                <span key={i} style={{ display: "block" }}>
                  {i === 1 ? (
                    <em style={{ color: "#b97d7b" }}>{line}</em>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h3>
          </div>
          <div
            className={`sv-chevron${open ? " open" : ""}`}
            style={{ color: "#b97d7b", flexShrink: 0 }}
            aria-hidden="true"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </button>
        <div
          style={{ height: "1px", background: "#57552718", margin: "0 2rem" }}
        />

        {/* ── LAB PREVIEW — visible only when card is closed ── */}
        <AnimatePresence>
          {!open && (
            <motion.div
              key="lab"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: "hidden" }}
            >
              <LabComponent />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="sv-fold-wrap">
          <div className={`sv-fold-panel${open ? " open" : ""}`}>
            <div
              className="sv-fold-inner-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1px 1.5fr",
                gap: "0 2rem",
                padding: "2rem 2rem 2.5rem",
                alignItems: "start",
              }}
            >
              <div style={{ position: "relative" }}>
                <p
                  className="sv-serif"
                  style={{
                    fontSize: "0.9rem",
                    lineHeight: 1.75,
                    color: "#575527bb",
                    borderTop: "2px solid #b97d7b",
                    borderBottom: "1px solid #57552720",
                    padding: "0.65rem 0",
                    marginBottom: "1.2rem",
                    fontStyle: "italic",
                  }}
                >
                  {svc.standfirst}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.45rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {svc.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: "0.58rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "#575527",
                        border: "1px solid #57552730",
                        padding: "0.28rem 0.72rem",
                        background: "rgba(87,85,39,0.04)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div
                  style={{
                    borderLeft: "4px solid #b97d7b",
                    paddingLeft: "1rem",
                    background: "rgba(236,196,195,0.1)",
                    padding: "0.9rem 1rem",
                  }}
                >
                  <p
                    className="sv-display"
                    style={{
                      fontSize: "0.9rem",
                      fontStyle: "italic",
                      color: "#2e2a0e",
                      lineHeight: 1.5,
                    }}
                  >
                    {svc.pullQuote}
                  </p>
                </div>
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: index % 2 === 0 ? [12, 10, 12] : [-7, -5, -7],
                  }}
                  transition={{
                    duration: index % 2 === 0 ? 5 : 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.6,
                  }}
                  style={{
                    position: "absolute",
                    bottom: "5%",
                    right: "-8%",
                    zIndex: 5,
                    background: "#fff9f5",
                    border: "1px solid #e8ded4",
                    padding: "0.35rem 0.65rem",
                    boxShadow: "2px 4px 12px rgba(89,56,56,0.09)",
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: "0.55rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "#575527",
                    whiteSpace: "nowrap",
                  }}
                >
                  {svc.floatLabel} ✦
                </motion.div>
              </div>
              <div
                className="sv-fold-col-rule"
                style={{ background: "#57552722", alignSelf: "stretch" }}
              />
              <div className="sv-fold-right">
                <p
                  style={{
                    fontSize: "0.88rem",
                    lineHeight: 2,
                    textAlign: "justify",
                    hyphens: "auto",
                    color: "#575527dd",
                    marginBottom: "1.4rem",
                  }}
                >
                  <span
                    className="sv-display"
                    style={{
                      float: "left",
                      fontSize: "3.2rem",
                      lineHeight: 0.78,
                      marginRight: "0.06rem",
                      marginTop: "0.1rem",
                      color: "#b97d7b",
                      fontWeight: 900,
                    }}
                  >
                    {svc.body[0]}
                  </span>
                  {svc.body.slice(1)}
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: "0.78rem",
                    lineHeight: 1.9,
                    color: "#575527aa",
                    marginBottom: "1.8rem",
                    clear: "both",
                  }}
                >
                  Available for{" "}
                  <span
                    style={{
                      position: "relative",
                      display: "inline-block",
                      color: "#b97d7b",
                      fontWeight: 600,
                    }}
                  >
                    freelance & full-time engagements
                    <svg
                      style={{
                        position: "absolute",
                        bottom: "-3px",
                        left: 0,
                        width: "100%",
                        overflow: "visible",
                      }}
                      viewBox="0 0 200 10"
                      fill="none"
                    >
                      <path
                        className={`sv-ink-path${inkVis ? " drawn" : ""}`}
                        d="M2 7 C50 12,100 2,150 7 S190 12,198 7"
                        stroke="#928e5e"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>{" "}
                  — building products that matter.
                </p>
                <div
                  className="sv-info-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.85rem",
                    marginBottom: "1.8rem",
                  }}
                >
                  {[
                    { label: "Approach", val: "User-first thinking" },
                    { label: "Delivery", val: "Clean, tested code" },
                  ].map(({ label, val }) => (
                    <div
                      key={label}
                      style={{
                        background: "rgba(87,85,39,0.04)",
                        border: "1px solid #57552718",
                        padding: "0.85rem",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "-7px",
                          left: "50%",
                          transform: "translateX(-50%) rotate(-3deg)",
                          width: "44px",
                          height: "12px",
                          background: "rgba(236,196,195,0.5)",
                          backgroundImage:
                            "repeating-linear-gradient(90deg,transparent,transparent 7px,rgba(255,255,255,0.18) 7px,rgba(255,255,255,0.18) 9px)",
                        }}
                      />
                      <div
                        style={{
                          width: "28px",
                          height: "2px",
                          background: "#b97d7b",
                          marginBottom: "0.55rem",
                        }}
                      />
                      <p
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: "0.5rem",
                          letterSpacing: "0.3em",
                          textTransform: "uppercase",
                          color: "#928e5e",
                          marginBottom: "0.3rem",
                        }}
                      >
                        {label}
                      </p>
                      <p
                        className="sv-display"
                        style={{
                          fontSize: "0.88rem",
                          fontWeight: 700,
                          color: "#2e2a0e",
                          lineHeight: 1.3,
                        }}
                      >
                        {val}
                      </p>
                    </div>
                  ))}
                </div>
                <Link
                  className="sv-cta-fill"
                  href={`/projects/${svc.projectId}`}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  <span>Discuss a Project</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            padding: "0.55rem 2rem",
            borderTop: "1px solid #57552712",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.3rem",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.5rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#928e5e",
            }}
          >
            Service Archive · {svc.num}
          </span>
          <span
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.5rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#b97d7b",
            }}
          >
            {open ? "Close issue ↑" : "Open issue ↓"}
          </span>
        </div>
      </div>
    </FadeReveal>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const [inkVis, setInkVis] = useState(false);
  useEffect(() => {
    if (
      !sectionRef.current ||
      !chapterRef.current ||
      !headingRef.current ||
      !introRef.current
    )
      return;
    const cleanup = servicesScrollAnimation(
      sectionRef.current,
      chapterRef.current,
      headingRef.current,
      introRef.current,
    );
    return cleanup;
  }, []);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInkVis(true);
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: SERVICES_CSS }} />
      <section
        ref={sectionRef}
        id="services"
        className="sv-sans"
        style={{
          position: "relative",
          minHeight: "100vh",
          padding: "0 0 6rem",
          overflow: "hidden",
          background: "linear-gradient(160deg,#b97d7b 45%,#928e5e 78%)",
        }}
      >
        {/* Lace top border — original */}
        <div className="ex-lace-top" />

        {/* ══ ORIGINAL BACKGROUND ELEMENTS — all preserved ══ */}
        <div className="sv-grain" />
        <div className="sv-col-rules" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{ borderRight: "1px solid rgba(255,249,245,0.06)" }}
            />
          ))}
        </div>

        <div
          className="sv-gold-strip"
          style={{
            position: "absolute",
            top: "28%",
            left: 0,
            right: 0,
            height: "1px",
            zIndex: 0,
          }}
        />
        <div
          className="sv-gold-strip"
          style={{
            position: "absolute",
            top: "72%",
            left: 0,
            right: 0,
            height: "1px",
            zIndex: 0,
            animationDelay: "2s",
          }}
        />
        {[
          { w: 500, h: 500, top: "-15%", left: "-10%", opacity: 0.07 },
          { w: 320, h: 320, top: "60%", left: "75%", opacity: 0.06 },
          { w: 200, h: 200, top: "30%", left: "85%", opacity: 0.08 },
        ].map((c, i) => (
          <div
            key={i}
            aria-hidden="true"
            style={{
              position: "absolute",
              width: c.w,
              height: c.h,
              borderRadius: "50%",
              border: "1px solid rgba(255,249,245,0.35)",
              top: c.top,
              left: c.left,
              zIndex: 0,
              opacity: c.opacity,
            }}
          />
        ))}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: "-3rem",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <div
            style={{
              height: "8rem",
              width: "1px",
              background: "rgba(255,249,245,0.18)",
            }}
          />
          <div
            style={{
              fontSize: "2rem",
              color: "rgba(255,249,245,0.5)",
              lineHeight: 1,
            }}
          >
            ✿
          </div>
          <div
            style={{
              position: "absolute",
              top: "-1rem",
              left: "6rem",
              transform: "rotate(-35deg)",
              fontSize: "18rem",
              color: "rgba(118,0,49,0.07)",
              lineHeight: 1,
            }}
          >
            ❦
          </div>
        </div>
        {/* Ghost chapter number */}
        <div ref={chapterRef} className="sv-section-num">
          03
        </div>
        <Container>
          <SectionContainer>
            <div style={{ position: "relative", zIndex: 1 }}>
              {/* MASTHEAD */}
              <div
                style={{
                  borderBottom: "3px solid rgba(255,249,245,0.45)",
                  paddingBottom: "0.5rem",
                  marginBottom: 0,
                  paddingTop: "5rem",
                }}
              >
                <FadeReveal>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: "0.52rem",
                          letterSpacing: "0.35em",
                          textTransform: "uppercase",
                          color: "rgba(255,249,245,0.5)",
                          marginBottom: "0.2rem",
                        }}
                      >
                        Chapter 03
                      </div>
                      <h2
                        ref={headingRef}
                        className="sv-display"
                        style={{
                          fontSize: "clamp(2.5rem,6vw,6rem)",
                          fontWeight: 900,
                          lineHeight: 0.9,
                          color: "#fff9f5",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        What I Can
                        <br />
                        <em style={{ color: "#ecc4c3" }}>Contribute</em>
                      </h2>
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: "0.52rem",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "rgba(255,249,245,0.45)",
                        textAlign: "right",
                      }}
                    >
                      <div>Services Feature</div>
                      <div style={{ opacity: 0.6, marginTop: "0.15rem" }}>
                        p.03 · What I Offer
                      </div>
                    </div>
                  </div>
                </FadeReveal>
                <div
                  style={{
                    borderTop: "1px solid rgba(255,249,245,0.12)",
                    marginTop: "0.4rem",
                  }}
                />
              </div>

              {/* Intro */}
              <FadeReveal delay={0.2}>
                <p
                  ref={introRef}
                  className="sv-serif"
                  style={{
                    fontSize: "clamp(0.88rem,1.5vw,1rem)",
                    lineHeight: 1.85,
                    fontStyle: "italic",
                    color: "rgba(255,249,245,0.75)",
                    maxWidth: "680px",
                    borderTop: "2px solid #ecc4c3",
                    borderBottom: "1px solid rgba(255,249,245,0.12)",
                    padding: "0.7rem 0",
                    marginBottom: "3rem",
                  }}
                >
                  Whether you&rsquo;re building a new product, improving an
                  existing platform, or transforming an idea into a digital
                  experience — I bring technical expertise, problem-solving, and
                  user-centered thinking to every project.
                </p>
              </FadeReveal>
              {/* Service cards */}
              <div>
                {services.map((svc, index) => (
                  <ServiceRow
                    key={svc.num}
                    svc={svc}
                    index={index}
                    inkVis={inkVis}
                  />
                ))}
              </div>
              {/* Quote */}
              <FadeReveal delay={0.5}>
                <div
                  style={{
                    marginTop: "4rem",
                    borderLeft: "4px solid #ecc4c3",
                    paddingLeft: "1.5rem",
                  }}
                >
                  <p
                    className="sv-display"
                    style={{
                      fontSize: "clamp(1.1rem,2.5vw,1.7rem)",
                      fontStyle: "italic",
                      color: "#ecc4c3",
                      lineHeight: 1.5,
                    }}
                  >
                    &ldquo;Every service is a commitment — not just a
                    deliverable, but a relationship built on craft.&rdquo;
                  </p>
                </div>
              </FadeReveal>
            </div>
          </SectionContainer>
        </Container>
      </section>
    </>
  );
}
