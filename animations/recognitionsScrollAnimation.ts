import { gsap, ScrollTrigger } from "@/lib/gsap";

export const recognitionsScrollAnimation = (
  section: HTMLElement,
  chapter: HTMLDivElement,
  heading: HTMLHeadingElement,
  quote: HTMLDivElement,
) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      end: "bottom top",
      scrub: 1.2,
    },
  });

  tl.to(
    chapter,
    {
      y: -180,
      opacity: 0,
    },
    0,
  )

    .to(
      heading,
      {
        y: -80,
      },
      0,
    )

    .to(
      quote,
      {
        y: -60,
      },
      0,
    );

  const archiveAnimation = gsap.to(".recognition-entry", {
    y: (index) => -(index + 1) * 40,

    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      end: "bottom top",
      scrub: true,
    },
  });

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();

    archiveAnimation.scrollTrigger?.kill();
    archiveAnimation.kill();
  };
};
