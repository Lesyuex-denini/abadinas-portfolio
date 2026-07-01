"use client";

import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

const sections = [
  {
    id: "about",
    label: "About",
    chapter: "01",
  },

  {
    id: "experience",
    label: "Experience",
    chapter: "02",
  },

  {
    id: "services",
    label: "Services",
    chapter: "03",
  },

  {
    id: "skills",
    label: "Skills",
    chapter: "04",
  },

  {
    id: "recognitions",
    label: "Recognitions",
    chapter: "05",
  },
];

const navThemes = {
  about: {
    glass: "bg-[rgba(255,248,240,0.75)]",
    text: "text-[#575527]",
    logo: "text-[#B97D7B]",
  },

  experience: {
    glass: "bg-[rgba(236,196,195,0.70)]",
    text: "text-[#575527]",
    logo: "text-[#B97D7B]",
  },

  services: {
    glass: "bg-[rgba(185,125,123,0.72)]",
    text: "text-white",
    logo: "text-[#FFF8F0]",
  },

  skills: {
    glass: "bg-[rgba(146,142,94,0.75)]",
    text: "text-white",
    logo: "text-[#FFF8F0]",
  },

  recognitions: {
    glass: "bg-[rgba(87,85,39,0.82)]",
    text: "text-white",
    logo: "text-white",
  },
};

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState("");
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentTheme =
    navThemes[activeSection as keyof typeof navThemes] ?? navThemes.about;

  const darkSections = ["services", "skills", "recognitions"];

  const projectButtonTheme = darkSections.includes(activeSection)
    ? "bg-white/10 text-white border-white/20"
    : "bg-white/40 text-[#575527] border-[#57552720]";

  const contactButtonTheme =
    activeSection === "recognitions"
      ? "bg-[#928e5e] text-white"
      : "bg-[#575527] text-white";

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {}, 1000);

      const current = sections.find((section) => {
        const el = document.getElementById(section.id);

        if (!el) return false;

        const rect = el.getBoundingClientRect();

        return rect.top <= 250 && rect.bottom >= 250;
      });

      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <header
      className={`
        fixed
        top-0
        left-0
        right-0

        z-[9999]

        transition-all
        duration-700

        ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
      `}
    >
      <div
        className="
          max-w-7xl
          mx-auto

          px-5
          sm:px-6
          lg:px-10

          pt-5
        "
      >
        <div
          className={`
            backdrop-blur-xl

            border
            border-white/20

            ${currentTheme.glass}

            rounded-[28px]

            w-full

            px-6
            md:px-8

            py-4

            flex
            items-center
            justify-between

            gap-6

            shadow-[0_10px_40px_rgba(0,0,0,0.08)]

            transition-all
            duration-700
            `}
        >
          {/* LOGO */}

          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className={`
              editorial-title
                text-4xl
                whitespace-nowrap
                font-bold
                ${currentTheme.logo}
                transition-all
                duration-700
            `}
          >
            ℳ
          </button>

          {/* MOBILE MENU BUTTON */}

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="
            lg:hidden
            bg-[#fffaf5]

            flex
            items-center
            justify-center

            h-11
            w-11

            rounded-full

            border
            border-[#57552720]

            text-[#575527]
        "
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* CENTER NAV */}

          <nav
            className="
              hidden
              lg:flex
              items-center
              gap-2
              flex-wrap
              
            "
          >
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`
                  px-4
                  py-2

                  rounded-full

                  text-sm

                  transition-all
                  duration-300

                  ${
                    activeSection === section.id
                      ? "bg-[#B97D7B] text-white shadow-md"
                      : `${currentTheme.text} hover:bg-white/10`
                  }
                `}
              >
                {section.label}
              </button>
            ))}
          </nav>

          {/* ACTION BUTTONS */}

          <div
            className="
                hidden
                lg:flex
                items-center
                gap-2
                shrink-0
            "
          >
            <Link
              href="/projects"
              className={`
                px-4
                py-2
                rounded-full
                border
                border-[#b97d7b]
                text-sm

                ${projectButtonTheme}

                hover:bg-[#928e5e]
                hover:text-white

                transition-all
                duration-300
            `}
            >
              Projects
            </Link>

            <Link
              href="/contact"
              className={`
                px-4
                py-2

                rounded-full
                text-white

                text-sm
                ${contactButtonTheme}

                hover:opacity-90

                transition-all
                duration-300
            `}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="
            fixed
            inset-0

            z-[10000]

            bg-[#fffaf5]/20
            backdrop-blur-lg
            "
        >
          <div
            className="
            fixed
            top-0
            left-0
            right-0
            bg-[rgba(255,250,245,0.82)]
            border
            border-white/30

            rounded-b-[28px]

            shadow-[0_20px_60px_rgba(0,0,0,0.12)]
            p-8
            flex
            flex-col
            
        "
          >
            {/* HEADER */}

            <div
              className="
                flex
                items-center
                justify-end
                mb-10
                "
            >
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="
                text-4xl
                leading-none
                text-[#575527]
            "
              >
                ×
              </button>
            </div>

            {/* NAVIGATION */}

            <div className="space-y-2 ">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    scrollToSection(section.id);
                    setMobileMenuOpen(false);
                  }}
                  className="
                    flex
                    
                    items-center
                    
                    gap-3

                    w-full

                    px-4
                    py-4

                    rounded-xl

                    text-left

                    border-b 
                    border-[#57552710]
                    "
                >
                  <span
                    className="
                    text-[#B97D7B]
                    font-medium
                "
                  >
                    {section.chapter}
                  </span>

                  <span>{section.label}</span>
                </button>
              ))}
            </div>

            {/* ACTIONS */}

            <div className="mt-auto space-y-3">
              <Link
                href="/projects"
                onClick={() => setMobileMenuOpen(false)}
                className="
                block
                w-full
                py-3
                rounded-full
                text-center
                border
                border-[#b97d7b]
            "
              >
                Projects
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="
                block
                w-full
                py-3
                rounded-full
                text-center
                bg-[#575527]
                text-white
            "
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
