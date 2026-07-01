import { gsap, ScrollTrigger } from "@/lib/gsap";

export const skillsScrollAnimation = (
  section: HTMLElement,
  chapter: HTMLDivElement,
  heading: HTMLHeadingElement,
  board: HTMLDivElement,
  quote: HTMLDivElement,
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
      board,
      {
        y: -70,
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

  const boardsAnimation = gsap.to(".skill-board", {
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

    boardsAnimation.scrollTrigger?.kill();
    boardsAnimation.kill();
  };
};
