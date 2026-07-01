"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";

import { ReactNode, useRef } from "react";

interface Props {
  children: ReactNode;
}

export default function MagneticButton({ children }: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x);
  const springY = useSpring(y);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const moveX = e.clientX - rect.left - width / 2;

    const moveY = e.clientY - rect.top - height / 2;

    x.set(moveX * 0.2);
    y.set(moveY * 0.2);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      className="
                px-8
                py-4
                rounded-full
                bg-[#575527]
                text-[#DDD3C9]
                font-medium
                transition-all
                duration-300
                hover:scale-105
            "
    >
      {children}
    </motion.button>
  );
}
