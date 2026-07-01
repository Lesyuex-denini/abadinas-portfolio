"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      {/* MAIN CURSOR */}

      <div
        className="
          fixed
          z-[10000]
          pointer-events-none
          flex
          items-center
          justify-center
          h-8
          w-8
          rounded-full
          bg-[#FFF9F5]
          border-2
          border-[#ECC4C3]
          shadow-[0_8px_25px_rgba(185,125,123,0.25)]
        "
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <span
          className="
            text-[13px]
            text-[#B97D7B]
          "
        >
          ❀
        </span>
      </div>

      {/* FLOATING SPARKLE */}

      <div
        className="
          fixed
          z-[9998]
          pointer-events-none
          text-sm
          text-[#ECC4C3]
          opacity-80
        "
        style={{
          left: position.x - 14,
          top: position.y + 14,
          transform: "translate(-50%, -50%)",
        }}
      >
        ✦
      </div>
    </>
  );
}
