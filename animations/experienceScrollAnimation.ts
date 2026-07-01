import { gsap, ScrollTrigger } from "@/lib/gsap";

export const experienceScrollAnimation = (
  section: HTMLElement,
  chapter: HTMLDivElement,
  heading: HTMLHeadingElement,
  timeline: HTMLDivElement,
  internship: HTMLDivElement,
) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 20%",
      end: "bottom top",
      scrub: 1.2,
    },
  });

  tl.to(
    chapter,
    {
      y: -120,
      opacity: 0.01,
    },
    0,
  )

    .to(
      heading,
      {
        y: -40,
      },
      0,
    )

    .to(
      timeline,
      {
        y: -60,
      },
      0,
    )

    .to(
      internship,
      {
        y: -40,
      },
      0,
    );

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
  };
};
