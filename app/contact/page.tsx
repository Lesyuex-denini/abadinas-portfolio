"use client";
import Container from "@/components/layout/Container";
import FadeReveal from "@/components/motion/FadeReveal";
import SectionContainer from "@/components/layout/SectionContainer";
import PageHeader from "@/components/layout/PageHeader";
import ContactForm from "@/components/contact/ContactForm";
import ContactSidebar from "@/components/contact/ContactSidebar";
import FloralSticker from "@/components/contact/FloralSticker";
import Footer from "@/sections/footer/Footer";

export default function Contact() {
  return (
    <>
      <PageHeader />
      <section
        id="contact"
        className="
          relative
          min-h-screen
          overflow-hidden
          bg-[#ddd3c9]
          py-40
        "
      >
        {/* PAPER TEXTURE */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            opacity-[0.03]
            [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22400%22 height=%22400%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]
          "
        />

        {/* TOP LEFT */}
        <div className="absolute left-[3%] top-[6%] opacity-60">
          <FloralSticker type="daisy" size={95} />
        </div>
        <div className="absolute left-[6%] top-[10%] opacity-40">
          <FloralSticker type="leaf" size={70} />
        </div>
        <div className="absolute left-[8%] top-[4%] opacity-30">
          <FloralSticker type="rose" size={65} />
        </div>

        {/* TOP RIGHT */}
        <div className="absolute right-[4%] top-[5%] opacity-50">
          <FloralSticker type="butterfly" size={90} />
        </div>
        <div className="absolute right-[2%] top-[12%] opacity-40">
          <FloralSticker type="pansy" size={80} />
        </div>
        <div className="absolute right-[9%] top-[8%] opacity-50">
          <FloralSticker type="star" size={50} />
        </div>

        {/* LEFT CENTER */}
        <div className="absolute left-[1%] top-[40%] opacity-40">
          <FloralSticker type="ribbon" size={70} />
        </div>

        {/* RIGHT CENTER */}
        <div className="absolute right-[1%] top-[38%] opacity-40">
          <FloralSticker type="daisy" size={75} />
        </div>

        {/* BOTTOM */}
        <div className="absolute bottom-[6%] left-[5%] opacity-50">
          <FloralSticker type="pansy" size={85} />
        </div>
        <div className="absolute bottom-[4%] right-[6%] opacity-40">
          <FloralSticker type="butterfly" size={70} />
        </div>
        <div className="absolute bottom-[8%] right-[2%] opacity-30">
          <FloralSticker type="leaf" size={60} />
        </div>

        {/* LARGE WATERMARKS */}
        <div className="absolute -left-[5%] top-[20%] opacity-[0.07]">
          <FloralSticker type="rose" size={260} />
        </div>
        <div className="absolute -right-[6%] bottom-[5%] opacity-[0.06]">
          <FloralSticker type="rose" size={300} />
        </div>

        <Container>
          <SectionContainer>
            <div className="relative z-10 mx-auto max-w-[1400px]">
              {/* EYEBROW LABEL — mirrored from Skills masthead */}
              <FadeReveal>
                <div
                  className="ct-sans"
                  style={{
                    fontSize: "0.52rem",
                    letterSpacing: "0.35em",
                    textTransform: "uppercase",
                    color: "var(--meadow-mauve)",
                    marginBottom: "0.6rem",
                  }}
                >
                  Get In Touch
                </div>
              </FadeReveal>

              {/* HEADING */}
              <FadeReveal delay={0.1}>
                <h2
                  className="ct-display mb-8"
                  style={{
                    fontSize: "clamp(2.4rem, 7vw, 6rem)",
                    fontWeight: 900,
                    lineHeight: 0.9,
                    letterSpacing: "-0.01em",
                    color: "var(--soldier-green)",
                  }}
                >
                  Let&apos;s Build
                  <br />
                  <span
                    style={{
                      color: "var(--usu-koubai)",
                      fontStyle: "italic",
                    }}
                  >
                    Something
                  </span>{" "}
                  Purposeful
                </h2>
              </FadeReveal>

              {/* INTRO — mirrored from Skills standfirst */}
              <FadeReveal delay={0.2}>
                <p
                  className="ct-serif mb-18 max-w-[780px]"
                  style={{
                    fontSize: "clamp(0.85rem, 1.5vw, 1rem)",
                    lineHeight: 1.85,
                    fontStyle: "italic",
                    color: "var(--foreground)",
                    opacity: 0.75,
                    borderTop: "2px solid var(--usu-koubai)",
                    borderBottom: "1px solid rgba(87,85,39,0.2)",
                    padding: "0.7rem 0",
                  }}
                >
                  Whether you&apos;re looking for a developer, collaborator, or
                  someone to transform an idea into a meaningful digital
                  experience — I&apos;d love to learn more about your vision and
                  bring it to life together.
                </p>
              </FadeReveal>

              {/* GRID */}
              <div className="grid gap-10 lg:grid-cols-[1.4fr_0.85fr]">
                <ContactForm />
                <ContactSidebar />
              </div>
            </div>
          </SectionContainer>
        </Container>
      </section>
      <Footer />
    </>
  );
}
