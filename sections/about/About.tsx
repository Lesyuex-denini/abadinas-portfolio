"use client";
import Image from "next/image";
import FadeReveal from "@/components/motion/FadeReveal";
import { useEffect, useRef, useState } from "react";
import Container from "@/components/layout/Container";
import SectionContainer from "@/components/layout/SectionContainer";
import { motion } from "framer-motion";

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

const ABOUT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@400;500;600&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');
.ab-display { font-family:'Playfair Display',serif; }
.ab-sans    { font-family:'DM Sans',sans-serif; }
.ab-serif   { font-family:'Libre Baskerville',serif; }
@keyframes ab-fold-open {
  from { transform:rotateX(-90deg); opacity:0; transform-origin:top; }
  to   { transform:rotateX(0deg);   opacity:1; transform-origin:top; }
}
@keyframes ab-ink-draw {
  from { stroke-dashoffset:var(--len,300); }
  to   { stroke-dashoffset:0; }
}
@keyframes ab-float {
  0%,100%{transform:translateY(0) rotate(var(--r,0deg))}
  50%{transform:translateY(-10px) rotate(var(--r,0deg))}
}
.ab-img-swap img:last-child { opacity:0; transition:opacity 0.7s; }
.ab-img-swap:hover img:first-child { opacity:0; }
.ab-img-swap:hover img:last-child  { opacity:1; }
.ab-card {
  background:#fff9f5;
  border:1px solid #e8ded4;
  padding:1.5rem;
  transition:transform 0.5s cubic-bezier(.4,0,.2,1), box-shadow 0.5s;
  position:relative;
  overflow:hidden;
}
.ab-card:hover { transform:translateY(-6px) rotate(-0.5deg); box-shadow:0 24px 48px rgba(89,56,56,0.12); }
.ab-card::before {
  content:'';
  position:absolute;
  bottom:0; left:0; right:0;
  height:3px;
  background:#b97d7b;
  transform:scaleX(0);
  transform-origin:left;
  transition:transform 0.4s cubic-bezier(.4,0,.2,1);
}
.ab-card:hover::before { transform:scaleX(1); }
.ab-section-num {
  font-family:'Playfair Display',serif;
  font-size:clamp(8rem,18vw,16rem);
  font-weight:900;
  line-height:0.8;
  color:#57552706;
  position:absolute;
  top:-2rem; right:-1rem;
  pointer-events:none;
  user-select:none;
}
.ab-vert-text {
  position:absolute;
  left:-1.7rem;
  top:50%;
  transform:translateY(-50%) rotate(-90deg);
  font-family:'DM Sans',sans-serif;
  font-size:.55rem;
  letter-spacing:.35em;
  text-transform:uppercase;
  color:#928e5e;
  z-index:5;
  white-space:nowrap;
}

/* ── Ticker (mirrors Hero/Skills/Services/Experience) ── */
@keyframes ab-ticker {
  from { transform:translateX(0); }
  to   { transform:translateX(-50%); }
}
.ab-ticker-track {
  animation:ab-ticker 30s linear infinite;
  display:flex;
  gap:2rem;
  white-space:nowrap;
  width:max-content;
}
.ab-ticker-track:hover { animation-play-state:paused; }

/* ── NEW: luxury flower bg keyframes ── */
@keyframes ab-bg-float-1 { 0%,100%{transform:translateY(0px) rotate(0deg);} 33%{transform:translateY(-18px) rotate(4deg);} 66%{transform:translateY(8px) rotate(-3deg);} }
@keyframes ab-bg-float-2 { 0%,100%{transform:translateY(0px) rotate(0deg) scale(1);} 50%{transform:translateY(-22px) rotate(-6deg) scale(1.04);} }
@keyframes ab-bg-float-3 { 0%,100%{transform:translateY(0px) rotate(15deg);} 40%{transform:translateY(-14px) rotate(20deg);} 80%{transform:translateY(6px) rotate(12deg);} }
@keyframes ab-shimmer-line { 0%{opacity:0.08;} 50%{opacity:0.22;} 100%{opacity:0.08;} }
@keyframes ab-bow-bg-pulse { 0%,100%{transform:scale(1) rotate(-8deg);opacity:0.2;} 50%{transform:scale(1.06) rotate(-6deg);opacity:0.28;} }
@keyframes ab-ribbon-bg-drift { 0%,100%{transform:rotate(-12deg) translateY(0);opacity:0.16;} 50%{transform:rotate(-8deg) translateY(-10px);opacity:0.24;} }
@keyframes ab-butterfly-bg { 0%,100%{transform:translateY(0) rotate(-5deg) scaleX(1);} 25%{transform:translateY(-14px) rotate(-2deg) scaleX(-1);} 50%{transform:translateY(-8px) rotate(3deg) scaleX(-1);} 75%{transform:translateY(-18px) rotate(-4deg) scaleX(1);} }
@keyframes ab-sparkle-bg { 0%,100%{transform:scale(1) rotate(0deg);opacity:0.42;} 25%{transform:scale(1.15) rotate(90deg);opacity:0.72;} 75%{transform:scale(0.9) rotate(270deg);opacity:0.32;} }

/* ══ RESPONSIVE ══ */
@media (min-width:640px) and (max-width:1023px) {
  .ab-main-grid { display:flex !important;flex-direction:column !important;gap:3rem !important; }
  .ab-col-rule { display:none !important; }
  .ab-img-col { padding:1rem 1.5rem !important; }
  .ab-img-stage { height:420px !important; }
  .ab-side-strip { width:26% !important;height:240px !important;top:30px !important; }
  .ab-square-card { width:140px !important;height:140px !important;right:8% !important;bottom:20px !important; }
  .ab-vert-text { display:none !important; }
  .ab-cards-grid { gap:0.85rem !important; }
  .ab-masthead-meta { display:none !important; }
}
@media (max-width:639px) {
  .ab-main-grid { display:flex !important;flex-direction:column !important;gap:2.5rem !important; }
  .ab-col-rule  { display:none !important; }
  .ab-vert-text { display:none !important; }
  .ab-img-col   { padding:0.5rem 0 !important; }
  .ab-img-stage { height:320px !important; }
  .ab-main-img  { width:100% !important;border-radius:0 0 80px 0 !important; }
  .ab-side-strip  { display:none !important; }
  .ab-square-card { display:none !important; }
  .ab-luxury-rule { display:none !important; }
  .ab-flower-sticker  { left:-0.5rem !important;bottom:0.5rem !important; }
  .ab-ribbon-sticker  { top:-0.2rem !important;right:0.2rem !important; }
  .ab-flower-sticker2 { right:0.2rem !important;bottom:0.5rem !important; }
  .ab-butterfly       { left:-0.5rem !important;top:0.5rem !important; }
  .ab-masthead-meta  { display:none !important; }
  .ab-masthead-title { font-size:clamp(2.2rem,9vw,4rem) !important; }
  .ab-cards-grid { grid-template-columns:1fr !important;gap:1.5rem !important; }
  .ab-card { transform:none !important; }
  .ab-card:hover { transform:translateY(-4px) !important; }
  .ab-outer-frame { inset:4px !important;border-radius:16px !important; }
  .ab-content-col p { font-size:0.88rem !important; }
  .ab-standfirst { font-size:0.9rem !important; }
}
@media(prefers-reduced-motion:reduce) {
  .ab-float,
  .ab-img-swap img,
  .ab-img-swap:hover img:first-child,
  .ab-img-swap:hover img:last-child {
    animation:none!important; opacity:1!important; transition:none!important;
  }
  .ab-ticker-track { animation:none!important; }
}
`;

/* ═══════════════════════════════════════
   MAIN EXPORT — original code 100% untouched
═══════════════════════════════════════ */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const chapterRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [underlineVis, setUnderlineVis] = useState(false);
  const bp = useBreakpoint();
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setUnderlineVis(true);
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const stageHeight =
    bp === "mobile" ? "320px" : bp === "tablet" ? "420px" : "520px";
  const sideStripW = bp === "tablet" ? "26%" : "30%";
  const sideStripH = bp === "tablet" ? "240px" : "300px";
  const squareSize = bp === "tablet" ? "140px" : "180px";
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ABOUT_CSS }} />
      <section
        ref={sectionRef}
        id="about"
        className="ab-sans"
        style={{
          position: "relative",
          background:
            "linear-gradient(8deg,#ecc4c3 0%,#f4dbd8 35%,#ddd3c9 100%)",
          minHeight: "100vh",
          padding: "clamp(3rem,8vw,6rem) 0",
          overflow: "hidden",
        }}
      >
        {/* Ghost chapter number */}
        <div ref={chapterRef} className="ab-section-num">
          01
        </div>
        {/* Background column rules */}
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
            {/* MASTHEAD */}
            <div
              style={{
                borderBottom: "3px solid #575527",
                paddingBottom: "0.5rem",
                marginBottom: "0.5rem",
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
                        fontSize: "0.52rem",
                        letterSpacing: "0.35em",
                        textTransform: "uppercase",
                        color: "#928e5e",
                        marginBottom: "0.2rem",
                      }}
                    >
                      Chapter 01
                    </div>
                    <h2
                      ref={headingRef}
                      className="ab-display ab-masthead-title"
                      style={{
                        fontSize: "clamp(2.2rem,7vw,6rem)",
                        fontWeight: 900,
                        lineHeight: 0.9,
                        color: "#2e2a0e",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      The Builder
                      <br />
                      <em style={{ color: "#b97d7b" }}>Behind the Work</em>
                    </h2>
                  </div>
                  <div
                    className="ab-masthead-meta"
                    style={{
                      fontSize: "0.52rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "#928e5e",
                      textAlign: "right",
                    }}
                  >
                    <div>Feature Interview</div>
                    <div style={{ opacity: 0.6, marginTop: "0.15rem" }}>
                      p.01 · About the Author
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

            {/* MAIN GRID */}
            <div
              className="ab-main-grid"
              style={
                bp === "desktop"
                  ? {
                      display: "grid",
                      gridTemplateColumns: "1fr 1px 1.4fr",
                      gap: "0 2.5rem",
                      alignItems: "start",
                    }
                  : {
                      display: "flex",
                      flexDirection: "column",
                      gap: bp === "tablet" ? "3rem" : "2.5rem",
                    }
              }
            >
              {/* IMAGE COLUMN */}
              <FadeReveal>
                <div
                  ref={imageRef}
                  className="ab-img-col"
                  style={{
                    position: "relative",
                    padding: bp === "mobile" ? "0.5rem 0" : "1.5rem",
                  }}
                >
                  <div
                    className="ab-outer-frame"
                    style={{
                      position: "absolute",
                      inset: "12px",
                      border: "1px solid rgba(87,85,39,.12)",
                      borderRadius: "32px",
                      zIndex: 0,
                    }}
                  />
                  <div
                    className="ab-display"
                    style={{
                      position: "absolute",
                      top: "-1rem",
                      right: 0,
                      fontSize: "7rem",
                      fontWeight: 900,
                      color: "#b97d7b",
                      opacity: 0.08,
                      lineHeight: 1,
                      pointerEvents: "none",
                      userSelect: "none",
                      zIndex: 0,
                    }}
                  >
                    01
                  </div>
                  <div className="ab-vert-text">Editorial Portrait</div>
                  <div
                    className="ab-img-stage"
                    style={{
                      position: "relative",
                      zIndex: 2,
                      height: stageHeight,
                    }}
                  >
                    <div
                      className="ab-img-swap ab-main-img"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: bp === "mobile" ? "100%" : "78%",
                        height: "100%",
                        overflow: "hidden",
                        borderRadius:
                          bp === "mobile" ? "0 0 80px 0" : "0 0 160px 0",
                        boxShadow: "0 30px 80px rgba(47,32,22,.12)",
                        background: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      <Image
                        src="/images/side_profile.jpg"
                        alt="Mila"
                        fill
                        sizes="(max-width:640px) 100vw,(max-width:1024px) 80vw,600px"
                        style={{
                          objectFit: "cover",
                          objectPosition: "center top",
                        }}
                      />
                      <Image
                        src="/images/mila-hover.jpg"
                        alt="Mila Alternate"
                        fill
                        sizes="(max-width:640px) 100vw,(max-width:1024px) 80vw,600px"
                        style={{
                          objectFit: "cover",
                          objectPosition: "center top",
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top,rgba(47,32,22,.10),transparent 45%)",
                          zIndex: 2,
                        }}
                      />
                    </div>
                    {bp !== "mobile" && (
                      <motion.div
                        className="ab-side-strip"
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          position: "absolute",
                          right: 0,
                          top: "40px",
                          width: sideStripW,
                          height: sideStripH,
                          overflow: "hidden",
                          borderRadius: "100px",
                          boxShadow: "0 20px 60px rgba(47,32,22,.08)",
                          border: "5px solid #fff",
                          zIndex: 4,
                        }}
                      >
                        <Image
                          src="/images/mila-profile.jpg"
                          alt="Mila Detail"
                          fill
                          sizes="280px"
                          style={{
                            objectFit: "cover",
                            objectPosition: "center center",
                          }}
                        />
                      </motion.div>
                    )}
                    {bp !== "mobile" && (
                      <motion.div
                        className="ab-square-card"
                        whileHover={{ y: -5, rotate: -2 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          position: "absolute",
                          right: bp === "tablet" ? "8%" : "10%",
                          bottom: bp === "tablet" ? "20px" : "35px",
                          width: squareSize,
                          height: squareSize,
                          overflow: "hidden",
                          background: "#fff",
                          padding: "5px",
                          boxShadow: "0 15px 40px rgba(47,32,22,.10)",
                          zIndex: 5,
                        }}
                      >
                        <div
                          style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <Image
                            src="/images/side_profile.jpg"
                            alt="Mila Detail"
                            fill
                            sizes="180px"
                            style={{
                              objectFit: "cover",
                              objectPosition: "center 25%",
                            }}
                          />
                        </div>
                      </motion.div>
                    )}
                    {bp !== "mobile" && (
                      <div
                        className="ab-luxury-rule"
                        style={{
                          position: "absolute",
                          left: "82%",
                          top: "430px",
                          width: "1px",
                          height: "90px",
                          background: "rgba(87,85,39,.15)",
                          zIndex: 4,
                        }}
                      />
                    )}
                  </div>
                  {/* STICKERS */}
                  <motion.div
                    className="ab-flower-sticker"
                    animate={{ y: [0, -10, 0], rotate: [-15, -12, -15] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      position: "absolute",
                      left: bp === "mobile" ? "-0.5rem" : "-1rem",
                      bottom: bp === "mobile" ? "0.5rem" : "3rem",
                      zIndex: 10,
                    }}
                  >
                    <svg width="65" height="65" viewBox="0 0 80 80" fill="none">
                      {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map(
                        (a, i) => (
                          <ellipse
                            key={i}
                            cx="40"
                            cy="22"
                            rx="5"
                            ry="15"
                            fill="#fff9f5"
                            opacity="0.9"
                            transform={`rotate(${a} 40 40)`}
                          />
                        ),
                      )}
                      <circle cx="40" cy="40" r="11" fill="#f5d67a" />
                      <circle cx="40" cy="40" r="7" fill="#e8be50" />
                    </svg>
                  </motion.div>
                  <motion.div
                    className="ab-ribbon-sticker"
                    animate={{ y: [0, -5, 0], rotate: [8, 10, 8] }}
                    transition={{
                      duration: 7,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      position: "absolute",
                      top: bp === "mobile" ? "-0.2rem" : "0.5rem",
                      right: bp === "mobile" ? "0.2rem" : "-0.5rem",
                      width: "100px",
                      height: "100px",
                      zIndex: 10,
                      filter: "drop-shadow(0 8px 18px rgba(0,0,0,.08))",
                    }}
                  >
                    <Image
                      src="/images/ribbon.png"
                      alt="Ribbon Sticker"
                      fill
                      sizes="80px"
                      style={{ objectFit: "contain" }}
                    />
                  </motion.div>
                  <motion.div
                    className="ab-flower-sticker2"
                    animate={{ y: [0, -8, 0], x: [0, 3, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      position: "absolute",
                      right: bp === "mobile" ? "0.2rem" : "0.1rem",
                      bottom: bp === "mobile" ? "0.5rem" : "3rem",
                      width: "100px",
                      height: "100px",
                      zIndex: 10,
                    }}
                  >
                    <Image
                      src="/images/flower.png"
                      alt="Flower Sticker"
                      fill
                      sizes="75px"
                      style={{ objectFit: "contain" }}
                    />
                  </motion.div>
                  <div
                    style={{
                      position: "absolute",
                      top: bp === "mobile" ? "8rem" : "11rem",
                      right: bp === "mobile" ? "8%" : "26%",
                      zIndex: 9,
                      fontSize: "1.4rem",
                      opacity: 0.85,
                    }}
                  >
                    ✧
                  </div>
                  <motion.div
                    className="ab-butterfly"
                    animate={{ rotate: [-6, 6, -6] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{
                      position: "absolute",
                      top: bp === "mobile" ? "0.5rem" : "4rem",
                      left: bp === "mobile" ? "-0.5rem" : "-1rem",
                      width: "75px",
                      height: "75px",
                      zIndex: 10,
                    }}
                  >
                    <Image
                      src="/images/butterfly.png"
                      alt="Butterfly Sticker"
                      fill
                      sizes="65px"
                      style={{ objectFit: "contain" }}
                    />
                  </motion.div>
                </div>
              </FadeReveal>

              {/* Column rule — desktop only */}
              {bp === "desktop" && (
                <div
                  className="ab-col-rule"
                  style={{ background: "#57552725", alignSelf: "stretch" }}
                />
              )}

              {/* CONTENT COLUMN */}
              <div
                ref={contentRef}
                className="ab-content-col"
                style={{ position: "relative" }}
              >
                <FadeReveal>
                  <p
                    style={{
                      fontSize: "0.52rem",
                      letterSpacing: "0.35em",
                      textTransform: "uppercase",
                      color: "#928e5e",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Chapter 01 · Featured Profile
                  </p>
                </FadeReveal>
                <FadeReveal delay={0.15}>
                  <p
                    className="ab-serif ab-standfirst"
                    style={{
                      fontSize: "clamp(0.9rem,2vw,1.05rem)",
                      lineHeight: 1.7,
                      color: "#575527cc",
                      borderTop: "2px solid #b97d7b",
                      borderBottom: "1px solid #57552720",
                      padding: "0.7rem 0",
                      marginBottom: "1.2rem",
                      fontStyle: "italic",
                    }}
                  >
                    A fresh graduate who builds digital products with both logic
                    and creativity in mind.
                  </p>
                </FadeReveal>
                <FadeReveal delay={0.2}>
                  <p
                    style={{
                      fontSize: "clamp(0.88rem,1.8vw,0.95rem)",
                      lineHeight: 2,
                      textAlign: "justify",
                      color: "#575527dd",
                      marginBottom: "1rem",
                    }}
                  >
                    I&rsquo;m{" "}
                    <span
                      style={{
                        position: "relative",
                        display: "inline-block",
                        color: "#B97D7B",
                        fontWeight: 600,
                      }}
                    >
                      Ma. Milagros E. Abadinas
                      <svg
                        style={{
                          position: "absolute",
                          bottom: "-2px",
                          left: 0,
                          width: "100%",
                          overflow: "visible",
                        }}
                        viewBox="0 0 200 12"
                        fill="none"
                      >
                        <path
                          d="M2 9 C50 14,100 2,150 9 S190 14,198 9"
                          stroke="#928e5e"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeDasharray="250"
                          strokeDashoffset={underlineVis ? "0" : "250"}
                          style={{
                            transition:
                              "stroke-dashoffset 1.2s 0.5s cubic-bezier(.4,0,.2,1)",
                          }}
                        />
                      </svg>
                    </span>{" "}
                    — a fresh IT graduate who enjoys building thoughtful digital
                    products with both logic and creativity.
                  </p>
                </FadeReveal>
                <FadeReveal delay={0.3}>
                  <p
                    style={{
                      fontSize: "clamp(0.85rem,1.7vw,0.9rem)",
                      lineHeight: 2,
                      textAlign: "justify",
                      color: "#575527aa",
                      marginBottom: "1.8rem",
                    }}
                  >
                    My journey into development started with curiosity. During
                    internship and project experiences I realized: technology is
                    not just about writing code — it is about creating
                    experiences people remember.
                  </p>
                </FadeReveal>
                <FadeReveal delay={0.38}>
                  <div
                    style={{
                      borderLeft: "4px solid #b97d7b",
                      margin: "1.5rem 0 2rem",
                      background: "rgba(236,196,195,0.12)",
                      padding: "1rem 1.2rem",
                    }}
                  >
                    <p
                      className="ab-display"
                      style={{
                        fontSize: "clamp(0.95rem,2vw,1.15rem)",
                        fontStyle: "italic",
                        color: "#2e2a0e",
                        lineHeight: 1.5,
                      }}
                    >
                      &ldquo;Technology is not just about writing code — it is
                      about creating experiences people remember.&rdquo;
                    </p>
                  </div>
                </FadeReveal>
                {/* Info cards */}
                <div
                  ref={cardsRef}
                  className="ab-cards-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: bp === "mobile" ? "1fr" : "1fr 1fr",
                    gap: bp === "mobile" ? "1.5rem" : "1rem",
                  }}
                >
                  {[
                    {
                      num: "01",
                      label: "Achievement",
                      title: "Magna Cum Laude",
                      body: "Bachelor of Science in Information Technology",
                      accent: "#b97d7b",
                      rot: bp === "mobile" ? 0 : -1,
                    },
                    {
                      num: "02",
                      label: "Philosophy",
                      title: "Growth Through Curiosity",
                      body: "Learning never stops. Every project is another chapter.",
                      accent: "#ecc4c3",
                      rot: bp === "mobile" ? 0 : 1,
                    },
                  ].map(({ num, label, title, body, accent, rot }) => (
                    <FadeReveal key={num} delay={0.5}>
                      <div
                        className="ab-card"
                        style={{ transform: `rotate(${rot}deg)` }}
                      >
                        <div
                          className="ab-display"
                          style={{
                            position: "absolute",
                            top: "-0.5rem",
                            right: "0.5rem",
                            fontSize: "5rem",
                            fontWeight: 900,
                            color: `${accent}20`,
                            lineHeight: 1,
                            userSelect: "none",
                          }}
                        >
                          {num}
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            top: "-8px",
                            left: "50%",
                            transform: "translateX(-50%) rotate(-3deg)",
                            width: "55px",
                            height: "14px",
                            background: "rgba(236,196,195,0.55)",
                            backgroundImage:
                              "repeating-linear-gradient(90deg,transparent,transparent 7px,rgba(255,255,255,0.2) 7px,rgba(255,255,255,0.2) 9px)",
                          }}
                        />
                        <div
                          style={{
                            width: "40px",
                            height: "3px",
                            background: accent,
                            marginBottom: "0.8rem",
                          }}
                        />
                        <p
                          style={{
                            fontSize: "0.52rem",
                            letterSpacing: "0.3em",
                            textTransform: "uppercase",
                            color: "#928e5e",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {label}
                        </p>
                        <h3
                          className="ab-display"
                          style={{
                            fontSize: "1.2rem",
                            marginBottom: "0.5rem",
                            color: "#2e2a0e",
                            fontWeight: 700,
                          }}
                        >
                          {title}
                        </h3>
                        <p
                          style={{
                            fontSize: "0.82rem",
                            color: "#575527bb",
                            lineHeight: 1.8,
                          }}
                        >
                          {body}
                        </p>
                      </div>
                    </FadeReveal>
                  ))}
                </div>
              </div>
            </div>
          </SectionContainer>
        </Container>
      </section>
    </>
  );
}
