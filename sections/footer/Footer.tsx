// sections/footer/Footer.tsx
"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import FadeReveal from "@/components/motion/FadeReveal";

/* ─── STYLES (scoped, matches Hero's mag- system) ─── */
const FOOTER_CSS = `
.mag-footer {
  position: relative;
  background: #3B3B1A;
  color: #fff9f5;
  overflow: hidden;
}
.mag-footer-link {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem;
  color: rgba(255,249,245,0.72);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  text-align: left;
  transition: color 0.2s, gap 0.2s;
}
.mag-footer-link:hover {
  color: #ecc4c3;
  gap: 0.7rem;
}
.mag-footer-link svg { flex-shrink: 0; opacity: 0.6; transition: opacity 0.2s; }
.mag-footer-link:hover svg { opacity: 1; }
.mag-footer-heading {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.55rem;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: #b97d7b;
  margin-bottom: 1.1rem;
  display: block;
}
.mag-footer-social {
  width: 36px;
  height: 36px;
  border: 1px solid rgba(255,249,245,0.25);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,249,245,0.8);
  transition: all 0.25s ease;
  text-decoration: none;
}
.mag-footer-social:hover {
  background: #b97d7b;
  border-color: #b97d7b;
  color: #fff9f5;
  transform: translateY(-3px);
}
.mag-footer-backtotop {
  font-family: 'DM Sans', sans-serif;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,249,245,0.7);
  background: transparent;
  border: 1px solid rgba(255,249,245,0.25);
  padding: 0.7rem 1.1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  cursor: pointer;
  transition: all 0.25s ease;
}
.mag-footer-backtotop:hover {
  background: #fff9f5;
  color: #2e2a0e;
  border-color: #fff9f5;
}
.mag-footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
  gap: 2.5rem;
}
@media (max-width: 1023px) {
  .mag-footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2.2rem 1.5rem;
  }
}
@media (max-width: 639px) {
  .mag-footer-grid {
    grid-template-columns: 1fr;
    gap: 2.2rem;
  }
  .mag-footer-bottom {
    flex-direction: column !important;
    text-align: center !important;
    gap: 0.8rem !important;
  }
}
`;

/* Mirrors FloatingNav's `sections` array exactly */
const SECTIONS = [
  { id: "about", label: "About", chapter: "01" },
  { id: "experience", label: "Experience", chapter: "02" },
  { id: "services", label: "Services", chapter: "03" },
  { id: "skills", label: "Skills", chapter: "04" },
  { id: "recognitions", label: "Recognitions", chapter: "05" },
];

const SOCIALS = [
  {
    title: "LinkedIn",
    href: "https://linkedin.com/in/mila-abadinas-80951127b",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.07-.02-2.45-1.49-2.45-1.5 0-1.73 1.17-1.73 2.37v4.58h-3v-9h2.88v1.23h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v4.74z" />
      </svg>
    ),
  },
  {
    title: "GitHub",
    href: "https://github.com/",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.11.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18.92-.26 1.91-.38 2.89-.39.98.01 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.79.55C20.71 21.38 24 17.08 24 12c0-6.35-5.15-11.5-12-11.5z" />
      </svg>
    ),
  },
  {
    title: "Email",
    href: "mailto:hello@milaabadinas.dev",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M22 6l-10 7L2 6" />
        <path d="M2 6h20v12H2z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  /* Same logic FloatingNav would need: scroll if already on "/",
     otherwise navigate home then let the hash land on the section. */
  function goToSection(id: string) {
    if (pathname === "/") {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push(`/#${id}`);
    }
  }

  function scrollToTop() {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FOOTER_CSS }} />
      <footer className="mag-footer">
        <div style={{ borderTop: "3px solid #b97d7b" }} />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 20% 0%, rgba(185,125,123,0.12) 0%, transparent 55%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            padding: "4rem clamp(1rem,5vw,4rem) 2.5rem",
            maxWidth: "1440px",
            margin: "0 auto",
          }}
        >
          <div className="mag-footer-grid">
            {/* ── COLUMN 1: Masthead recap + tagline ── */}
            <FadeReveal delay={0.05}>
              <div>
                <div
                  style={{
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: "0.5rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "#928e5e",
                    marginBottom: "0.4rem",
                  }}
                >
                  Vol. I, No. 1 · Established 2026
                </div>
                <div
                  className="mag-display"
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "1.9rem",
                    fontWeight: 900,
                    letterSpacing: "0.04em",
                    color: "#fff9f5",
                    lineHeight: 1,
                    marginBottom: "1rem",
                  }}
                >
                  Mila Abadinas
                </div>
                <p
                  style={{
                    fontFamily: "'Libre Baskerville',serif",
                    fontStyle: "italic",
                    fontSize: "0.82rem",
                    lineHeight: 1.8,
                    color: "rgba(255,249,245,0.62)",
                    maxWidth: "30ch",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      float: "left",
                      fontFamily: "'Playfair Display',serif",
                      fontSize: "2.1rem",
                      lineHeight: 0.75,
                      marginRight: "0.1rem",
                      marginTop: "0.1rem",
                      color: "#b97d7b",
                      fontWeight: 900,
                    }}
                  >
                    I
                  </span>
                  build with purpose, grow with intention, and create to make a
                  difference.
                </p>
              </div>
            </FadeReveal>

            {/* ── COLUMN 2: This Issue (mirrors FloatingNav sections) ── */}
            <FadeReveal delay={0.12}>
              <div>
                <span className="mag-footer-heading">This Issue</span>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.7rem",
                  }}
                >
                  {SECTIONS.map(({ id, label, chapter }) => (
                    <button
                      key={id}
                      onClick={() => goToSection(id)}
                      className="mag-footer-link"
                    >
                      <span style={{ opacity: 0.45, fontSize: "0.6rem" }}>
                        {chapter}
                      </span>
                      {label}
                    </button>
                  ))}
                  <Link href="/projects" className="mag-footer-link">
                    <span style={{ opacity: 0.45, fontSize: "0.6rem" }}>
                      06
                    </span>
                    Projects
                  </Link>
                </div>
              </div>
            </FadeReveal>

            {/* ── COLUMN 3: Direct contact ── */}
            <FadeReveal delay={0.19}>
              <div>
                <span className="mag-footer-heading">Get In Touch</span>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.7rem",
                  }}
                >
                  <a
                    href="mailto:hello@milaabadinas.dev"
                    className="mag-footer-link"
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M22 6l-10 7L2 6" />
                      <path d="M2 6h20v12H2z" />
                    </svg>
                    hello@milaabadinas.dev
                  </a>
                  <span
                    className="mag-footer-link"
                    style={{ cursor: "default" }}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    Manila, Philippines
                  </span>
                  <Link href="/contact" className="mag-footer-link">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    Contact Form
                  </Link>
                  <a
                    href="/resume/MaMilagrosAbadinas_Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="mag-footer-link"
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" />
                    </svg>
                    Download Résumé
                  </a>
                </div>
              </div>
            </FadeReveal>

            {/* ── COLUMN 4: Socials + back to top ── */}
            <FadeReveal delay={0.26}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "1.2rem",
                }}
              >
                <div>
                  <span className="mag-footer-heading">Follow Along</span>
                  <div style={{ display: "flex", gap: "0.6rem" }}>
                    {SOCIALS.map(({ title, href, icon }) => (
                      <a
                        key={title}
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="mag-footer-social"
                        aria-label={title}
                        title={title}
                      >
                        {icon}
                      </a>
                    ))}
                  </div>
                </div>
                <motion.button
                  onClick={scrollToTop}
                  className="mag-footer-backtotop"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                  Back to Top
                </motion.button>
              </div>
            </FadeReveal>
          </div>

          {/* ── Colophon / closing rule ── */}
          <div
            style={{
              marginTop: "3rem",
              paddingTop: "1.4rem",
              borderTop: "1px double rgba(255,249,245,0.25)",
            }}
          >
            <div
              className="mag-footer-bottom"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.6rem",
                fontFamily: "'DM Sans',sans-serif",
                fontSize: "0.52rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,249,245,0.45)",
              }}
            >
              <span>
                © {new Date().getFullYear()} Mila Abadinas. All Rights Reserved.
              </span>
              <span
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                Designed &amp; Built by Mila Abadinas
                <span style={{ color: "#b97d7b" }}>✦</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
