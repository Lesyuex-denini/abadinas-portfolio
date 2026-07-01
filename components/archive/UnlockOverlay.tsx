"use client";

import { motion } from "framer-motion";
import { useArchive } from "@/context/ArchiveContext";

export default function UnlockOverlay() {
  const { isUnlocking } = useArchive();

  if (!isUnlocking) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999998,
        overflow: "hidden",
      }}
    >
      <motion.div
        animate={{
          x: ["0%", "0%", "-102%"],
          rotateY: [0, 0, 20],
        }}
        transition={{
          duration: 2.2,
          times: [0, 0.72, 1],
          ease: [0.4, 0, 0.2, 1],
        }}
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          background:
            "linear-gradient(155deg,#c98f8d 0%,#b97d7b 40%,#a06c6a 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Volume */}
        <div
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "0.55rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "rgba(255,249,245,0.6)",
            marginBottom: "0.5rem",
          }}
        >
          Vol. I · 2026 Edition
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "clamp(2.5rem,7vw,5rem)",
            fontWeight: 900,
            letterSpacing: "0.1em",
            color: "#fff9f5",
            textTransform: "uppercase",
            lineHeight: 0.9,
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Project
          <br />
          Archive
        </div>

        {/* Flower Seal */}
        <svg
          width="100"
          height="100"
          viewBox="0 0 80 80"
          fill="none"
          style={{
            opacity: 0.25,
            marginBottom: "2rem",
          }}
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
        </svg>

        {/* Divider */}
        <div
          style={{
            width: "60%",
            height: "1px",
            background: "rgba(255,249,245,0.3)",
            marginBottom: "1.2rem",
          }}
        />

        {/* Status */}
        <motion.div
          animate={{
            opacity: [0.45, 1, 0.45],
            y: [0, -2, 0],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "0.62rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(255,249,245,0.95)",
            border: "1px solid rgba(255,249,245,0.5)",
            padding: "0.7rem 2rem",
            background: "rgba(255,249,245,0.1)",
          }}
        >
          Opening Issue...
        </motion.div>

        {/* Decorative Corners */}
        {[
          { top: 16, left: 16 },
          { bottom: 16, right: 16 },
        ].map((position, i) => (
          <svg
            key={i}
            style={{
              position: "absolute",
              ...position,
              opacity: 0.2,
            }}
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <rect
              x="2"
              y="2"
              width="36"
              height="36"
              stroke="#fff9f5"
              strokeWidth="1"
            />
            <rect
              x="8"
              y="8"
              width="24"
              height="24"
              stroke="#fff9f5"
              strokeWidth="0.5"
            />
          </svg>
        ))}

        {/* Torn Edge */}
        <div
          style={{
            position: "absolute",
            bottom: -1,
            left: 0,
            right: 0,
            height: "18px",
            background: "#f7efe8",
            clipPath:
              "polygon(0 100%,0 40%,3% 60%,6% 35%,9% 70%,12% 40%,15% 65%,18% 35%,21% 60%,24% 38%,27% 68%,30% 40%,33% 60%,36% 36%,39% 70%,42% 42%,45% 64%,48% 36%,51% 70%,54% 42%,57% 60%,60% 36%,63% 68%,66% 40%,69% 62%,72% 35%,75% 68%,78% 40%,81% 60%,84% 35%,87% 65%,90% 38%,93% 70%,96% 42%,100% 60%,100% 100%)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
