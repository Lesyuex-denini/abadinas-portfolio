"use client";

import { motion } from "framer-motion";

import FloralSticker from "./FloralSticker";
import TapeStrip from "./TapeStrip";

import { BriefcaseBusiness } from "lucide-react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";

export default function ContactSidebar() {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <div
        className="
          relative

          overflow-hidden

          rounded-[40px]

          border
          border-[#E8DED4]

          bg-[#F7EFE8]

          p-8
          md:p-10

          shadow-[0_24px_60px_rgba(89,56,56,0.10)]
        "
      >
        {/* WATERMARK */}

        <div
          className="
            pointer-events-none

            absolute
            -bottom-10
            -right-10

            opacity-10
          "
        >
          <FloralSticker type="pansy" size={220} />
        </div>

        {/* CONTACT INFORMATION */}

        <div className="relative mb-10">
          <TapeStrip
            className="
              -top-4
              right-8
            "
          />

          <div
            className="
              relative

              rotate-[-2deg]

              rounded-[24px]

              border
              border-[#E8DED4]

              bg-[#FFFAF6]

              p-6

              shadow-[0_4px_18px_rgba(89,56,56,0.07)]
            "
          >
            <p
              className="
                mb-2

                text-[10px]

                uppercase

                tracking-[0.3em]

                text-[#928e5e]
              "
            >
              Contact Information
            </p>

            <div className="space-y-2">
              <div className="flex gap-3">
                <span className="text-[#b97d7b]">✉</span>

                <div>
                  <p
                    className="
                      text-[10px]

                      uppercase

                      tracking-[0.2em]

                      text-[#b97d7b]
                    "
                  >
                    Email
                  </p>

                  <p className="font-editorial-body text-[#3a3010]">
                    abadinasmilagros@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="text-[#b97d7b]">✆</span>

                <div>
                  <p
                    className="
                      text-[10px]

                      uppercase

                      tracking-[0.2em]

                      text-[#b97d7b]
                    "
                  >
                    Phone
                  </p>

                  <p className="font-editorial-body text-[#3a3010]">
                    09983073653
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="text-[#b97d7b]">⌖</span>

                <div>
                  <p
                    className="
                      text-[10px]

                      uppercase

                      tracking-[0.2em]

                      text-[#b97d7b]
                    "
                  >
                    Location
                  </p>

                  <p className="font-editorial-body text-[#3a3010]">
                    Pasig City, Philippines
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RESUME NOTE */}

        <div className="relative mb-7">
          <TapeStrip
            className="
              -top-2
              left-5
            "
          />

          <div
            className="
              rotate-[1.5deg]

              rounded-[24px]

              border
              border-[#ecc4c340]

              bg-[#ecc4c320]

              p-6
            "
          >
            <p
              className="
                mb-2

                text-[10px]

                uppercase

                tracking-[0.3em]

                text-[#928e5e]
              "
            >
              ✦ Resume
            </p>

            <p
              className="
                mb-2
                font-editorial-body
                leading-[1.8]

                text-[#575527bb]
              "
            >
              Download my latest resume to explore my technical background,
              projects, and professional experience.
            </p>

            <a
              href="/resume/MaMilagrosAbadinas_Resume.pdf"
              download
              className="
              font-ui
                inline-flex
                items-center
                gap-2

                rounded-full

                bg-[#575527]

                px-4
                py-3

                text-sm
                text-white

                transition-all

                hover:-translate-y-1
              "
            >
              <span className="font-ui">↓</span>
              Download Resume
            </a>
          </div>
        </div>

        {/* SOCIALS */}

        <div
          className="
          font-ui
            border-t
            border-[#E8DED4]

            pt-4
          "
        >
          <p
            className="
              mb-2

              text-[10px]

              uppercase

              tracking-[0.3em]

              text-[#928e5e]
            "
          >
            Connect Elsewhere
          </p>

          <div
            className="
              flex
              flex-wrap

              gap-3
            "
          >
            {/* LINKEDIN */}

            <a
              href="https://www.linkedin.com/in/mila-abadinas-80951127b/"
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-[#ecc4c370]

                bg-[#b97d7b]

                px-4
                py-3

                text-white

                transition-all

                hover:bg-[#111844]
                hover:shadow-lg
              "
            >
              <FaLinkedinIn size={14} />
              LinkedIn
            </a>

            {/* GITHUB */}

            <a
              href="https://github.com/Lesyuex-denini"
              target="_blank"
              rel="noreferrer"
              className="
                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-[#ecc4c370]

                bg-[#928e5e]

                px-4
                py-3

                text-white

                transition-all

                hover:bg-[#000000]
                hover:shadow-lg
              "
            >
              <FaGithub size={14} />
              GitHub
            </a>

            {/* PORTFOLIO */}

            <a
              href="https://abadinas-portfolio-npq8-five.vercel.app/"
              className="
                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-[#ecc4c370]

                bg-[#575527]

                px-4
                py-3

                text-white

                transition-all

                hover:bg-[#F59E0B]
                hover:shadow-lg
              "
            >
              <BriefcaseBusiness size={15} />
              Portfolio
            </a>
          </div>
        </div>

        {/* FOOTNOTE */}

        <div
          className="
            mt-7

            text-right

            text-[10px]

            uppercase

            tracking-[0.35em]

            text-[#b97d7b80]
          "
        >
          collected memories
        </div>
      </div>
    </motion.div>
  );
}
