import { gsap, ScrollTrigger } from "@/lib/gsap";

export const heroScrollAnimation = (
  hero: HTMLElement,
  imageContainer: HTMLDivElement,
  heading: HTMLHeadingElement,
  paragraph: HTMLDivElement,
  leftContent: HTMLDivElement,
) => {
  console.log("Hero Scroll Animation Initialized");

  // Give the section real depth so the photo "plate" can turn in 3D
  // space instead of doing a flat 2D spin — and pre-set the properties
  // we're about to animate so GSAP has a clean start value to tween from.
  gsap.set(hero, { perspective: 1200 });
  gsap.set(imageContainer, {
    transformOrigin: "right center",
    clipPath: "inset(0% 0% 0% 0%)",
  });
  gsap.set(heading, {
    transformOrigin: "left center",
    letterSpacing: "0em",
  });
  gsap.set(paragraph, { filter: "blur(0px)" });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "+=120%",
      scrub: 1.5,
      pin: true,
    },
  });

  tl.to(
    // Photo plate: tilts away in 3D and crops inward as it scales down —
    // reads like a print photo being turned and filed back into the
    // spread, rather than a flat sticker shrinking and spinning.
    imageContainer,
    {
      y: -70,
      rotateY: -18,
      rotateX: 3,
      scale: 0.94,
      clipPath: "inset(0% 0% 0% 6%)",
      ease: "none",
    },
    0,
  )
    .to(
      // Headline: tracks open slightly and scales down as it lifts —
      // a masthead pulling taut on its way out, not just a fade.
      heading,
      {
        y: -120,
        scale: 0.88,
        letterSpacing: "0.04em",
        opacity: 0.3,
        ease: "none",
      },
      0,
    )
    .to(
      // Lede paragraph: exits with a focus-pull (blur), the way an
      // editorial spread shifts depth of field, instead of a flat fade.
      paragraph,
      {
        y: -60,
        opacity: 0,
        filter: "blur(6px)",
        ease: "none",
      },
      0,
    )
    .to(
      // Byline / index column: wipes out edge-to-edge via clip-path,
      // like a folio sliding out of frame, instead of a plain fade.
      leftContent,
      {
        y: -60,
        opacity: 0,
        clipPath: "inset(0% 0% 0% 100%)",
        ease: "none",
      },
      0,
    );

  return () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
};
