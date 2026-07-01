import { gsap, ScrollTrigger } from "@/lib/gsap";

export const aboutScrollAnimation = (
  section: HTMLElement,
  image: HTMLDivElement,
  chapter: HTMLDivElement,
  heading: HTMLHeadingElement,
  content: HTMLDivElement,
  cards: HTMLDivElement,
) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "center center",
      end: "bottom top",
      scrub: 1.5,
    },
  });

  tl.to(
    image,
    {
      y: -80,
      rotate: -4,
    },
    0,
  )

    .to(
      chapter,
      {
        y: -120,
        scale: 1.2,
        opacity: 0.02,
      },
      0,
    )

    .to(
      heading,
      {
        y: -50,
      },
      0,
    )

    .to(
      content,
      {
        y: -40,
      },
      0,
    )

    .to(
      cards,
      {
        y: -80,
      },
      0,
    );

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
  };
};
