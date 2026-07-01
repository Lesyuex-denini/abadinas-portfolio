"use client";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useTransform,
  useScroll,
  animate,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import FadeReveal from "@/components/motion/FadeReveal";
import { useArchive } from "@/context/ArchiveContext";

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

/* ─── GLOBAL STYLES (all original + responsive additions) ─── */
const HERO_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

.mag-hero   { font-family:'DM Sans',sans-serif; }
.mag-display{ font-family:'Playfair Display',serif; }
.mag-serif  { font-family:'Libre Baskerville',serif; }

@keyframes mag-ticker {
  from { transform:translateX(0); }
  to   { transform:translateX(-50%); }
}
@keyframes mag-cursor-blink { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes mag-float-slow {
  0%,100%{transform:translateY(0) rotate(var(--rot,0deg))}
  50%{transform:translateY(-12px) rotate(var(--rot,0deg))}
}
@keyframes mag-stamp-in {
  0%{transform:scale(3) rotate(-15deg);opacity:0}
  70%{transform:scale(0.95) rotate(3deg);opacity:1}
  100%{transform:scale(1) rotate(2deg);opacity:1}
}
@keyframes shimmer {
  0%{background-position:200% center}
  100%{background-position:-200% center}
}

.mag-ticker-track {
  animation:mag-ticker 28s linear infinite;
  display:flex;
  gap:2rem;
  white-space:nowrap;
  width:max-content;
}
.mag-ticker-track:hover { animation-play-state:paused; }
.mag-float { animation:mag-float-slow var(--fdur,6s) var(--fdelay,0s) ease-in-out infinite; }

.mag-rip-edge {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 10' preserveAspectRatio='none'%3E%3Cpath d='M0 0 Q5 10 10 5 Q15 0 20 8 Q25 2 30 7 Q35 1 40 6 Q45 0 50 8 Q55 2 60 7 Q65 0 70 5 Q75 2 80 8 Q85 1 90 6 Q95 2 100 7 Q105 0 110 8 Q115 2 120 6 Q125 1 130 8 Q135 2 140 5 Q145 0 150 8 Q155 2 160 6 Q165 1 170 8 Q175 0 180 5 Q185 2 190 8 Q195 1 200 5 L200 10 L0 10 Z' fill='black'/%3E%3C/svg%3E");
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 10' preserveAspectRatio='none'%3E%3Cpath d='M0 0 Q5 10 10 5 Q15 0 20 8 Q25 2 30 7 Q35 1 40 6 Q45 0 50 8 Q55 2 60 7 Q65 0 70 5 Q75 2 80 8 Q85 1 90 6 Q95 2 100 7 Q105 0 110 8 Q115 2 120 6 Q125 1 130 8 Q135 2 140 5 Q145 0 150 8 Q155 2 160 6 Q165 1 170 8 Q175 0 180 5 Q185 2 190 8 Q195 1 200 5 L200 10 L0 10 Z' fill='black'/%3E%3C/svg%3E");
  -webkit-mask-size:100% 100%;
  mask-size:100% 100%;
}

/* ── CTAs ── */
.mag-cta-fill {
  position:relative;
  background:#575527;
  color:#fff9f5;
  border:none;
  font-family:'DM Sans',sans-serif;
  font-size:0.68rem;
  font-weight:600;
  letter-spacing:0.22em;
  text-transform:uppercase;
  padding:0.9rem 2rem;
  cursor:pointer;
  overflow:hidden;
  transition:transform 0.2s,box-shadow 0.2s;
  text-decoration:none;
  display:inline-flex;
  align-items:center;
  gap:0.6rem;
  width:100%;
  justify-content:center;
}
.mag-cta-fill::after {
  content:'';position:absolute;inset:0;
  background:#b97d7b;
  transform:scaleX(0);transform-origin:left;
  transition:transform 0.35s cubic-bezier(.4,0,.2,1);
  z-index:0;
}
.mag-cta-fill:hover::after { transform:scaleX(1); }
.mag-cta-fill:hover { transform:translateY(-2px);box-shadow:0 8px 24px rgba(89,56,56,0.2); }
.mag-cta-fill > * { position:relative;z-index:1; }

.mag-cta-outline {
  font-family:'DM Sans',sans-serif;
  font-size:0.68rem;
  font-weight:500;
  letter-spacing:0.18em;
  text-transform:uppercase;
  color:#575527;
  text-decoration:none;
  padding-bottom:2px;
  border-bottom:1px solid currentColor;
  display:inline-flex;
  align-items:center;
  gap:0.5rem;
  transition:color 0.2s,gap 0.2s;
  justify-content:center;
}
.mag-cta-outline:hover { color:#b97d7b;gap:0.85rem; }

/* ── Skill bars ── */
.bar-fill {
  position:absolute;inset:0;
  background:#b97d7b;
  transform-origin:left;
  transform:scaleX(0);
  transition:transform 1.2s cubic-bezier(.4,0,.2,1);
}
.bar-fill.animated { transform:scaleX(1); }

/* ── Cover image ── */
.mag-cover-col  { position:relative;overflow:visible; }
.mag-cover-frame {
  position:relative;
  outline:10px solid rgba(255,249,245,0.92);
  outline-offset:0px;
  box-shadow:
    0 0 0 12px rgba(255,249,245,0.92),
    0 0 0 13px rgba(185,125,123,0.35),
    0 32px 80px rgba(89,56,56,0.28),
    0 8px 24px rgba(89,56,56,0.15);
  transition:box-shadow 0.5s ease;
}
.mag-cover-frame:hover {
  box-shadow:
    0 0 0 12px rgba(255,249,245,0.97),
    0 0 0 14px rgba(185,125,123,0.5),
    0 48px 100px rgba(89,56,56,0.35),
    0 12px 32px rgba(89,56,56,0.2);
}
.mag-cover-overlay-text {
  position:absolute;
  bottom:0;left:0;right:0;
  background:linear-gradient(to top,rgba(47,32,22,0.88) 0%,rgba(47,32,22,0.55) 45%,transparent 100%);
  padding:2.5rem 1.4rem 1.4rem;
  z-index:3;
}
.mag-cover-badge {
  position:absolute;
  top:-18px;right:-18px;
  width:80px;height:80px;
  border-radius:50%;
  background:rgba(247,239,232,0.97);
  border:2.5px solid #b97d7b;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  z-index:10;
  box-shadow:0 4px 18px rgba(89,56,56,0.2);
}
.mag-coverline-tag {
  display:inline-block;
  background:#b97d7b;
  color:#fff9f5;
  font-family:'DM Sans',sans-serif;
  font-size:0.48rem;
  letter-spacing:0.3em;
  text-transform:uppercase;
  padding:0.22rem 0.65rem;
  margin-bottom:0.5rem;
}

@keyframes mag-parallax-drift {
  0%,100%{transform:translateY(0) scale(1.08);}
  50%{transform:translateY(-18px) scale(1.08);}
}
.mag-cover-img-inner {
  animation:mag-parallax-drift 14s ease-in-out infinite;
  will-change:transform;
}

/* ── Sidebar ── */
.mag-sidebar-grid {
  display:flex;
  flex-direction:column;
  gap:1.1rem;
}

/* ══════════════════════════════════════
   RESPONSIVE OVERRIDES
══════════════════════════════════════ */

/* ── Tablet (640–1023px): 2-column layout ── */
@media (min-width:640px) and (max-width:1023px) {
  .mag-editorial-grid {
    display:grid !important;
    grid-template-columns:1fr 1px 1.2fr !important;
    gap:0 1.4rem !important;
  }
  .mag-col-rule-2, .mag-right-col { display:none !important; }
  .mag-sidebar-grid {
    display:grid !important;
    grid-template-columns:1fr 1fr !important;
    gap:0.85rem !important;
    margin-top:2rem !important;
  }
  .mag-sidebar-below {
    display:block !important;
    margin-top:2rem;
    padding-top:1.5rem;
    border-top:3px solid #575527;
  }
  .mag-cover-badge {
    top:-12px;right:-12px;
    width:64px;height:64px;
  }
  .mag-drop-cap {
    font-size:2.6rem !important;
  }
}

/* ── Mobile (< 640px): single column, image on top ── */
@media (max-width:639px) {
  /* masthead */
  .mag-masthead-right { display:none !important; }
  .mag-masthead-title { font-size:clamp(1.8rem,10vw,3rem) !important; }

  /* editorial grid → stack */
  .mag-editorial-grid {
    display:flex !important;
    flex-direction:column !important;
    gap:2rem !important;
  }
  /* hide column rules */
  .mag-col-rule-1, .mag-col-rule-2 { display:none !important; }
  /* right col hidden, sidebar shown below */
  .mag-right-col { display:none !important; }
  /* left col ordering: image first */
  .mag-left-col  { order:2 !important; }
  .mag-center-col{ order:1 !important; }

  /* image frame — remove heavy outline on mobile */
  .mag-cover-frame {
    outline:6px solid rgba(255,249,245,0.92) !important;
    box-shadow:
      0 0 0 8px rgba(255,249,245,0.92),
      0 0 0 9px rgba(185,125,123,0.3),
      0 16px 40px rgba(89,56,56,0.22) !important;
  }
  .mag-cover-badge {
    top:-10px;right:-10px;
    width:56px;height:56px;
  }
  .mag-cover-badge span { font-size:0.42rem !important; }

  /* floating stickers — keep on-screen */
  .mag-rose-sticker { left:-2% !important;top:-4% !important; }
  .mag-float-tag    { display:none !important; }

  /* drop-cap — disable float on mobile */
  .mag-drop-cap { float:none !important;font-size:2.2rem !important;margin-right:0.05rem !important; }

  /* CTAs — already full width via CSS above */
  /* Typewriter section */
  .mag-typewriter-block { margin:0.8rem 0 !important; }

  /* sidebar below on mobile */
  .mag-sidebar-below {
    display:block !important;
    margin-top:1.5rem;
    padding-top:1.2rem;
    border-top:3px solid #575527;
  }
  .mag-sidebar-grid {
    display:grid !important;
    grid-template-columns:1fr 1fr !important;
    gap:0.75rem !important;
  }

  /* footer */
  .mag-footer-inner { flex-direction:column !important;gap:0.15rem !important;text-align:center !important; }
}

@media(prefers-reduced-motion:reduce){
  .mag-ticker-track,.mag-float,.mag-cover-img-inner{ animation:none!important; }
  .bar-fill{ transition:none!important; }
}
`;

/* ─── TICKER (unchanged) ─── */
function Ticker() {
  const items = [
    "Full-Stack Developer",
    "✦",
    "UI/UX Design",
    "✦",
    "Laravel & Next.js",
    "✦",
    "Open for Opportunities",
    "✦",
    "Magna Cum Laude Graduate",
    "✦",
    "CMS Development",
    "✦",
    "Manila, Philippines",
    "✦",
    "Est. 2026",
    "✦",
  ];
  const doubled = [...items, ...items];
  return (
    <div
      style={{
        overflow: "hidden",
        borderTop: "1px solid #57552720",
        borderBottom: "1px solid #57552720",
        background: "#eeddd7",
        padding: "0.55rem 0",
      }}
    >
      <div className="mag-ticker-track">
        {doubled.map((t, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.58rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: t === "✦" ? "#b97d7b" : "#928e5e",
              fontWeight: t === "✦" ? 400 : 500,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── TYPEWRITER (unchanged) ─── */
function Typewriter({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[idx];
    let t: NodeJS.Timeout;
    if (!deleting && displayed.length < word.length)
      t = setTimeout(
        () => setDisplayed(word.slice(0, displayed.length + 1)),
        80,
      );
    else if (!deleting && displayed.length === word.length)
      t = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    else {
      setDeleting(false);
      setIdx((idx + 1) % words.length);
    }
    return () => clearTimeout(t);
  }, [displayed, deleting, idx, words]);
  return (
    <span>
      {displayed}
      <span
        style={{
          borderRight: "2px solid #b97d7b",
          marginLeft: 1,
          animation: "mag-cursor-blink 1s step-end infinite",
        }}
      />
    </span>
  );
}

/* ─── SKILL BAR (unchanged) ─── */
function SkillBar({
  skill,
  level,
  delay = 0,
}: {
  skill: string;
  level: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setAnimated(true);
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontFamily: "'DM Sans',sans-serif",
          fontSize: "0.6rem",
          color: "#575527",
          marginBottom: "0.18rem",
        }}
      >
        <span>{skill}</span>
        <span style={{ color: "#928e5e" }}>{level}%</span>
      </div>
      <div
        style={{
          height: "2px",
          background: "#57552715",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className={`bar-fill${animated ? " animated" : ""}`}
          style={{ width: `${level}%`, transitionDelay: `${delay}s` }}
        />
      </div>
    </div>
  );
}

/* ─── SIDEBAR BLOCKS (extracted so they can be placed in multiple positions) ─── */
function SidebarContents() {
  return (
    <div className="mag-sidebar-grid">
      {/* This Issue */}
      <FadeReveal delay={0.48}>
        <div
          style={{
            background: "#575527",
            color: "#fff9f5",
            padding: "0.85rem",
          }}
        >
          <div
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.52rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              opacity: 0.65,
              marginBottom: "0.5rem",
            }}
          >
            This Issue
          </div>
          {[
            { ch: "01", title: "About" },
            { ch: "02", title: "Experience" },
            { ch: "03", title: "Services" },
            { ch: "04", title: "Projects" },
            { ch: "05", title: "Contact" },
          ].map(({ ch, title }) => (
            <div
              key={ch}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.32rem 0",
                borderBottom: "1px solid rgba(255,249,245,0.1)",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.07em",
              }}
            >
              <span style={{ opacity: 0.45, fontSize: "0.52rem" }}>{ch}</span>
              <span>{title}</span>
            </div>
          ))}
        </div>
      </FadeReveal>

      {/* Expertise bars */}
      <FadeReveal delay={0.6}>
        <div style={{ border: "1px solid #57552728", padding: "0.85rem" }}>
          <div
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.52rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#928e5e",
              marginBottom: "0.65rem",
              borderBottom: "1px solid #57552718",
              paddingBottom: "0.35rem",
            }}
          >
            Expertise
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.48rem" }}
          >
            {[
              { skill: "Laravel & PHP", level: 88, d: 0 },
              { skill: "Next.js / React", level: 85, d: 0.1 },
              { skill: "UI / UX Design", level: 80, d: 0.2 },
              { skill: "TypeScript", level: 75, d: 0.3 },
              { skill: "MySQL & APIs", level: 82, d: 0.4 },
            ].map(({ skill, level, d }) => (
              <SkillBar key={skill} skill={skill} level={level} delay={d} />
            ))}
          </div>
        </div>
      </FadeReveal>

      {/* Quote */}
      <FadeReveal delay={0.74}>
        <div
          style={{
            background: "#ecc4c3",
            padding: "0.9rem",
            position: "relative",
          }}
        >
          <div
            className="mag-display"
            style={{
              fontSize: "2.8rem",
              lineHeight: 0.8,
              color: "#b97d7b",
              marginBottom: "0.25rem",
              opacity: 0.55,
            }}
          >
            "
          </div>
          <p
            className="mag-serif"
            style={{
              fontSize: "0.78rem",
              lineHeight: 1.7,
              color: "#575527",
              fontStyle: "italic",
            }}
          >
            I build with purpose, grow with intention, and create to make a
            difference.
          </p>
          <div
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.52rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#928e5e",
              marginTop: "0.55rem",
            }}
          >
            — Mila Abadinas
          </div>
        </div>
      </FadeReveal>

      {/* Cum Laude */}
      <FadeReveal delay={0.86}>
        <div
          style={{
            border: "2px solid #575527",
            padding: "0.85rem",
            textAlign: "center",
          }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#b97d7b"
            strokeWidth="1.5"
            style={{ margin: "0 auto 0.45rem", display: "block" }}
          >
            <circle cx="12" cy="8" r="6" />
            <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
          </svg>
          <div
            className="mag-display"
            style={{
              fontSize: "1.15rem",
              fontWeight: 700,
              color: "#2e2a0e",
              marginBottom: "0.18rem",
            }}
          >
            Magna Cum Laude
          </div>
          <div
            style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.56rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#928e5e",
            }}
          >
            BS Information Technology
          </div>
        </div>
      </FadeReveal>
    </div>
  );
}

/* ═══════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════ */
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const coverColRef = useRef<HTMLDivElement>(null);
  const { openArchive } = useArchive();
  const bp: "mobile" | "tablet" | "desktop" = "desktop";

  /* Scroll-driven parallax */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgParallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const imgParallaxSc = useTransform(scrollYProgress, [0, 1], [1.08, 1.14]);
  const colParallaxY = useTransform(scrollYProgress, [0, 1], ["0px", "60px"]);

  /* ── Responsive grid column config ── */
  const gridStyle: React.CSSProperties =
    bp === "desktop"
      ? {
          display: "grid",
          gridTemplateColumns: "1fr 1px 1.65fr 1px 1fr",
          gap: "0 1.6rem",
          alignItems: "start",
        }
      : bp === "tablet"
        ? {
            display: "grid",
            gridTemplateColumns: "1fr 1px 1.2fr",
            gap: "0 1.4rem",
            alignItems: "start",
          }
        : { display: "flex", flexDirection: "column", gap: "2rem" };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HERO_CSS }} />
      <section
        ref={heroRef}
        className="mag-hero"
        style={{
          position: "relative",
          minHeight: "100vh",
          background: "#f7efe8",
          overflow: "hidden",
        }}
      >
        {/* ── MASTHEAD ── */}
        <div
          style={{
            padding: "1.2rem clamp(1rem,5vw,4rem) 0.5rem",
            borderBottom: "3px solid #575527",
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
                  fontSize: "0.52rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#928e5e",
                  marginBottom: "0.2rem",
                }}
              >
                Vol. I, No. 1 · Established 2026
              </div>
              <div
                className="mag-display mag-masthead-title"
                style={{
                  fontSize: "clamp(2rem,7vw,5.5rem)",
                  fontWeight: 900,
                  letterSpacing: "0.08em",
                  color: "#2e2a0e",
                  lineHeight: 0.9,
                  textTransform: "uppercase",
                }}
              >
                Portfolio
              </div>
            </div>
            <div className="mag-masthead-right" style={{ textAlign: "right" }}>
              <div
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "0.52rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#928e5e",
                }}
              >
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "0.52rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#928e5e",
                  marginTop: "0.15rem",
                }}
              >
                Manila, Philippines · Free
              </div>
            </div>
          </div>
          <div
            style={{ marginTop: "0.4rem", borderTop: "1px solid #57552730" }}
          />
        </div>

        {/* ── TICKER ── */}
        <Ticker />

        {/* ── EDITORIAL GRID ── */}
        <div
          style={{
            padding: "1.5rem clamp(1rem,5vw,4rem)",
            maxWidth: "1440px",
            margin: "0 auto",
          }}
        >
          <div className="mag-editorial-grid" style={gridStyle}>
            {/* ── LEFT COL ── */}
            <div ref={leftContentRef} className="mag-left-col">
              <FadeReveal delay={0.3}>
                <div
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: "0.55rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#928e5e",
                    marginBottom: "0.6rem",
                    borderBottom: "1px solid #57552720",
                    paddingBottom: "0.4rem",
                  }}
                >
                  ✦ Cover Story
                </div>
              </FadeReveal>
              <FadeReveal delay={0.42}>
                <h1
                  ref={headingRef}
                  className="mag-display"
                  style={{
                    fontSize: "clamp(1.8rem,4.2vw,3.4rem)",
                    fontWeight: 900,
                    lineHeight: 1.0,
                    color: "#2e2a0e",
                    marginBottom: "0.8rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  I design
                  <br />
                  <em style={{ color: "#b97d7b" }}>and build</em>
                  <br />
                  with intention
                </h1>
              </FadeReveal>
              <FadeReveal delay={0.54}>
                <p
                  className="mag-serif"
                  style={{
                    fontSize: "0.82rem",
                    lineHeight: 1.8,
                    color: "#575527cc",
                    borderTop: "2px solid #b97d7b",
                    borderBottom: "1px solid #57552720",
                    padding: "0.65rem 0",
                    marginBottom: "0.85rem",
                    fontStyle: "italic",
                  }}
                >
                  "It should communicate, simplify, and leave impact."
                </p>
              </FadeReveal>
              <FadeReveal delay={0.62}>
                <div
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: "0.58rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#575527",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    flexWrap: "wrap",
                  }}
                >
                  <span>By Mila Abadinas</span>
                  <span style={{ color: "#b97d7b" }}>·</span>
                  <span style={{ color: "#928e5e" }}>
                    IT Graduate · Developer
                  </span>
                </div>
              </FadeReveal>
              <FadeReveal delay={0.72}>
                <div ref={paragraphRef}>
                  <p
                    style={{
                      fontSize: "0.86rem",
                      lineHeight: 1.85,
                      color: "#575527dd",
                      marginBottom: "0.8rem",
                      textAlign: "justify",
                      hyphens: "auto",
                    }}
                  >
                    <span
                      className="mag-display mag-drop-cap"
                      style={{
                        float: "left",
                        fontSize: "3.4rem",
                        lineHeight: 0.75,
                        marginRight: "0.08rem",
                        marginTop: "0.08rem",
                        color: "#b97d7b",
                        fontWeight: 900,
                      }}
                    >
                      F
                    </span>
                    resh Graduate in Information Technology specializing in{" "}
                    <strong style={{ color: "#b97d7b", fontWeight: 600 }}>
                      full-stack web development
                    </strong>
                    , modern frontend experiences, and scalable CMS solutions.
                  </p>
                  <p
                    style={{
                      fontSize: "0.83rem",
                      lineHeight: 1.85,
                      color: "#575527bb",
                      textAlign: "justify",
                      hyphens: "auto",
                      clear: "both",
                    }}
                  >
                    From hackathons to real-world development environments,
                    great software must communicate and leave a lasting
                    impression.
                  </p>
                </div>
              </FadeReveal>
              <FadeReveal delay={0.82}>
                <div
                  className="mag-typewriter-block"
                  style={{
                    margin: "1.1rem 0",
                    padding: "0.75rem 0",
                    borderTop: "3px solid #575527",
                    borderBottom: "1px solid #57552730",
                  }}
                >
                  <p
                    className="mag-display"
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      fontStyle: "italic",
                      color: "#2e2a0e",
                      lineHeight: 1.4,
                    }}
                  >
                    Now building:{" "}
                    <span style={{ color: "#b97d7b" }}>
                      <Typewriter
                        words={[
                          "meaningful UIs",
                          "scalable backends",
                          "CMS platforms",
                          "digital experiences",
                        ]}
                      />
                    </span>
                  </p>
                </div>
              </FadeReveal>
              <FadeReveal delay={0.92}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    marginTop: "1rem",
                  }}
                >
                  <Link href="/projects" className="mag-cta-fill">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                    <span>View Projects</span>
                  </Link>
                  <Link href="/contact" className="mag-cta-outline">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    Let&rsquo;s Connect
                  </Link>
                </div>
              </FadeReveal>
              <FadeReveal delay={1.02}>
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    marginTop: "1.2rem",
                    paddingTop: "0.7rem",
                    borderTop: "1px solid #57552720",
                    alignItems: "center",
                  }}
                >
                  {[
                    {
                      href: "https://linkedin.com/in/mila-abadinas-80951127b",
                      title: "LinkedIn",
                    },
                    { href: "https://github.com/", title: "GitHub" },
                  ].map(({ href, title }) => (
                    <a
                      key={title}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: "0.58rem",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#575527",
                        textDecoration: "none",
                        borderBottom: "1px solid #57552750",
                        transition: "color 0.2s,border-color 0.2s",
                        paddingBottom: "1px",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          "#b97d7b";
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "#b97d7b";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color =
                          "#575527";
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "#57552750";
                      }}
                    >
                      {title}
                    </a>
                  ))}
                </div>
              </FadeReveal>

              {/* ── SIDEBAR BELOW LEFT COL on mobile/tablet ── */}
              <div className="mag-sidebar-below" style={{ display: "none" }}>
                <SidebarContents />
              </div>
            </div>

            {/* ── COLUMN RULE 1 ── */}
            <div
              className="mag-col-rule-1"
              style={{ background: "#57552725", alignSelf: "stretch" }}
            />

            {/* ── CENTER COL: PARALLAX MAGAZINE COVER IMAGE ── */}
            <motion.div
              ref={coverColRef}
              className="mag-cover-col mag-center-col"
              style={{ y: bp === "desktop" ? colParallaxY : "0px" }}
            >
              <motion.div
                ref={imageRef}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.0,
                  delay: 0.2,
                  ease: [0.4, 0, 0.2, 1],
                }}
                style={{ position: "relative" }}
              >
                {/* Decorative offset cards */}
                <motion.div
                  animate={{ rotate: [3, 3.8, 3], x: [0, 3, 0] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg,#ecc4c3,#d4a8a6)",
                    top: "2.5%",
                    left: "3.5%",
                    zIndex: 0,
                  }}
                />
                <motion.div
                  animate={{ rotate: [-2, -2.6, -2], x: [0, -2, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    border: "1.5px solid #575527",
                    top: "1%",
                    left: "-2.5%",
                    zIndex: 0,
                  }}
                />

                {/* Main cover frame */}
                <div
                  className="mag-cover-frame"
                  style={{ position: "relative", zIndex: 1 }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: bp === "mobile" ? "4/5" : "7/8",
                      minHeight: "clamp(280px,48vh,680px)",
                      overflow: "hidden",
                      display: "block",
                    }}
                  >
                    <motion.div
                      style={{
                        position: "absolute",
                        inset: "-8% 0",
                        y: bp === "desktop" ? imgParallaxY : undefined,
                        scale: bp === "desktop" ? imgParallaxSc : 1,
                      }}
                    >
                      <Image
                        src="/images/profile.jpg"
                        alt="Mila Abadinas — Full-Stack Developer"
                        fill
                        priority
                        sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,40vw"
                        style={{
                          objectFit: "cover",
                          objectPosition: "center 15%",
                        }}
                      />
                    </motion.div>
                    {/* Colour grade overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 2,
                        pointerEvents: "none",
                        background:
                          "linear-gradient(to bottom,rgba(185,125,123,0.08) 0%,transparent 40%,rgba(47,32,22,0.72) 100%)",
                        mixBlendMode: "multiply",
                      }}
                    />
                    {/* Cover overlay text */}
                    <div className="mag-cover-overlay-text">
                      <div className="mag-coverline-tag">Vol. I · 2026</div>
                      <div
                        style={{
                          fontFamily: "'Playfair Display',serif",
                          fontSize: "clamp(1.3rem,3.5vw,2.8rem)",
                          fontWeight: 900,
                          color: "#fff9f5",
                          lineHeight: 0.95,
                          letterSpacing: "-0.01em",
                          marginBottom: "0.5rem",
                          textShadow: "0 2px 12px rgba(47,32,22,0.4)",
                        }}
                      >
                        Mila
                        <br />
                        <span
                          style={{
                            fontStyle: "italic",
                            fontWeight: 400,
                            fontSize: "0.85em",
                            color: "#ecc4c3",
                          }}
                        >
                          Abadinas
                        </span>
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: "0.6rem",
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          color: "rgba(255,249,245,0.75)",
                          marginBottom: "0.8rem",
                        }}
                      >
                        Full-Stack Developer · IT Graduate
                      </div>
                      <div
                        style={{
                          borderTop: "1px solid rgba(255,249,245,0.25)",
                          paddingTop: "0.6rem",
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.25rem",
                        }}
                      >
                        {[
                          "Laravel & Next.js",
                          "CMS Development",
                          "Open for Opportunities",
                        ].map((line, i) => (
                          <div
                            key={i}
                            style={{
                              fontFamily: "'DM Sans',sans-serif",
                              fontSize: "0.58rem",
                              letterSpacing: "0.12em",
                              color:
                                i === 0 ? "#ecc4c3" : "rgba(255,249,245,0.65)",
                              fontWeight: i === 0 ? 600 : 400,
                              display: "flex",
                              alignItems: "center",
                              gap: "0.4rem",
                            }}
                          >
                            <span
                              style={{ color: "#b97d7b", fontSize: "0.5rem" }}
                            >
                              ✦
                            </span>
                            {line}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Open for work badge */}
                <motion.div
                  className="mag-cover-badge"
                  initial={{ scale: 3, rotate: -20, opacity: 0 }}
                  animate={{ scale: 1, rotate: 12, opacity: 1 }}
                  transition={{
                    delay: 3.8,
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  whileHover={{ scale: 1.1, rotate: 8 }}
                >
                  <span
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "0.5rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "#b97d7b",
                      textAlign: "center",
                      lineHeight: 1.25,
                    }}
                  >
                    OPEN
                    <br />
                    FOR
                    <br />
                    WORK
                  </span>
                </motion.div>

                {/* Washi tape */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "50%",
                    transform: "translateX(-50%) rotate(-2deg)",
                    width: "90px",
                    height: "16px",
                    background: "rgba(236,196,195,0.62)",
                    backgroundImage:
                      "repeating-linear-gradient(90deg,transparent,transparent 7px,rgba(255,255,255,0.22) 7px,rgba(255,255,255,0.22) 9px)",
                    zIndex: 12,
                    boxShadow: "0 1px 4px rgba(89,56,56,0.08)",
                  }}
                />

                {/* Rose sticker — clamp position on mobile */}
                <motion.div
                  className="mag-rose-sticker"
                  animate={{ y: [0, -10, 0], rotate: [15, 18, 15] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                  }}
                  style={{
                    position: "absolute",
                    top: "-6%",
                    left: "-8%",
                    zIndex: 12,
                    opacity: 0.85,
                  }}
                >
                  <svg width="48" height="48" viewBox="0 0 80 80" fill="none">
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
                      <ellipse
                        key={i}
                        cx="40"
                        cy="22"
                        rx="8"
                        ry="13"
                        fill="#ecc4c3"
                        opacity={0.6 + i * 0.025}
                        transform={`rotate(${a} 40 40)`}
                      />
                    ))}
                    {[0, 72, 144, 216, 288].map((a, i) => (
                      <ellipse
                        key={i}
                        cx="40"
                        cy="28"
                        rx="5.5"
                        ry="9"
                        fill="#b97d7b"
                        opacity="0.75"
                        transform={`rotate(${a} 40 40)`}
                      />
                    ))}
                    <circle
                      cx="40"
                      cy="40"
                      r="6.5"
                      fill="#fff9f5"
                      opacity="0.88"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="3"
                      fill="#ecc4c3"
                      opacity="0.9"
                    />
                  </svg>
                </motion.div>

                {/* Caption */}
                <div
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: "0.55rem",
                    color: "#928e5e",
                    letterSpacing: "0.14em",
                    marginTop: "0.7rem",
                    paddingTop: "0.4rem",
                    borderTop: "1px solid #57552720",
                    fontStyle: "italic",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>
                    Mila Abadinas — IT Graduate · Pasig City, Philippines
                  </span>
                  <span style={{ color: "#b97d7b" }}>✦</span>
                </div>
              </motion.div>
            </motion.div>

            {/* ── COLUMN RULE 2 (desktop only) ── */}
            <div
              className="mag-col-rule-2"
              style={{
                background: "#57552725",
                alignSelf: "stretch",
                display: bp !== "desktop" ? "none" : undefined,
              }}
            />

            {/* ── RIGHT COL: SIDEBAR (desktop only) ── */}
            {bp === "desktop" && (
              <div className="mag-right-col">
                <SidebarContents />
              </div>
            )}
          </div>
        </div>

        {/* ── FOOTER RULE ── */}
        <div
          style={{
            padding: "0 clamp(1rem,5vw,4rem)",
            borderTop: "1px double #575527",
            marginTop: "0.5rem",
          }}
        >
          <div
            className="mag-footer-inner"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.4rem 0",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.5rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#928e5e",
              flexWrap: "wrap",
              gap: "0.3rem",
            }}
          >
            <span>© 2026 Mila Abadinas</span>
            <span>Full-Stack Developer · Manila, PH</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </section>
    </>
  );
}
