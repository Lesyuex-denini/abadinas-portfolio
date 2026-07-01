"use client";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import FadeReveal from "@/components/motion/FadeReveal";
import Container from "@/components/layout/Container";
import { useEffect, useRef, useState } from "react";
import { skillsScrollAnimation } from "@/animations/skillsScrollAnimation";
import SectionContainer from "@/components/layout/SectionContainer";
/* ═══════════════════════════════════════════════════════════
   STYLES — all original rules preserved + background additions
═══════════════════════════════════════════════════════════ */
const SKILLS_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@400;500;600&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
.sk-display { font-family:'Playfair Display',serif; }
.sk-sans    { font-family:'DM Sans',sans-serif; }
.sk-serif   { font-family:'Libre Baskerville',serif; }
.sk-section-num {
  font-family:'Playfair Display',serif;
  font-size:clamp(6rem,18vw,16rem);
  font-weight:900;
  line-height:0.8;
  color:#57552706;
  position:absolute;
  top:-2rem; right:-1rem;
  pointer-events:none;
  user-select:none;
}
@keyframes sk-ticker {
  from { transform:translateX(0); }
  to   { transform:translateX(-50%); }
}
.sk-ticker-track {
  animation:sk-ticker 30s linear infinite;
  display:flex; gap:2rem; white-space:nowrap; width:max-content;
}
.sk-ticker-track:hover { animation-play-state:paused; }
/* ─── Background animation keyframes ─── */
@keyframes sk-float-1 {
  0%,100% { transform: translateY(0px) rotate(0deg); }
  33%     { transform: translateY(-18px) rotate(4deg); }
  66%     { transform: translateY(8px) rotate(-3deg); }
}
@keyframes sk-float-2 {
  0%,100% { transform: translateY(0px) rotate(0deg) scale(1); }
  50%     { transform: translateY(-22px) rotate(-6deg) scale(1.04); }
}
@keyframes sk-float-3 {
  0%,100% { transform: translateY(0px) rotate(15deg); }
  40%     { transform: translateY(-14px) rotate(20deg); }
  80%     { transform: translateY(6px) rotate(12deg); }
}
@keyframes sk-pulse-bow {
  0%,100% { transform: scale(1) rotate(-8deg); opacity:0.22; }
  50%     { transform: scale(1.08) rotate(-6deg); opacity:0.32; }
}
@keyframes sk-ribbon-drift {
  0%,100% { transform: rotate(-12deg) translateY(0); opacity:0.18; }
  50%     { transform: rotate(-8deg) translateY(-10px); opacity:0.28; }
}
@keyframes sk-shimmer-line {
  0%   { opacity:0.1; }
  50%  { opacity:0.32; }
  100% { opacity:0.1; }
}
@keyframes sk-butterfly-drift {
  0%,100% { transform: translateY(0) rotate(-5deg) scaleX(1); }
  25%     { transform: translateY(-14px) rotate(-2deg) scaleX(-1); }
  50%     { transform: translateY(-8px) rotate(3deg) scaleX(-1); }
  75%     { transform: translateY(-18px) rotate(-4deg) scaleX(1); }
}
/* Lace border top */
.ex-lace-top {
  position:absolute;
  top:0; left:0; right:0;
  height:6px;
  background:repeating-linear-gradient(
    90deg,
    #4F252E 0px, #4F252E 6px,
    transparent 6px, transparent 12px,
    #ecc4c3 12px, #ecc4c3 16px,
    transparent 16px, transparent 24px
  );
  opacity:0.45;
  z-index:2;
}
.ex-lace-top       { height:4px !important; }
/* ── Luxury Card — all original rules ── */
.sk-card-outer {
  box-shadow:
    0 0 0 1px rgba(185,125,123,.45),
    0 0 0 3px #b97d7b,
    0 0 0 5px #b97d7b,
    0 32px 72px rgba(0,0,0,.18),
    0 8px 20px rgba(0,0,0,.10);
}
.sk-card-outer::before {
  content:''; position:absolute; inset:-4px; border-radius:10px;
  border:1px solid rgba(236,196,195,0.25); pointer-events:none; z-index:0;
}
.sk-card-outer::after {
  content:''; position:absolute; inset:-8px; border-radius:14px;
  border:1px solid rgba(185,125,123,0.1); pointer-events:none; z-index:0;
}
.sk-card {
  background:#FFF9F5; border:1px solid rgba(236,196,195,0.5);
  border-radius:6px; min-height:300px; padding:2rem 2rem 2.2rem;
  position:relative; overflow:hidden;
  transition:box-shadow 0.5s cubic-bezier(.4,0,.2,1); cursor:default;
}
.sk-card::before {
  content:''; position:absolute; inset:4px;
  border:1px solid rgba(236,196,195,0.3); border-radius:3px;
  pointer-events:none; z-index:0;
}
.sk-card::after {
  content:''; position:absolute; bottom:0; left:0; right:0; height:3px;
  background:linear-gradient(90deg,transparent,#b97d7b,#ECC4C3,#b97d7b,transparent);
  transform:scaleX(0); transform-origin:left;
  transition:transform 0.5s cubic-bezier(.4,0,.2,1);
  border-radius:0 0 3px 3px; z-index:3;
}
.sk-card:hover::after { transform:scaleX(1); }
.sk-card-corner { position:absolute; width:20px; height:20px; pointer-events:none; z-index:2; }
.sk-card-corner--tl { top:10px; left:10px; border-top:1.5px solid rgba(185,125,123,0.5); border-left:1.5px solid rgba(185,125,123,0.5); border-radius:2px 0 0 0; }
.sk-card-corner--tr { top:10px; right:10px; border-top:1.5px solid rgba(185,125,123,0.5); border-right:1.5px solid rgba(185,125,123,0.5); border-radius:0 2px 0 0; }
.sk-card-corner--bl { bottom:10px; left:10px; border-bottom:1.5px solid rgba(185,125,123,0.5); border-left:1.5px solid rgba(185,125,123,0.5); border-radius:0 0 0 2px; }
.sk-card-corner--br { bottom:10px; right:10px; border-bottom:1.5px solid rgba(185,125,123,0.5); border-right:1.5px solid rgba(185,125,123,0.5); border-radius:0 0 2px 0; }
.sk-card-diamond { position:absolute; top:12px; left:50%; transform:translateX(-50%); width:6px; height:6px; background:rgba(185,125,123,0.45); border:1px solid rgba(185,125,123,0.6); rotate:45deg; z-index:2; pointer-events:none; }
.sk-card-filigree { position:absolute; top:22px; left:50%; transform:translateX(-50%); width:60%; height:1px; background:linear-gradient(90deg,transparent,rgba(185,125,123,0.35),rgba(236,196,195,0.6),rgba(185,125,123,0.35),transparent); z-index:2; pointer-events:none; }
.sk-tape { position:absolute; top:-10px; left:50%; transform:translateX(-50%) rotate(-2deg); width:80px; height:16px; background:rgba(236,196,195,0.55); background-image:repeating-linear-gradient(90deg,transparent,transparent 8px,rgba(255,255,255,0.22) 8px,rgba(255,255,255,0.22) 10px); z-index:4; }
.sk-chip { display:inline-flex; align-items:center; gap:0.3rem; padding:0.4rem 0.85rem; border-radius:3px; background:white; border:1px solid #ECC4C3; font-family:'DM Sans',sans-serif; font-size:0.7rem; color:#575527; box-shadow:0 1px 4px rgba(89,56,56,0.07),inset 0 1px 0 rgba(255,255,255,0.8); cursor:pointer; user-select:none; transition:background 0.25s,color 0.25s,border-color 0.25s,transform 0.2s,box-shadow 0.25s; position:relative; overflow:hidden; letter-spacing:0.02em; }
.sk-chip::before { content:''; position:absolute; inset:-1px; border:1px solid rgba(185,125,123,0.2); border-radius:4px; pointer-events:none; }
.sk-chip:hover { transform:translateY(-2px) scale(1.05); box-shadow:0 5px 14px rgba(89,56,56,0.14),inset 0 1px 0 rgba(255,255,255,0.9); }
.sk-chip.stamped { background:#575527; color:#FFF9F5; border-color:#575527; }
@keyframes sk-stamp-slam { 0%{transform:scale(2.2) rotate(-20deg) translateY(-30px);opacity:0;} 55%{transform:scale(0.88) rotate(4deg) translateY(4px);opacity:1;} 75%{transform:scale(1.05) rotate(-1deg) translateY(-1px);opacity:1;} 100%{transform:scale(1) rotate(2deg) translateY(0);opacity:1;} }
.sk-stamp-anim { animation:sk-stamp-slam 0.6s cubic-bezier(.4,0,.2,1) forwards; transform-origin:center; }
.sk-stamp-anim {
  transform-origin: bottom right;
}
@media (max-width:640px) {
  .sk-stamp-anim { transform: scale(0.78) !important; }
}
@media (max-width:480px) {
  .sk-stamp-anim { transform: scale(0.62) !important; }
}
@keyframes sk-ink-bleed { 0%{transform:translate(-50%,-50%) scale(0);opacity:0.5;} 100%{transform:translate(-50%,-50%) scale(3.5);opacity:0;} }
.sk-ink-bleed { position:absolute; top:50%; left:50%; width:60px; height:60px; border-radius:50%; border:2px solid rgba(87,85,39,0.25); pointer-events:none; animation:sk-ink-bleed 0.8s ease-out forwards; }
.sk-stamp-scale { transform-origin: bottom right; }
@media (max-width:640px) {
  .sk-stamp-scale { transform: scale(0.8); }
}
@media (max-width:480px) {
  .sk-stamp-scale { transform: scale(0.64); }
}
  .sk-stamp-btn { transform-origin: bottom right; }
@media (max-width:480px) {
  .sk-stamp-btn { transform: scale(0.85); }
}
.sk-ink-path { stroke-dasharray:260; stroke-dashoffset:260; transition:stroke-dashoffset 1.1s 0.4s cubic-bezier(.4,0,.2,1); }
.sk-ink-path.drawn { stroke-dashoffset:0; }
.sk-cards-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:2.5rem; margin-bottom:5rem; }
@media (max-width:640px) { .sk-cards-grid{grid-template-columns:1fr;gap:2rem;} .sk-card{min-height:260px;padding:1.6rem 1.4rem 2rem;} }
@media (max-width:480px) { .sk-cards-grid{gap:1.5rem;} .sk-card{padding:1.4rem 1.2rem 1.8rem;} }
.sk-masthead-row { display:flex; align-items:flex-end; justify-content:space-between; flex-wrap:wrap; gap:0.5rem; }
@media (max-width:480px) { .sk-masthead-meta{display:none;} }
.sk-quote { margin-top:2rem; padding-left:2rem; border-left:2px solid #B97D7B; }
@media (max-width:480px) { .sk-quote{padding-left:1rem;} }
@media (prefers-reduced-motion:reduce) {
  .sk-ticker-track { animation:none!important; }
  .sk-stamp-anim   { animation:none!important; }
  .sk-chip         { transition:none!important; }
  [class*="sk-float"],[class*="sk-pulse"],
  [class*="sk-ribbon"],[class*="sk-shimmer"],[class*="sk-butterfly"] { animation:none!important; }
}
`;

/* ─────────────────────────────────────────────────────────
   DATA — untouched
───────────────────────────────────────────────────────── */
const categories = [
  {
    title: "Development",
    tools: ["Laravel", "Next.js", "React", "TypeScript", "PHP", "Django"],
  },
  {
    title: "Frontend & Design",
    tools: [
      "Tailwind CSS",
      "Bootstrap",
      "Shadcn UI",
      "Framer Motion",
      "GSAP",
      "Lenis",
      "Responsive Design",
      "Accessibility",
      "UI / UX",
    ],
  },
  {
    title: "Backend & Data",
    tools: [
      "MySQL",
      "PostgreSQL",
      "Prisma ORM",
      "Firebase",
      "Firestore",
      "REST APIs",
      "Authentication",
      "Auth.js",
      "CRUD",
      "Chart.js",
      "Google Maps API",
    ],
  },
  {
    title: "Workflow",
    tools: ["Git", "GitHub", "Postman", "Debugging", "Vercel"],
  },
];

const cardBgs = ["#FFF9F5", "#FFFDF9", "#F8F4EF", "#FFF8F3"];
const cardRots = ["-1.5deg", "1.5deg", "-1deg", "1deg"];
/* ── Rubber stamp SVG ── */
function StampSVG({ label }: { label: string }) {
  const short = label.length > 12 ? label.slice(0, 11) + "…" : label;
  return (
    <svg
      viewBox="0 0 110 90"
      width="110"
      height="90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4"
        y="4"
        width="102"
        height="82"
        rx="6"
        stroke="#575527"
        strokeWidth="2.5"
        strokeDasharray="6 3"
      />
      <rect
        x="11"
        y="11"
        width="88"
        height="68"
        rx="4"
        stroke="#575527"
        strokeWidth="1.2"
      />
      <line
        x1="20"
        y1="26"
        x2="90"
        y2="26"
        stroke="#575527"
        strokeWidth="1.2"
      />
      <line
        x1="20"
        y1="64"
        x2="90"
        y2="64"
        stroke="#575527"
        strokeWidth="1.2"
      />
      <text
        x="55"
        y="22"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="8"
        fill="#575527"
        opacity="0.7"
      >
        ✦
      </text>
      <text
        x="55"
        y="50"
        textAnchor="middle"
        fontFamily="'Playfair Display',serif"
        fontSize="11"
        fontWeight="700"
        fill="#575527"
        letterSpacing="1"
      >
        {short}
      </text>
      <text
        x="55"
        y="60"
        textAnchor="middle"
        fontFamily="'DM Sans',sans-serif"
        fontSize="6"
        fill="#928e5e"
        letterSpacing="3"
      >
        CURATED
      </text>
      <text
        x="55"
        y="74"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="8"
        fill="#575527"
        opacity="0.7"
      >
        ✦
      </text>
    </svg>
  );
}
/* ── 3D Tilt + Stamp Card — untouched ── */
function SkillCard({
  category,
  index,
}: {
  category: (typeof categories)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [stamped, setStamped] = useState(false);
  const [showInkBleed, setShowInkBleed] = useState(false);
  const [stampedChips, setStampedChips] = useState<Set<string>>(new Set());
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [7, -7]), {
    stiffness: 180,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-9, 9]), {
    stiffness: 180,
    damping: 22,
  });
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = cardRef.current!.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    rawX.set(0);
    rawY.set(0);
  }
  function handleStamp(e: React.MouseEvent) {
    e.stopPropagation();
    if (stamped) return;
    setStamped(true);
    setShowInkBleed(true);
    setTimeout(() => setShowInkBleed(false), 850);
  }
  function toggleChip(tool: string) {
    setStampedChips((prev) => {
      const n = new Set(prev);
      n.has(tool) ? n.delete(tool) : n.add(tool);
      return n;
    });
  }
  return (
    <FadeReveal delay={index * 0.1}>
      <div
        className="sk-card-outer"
        style={{
          perspective: "1000px",
          transform: `rotate(${cardRots[index % 4]})`,
        }}
      >
        <motion.div
          ref={cardRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          whileHover={{ y: -12, scale: 1.015 }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="sk-card" style={{ background: cardBgs[index % 4] }}>
            <div className="sk-card-corner sk-card-corner--tl" />
            <div className="sk-card-corner sk-card-corner--tr" />
            <div className="sk-card-corner sk-card-corner--bl" />
            <div className="sk-card-corner sk-card-corner--br" />
            <div className="sk-card-diamond" />
            <div className="sk-card-filigree" />
            <div
              style={{
                position: "absolute",
                top: "28px",
                left: "10px",
                right: "10px",
                height: "1px",
                background: "rgba(185,125,123,0.12)",
                zIndex: 2,
              }}
            />

            <div
              style={{
                display: "inline-block",
                padding: "0.28rem 0.9rem",
                borderRadius: "2px",
                background: "rgba(236,196,195,0.22)",
                border: "1px solid rgba(185,125,123,0.2)",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.5rem",
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                color: "#928E5E",
                marginBottom: "1.2rem",
                marginTop: "0.6rem",
              }}
            >
              Collection
            </div>
            <h3
              className="sk-display"
              style={{
                fontSize: "clamp(1.35rem,2.2vw,1.8rem)",
                fontWeight: 900,
                color: "#575527",
                marginBottom: "1.4rem",
                lineHeight: 1.05,
                letterSpacing: "-0.01em",
              }}
            >
              {category.title}
            </h3>
            <div
              style={{
                width: "40px",
                height: "1px",
                background:
                  "linear-gradient(90deg,#B97D7B,rgba(185,125,123,0))",
                marginBottom: "1rem",
              }}
            />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.45rem",
                marginBottom: "3rem",
              }}
            >
              {category.tools.map((tool) => (
                <span
                  key={tool}
                  className={`sk-chip${stampedChips.has(tool) ? " stamped" : ""}`}
                  onClick={() => toggleChip(tool)}
                  title="Click to mark"
                >
                  {stampedChips.has(tool) && (
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6l3 3 5-5"
                        stroke="#FFF9F5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {tool}
                </span>
              ))}
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "36px",
                left: "10px",
                right: "10px",
                height: "1px",
                background: "rgba(185,125,123,0.1)",
                zIndex: 2,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "1.3rem",
                left: "1.8rem",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.6rem",
                fontStyle: "italic",
                color: "#B97D7B",
              }}
            >
              hand-picked favorites ♡
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "1rem",
                right: "1rem",
                zIndex: 5,
              }}
            >
              {!stamped ? (
                <motion.button
                  className="sk-stamp-btn"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleStamp}
                  style={{
                    background: "transparent",
                    border: "1px dashed #57552760",
                    borderRadius: "3px",
                    padding: "0.28rem 0.55rem",
                    cursor: "pointer",
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: "0.46rem",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "#928e5e",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                  title="Stamp this collection"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  </svg>
                  Stamp
                </motion.button>
              ) : (
                <div
                  className="sk-stamp-scale"
                  style={{ position: "relative", display: "inline-block" }}
                >
                  {showInkBleed && <div className="sk-ink-bleed" />}
                  <div className="sk-stamp-anim" style={{ opacity: 0.82 }}>
                    <StampSVG label={category.title} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </FadeReveal>
  );
}

/* ═══════════════════════════════════════
   MAIN EXPORT — content untouched, text colors mirrored from About
═══════════════════════════════════════ */
export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const [inkVis, setInkVis] = useState(false);
  useEffect(() => {
    if (
      !sectionRef.current ||
      !chapterRef.current ||
      !headingRef.current ||
      !boardRef.current ||
      !quoteRef.current
    )
      return;
    const cleanup = skillsScrollAnimation(
      sectionRef.current,
      chapterRef.current,
      headingRef.current,
      boardRef.current,
      quoteRef.current,
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
      <style dangerouslySetInnerHTML={{ __html: SKILLS_CSS }} />
      <section
        ref={sectionRef}
        id="skills"
        className="sk-sans"
        style={{
          position: "relative",
          background: "#f7efe8",
          padding: "0 0 6rem",
          overflow: "hidden",
        }}
      >
        {/* Lace top border */}
        <div className="ex-lace-top" />
        {/* Ghost chapter number */}
        <div ref={chapterRef} className="sk-section-num">
          04
        </div>
        {/* Column rules */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
            opacity: 0.04,
          }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{ borderRight: "1px solid #575527" }} />
          ))}
        </div>
        <Container>
          <SectionContainer>
            <div style={{ position: "relative", zIndex: 1 }}>
              {/* MASTHEAD */}
              <div
                style={{
                  borderBottom: "3px solid #575527",
                  paddingBottom: "0.5rem",
                  paddingTop: "5rem",
                  marginBottom: 0,
                }}
              >
                <FadeReveal>
                  <div className="sk-masthead-row">
                    <div>
                      <div
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: "0.52rem",
                          letterSpacing: "0.35em",
                          textTransform: "uppercase",
                          color: "#928e5e",
                          marginBottom: "0.2rem",
                        }}
                      >
                        Chapter 04
                      </div>
                      <h2
                        className="sk-display"
                        style={{
                          fontSize: "clamp(2.4rem,7vw,6rem)",
                          fontWeight: 900,
                          lineHeight: 0.9,
                          color: "#2e2a0e",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        Tools
                        <br />
                        <em style={{ color: "#b97d7b" }}>I Trust</em>
                      </h2>
                    </div>
                    <div
                      className="sk-masthead-meta"
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: "0.52rem",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "#928e5e",
                        textAlign: "right",
                      }}
                    >
                      <div>Skills &amp; Tools Feature</div>
                      <div style={{ opacity: 0.6, marginTop: "0.15rem" }}>
                        p.04 · The Stack
                      </div>
                    </div>
                  </div>
                </FadeReveal>
                <div
                  style={{
                    borderTop: "1px solid #57552730",
                    marginTop: "0.4rem",
                  }}
                />
              </div>

              {/* Standfirst */}
              <FadeReveal delay={0.2}>
                <p
                  className="sk-serif"
                  style={{
                    fontSize: "clamp(0.85rem,1.5vw,1rem)",
                    lineHeight: 1.85,
                    fontStyle: "italic",
                    color: "#575527cc",
                    maxWidth: "680px",
                    borderTop: "2px solid #b97d7b",
                    borderBottom: "1px solid #57552720",
                    padding: "0.7rem 0",
                    marginBottom: "1.2rem",
                  }}
                >
                  Every project is shaped by the tools behind it. Over time,
                  I&rsquo;ve developed a workflow built around technologies that
                  help me create reliable, scalable, and meaningful digital
                  experiences.
                </p>
              </FadeReveal>
              {/* Ink hint */}
              <FadeReveal delay={0.25}>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: "clamp(0.7rem,1.2vw,0.78rem)",
                    lineHeight: 1.9,
                    color: "#575527aa",
                    marginBottom: "3rem",
                  }}
                >
                  Click any chip to{" "}
                  <span
                    style={{
                      position: "relative",
                      display: "inline-block",
                      color: "#b97d7b",
                      fontWeight: 600,
                    }}
                  >
                    mark your favourites
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
                        className={`sk-ink-path${inkVis ? " drawn" : ""}`}
                        d="M2 7 C50 12,100 2,150 7 S190 12,198 7"
                        stroke="#928e5e"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>{" "}
                  — or stamp a card to seal the collection.
                </p>
              </FadeReveal>
              {/* Cards grid */}
              <div ref={boardRef} className="sk-cards-grid">
                {categories.map((category, index) => (
                  <SkillCard
                    key={category.title}
                    category={category}
                    index={index}
                  />
                ))}
              </div>
              {/* Quote */}
              <FadeReveal delay={0.5}>
                <div ref={quoteRef} className="sk-quote">
                  <p
                    className="sk-display"
                    style={{
                      fontStyle: "italic",
                      fontSize: "clamp(1.1rem,2.5vw,1.7rem)",
                      color: "#575527",
                      lineHeight: 1.5,
                    }}
                  >
                    &ldquo;The right tools don&rsquo;t replace creativity
                    &mdash; they amplify it.&rdquo;
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
