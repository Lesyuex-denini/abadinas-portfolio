"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timeout = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 3500);
    return () => {
      clearTimeout(timeout);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            overflow: "hidden",
            background: "#1a1610",
          }}
        >
          {/* ══ STAGE CONTENT — sits behind the curtain, revealed as panels part ══ */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "2rem",
              zIndex: 1,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.55rem",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "rgba(255,249,245,0.55)",
                marginBottom: "0.6rem",
              }}
            >
              Vol. I &middot; 2026 Edition
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(2.5rem,7vw,5rem)",
                fontWeight: 900,
                letterSpacing: "0.08em",
                color: "#fff9f5",
                textTransform: "uppercase",
                lineHeight: 0.9,
                marginBottom: "1.8rem",
                textAlign: "center",
              }}
            >
              Mila
              <br />
              Abadinas
            </motion.div>

            <motion.svg
              initial={{ opacity: 0, scale: 0.6, rotate: -25 }}
              animate={{ opacity: 0.3, scale: 1, rotate: 0 }}
              transition={{
                duration: 1.1,
                delay: 0.8,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              width="92"
              height="92"
              viewBox="0 0 80 80"
              fill="none"
              style={{ marginBottom: "1.8rem" }}
            >
              {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
                <ellipse
                  key={i}
                  cx="40"
                  cy="22"
                  rx="9"
                  ry="14"
                  fill="#fff9f5"
                  opacity="0.7"
                  transform={`rotate(${a} 40 40)`}
                />
              ))}
              <circle cx="40" cy="40" r="8" fill="#fff9f5" opacity="0.6" />
            </motion.svg>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: "60%",
                height: "1px",
                background: "rgba(255,249,245,0.3)",
                marginBottom: "1.3rem",
              }}
            />

            {/* Stage floor glow */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "70%",
                height: "40%",
                background:
                  "radial-gradient(ellipse at center, rgba(255,249,245,0.12) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* ══ HOUSE LIGHTS DIM-UP — subtle warm wash behind everything ══ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 50% 40%, rgba(185,125,123,0.25) 0%, transparent 65%)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          {/* ══ CURTAIN — LEFT PANEL ══ */}
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "-101%" }}
            transition={{
              duration: 1.4,
              delay: 1.85,
              ease: [0.65, 0, 0.35, 1],
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "50%",
              height: "100%",
              zIndex: 3,
              transformStyle: "preserve-3d",
              transformOrigin: "left center",
            }}
          >
            <CurtainPanel side="left" />
          </motion.div>

          {/* ══ CURTAIN — RIGHT PANEL ══ */}
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "101%" }}
            transition={{
              duration: 1.4,
              delay: 1.85,
              ease: [0.65, 0, 0.35, 1],
            }}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "50%",
              height: "100%",
              zIndex: 3,
              transformStyle: "preserve-3d",
              transformOrigin: "right center",
            }}
          >
            <CurtainPanel side="right" />
          </motion.div>

          {/* ══ CENTER SEAM HIGHLIGHT — sells the "parting" moment ══ */}
          <motion.div
            initial={{ opacity: 0.9 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.85 }}
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "6px",
              height: "100%",
              background:
                "linear-gradient(90deg, transparent, rgba(0,0,0,0.45), transparent)",
              zIndex: 4,
              pointerEvents: "none",
            }}
          />

          {/* ══ FINAL FADE — covers the brief gap before unmount ══ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════
   CURTAIN PANEL — heavy velvet fabric with fold ridges,
   a fringed trim along the parting edge, and a soft
   directional sheen to fake stage lighting.
═══════════════════════════════════════════════════ */
function CurtainPanel({ side }: { side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background:
          "linear-gradient(155deg,#c98f8d 0%,#b97d7b 38%,#8f5a58 72%,#74443f 100%)",
        boxShadow: isLeft
          ? "inset -40px 0 80px rgba(0,0,0,0.35)"
          : "inset 40px 0 80px rgba(0,0,0,0.35)",
      }}
    >
      {/* Velvet fold ridges — repeating vertical highlight/shadow bands */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `repeating-linear-gradient(
            ${isLeft ? "100deg" : "80deg"},
            rgba(255,255,255,0.08) 0px,
            rgba(255,255,255,0.08) 3px,
            transparent 3px,
            transparent 26px,
            rgba(0,0,0,0.16) 26px,
            rgba(0,0,0,0.16) 30px,
            transparent 30px,
            transparent 52px
          )`,
          mixBlendMode: "overlay",
        }}
      />

      {/* Soft top-down stage light sheen */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(255,249,245,0.18) 0%, transparent 35%, transparent 70%, rgba(0,0,0,0.25) 100%)",
        }}
      />

      {/* Parting-edge fringe + braid trim */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          [isLeft ? "right" : "left"]: 0,
          width: "14px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, transparent, rgba(245,214,122,0.55))",
            opacity: isLeft ? 1 : 0,
            transform: isLeft ? "none" : "scaleX(-1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(270deg, transparent, rgba(245,214,122,0.55))",
            opacity: isLeft ? 0 : 1,
          }}
        />
      </div>

      {/* Decorative corner flourish, top of the parting edge */}
      <div
        style={{
          position: "absolute",
          top: "2.5rem",
          [isLeft ? "right" : "left"]: "1.4rem",
          fontFamily: "'Playfair Display',serif",
          fontSize: "1.6rem",
          color: "rgba(255,249,245,0.4)",
          lineHeight: 1,
          transform: isLeft ? "none" : "scaleX(-1)",
        }}
      >
        ❦
      </div>

      {/* Bottom torn/scalloped hem matching site's editorial motif */}
      <div
        style={{
          position: "absolute",
          bottom: -1,
          left: 0,
          right: 0,
          height: "16px",
          background: "#1a1610",
          clipPath:
            "polygon(0 100%,0 35%,6% 60%,12% 32%,18% 65%,24% 35%,30% 62%,36% 32%,42% 60%,48% 36%,54% 65%,60% 34%,66% 60%,72% 32%,78% 65%,84% 35%,90% 60%,96% 32%,100% 55%,100% 100%)",
          opacity: 0.5,
        }}
      />
    </div>
  );
}
