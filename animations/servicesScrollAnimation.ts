import { gsap, ScrollTrigger } from "@/lib/gsap";

export const servicesScrollAnimation = (
  section: HTMLElement,
  chapter: HTMLDivElement,
  heading: HTMLHeadingElement,
  intro: HTMLParagraphElement,
) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "center center",
      end: "bottom top",
      scrub: 1,
    },
  });

  tl.to(
    chapter,
    {
      y: -150,
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
      intro,
      {
        y: -20,
      },
      0,
    );

  gsap.to(".service-card", {
    y: (index) => -(index + 1) * 40,

    scrollTrigger: {
      trigger: section,
      start: "top 60%",
      end: "bottom top",
      scrub: true,
    },
  });

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
  };
};
