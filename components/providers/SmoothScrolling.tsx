"use client";
import Lenis from "lenis";
import { ReactNode, useEffect } from "react";

export default function SmoothScrolling({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Prevent browser from restoring old scroll position on reload
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Force scroll to top immediately, before any animation/raf starts
    lenis.scrollTo(0, { immediate: true });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
