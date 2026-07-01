"use client";
import FadeReveal from "@/components/motion/FadeReveal";
import Container from "@/components/layout/Container";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { experienceScrollAnimation } from "@/animations/experienceScrollAnimation";
import SectionContainer from "@/components/layout/SectionContainer";
/* ═══════════════════════════════════════
   RESPONSIVE HOOK
═══════════════════════════════════════ */
function useBreakpoint() {
  const [bp, setBp] = useState<"mobile" | "tablet" | "desktop">("desktop");
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w < 640) setBp("mobile");
      else if (w < 1024) setBp("tablet");
      else setBp("desktop");
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return bp;
}
const EXPERIENCE_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@400;500;600&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
.ex-display { font-family:'Playfair Display',serif; }
.ex-sans    { font-family:'DM Sans',sans-serif; }
.ex-serif   { font-family:'Libre Baskerville',serif; }
.ex-section-num {
  font-family:'Playfair Display',serif;
  font-size:clamp(8rem,18vw,16rem);
  font-weight:900;
  line-height:0.8;
  color:#92825e18;
  position:absolute;
  top:-2rem; right:-1rem;
  pointer-events:none;
  user-select:none;
}
@keyframes ex-ticker {
  from { transform:translateX(0); }
  to   { transform:translateX(-50%); }
}
.ex-ticker-track {
  animation:ex-ticker 30s linear infinite;
  display:flex;
  gap:2rem;
  white-space:nowrap;
  width:max-content;
}
.ex-ticker-track:hover { animation-play-state:paused; }
.ex-lace-top {
  position:absolute;
  top:0; left:0; right:0;
  height:6px;
  background:repeating-linear-gradient(
    90deg,
    #b97d7b 0px,#b97d7b 6px,
    transparent 6px,transparent 12px,
    #ecc4c3 12px,#ecc4c3 16px,
    transparent 16px,transparent 24px
  );
  opacity:0.45;
  z-index:2;
}
@keyframes ex-pearl-sway {
  0%,100% { transform:rotate(-1deg); }
  50%     { transform:rotate(1deg); }
}
.ex-pearl-string {
  position:absolute;
  top:0;
  display:flex;
  flex-direction:column;
  align-items:center;
  z-index:1;
  pointer-events:none;
  animation:ex-pearl-sway 6s ease-in-out infinite;
  transform-origin:top center;
}
.ex-pearl {
  width:10px; height:10px;
  border-radius:50%;
  background:radial-gradient(circle at 35% 35%,#fff9f5,#ecc4c3 60%,#b97d7b);
  box-shadow:0 1px 4px rgba(185,125,123,0.3);
  margin:2px 0;
  flex-shrink:0;
}
.ex-pearl-thread {
  width:1px;
  background:rgba(185,125,123,0.35);
  flex-shrink:0;
}
@keyframes ex-seal-float {
  0%,100% { transform:rotate(-8deg) translateY(0); }
  50%     { transform:rotate(-6deg) translateY(-8px); }
}
.ex-ambient-seal {
  position:absolute;
  pointer-events:none;
  animation:ex-seal-float 7s ease-in-out infinite;
  opacity:0.18;
  z-index:0;
}
@keyframes ex-bow-float {
  0%,100% { transform:rotate(5deg) translateY(0); }
  50%     { transform:rotate(3deg) translateY(-6px); }
}
.ex-ambient-bow {
  position:absolute;
  pointer-events:none;
  animation:ex-bow-float 9s ease-in-out infinite;
  opacity:0.12;
  z-index:0;
  font-size:5rem;
}
@keyframes ex-star-pulse {
  0%,100% { opacity:0.08; transform:scale(1) rotate(0deg); }
  50%     { opacity:0.22; transform:scale(1.15) rotate(20deg); }
}
.ex-ambient-star {
  position:absolute;
  pointer-events:none;
  animation:ex-star-pulse ease-in-out infinite;
  z-index:0;
}
.ex-watermark {
  position:absolute;
  pointer-events:none;
  z-index:0;
  opacity:0.04;
  user-select:none;
}
.ex-flip-scene {
  perspective:1100px;
  min-height:420px;
  cursor:default;
}
.ex-flip-inner {
  position:relative;
  width:100%;
  min-height:420px;
  height:100%;
  transform-style:preserve-3d;
  transition:transform 0.72s cubic-bezier(0.4,0,0.2,1);
}
.ex-flip-inner.flipped {
  transform:rotateY(180deg);
}
.ex-card-face {
  position:absolute;
  inset:0;
  backface-visibility:hidden;
  -webkit-backface-visibility:hidden;
  border-radius:10px;
  overflow:hidden;
}
.ex-card-back {
overflow:hidden;
  transform:rotateY(0deg);
  background:linear-gradient(135deg,#b97d7b 0%,#ecc4c3 55%,#ddd3c9 100%);
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:1rem;
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,0.35),
    0 18px 45px rgba(47,32,22,0.10);
}
.ex-card-back::before {
  content:'';
  position:absolute;
  inset:0;
  background-image:
    repeating-linear-gradient(45deg,
      rgba(255,249,245,0.07) 0px,rgba(255,249,245,0.07) 1px,
      transparent 1px,transparent 14px
    ),
    repeating-linear-gradient(-45deg,
      rgba(255,249,245,0.04) 0px,rgba(255,249,245,0.04) 1px,
      transparent 1px,transparent 14px
    );
  pointer-events:none;
  z-index:0;
}
.ex-card-back::after {
  content:'✦';
  position:absolute;
  bottom:14px; right:16px;
  font-size:0.7rem;
  color:rgba(255,249,245,0.45);
  z-index:1;
}
.ex-card-back-corner {
  position:absolute;
  top:14px; left:16px;
  font-size:0.7rem;
  color:rgba(255,249,245,0.45);
  z-index:1;
  pointer-events:none;
}
@keyframes ex-back-sway {
  0%,100% { transform:rotate(-4deg) scale(1); }
  50%     { transform:rotate(4deg) scale(1.07); }
}
.ex-card-back-glyph {
  font-size:5.5rem;
  line-height:1;
  opacity:0.65;
  filter:drop-shadow(0 4px 14px rgba(87,85,39,0.22));
  animation:ex-back-sway 6s ease-in-out infinite;
  position:relative;
  z-index:1;
}
.ex-card-back-hint {
  font-family:'DM Sans',sans-serif;
  font-size:0.47rem;
  letter-spacing:0.4em;
  text-transform:uppercase;
  color:rgba(255,249,245,0.7);
  text-align:center;
  position:relative;
  z-index:1;
}
.ex-card-front {
overflow:hidden;
  transform:rotateY(180deg);
  background-image:radial-gradient(rgba(87,85,39,.03) 1px,transparent 1px);
  background-size:8px 8px;
  background-color:#fffdfb;
  border:6px solid rgba(87,85,39,.08);
  box-shadow:
    inset 0 0 0 1px rgba(255,255,255,.4),
    0 18px 45px rgba(47,32,22,.08);
  padding:2.5rem 2rem 2rem 2.8rem;
}
.ex-card-front::before {
  content:'';
  position:absolute;
  inset:10px;
  border:1px solid rgba(87,85,39,.08);
  pointer-events:none;
  z-index:0;
}
.ex-card-front::after {
  content:'';
  position:absolute;
  inset:0;
  background:#fffdfb;
  border:1px solid rgba(87,85,39,.05);
  transform:translate(10px,10px);
  z-index:-2;
  border-radius:10px;
}
.ex-front-bar {
  position:absolute;
  bottom:0; left:0; right:0;
  height:3px;
  background:#b97d7b;
  transform:scaleX(0);
  transform-origin:left;
  transition:transform 0.4s cubic-bezier(.4,0,.2,1);
  z-index:2;
}
.ex-flip-inner.flipped .ex-front-bar {
  transform:scaleX(1);
}

.ex-card-stamp {
  position:absolute;
  top:-3rem; right:-3rem;
  font-size:15rem;
  opacity:.12;
  color:#921A40;
  pointer-events:none;
  transform:rotate(-15deg);
  z-index:0;
}
.ex-underline {
  width:5rem; height:4px;
  border-radius:999px;
  background:#ECC4C3;
  margin-bottom:1.5rem;
  transition:width 0.5s cubic-bezier(.4,0,.2,1);
}
.ex-flip-inner.flipped .ex-underline {
  width:8rem;
}
.ex-feature {
  background:#FFF9F5;
  border:1px solid #F0E6DB;
  box-shadow:0 20px 50px rgba(0,0,0,0.07);
  border-radius:40px;
  overflow:hidden;
  transition:transform 0.65s cubic-bezier(.4,0,.2,1);
}
.ex-feature:hover { transform:translateY(-6px); }
.ex-cta-fill {
  position:relative;
  background:#575527;
  color:#fff9f5;
  border:none;
  font-family:'DM Sans',sans-serif;
  font-size:0.65rem;
  font-weight:600;
  letter-spacing:0.22em;
  text-transform:uppercase;
  padding:0.85rem 1.8rem;
  cursor:pointer;
  overflow:hidden;
  transition:transform 0.2s,box-shadow 0.2s;
  display:inline-flex;
  align-items:center;
  gap:0.5rem;
}
.ex-cta-fill::after {
  content:'';position:absolute;inset:0;
  background:#b97d7b;
  transform:scaleX(0);transform-origin:left;
  transition:transform 0.35s cubic-bezier(.4,0,.2,1);z-index:0;
}
.ex-cta-fill:hover::after { transform:scaleX(1); }
.ex-cta-fill:hover { transform:translateY(-2px);box-shadow:0 8px 24px rgba(89,56,56,0.2); }
.ex-cta-fill > * { position:relative;z-index:1; }
.ex-dot {
  width:8px;height:8px;border-radius:50%;
  border:1px solid #B97D7B;background:transparent;
  cursor:pointer;transition:background 0.3s,transform 0.3s;padding:0;
}
.ex-dot.active { background:#B97D7B;transform:scale(1.25); }
.ex-ink-path {
  stroke-dasharray:260;stroke-dashoffset:260;
  transition:stroke-dashoffset 1.1s 0.4s cubic-bezier(.4,0,.2,1);
}
.ex-ink-path.drawn { stroke-dashoffset:0; }


/* ══ RESPONSIVE ══ */
@media (min-width:640px) and (max-width:1023px) {
  .ex-internship-grid { display:flex !important;flex-direction:column !important;gap:2rem !important;padding:1.5rem !important; }
  .ex-internship-rule { display:none !important; }
  .ex-internship-left { padding-left:0 !important; }
  .ex-carousel-col { margin-top:0 !important; }
  .ex-carousel-img  { height:300px !important; }
  .ex-masthead-meta { display:none !important; }
  .ex-feature { border-radius:24px !important; }
  .ex-card-front { padding:2rem 1.5rem 1.5rem 2rem !important; }
}
@media (max-width:639px) {
  .ex-masthead-meta { display:none !important; }
  .ex-cards-grid { grid-template-columns:1fr !important;gap:2rem !important; }
  .ex-flip-scene { transform:none !important; }
  .ex-card-front { padding:1.8rem 1.3rem 1.4rem 1.3rem !important;border-radius:8px !important; }
  .ex-card-back { border-radius:8px !important; }
  .ex-internship-header { padding:1rem 1.2rem 0.4rem !important; }
  .ex-internship-grid { display:flex !important;flex-direction:column !important;gap:2rem !important;padding:1.2rem !important; }
  .ex-internship-rule { display:none !important; }
  .ex-internship-left { padding-left:0 !important; }
  .ex-drop-cap { float:none !important;font-size:2rem !important;margin-right:0.05rem !important; }
  .ex-carousel-col { margin-top:0 !important; }
  .ex-carousel-img  { height:260px !important;border-radius:16px !important; }
  .ex-ticker-track { gap:1.2rem !important; }
  .ex-ambient-bow { font-size:3rem !important;opacity:0.08 !important; }
  .ex-ambient-seal { transform:scale(0.6) !important; }
  .ex-pearl-string { display:none !important; }
  .ex-lace-top { height:4px !important; }
  .ex-quote-block { padding-left:1rem !important; }
  .ex-milestone-desc { font-size:0.82rem !important; line-height:1.75 !important; }
  .ex-milestone-pill { margin-bottom:1rem !important; }
  .ex-milestone-title { margin-bottom:0.7rem !important; }
}
/* ══ Milestone flip-card: height now hugs content on tablet & mobile.
   Desktop (≥1024px) keeps its original fixed-height behavior, untouched. ══ */
@media (max-width:1023px) {
  .ex-flip-scene {
    min-height:0 !important;
  }
  .ex-flip-inner {
    min-height:0 !important;
    height:auto !important;
  }
  .ex-card-front {
    position:relative !important;
    inset:auto !important;
  }
}


/* ══ NEW: luxury flower bg keyframes ══ */
@keyframes ex-bg-float-1 { 0%,100%{transform:translateY(0px) rotate(0deg);} 33%{transform:translateY(-18px) rotate(4deg);} 66%{transform:translateY(8px) rotate(-3deg);} }
@keyframes ex-bg-float-2 { 0%,100%{transform:translateY(0px) rotate(0deg) scale(1);} 50%{transform:translateY(-22px) rotate(-6deg) scale(1.04);} }
@keyframes ex-bg-float-3 { 0%,100%{transform:translateY(0px) rotate(15deg);} 40%{transform:translateY(-14px) rotate(20deg);} 80%{transform:translateY(6px) rotate(12deg);} }
@keyframes ex-shimmer-line { 0%{opacity:0.08;} 50%{opacity:0.25;} 100%{opacity:0.08;} }
@keyframes ex-bow-bg-pulse  { 0%,100%{transform:scale(1) rotate(-8deg);opacity:0.18;} 50%{transform:scale(1.06) rotate(-6deg);opacity:0.26;} }
@keyframes ex-ribbon-bg-drift { 0%,100%{transform:rotate(-12deg) translateY(0);opacity:0.16;} 50%{transform:rotate(-8deg) translateY(-10px);opacity:0.24;} }
@keyframes ex-butterfly-bg { 0%,100%{transform:translateY(0) rotate(-5deg) scaleX(1);} 25%{transform:translateY(-14px) rotate(-2deg) scaleX(-1);} 50%{transform:translateY(-8px) rotate(3deg) scaleX(-1);} 75%{transform:translateY(-18px) rotate(-4deg) scaleX(1);} }
@keyframes ex-sparkle-bg { 0%,100%{transform:scale(1) rotate(0deg);opacity:0.45;} 25%{transform:scale(1.15) rotate(90deg);opacity:0.78;} 75%{transform:scale(0.9) rotate(270deg);opacity:0.35;} }
@media (prefers-reduced-motion:reduce) {
  .ex-ticker-track,.ex-petal,.ex-pearl-string,
  .ex-ambient-seal,.ex-ambient-bow,.ex-ambient-star,
  .ex-card-back-glyph { animation:none !important; }
  .ex-flip-inner { transform:rotateY(180deg) !important;transition:none !important; }
}
`;

/* ═══════════════════════════════════════════════
   ALL ORIGINAL COMPONENTS — 100% UNTOUCHED
═══════════════════════════════════════════════ */
const milestones = [
  {
    year: "2022",
    title: "Started IT Journey",
    description:
      "Began studying Information Technology and discovered a passion for creating digital solutions through design and development.",
  },
  {
    year: "2024",
    title: "Competitions & Innovation",
    description:
      "Participated in hackathons, innovation challenges, and collaborative projects that strengthened both technical and problem-solving skills.",
  },
  {
    year: "2026",
    title: "Software Developer Intern",
    description:
      "Worked in a real-world software environment contributing to enterprise CMS development using Laravel and Next.js.",
  },
  {
    year: "Today",
    title: "Building Forward",
    description:
      "Continuing to create meaningful digital experiences while growing as a developer, collaborator, and lifelong learner.",
  },
];
const cardRotates = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-3"];
function AmbientSeal({ style }: { style: React.CSSProperties }) {
  return <div className="ex-ambient-seal" style={style}></div>;
}
function PearlString({
  top,
  left,
  count = 8,
  threadH = 12,
}: {
  top: number;
  left: string;
  count?: number;
  threadH?: number;
}) {
  return (
    <div className="ex-pearl-string" style={{ top, left }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          {i > 0 && (
            <div className="ex-pearl-thread" style={{ height: threadH }} />
          )}
          <div className="ex-pearl" />
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MILESTONE CARDS — scroll-triggered sequential flip
   Cards start face-down (back visible).
   When the grid scrolls into view, each card flips
   to front one by one, 1 second apart.
═══════════════════════════════════════════════ */

/**
 * Receives `flipped` from the parent grid observer
 * so all cards share a single IntersectionObserver.
 */
function MilestoneCard({
  item,
  index,
  flipped,
}: {
  item: (typeof milestones)[0];
  index: number;
  flipped: boolean;
}) {
  return (
    <FadeReveal delay={0.15 * index}>
      <div
        className={`ex-flip-scene ${cardRotates[index % 4]}`}
        role="img"
        aria-label={`Milestone: ${item.title}`}
      >
        {/* Delay each card's flip by index × 1 s via inline transition-delay */}
        <div
          className={`ex-flip-inner${flipped ? " flipped" : ""}`}
          style={{ transitionDelay: flipped ? `${index * 0.5}s` : "0s" }}
        >
          <div className="ex-card-face ex-card-back">
            <span className="ex-card-back-corner" aria-hidden="true">
              ✦
            </span>
            <div className="ex-card-back-glyph" aria-hidden="true">
              ☘︎
            </div>
            <span className="ex-card-back-hint">scroll to reveal</span>
          </div>
          <div className="ex-card-face ex-card-front">
            <div className="ex-front-bar" />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                className="ex-milestone-pill"
                style={{
                  display: "inline-block",
                  padding: "0.3rem 1rem",
                  borderRadius: "999px",
                  background: "rgba(236,196,195,0.28)",
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "0.52rem",
                  letterSpacing: "0.38em",
                  textTransform: "uppercase",
                  color: "#928E5E",
                  marginBottom: "1.5rem",
                }}
              >
                milestone
              </div>
              <h3
                className="ex-display ex-milestone-title"
                style={{
                  fontSize: "clamp(1.3rem,2.5vw,1.85rem)",
                  fontWeight: 900,
                  lineHeight: 1.05,
                  color: "#2e2a0e",
                  marginBottom: "1rem",
                  letterSpacing: "-0.01em",
                  textAlign: "left",
                }}
              >
                {item.title}
              </h3>
              <div className="ex-underline" />
              <p
                className="ex-milestone-desc"
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "0.88rem",
                  lineHeight: 1.9,
                  color: "#575527bb",
                }}
              >
                {item.description}
              </p>
              <div
                style={{
                  marginTop: "1.2rem",
                  paddingTop: "0.6rem",
                  borderTop: "1px solid #57552715",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: "0.52rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#928E5E",
                  }}
                >
                  {item.year}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: "0.5rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "rgba(185,125,123,0.5)",
                  }}
                >
                  memory
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeReveal>
  );
}

export default function Experience() {
  const [currentImage, setCurrentImage] = useState(0);
  const internshipImages = [
    "/images/internship/1.jpg",
    "/images/internship/2.jpg",
    "/images/internship/3.jpg",
    "/images/internship/4.jpg",
    "/images/internship/5.jpg",
  ];
  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrentImage((prev) =>
          prev === internshipImages.length - 1 ? 0 : prev + 1,
        ),
      3000,
    );
    return () => clearInterval(interval);
  }, [internshipImages.length]);
  const sectionRef = useRef<HTMLElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const internshipRef = useRef<HTMLDivElement>(null);
  /* ── NEW: ref + state for the cards grid flip trigger ── */
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const [cardsFlipped, setCardsFlipped] = useState(false);
  const [inkVis, setInkVis] = useState(false);
  const bp = useBreakpoint();
  useEffect(() => {
    if (
      !sectionRef.current ||
      !chapterRef.current ||
      !headingRef.current ||
      !timelineRef.current ||
      !internshipRef.current
    )
      return;
    const cleanup = experienceScrollAnimation(
      sectionRef.current,
      chapterRef.current,
      headingRef.current,
      timelineRef.current,
      internshipRef.current,
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
  /* ── NEW: observe cards grid, flip once when 20% visible ── */
  useEffect(() => {
    const el = cardsGridRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsFlipped(true);
          obs.disconnect(); // fire only once
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const internshipGridStyle: React.CSSProperties =
    bp === "desktop"
      ? {
          display: "grid",
          gridTemplateColumns: "1.2fr 1px 0.9fr",
          gap: "0 2rem",
          padding: "2.5rem",
          alignItems: "start",
          position: "relative",
        }
      : {
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          padding: bp === "tablet" ? "1.5rem" : "1.2rem",
          position: "relative",
        };
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: EXPERIENCE_CSS }} />
      <section
        ref={sectionRef}
        id="experience"
        className="ex-sans"
        style={{
          position: "relative",
          background: "#f7efe8",
          padding: "0 0 6rem",
          overflow: "hidden",
        }}
      >
        {/* ══ ALL ORIGINAL AMBIENT ELEMENTS — preserved exactly ══ */}
        <AmbientSeal
          style={{ top: "12%", right: "4%", transform: "rotate(-12deg)" }}
        />
        <AmbientSeal
          style={{
            top: "58%",
            left: "1.5%",
            transform: "rotate(8deg)",
            opacity: 0.1,
          }}
        />
        {bp !== "mobile" && (
          <AmbientSeal
            style={{
              bottom: "15%",
              right: "6%",
              transform: "rotate(-5deg)",
              opacity: 0.09,
            }}
          />
        )}
        <div
          className="ex-ambient-bow"
          style={{
            top: "45%",
            right: "3.5%",
            animationDuration: "8s",
            animationDelay: "4s",
            fontSize: "3rem",
          }}
        >
          ❀
        </div>
        {[
          { top: "18%", left: "14%", size: "1rem", delay: "0s", dur: "4s" },
          { top: "35%", left: "88%", size: "0.7rem", delay: "1s", dur: "6s" },
          { top: "62%", left: "22%", size: "1.2rem", delay: "2s", dur: "5s" },
          { top: "75%", left: "72%", size: "0.8rem", delay: "0.5s", dur: "7s" },
          { top: "88%", left: "45%", size: "0.6rem", delay: "3s", dur: "4.5s" },
        ].map((s, i) => (
          <div
            key={i}
            className="ex-ambient-star"
            style={{
              top: s.top,
              left: s.left,
              fontSize: s.size,
              color: "#b97d7b",
              animationDuration: s.dur,
              animationDelay: s.delay,
            }}
          >
            ✦
          </div>
        ))}

        {bp !== "mobile" && (
          <div
            className="ex-watermark"
            style={{
              top: "30%",
              left: "40%",
              fontSize: "28rem",
              color: "#b97d7b",
              transform: "rotate(-5deg)",
            }}
          >
            𓍯
          </div>
        )}
        <div ref={chapterRef} className="ex-section-num">
          02
        </div>
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
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "-5rem",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <div
            style={{
              height: "10rem",
              width: "1px",
              background: "rgba(255,249,245,0.3)",
            }}
          />
          <div style={{ fontSize: "2.2rem", color: "#FFF8F5", lineHeight: 1 }}>
            ♡
          </div>
        </div>
        <Container>
          <SectionContainer>
            <div style={{ position: "relative", zIndex: 2 }}>
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
                          color: "#928E5E",
                          marginBottom: "0.2rem",
                        }}
                      >
                        Chapter 02
                      </div>
                      <h2
                        ref={headingRef}
                        className="ex-display"
                        style={{
                          fontSize: "clamp(2.2rem,7vw,6rem)",
                          fontWeight: 900,
                          lineHeight: 0.9,
                          color: "#2e2a0e",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        Where Learning
                        <br />
                        <em style={{ color: "#b97d7b" }}>Became Real</em>
                      </h2>
                    </div>
                    <div
                      className="ex-masthead-meta"
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: "0.52rem",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "#928E5E",
                        textAlign: "right",
                      }}
                    >
                      <div>Experience Feature</div>
                      <div style={{ opacity: 0.6, marginTop: "0.15rem" }}>
                        p.02 · The Journey
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
                  className="ex-serif"
                  style={{
                    fontSize: "clamp(0.88rem,2vw,1rem)",
                    lineHeight: 1.85,
                    fontStyle: "italic",
                    color: "#575527cc",
                    maxWidth: "680px",
                    borderTop: "2px solid #b97d7b",
                    borderBottom: "1px solid #57552720",
                    padding: "0.7rem 0",
                    marginBottom: "3.5rem",
                  }}
                >
                  The transition from classroom concepts to collaborative
                  software development environments shaped how I approach
                  technology today.
                </p>
              </FadeReveal>
              {/* Timeline lg */}
              <FadeReveal delay={0.3}>
                <div
                  ref={timelineRef}
                  style={{
                    display: "none",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "3rem",
                    position: "relative",
                  }}
                  className="lg:flex"
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: "50%",
                      height: "10px",
                      transform: "translateY(-50%)",
                      borderRadius: "999px",
                      background:
                        "linear-gradient(to right,#FDC3A1,#EA7B7B,#9E3B3B)",
                      opacity: 0.45,
                    }}
                  />
                  {milestones.map((item, index) => (
                    <div
                      key={item.year}
                      style={{
                        position: "relative",
                        zIndex: 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          width: "2rem",
                          height: "2rem",
                          borderRadius: "50%",
                          background: "#fffaf6",
                          border: "3px solid #B97D7B",
                          boxShadow: "0 4px 16px rgba(185,125,123,0.25)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "default",
                        }}
                      >
                        <div
                          style={{
                            width: "1rem",
                            height: "1rem",
                            borderRadius: "50%",
                            background: "#ECC4C3",
                          }}
                        />
                      </motion.div>
                      <div
                        style={{
                          marginTop: "1.25rem",
                          padding: "0.4rem 1rem",
                          borderRadius: "999px",
                          background: "#fffaf6",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                          transform: "rotate(-3deg)",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "'DM Sans',sans-serif",
                            fontSize: "0.58rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.35em",
                            color: "#928E5E",
                          }}
                        >
                          {item.year}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeReveal>
              {/* Hint label — updated copy */}
              <FadeReveal delay={0.32}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "1.8rem",
                  }}
                ></div>
              </FadeReveal>
              {/* Milestone cards — ref added here for the observer */}
              <div
                ref={cardsGridRef}
                className="ex-cards-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    bp === "mobile"
                      ? "1fr"
                      : "repeat(auto-fit,minmax(220px,1fr))",
                  gap: bp === "mobile" ? "2rem" : "1.5rem",
                  marginBottom: "5rem",
                }}
              >
                {milestones.map((item, index) => (
                  <MilestoneCard
                    key={item.year}
                    item={item}
                    index={index}
                    flipped={cardsFlipped}
                  />
                ))}
              </div>
              {/* Internship feature */}
              <FadeReveal delay={0.5}>
                <div ref={internshipRef} className="ex-feature">
                  <div
                    className="ex-internship-header"
                    style={{
                      borderBottom: "3px solid #575527",
                      padding: "1.5rem 2.5rem 0.5rem",
                      marginBottom: 0,
                    }}
                  >
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
                            fontSize: "0.5rem",
                            letterSpacing: "0.35em",
                            textTransform: "uppercase",
                            color: "#928e5e",
                            marginBottom: "0.15rem",
                          }}
                        >
                          Featured Experience · Internship
                        </div>
                        <div
                          className="ex-display"
                          style={{
                            fontSize: "clamp(1.2rem,3vw,2.2rem)",
                            fontWeight: 900,
                            color: "#2e2a0e",
                            lineHeight: 0.95,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          Internship <em style={{ color: "#b97d7b" }}>Diary</em>
                        </div>
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: "0.5rem",
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          color: "#928e5e",
                          textAlign: "right",
                        }}
                      >
                        <div>Cocogen Insurance</div>
                        <div style={{ opacity: 0.6, marginTop: "0.1rem" }}>
                          2025–2026 · Manila, PH
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        borderTop: "1px solid #57552720",
                        marginTop: "0.4rem",
                      }}
                    />
                  </div>
                  <div
                    className="ex-internship-grid"
                    style={internshipGridStyle}
                  >
                    <div
                      className="ex-display"
                      style={{
                        position: "absolute",
                        top: 0,
                        right: "1rem",
                        fontSize: "clamp(5rem,10vw,10rem)",
                        fontWeight: 900,
                        color: "rgba(236,196,195,0.18)",
                        lineHeight: 1,
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                    >
                      01
                    </div>
                    <motion.div
                      animate={{ y: [0, -8, 0], rotate: [0, -2, 0] }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        position: "absolute",
                        top: "2rem",
                        left: "2rem",
                        fontSize: "1.4rem",
                        zIndex: 2,
                      }}
                    >
                      ✿
                    </motion.div>
                    {/* LEFT content */}
                    <div
                      className="ex-internship-left"
                      style={{
                        position: "relative",
                        zIndex: 1,
                        paddingLeft: bp === "desktop" ? "2.5rem" : "0",
                      }}
                    >
                      <p
                        className="ex-serif"
                        style={{
                          fontSize: "clamp(0.82rem,1.8vw,0.88rem)",
                          lineHeight: 1.75,
                          color: "#575527bb",
                          borderTop: "2px solid #b97d7b",
                          borderBottom: "1px solid #57552720",
                          padding: "0.6rem 0",
                          marginBottom: "1rem",
                          fontStyle: "italic",
                        }}
                      >
                        Real-world enterprise development — from CMS
                        architecture to collaborative team workflows.
                      </p>
                      <p
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: "0.58rem",
                          letterSpacing: "0.3em",
                          textTransform: "uppercase",
                          color: "#B97D7B",
                          marginBottom: "0.5rem",
                        }}
                      >
                        Cocogen Insurance
                      </p>
                      <h3
                        className="ex-display"
                        style={{
                          fontSize: "clamp(1.4rem,3vw,2.4rem)",
                          fontWeight: 900,
                          lineHeight: 1.0,
                          color: "#2e2a0e",
                          marginBottom: "0.8rem",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        Software Developer{" "}
                        <em style={{ color: "#b97d7b" }}>Intern</em>
                      </h3>
                      <div
                        style={{
                          width: "5rem",
                          height: "4px",
                          borderRadius: "999px",
                          background: "#ECC4C3",
                          marginBottom: "1.2rem",
                        }}
                      />
                      <p
                        style={{
                          fontSize: "clamp(0.82rem,1.7vw,0.88rem)",
                          lineHeight: 2,
                          textAlign: "justify",
                          hyphens: "auto",
                          color: "#575527dd",
                          marginBottom: "1rem",
                        }}
                      >
                        <span
                          className="ex-display ex-drop-cap"
                          style={{
                            float: "left",
                            fontSize: "3rem",
                            lineHeight: 0.78,
                            marginRight: "0.06rem",
                            marginTop: "0.1rem",
                            color: "#b97d7b",
                            fontWeight: 900,
                          }}
                        >
                          D
                        </span>
                        uring my internship, I contributed to enterprise CMS
                        development, authentication workflows, API simulations,
                        responsive interfaces, debugging processes, and
                        collaborative software development practices using
                        Laravel and Next.js.
                      </p>
                      <p
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: "0.78rem",
                          lineHeight: 1.9,
                          color: "#575527aa",
                          marginBottom: "1.5rem",
                          clear: "both",
                        }}
                      >
                        A formative chapter where I learned that{" "}
                        <span
                          style={{
                            position: "relative",
                            display: "inline-block",
                            color: "#b97d7b",
                            fontWeight: 600,
                          }}
                        >
                          real development is collaboration
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
                              className={`ex-ink-path${inkVis ? " drawn" : ""}`}
                              d="M2 7 C50 12,100 2,150 7 S190 12,198 7"
                              stroke="#928e5e"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                          </svg>
                        </span>{" "}
                        — not just code.
                      </p>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.5rem",
                          marginBottom: "1.5rem",
                        }}
                      >
                        {[
                          "Laravel",
                          "Next.js",
                          "Authentication",
                          "CRUD",
                          "REST APIs",
                          "Postman",
                          "Git",
                          "CMS Development",
                        ].map((skill) => (
                          <motion.span
                            key={skill}
                            whileHover={{ y: -2, scale: 1.06 }}
                            transition={{ duration: 0.2 }}
                            style={{
                              fontFamily: "'DM Sans',sans-serif",
                              fontSize: "0.7rem",
                              padding: "0.4rem 1rem",
                              borderRadius: "999px",
                              background: "#FFFFFF",
                              border: "1px solid #F0E6DB",
                              color: "#575527",
                              boxShadow: "0 2px 8px rgba(89,56,56,0.06)",
                              cursor: "default",
                            }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                      <div
                        style={{
                          borderLeft: "4px solid #b97d7b",
                          paddingLeft: "1rem",
                          background: "rgba(236,196,195,0.1)",
                          padding: "0.85rem 1rem",
                          marginBottom: "1.4rem",
                        }}
                      >
                        <p
                          className="ex-display"
                          style={{
                            fontSize: "clamp(0.88rem,2vw,0.95rem)",
                            fontStyle: "italic",
                            color: "#2e2a0e",
                            lineHeight: 1.5,
                          }}
                        >
                          &ldquo;Every day was a lesson I couldn&rsquo;t find in
                          any classroom.&rdquo;
                        </p>
                      </div>
                      <a
                        href="/resume/MaMilagrosAbadinas_Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ex-cta-fill"
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
                        <span>View Full Resume</span>
                      </a>
                    </div>
                    {bp === "desktop" && (
                      <div
                        className="ex-internship-rule"
                        style={{
                          background: "#57552722",
                          alignSelf: "stretch",
                        }}
                      />
                    )}
                    {/* RIGHT carousel */}
                    <div
                      className="ex-carousel-col"
                      style={{ position: "relative" }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "#ecc4c3",
                          transform: "rotate(-3deg) scale(1.02)",
                          borderRadius: "24px",
                          zIndex: 0,
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          border: "1px solid #575527",
                          transform: "rotate(2deg) scale(1.01)",
                          borderRadius: "24px",
                          zIndex: 0,
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "-10px",
                          left: "50%",
                          transform: "translateX(-50%) rotate(-2deg)",
                          width: "80px",
                          height: "16px",
                          background: "rgba(236,196,195,0.62)",
                          backgroundImage:
                            "repeating-linear-gradient(90deg,transparent,transparent 8px,rgba(255,255,255,0.2) 8px,rgba(255,255,255,0.2) 10px)",
                          zIndex: 5,
                        }}
                      />
                      <div
                        className="ex-carousel-img"
                        style={{
                          position: "relative",
                          zIndex: 1,
                          height:
                            bp === "mobile"
                              ? "260px"
                              : bp === "tablet"
                                ? "300px"
                                : "380px",
                          borderRadius: "24px",
                          overflow: "hidden",
                          background: "#F7F2ED",
                        }}
                      >
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentImage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.9 }}
                            style={{ position: "absolute", inset: 0 }}
                          >
                            <Image
                              src={internshipImages[currentImage]}
                              alt={`Internship image ${currentImage + 1}`}
                              fill
                              style={{ objectFit: "cover" }}
                              sizes="(max-width:640px) 100vw,(max-width:1024px) 80vw,500px"
                            />
                          </motion.div>
                        </AnimatePresence>
                        <div
                          style={{
                            position: "absolute",
                            top: "1rem",
                            left: "1rem",
                            padding: "0.35rem 0.9rem",
                            borderRadius: "999px",
                            background: "rgba(255,255,255,0.82)",
                            backdropFilter: "blur(4px)",
                            fontFamily: "'DM Sans',sans-serif",
                            fontSize: "0.52rem",
                            letterSpacing: "0.28em",
                            textTransform: "uppercase",
                            color: "#575527",
                            zIndex: 3,
                          }}
                        >
                          Internship Diary
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            bottom: "1rem",
                            right: "1rem",
                            padding: "0.35rem 0.9rem",
                            borderRadius: "999px",
                            background: "rgba(255,255,255,0.82)",
                            backdropFilter: "blur(4px)",
                            fontFamily: "'DM Sans',sans-serif",
                            fontSize: "0.58rem",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "#575527",
                            zIndex: 3,
                          }}
                        >
                          {String(currentImage + 1).padStart(2, "0")} / 05
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "0.5rem",
                          marginTop: "1rem",
                          position: "relative",
                          zIndex: 2,
                        }}
                      >
                        {internshipImages.map((_, i) => (
                          <button
                            key={i}
                            className={`ex-dot${i === currentImage ? " active" : ""}`}
                            onClick={() => setCurrentImage(i)}
                            aria-label={`Go to image ${i + 1}`}
                          />
                        ))}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: "0.54rem",
                          color: "#928e5e",
                          letterSpacing: "0.12em",
                          marginTop: "0.6rem",
                          paddingTop: "0.4rem",
                          borderTop: "1px solid #57552720",
                          fontStyle: "italic",
                          textAlign: "center",
                          position: "relative",
                          zIndex: 2,
                        }}
                      >
                        Cocogen Insurance · Software Development Internship ·
                        January - April 2026
                      </div>
                    </div>
                  </div>
                </div>
              </FadeReveal>
              {/* Quote */}
              <FadeReveal delay={0.65}>
                <div
                  className="ex-quote-block"
                  style={{
                    marginTop: "4rem",
                    borderLeft: "4px solid #b97d7b",
                    paddingLeft: "1.5rem",
                  }}
                >
                  <p
                    className="ex-display"
                    style={{
                      fontSize: "clamp(1.1rem,2.5vw,1.7rem)",
                      fontStyle: "italic",
                      color: "#575527cc",
                      lineHeight: 1.5,
                    }}
                  >
                    &ldquo;Every experience is a page in the story — written in
                    code, shaped by people, remembered in work.&rdquo;
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
