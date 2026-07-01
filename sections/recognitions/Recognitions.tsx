"use client";
import {
  motion,
  AnimatePresence,
  useSpring,
  useMotionValue,
  useTransform,
  useScroll,
} from "framer-motion";
import FadeReveal from "@/components/motion/FadeReveal";
import Container from "@/components/layout/Container";
import { useEffect, useRef, useState, useCallback } from "react";
import { recognitionsScrollAnimation } from "@/animations/recognitionsScrollAnimation";
import SectionContainer from "@/components/layout/SectionContainer";
import Image from "next/image";

const RECOGNITIONS_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@400;500;600&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
.rg-display { font-family:'Playfair Display',serif; }
.rg-sans    { font-family:'DM Sans',sans-serif; }
.rg-serif   { font-family:'Libre Baskerville',serif; }
.rg-bg-canvas { position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:0; }
.rg-lattice {
  position:absolute;inset:-20%;
  background-image:
    repeating-linear-gradient(45deg,transparent,transparent 60px,rgba(236,196,195,0.035) 60px,rgba(236,196,195,0.035) 61px),
    repeating-linear-gradient(-45deg,transparent,transparent 60px,rgba(233,217,184,0.025) 60px,rgba(233,217,184,0.025) 61px);
  animation: rg-lattice-drift 25s linear infinite;
}
@keyframes rg-lattice-drift { 0%{transform:translate(0,0);} 100%{transform:translate(61px,61px);} }
@keyframes rg-pulse-breathe { 0%,100%{opacity:0.5;transform:scale(1);} 50%{opacity:1;transform:scale(1.06);} }
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
@keyframes rg-shimmer-border { 0%{background-position:-200% 0;} 100%{background-position:200% 0;} }
.rg-crest { position:absolute;pointer-events:none;user-select:none;animation:rg-crest-float linear infinite; }
@keyframes rg-crest-float { 0%{transform:translateY(0px) rotate(0deg);opacity:var(--o-start);} 50%{transform:translateY(-22px) rotate(8deg);opacity:var(--o-mid);} 100%{transform:translateY(0px) rotate(0deg);opacity:var(--o-start);} }
.rg-damask { position:absolute;font-size:clamp(12rem,28vw,22rem);line-height:1;user-select:none;pointer-events:none; }
.rg-star { position:absolute;border-radius:50%;background:#ECC4C3;animation:rg-twinkle ease-in-out infinite; }
@keyframes rg-twinkle { 0%,100%{opacity:0;transform:scale(0.5);} 50%{opacity:1;transform:scale(1);} }
.rg-ribbon-stripe { position:absolute;width:2px;top:0;bottom:0;background:linear-gradient(180deg,transparent 0%,rgba(236,196,195,0.08) 20%,rgba(236,196,195,0.15) 50%,rgba(236,196,195,0.08) 80%,transparent 100%);animation:rg-ribbon-flow 6s ease-in-out infinite; }
@keyframes rg-ribbon-flow { 0%,100%{opacity:0.4;} 50%{opacity:1;} }
.rg-brocade { position:absolute;top:0;bottom:0;width:120px;pointer-events:none;z-index:1; }
.rg-brocade-left  { left:0;  background:linear-gradient(90deg,rgba(87,85,39,0.8) 0%,transparent 100%); }
.rg-brocade-right { right:0; background:linear-gradient(270deg,rgba(87,85,39,0.8) 0%,transparent 100%); }
.rg-section-num { font-family:'Playfair Display',serif;font-size:clamp(8rem,18vw,16rem);font-weight:900;line-height:0.8;color:#928e5e06;position:absolute;top:-2rem;right:-1rem;pointer-events:none;user-select:none; }
@keyframes rg-ticker { from{transform:translateX(0);} to{transform:translateX(-50%);} }
.rg-ticker-track { animation:rg-ticker 32s linear infinite;display:flex;gap:2rem;white-space:nowrap;width:max-content; }
.rg-ticker-track:hover { animation-play-state:paused; }
.rg-entry { position:relative;background:#41431B;border-top:1px solid rgba(255,249,245,0.08);padding:3rem 2rem 1rem 2rem;transition:transform 0.45s cubic-bezier(.4,0,.2,1),background 0.6s cubic-bezier(.4,0,.2,1),box-shadow 0.6s cubic-bezier(.4,0,.2,1),border-radius 0.4s;border-radius:0; }
@media (min-width:768px) { .rg-entry:hover{transform:translateY(-8px);} }
.rg-entry.illuminated { background:#3B3B1A;box-shadow:0 0 80px rgba(236,196,195,0.08) inset;border-radius:12px;padding:3rem 2rem 1rem 2rem; }
.rg-ghost-num { position:absolute;left:0;top:0;font-family:'Playfair Display',serif;font-size:clamp(5rem,12vw,10rem);font-weight:900;line-height:1;color:rgba(255,249,245,0.04);user-select:none;pointer-events:none;transition:color 0.9s cubic-bezier(.4,0,.2,1); }
.rg-entry.illuminated .rg-ghost-num { color:rgba(255,249,245,0.14); }
.rg-ribbon { position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(to right,#ECC4C3,#b97d7b,transparent);transform:scaleX(0);transform-origin:left;transition:transform 0.8s 0.2s cubic-bezier(.4,0,.2,1);border-radius:0 0 2px 0;z-index:5; }
.rg-entry.illuminated .rg-ribbon { transform:scaleX(1); }
.rg-frame { position:absolute;inset:-12px;pointer-events:none;border:1px solid transparent;border-radius:8px;transition:border-color 0.5s,box-shadow 0.5s;z-index:1; }
.rg-frame.framed { border-color:rgba(236,196,195,0.35);box-shadow:0 0 0 1px rgba(236,196,195,0.12),inset 0 0 30px rgba(236,196,195,0.04); }
.rg-frame::before,.rg-frame::after { content:'✦';position:absolute;font-size:0.6rem;color:#ECC4C3;opacity:0;transition:opacity 0.5s 0.2s; }
.rg-frame.framed::before { opacity:0.6;top:-6px;left:-6px; }
.rg-frame.framed::after  { opacity:0.6;bottom:-6px;right:-6px; }
.rg-tape { position:absolute;top:-10px;left:50%;transform:translateX(-50%) rotate(-2deg);width:80px;height:16px;background:rgba(236,196,195,0.3);background-image:repeating-linear-gradient(90deg,transparent,transparent 8px,rgba(255,255,255,0.14) 8px,rgba(255,255,255,0.14) 10px);z-index:4;opacity:0;transition:opacity 0.5s 0.4s; }
.rg-entry.illuminated .rg-tape { opacity:1; }
.rg-badge { display:inline-flex;align-items:center;padding:0.5rem 1rem;border-radius:999px;background:rgba(255,249,245,0.06);border:1px solid rgba(255,249,245,0.12);font-family:'DM Sans',sans-serif;font-size:0.62rem;letter-spacing:0.2em;text-transform:uppercase;color:#FFF9F5;cursor:pointer;transition:background 0.3s,border-color 0.3s,transform 0.2s;user-select:none;white-space:nowrap; }
@media (min-width:640px) { .rg-badge{padding:0.6rem 1.25rem;font-size:0.68rem;letter-spacing:0.25em;} }
.rg-badge:hover { background:rgba(255,249,245,0.12);border-color:rgba(255,249,245,0.22);transform:translateY(-1px); }
.rg-badge.framed-active { background:rgba(236,196,195,0.18);border-color:rgba(236,196,195,0.45);color:#ECC4C3; }
.rg-divider { margin-top:2rem;height:1px;background:linear-gradient(to right,#ECC4C3,rgba(255,249,245,0.2),transparent); }
.rg-ink-path { stroke-dasharray:260;stroke-dashoffset:260;transition:stroke-dashoffset 1.1s 0.4s cubic-bezier(.4,0,.2,1); }
.rg-ink-path.drawn { stroke-dashoffset:0; }
.rg-cta-outline { font-family:'DM Sans',sans-serif;font-size:0.65rem;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,249,245,0.65);text-decoration:none;padding-bottom:2px;border-bottom:1px solid rgba(255,249,245,0.3);display:inline-flex;align-items:center;gap:0.5rem;transition:color 0.2s,gap 0.2s,border-color 0.2s;background:none;border-top:none;border-left:none;border-right:none;cursor:pointer; }
.rg-cta-outline:hover { color:#ECC4C3;gap:0.85rem;border-bottom-color:#ECC4C3; }
.rg-entry-grid { display:grid;grid-template-columns:1fr;gap:2rem;align-items:start;position:relative;z-index:2; }
@media (min-width:768px) { .rg-entry-grid{grid-template-columns:220px 1fr;gap:2.5rem;} }
@media (min-width:1024px) { .rg-entry-grid{grid-template-columns:260px 1fr;gap:3.5rem;} }
.rg-masthead-row { display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:1rem; }
.rg-masthead-meta { display:none; }
@media (min-width:640px) { .rg-masthead-meta{display:block;} }
.rg-seal-row { display:flex;align-items:center;gap:1rem;flex-wrap:wrap;margin-bottom:1.2rem; }
.rg-wax-seal-btn { width:56px;height:56px; }
@media (min-width:640px) { .rg-wax-seal-btn{width:72px;height:72px;} }
.rg-stamp-wrapper { position:relative;width:auto;margin-bottom:1rem;pointer-events:none;z-index:20; }
@media (min-width:768px) { .rg-stamp-wrapper{position:absolute;top:0;right:0;width:100px;height:100px;margin-bottom:0;} }
@media (min-width:768px) {
  .rg-stamp-wrapper { flex-direction:column!important; gap:6px!important; }
}
.rg-entry-title { font-family:'Playfair Display',serif;font-size:clamp(1.6rem,5vw,3.2rem);font-weight:900;color:#FFF9F5;line-height:1.05;letter-spacing:-0.01em; }
.rg-section-heading { font-family:'Playfair Display',serif;font-size:clamp(2.5rem,7vw,6rem);font-weight:900;line-height:0.9;color:#b97d7b;letter-spacing:-0.01em; }
.rg-quote-text { font-family:'Playfair Display',serif;font-style:italic;font-size:clamp(1.1rem,3vw,2.2rem);color:#B97D7B;line-height:1.45; }
.rg-hanging-charm { display:none; }
@media (min-width:1024px) { .rg-hanging-charm{display:block;} }
.rg-brocade-side { display:none; }
@media (min-width:1280px) { .rg-brocade-side{display:block;} }
.rg-crown-ornament { position:absolute;pointer-events:none;user-select:none;font-family:'Playfair Display',serif; }
@keyframes rg-crown-sway { 0%,100%{transform:rotate(-3deg) translateY(0);} 50%{transform:rotate(3deg) translateY(-6px);} }
.rg-crown-anim { animation:rg-crown-sway 6s ease-in-out infinite; }
.rg-entries-list { display:flex;flex-direction:column;gap:3.5rem; }
@media (min-width:768px) { .rg-entries-list{gap:5rem;} }
.rg-quote {
  margin-top: 4rem;
  padding-left: 2rem;
  border-left: 2px solid #ecc4c3;
}

@media (max-width:480px) {
  .rg-quote {
    padding-left: 1rem;
  }
}
.rg-section-padding { padding:0 0 4rem; }
@media (min-width:768px) { .rg-section-padding{padding:0 0 6rem;} }
.rg-particle { display:block; }
@media (max-width:640px) { .rg-particle--large{display:none;} }
.rg-entry { --glow:0; }
.rg-entry:hover { --glow:1;box-shadow:0 0 60px rgba(236,196,195,calc(var(--glow)*0.06)); }
.rg-fleur { position:absolute;pointer-events:none;user-select:none;opacity:0.06;font-size:clamp(6rem,15vw,12rem);color:#ECC4C3;line-height:1; }
.rg-cursor-trail { position:fixed;pointer-events:none;border-radius:50%;z-index:9999; }

/* ══ LUXURY FLOWER BACKGROUND ADDITIONS ══ */
@keyframes rg-float-1 { 0%,100%{transform:translateY(0px) rotate(0deg);} 33%{transform:translateY(-18px) rotate(4deg);} 66%{transform:translateY(8px) rotate(-3deg);} }
@keyframes rg-float-2 { 0%,100%{transform:translateY(0px) rotate(0deg) scale(1);} 50%{transform:translateY(-22px) rotate(-6deg) scale(1.04);} }
@keyframes rg-float-3 { 0%,100%{transform:translateY(0px) rotate(15deg);} 40%{transform:translateY(-14px) rotate(20deg);} 80%{transform:translateY(6px) rotate(12deg);} }
@keyframes rg-shimmer-line { 0%{opacity:0.1;} 50%{opacity:0.32;} 100%{opacity:0.1;} }
@keyframes rg-bow-pulse { 0%,100%{transform:scale(1) rotate(-8deg);opacity:0.2;} 50%{transform:scale(1.08) rotate(-6deg);opacity:0.3;} }
@keyframes rg-ribbon-drift { 0%,100%{transform:rotate(-12deg) translateY(0);opacity:0.18;} 50%{transform:rotate(-8deg) translateY(-10px);opacity:0.28;} }
@keyframes rg-butterfly-drift { 0%,100%{transform:translateY(0) rotate(-5deg) scaleX(1);} 25%{transform:translateY(-14px) rotate(-2deg) scaleX(-1);} 50%{transform:translateY(-8px) rotate(3deg) scaleX(-1);} 75%{transform:translateY(-18px) rotate(-4deg) scaleX(1);} }
@keyframes rg-pearl-glow { 0%,100%{opacity:0.18;} 50%{opacity:0.28;} }

@media (prefers-reduced-motion:reduce) {
  .rg-ticker-track,.rg-lattic,.rg-crest,.rg-star,.rg-ribbon-stripe { animation:none!important; }
  .rg-entry,.rg-ribbon,.rg-frame,.rg-ghost-num,.rg-tape { transition:none!important; }
}
`;

/* ─── DATA ─── (unchanged) */
const recognitions = [
  {
    title: "Magna Cum Laude",
    subtitle: "Bachelor of Science in Information Technology",
    year: "2026",
    stamp: "Honors\nAchieved",
    image: "/recognitions/magna-cum-laude.jpg",
  },
  {
    title: "3rd Place",
    subtitle: "DATAxYOUTH Innovation Challenge",
    year: "PLDT · Smart · UP Diliman",
    stamp: "Innovation\nAchieved",
    image: "/recognitions/dataxyouth.jpg",
  },
  {
    title: "4th Place",
    subtitle: "HackFest 2025: Horizon",
    year: "Ateneo de Manila University",
    stamp: "HackFest\nAchieved",
    image: "/recognitions/hackfest.jpg",
  },
];

/* ─── CURSOR TRAIL ─── */
function useCursorTrail() {
  const [trails, setTrails] = useState<
    { id: number; x: number; y: number; glyph: string }[]
  >([]);
  const counter = useRef(0);
  useEffect(() => {
    const glyphs = ["✦", "✿", "♡", "✾"];
    let lastTime = 0;
    function onMove(e: MouseEvent) {
      const now = Date.now();
      if (now - lastTime < 120) return;
      lastTime = now;
      const id = counter.current++;
      setTrails((t) => [
        ...t.slice(-6),
        { id, x: e.clientX, y: e.clientY, glyph: glyphs[id % glyphs.length] },
      ]);
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return trails;
}
function CursorTrail() {
  const trails = useCursorTrail();
  return (
    <>
      {trails.map((t) => (
        <motion.span
          key={t.id}
          className="rg-cursor-trail"
          style={{ left: t.x, top: t.y, fontSize: "0.6rem", color: "#ECC4C3" }}
          initial={{ opacity: 0.8, scale: 1, x: "-50%", y: "-50%" }}
          animate={{ opacity: 0, scale: 0.3, y: "-150%" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {t.glyph}
        </motion.span>
      ))}
    </>
  );
}

/* ─── WAX SEAL ─── */
function WaxSeal({
  onBreak,
  broken,
}: {
  onBreak: (e: React.MouseEvent) => void;
  broken: boolean;
}) {
  return (
    <motion.button
      onClick={onBreak}
      disabled={broken}
      whileHover={broken ? {} : { scale: 1.1, rotate: 5 }}
      whileTap={broken ? {} : { scale: 0.92 }}
      className="rg-wax-seal-btn relative rounded-full flex-shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ECC4C3]"
      aria-label="Break the wax seal to mark this achievement"
    >
      <AnimatePresence>
        {!broken && (
          <motion.svg
            key="seal"
            viewBox="0 0 72 72"
            className="w-full h-full"
            exit={{ scale: 0, rotate: 45, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <circle cx="36" cy="36" r="32" fill="#b97d7b" fillOpacity="0.18" />
            <circle
              cx="36"
              cy="36"
              r="28"
              fill="none"
              stroke="#b97d7b"
              strokeWidth="1.5"
            />
            <circle cx="36" cy="36" r="22" fill="rgba(185,125,123,0.12)" />
            <text
              x="36"
              y="32"
              fontFamily="Georgia,serif"
              fontSize="8"
              fontWeight="700"
              fill="#b97d7b"
              textAnchor="middle"
              letterSpacing="2"
            >
              ✦
            </text>
            <text
              x="36"
              y="44"
              fontFamily="Georgia,serif"
              fontSize="7"
              fontWeight="700"
              fill="#b97d7b"
              textAnchor="middle"
              letterSpacing="1.5"
            >
              SEAL
            </text>
          </motion.svg>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {broken && (
          <motion.span
            key="star"
            className="absolute inset-0 flex items-center justify-center text-[2rem] text-[#ECC4C3]"
            initial={{ scale: 0, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: [0.23, 1, 0.32, 1],
              delay: 0.05,
            }}
          >
            ✦
          </motion.span>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {broken && (
          <motion.span
            key="ink"
            className="absolute inset-0 rounded-full pointer-events-none border border-[#b97d7b]"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/* ─── STAMP ─── */
function Stamp({
  text,
  image,
  visible,
}: {
  text: string;
  image: string;
  visible: boolean;
}) {
  const lines = text.split("\n");
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="rg-stamp-wrapper"
          initial={{ scale: 0, rotate: -20, opacity: 0 }}
          animate={{ scale: 1, rotate: -8, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
          style={{
            display: "inline-flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "10px",
              overflow: "hidden",
              border: "2.5px solid #b97d7b",
              boxShadow: "0 6px 18px rgba(87,85,39,0.35)",
              position: "relative",
              flexShrink: 0,
            }}
          >
            <Image
              src={image}
              alt={text.replace("\n", " ")}
              fill
              sizes="64px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
            }}
          >
            {lines.map((line, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "Georgia,serif",
                  fontSize: "8px",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#ECC4C3",
                  textAlign: "center",
                  lineHeight: 1.4,
                }}
              >
                {line}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── RECOGNITION ENTRY ─── */
function RecognitionEntry({
  item,
  index,
  inkVis,
}: {
  item: (typeof recognitions)[0];
  index: number;
  inkVis: boolean;
}) {
  const [broken, setBroken] = useState(false);
  const [framed, setFramed] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [showSparkle, setShowSparkle] = useState(false);
  function handleBreak(e: React.MouseEvent) {
    if (broken) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setSparklePos({ x: rect.left + rect.width / 2, y: rect.top });
    setBroken(true);
    setShowSparkle(true);
    setTimeout(() => setShowSparkle(false), 900);
  }
  return (
    <FadeReveal delay={index * 0.15}>
      <div className={`rg-entry${broken ? " illuminated" : ""}`}>
        <div className="rg-ribbon" />
        <div className="rg-tape" />
        <div className={`rg-frame${framed ? " framed" : ""}`} />
        <div className="rg-entry-grid">
          <div className="relative z-10">
            <p
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.52rem",
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                color: "#E9D9B8",
                marginBottom: "1.25rem",
              }}
            >
              Recognition
            </p>
            <h3 className="rg-entry-title">{item.title}</h3>
            <motion.div
              style={{
                height: "3px",
                background: "#b97d7b",
                borderRadius: "999px",
                marginTop: "1rem",
              }}
              animate={{ width: broken ? "5rem" : "2.5rem" }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>
          <div className="relative">
            <div
              style={{
                position: "absolute",
                top: "-1rem",
                right: 0,
                fontSize: "1.2rem",
                color: "#ECC4C3",
              }}
            >
              ✦
            </div>
            <Stamp text={item.stamp} image={item.image} visible={broken} />
            <p
              className="rg-serif"
              style={{
                fontFamily: "'Libre Baskerville',serif",
                fontSize: "0.92rem",
                lineHeight: 1.75,
                color: "rgba(255,249,245,0.8)",
                borderTop: "2px solid #b97d7b",
                borderBottom: "1px solid rgba(255,249,245,0.1)",
                padding: "0.65rem 0",
                marginBottom: "1.5rem",
                fontStyle: "italic",
                maxWidth: "580px",
              }}
            >
              {item.subtitle}
            </p>
            <div className="rg-seal-row">
              <WaxSeal broken={broken} onBreak={handleBreak} />
              <button
                className={`rg-badge${framed ? " framed-active" : ""}`}
                onClick={() => setFramed((v) => !v)}
                title={
                  framed ? "Remove frame" : "Press to frame this achievement"
                }
              >
                {item.year}
                {!framed && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{ marginLeft: "0.3rem", opacity: 0.5 }}
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                  </svg>
                )}
                {framed && (
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{ marginLeft: "0.3rem" }}
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </button>
            </div>
            {broken && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "0.75rem",
                  lineHeight: 1.9,
                  color: "rgba(255,249,245,0.5)",
                  marginTop: "0.5rem",
                }}
              >
                A milestone earned through{" "}
                <span
                  style={{
                    position: "relative",
                    display: "inline-block",
                    color: "#ECC4C3",
                    fontWeight: 600,
                  }}
                >
                  dedication and craft
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
                      className={`rg-ink-path${inkVis ? " drawn" : ""}`}
                      d="M2 7 C50 12,100 2,150 7 S190 12,198 7"
                      stroke="#ECC4C3"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{" "}
                — not by chance.
              </motion.p>
            )}
            {!broken && (
              <p
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: "0.5rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "rgba(255,249,245,0.25)",
                  marginTop: "0.5rem",
                }}
              >
                Break the seal · Press year to frame
              </p>
            )}
          </div>
        </div>
        <div className="rg-divider" />
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "0.52rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "rgba(255,249,245,0.22)",
          }}
        >
          <span>Recognition Archive</span>
          <span>Entry {String(index + 1).padStart(2, "0")}</span>
        </div>
      </div>
    </FadeReveal>
  );
}

/* ═══════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════ */
export default function Recognitions() {
  const sectionRef = useRef<HTMLElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const [inkVis, setInkVis] = useState(false);
  useEffect(() => {
    if (
      !sectionRef.current ||
      !chapterRef.current ||
      !headingRef.current ||
      !quoteRef.current
    )
      return;
    const cleanup = recognitionsScrollAnimation(
      sectionRef.current,
      chapterRef.current,
      headingRef.current,
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
      <style dangerouslySetInnerHTML={{ __html: RECOGNITIONS_CSS }} />
      <CursorTrail />
      <section
        ref={sectionRef}
        id="recognitions"
        className="rg-sans rg-section-padding"
        style={{
          position: "relative",
          background: "#575527",
          overflow: "hidden",
        }}
      >
        {/* Lace top border */}
        <div className="ex-lace-top" />

        {/* ══ ORIGINAL ROYAL FANTASY CANVAS (preserved) ══ */}
        <div className="rg-bg-canvas">
          <div className="rg-lattice" />
          <div className="rg-crown-light rg-crown-light-1" />
          <div className="rg-crown-light rg-crown-light-2" />
          <div className="rg-crown-light rg-crown-light-3" />
          <div className="rg-baroque-border" />
          <div
            className="rg-fleur"
            style={{
              bottom: "-3rem",
              left: "-2rem",
              transform: "rotate(-15deg)",
            }}
          ></div>

          <div
            className="rg-crown-ornament rg-crown-anim"
            style={{
              top: "3rem",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "clamp(1.5rem,4vw,3rem)",
              color: "#ECC4C3",
              opacity: 0.12,
            }}
          >
            𔓘
          </div>
          <div className="rg-brocade rg-brocade-left  rg-brocade-side" />
          <div className="rg-brocade rg-brocade-right rg-brocade-side" />
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              display: "grid",
              gridTemplateColumns: "repeat(5,1fr)",
              opacity: 0.03,
            }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} style={{ borderRight: "1px solid #FFF9F5" }} />
            ))}
          </div>
        </div>

        {/* ══ ELEVATED LUXURY FLOWER BACKGROUND (new layer on top of canvas) ══ */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            overflow: "hidden",
            zIndex: 0,
          }}
          aria-hidden="true"
        ></div>

        {/* Hanging charm */}
        <div className="rg-hanging-charm absolute top-0 -left-20 pointer-events-none z-0">
          <div className="h-40 w-[1px] bg-[rgba(255,248,245,0.25)]" />
          <div className="text-4xl text-[#FFF8F5]">✿</div>
        </div>

        {/* Ghost chapter number */}
        <div
          ref={chapterRef}
          className="rg-section-num"
          style={{ color: "#928e5e06" }}
        >
          05
        </div>

        <Container>
          <SectionContainer>
            <div className="relative z-10">
              {/* MASTHEAD */}
              <div
                style={{
                  borderBottom: "3px solid rgba(255,249,245,0.3)",
                  paddingBottom: "0.5rem",
                  paddingTop: "5rem",
                  marginBottom: 0,
                }}
              >
                <FadeReveal>
                  <div className="rg-masthead-row">
                    <div>
                      <div
                        style={{
                          fontFamily: "'DM Sans',sans-serif",
                          fontSize: "0.52rem",
                          letterSpacing: "0.35em",
                          textTransform: "uppercase",
                          color: "#ecc4c3",
                          marginBottom: "0.2rem",
                        }}
                      >
                        Chapter 05
                      </div>
                      <h2 className="rg-section-heading">
                        Proof
                        <br />
                        <em style={{ color: "#ECC4C3" }}>Of Growth</em>
                      </h2>
                    </div>
                    <div
                      className="rg-masthead-meta"
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: "0.52rem",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "#ecc4c3",
                        textAlign: "right",
                        opacity: 0.65,
                      }}
                    >
                      <div>Recognition Archive</div>
                      <div style={{ opacity: 0.6, marginTop: "0.15rem" }}>
                        p.05 · Proof of Growth
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

              {/* Standfirst */}
              <FadeReveal delay={0.2}>
                <p
                  className="rg-serif"
                  style={{
                    fontFamily: "'Libre Baskerville',serif",
                    fontSize: "clamp(0.88rem,2vw,1rem)",
                    lineHeight: 1.85,
                    fontStyle: "italic",
                    color: "#ddd3c9cc",
                    maxWidth: "680px",
                    borderTop: "2px solid #b97d7b",
                    borderBottom: "1px solid rgba(255,249,245,0.1)",
                    padding: "0.7rem 0",
                    marginBottom: "1.2rem",
                  }}
                >
                  Every achievement represents a moment where preparation met
                  opportunity, transforming ideas into measurable results.
                </p>
              </FadeReveal>
              {/* Drop-cap intro */}
              <FadeReveal delay={0.25}>
                <p
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: "clamp(0.8rem,2vw,0.85rem)",
                    lineHeight: 2,
                    color: "rgba(221,211,201,0.7)",
                    maxWidth: "640px",
                    marginBottom: "4rem",
                    textAlign: "justify",
                    hyphens: "auto",
                  }}
                >
                  <span
                    className="rg-display"
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
                    B
                  </span>
                  reak each seal below to illuminate the recognition — and press
                  the year badge to frame it as a{" "}
                  <span
                    style={{
                      position: "relative",
                      display: "inline-block",
                      color: "#ECC4C3",
                      fontWeight: 600,
                    }}
                  >
                    certificate of achievement
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
                        className={`rg-ink-path${inkVis ? " drawn" : ""}`}
                        d="M2 7 C50 12,100 2,150 7 S190 12,198 7"
                        stroke="#ECC4C3"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  .
                </p>
              </FadeReveal>
              {/* Entries */}
              <div className="rg-entries-list">
                {recognitions.map((item, index) => (
                  <RecognitionEntry
                    key={item.title}
                    item={item}
                    index={index}
                    inkVis={inkVis}
                  />
                ))}
              </div>
              {/* Quote */}
              <FadeReveal delay={0.5}>
                <div ref={quoteRef} className="rg-quote">
                  <p
                    className="rg-display"
                    style={{
                      fontStyle: "italic",
                      fontSize: "clamp(1.1rem,2.5vw,1.7rem)",
                      color: "#ecc4c3",
                      lineHeight: 1.5,
                    }}
                  >
                    &ldquo;Growth is rarely visible day by day, but undeniable
                    when viewed over time.&rdquo;
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
