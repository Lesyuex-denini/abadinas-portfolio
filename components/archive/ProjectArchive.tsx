"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { projectArchive } from "@/data/projectArchive";

export default function ProjectArchive() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#DDD3C9]"
    >
      <div className="max-w-[1500px] mx-auto px-8 md:px-18 py-8 md:py-14 md:pb-24">
        {/* HEADER */}
        <div
          className="
            flex justify-between items-center
            mb-10 pb-6
            border-b-[3px] border-[#575527]
          "
        >
          <Link
            href="/"
            className="
              uppercase tracking-[0.3em] text-sm text-[#B97D7B]
              hover:scale-105 hover:-translate-y-1
              transition-all
            "
          >
            ← Back Home
          </Link>
          <p className="text-sm tracking-[0.3em] uppercase text-[#928E5E]">
            Project Archive
          </p>
        </div>

        {/* MASTHEAD LINE */}
        <div
          className="
            flex flex-col md:flex-row
            md:items-end md:justify-between
            gap-3 mb-16
          "
        >
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#928E5E] mb-2">
              Issue No. 01 &middot; Selected Works
            </p>
            <h1
              className="mb-8"
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: "clamp(2.4rem, 7vw, 6rem)",
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: "-0.01em",
                color: "#575527",
              }}
            >
              The Archive
            </h1>
          </div>
          <p className="text-sm text-[#575527bb] max-w-xs leading-relaxed">
            {projectArchive.length} case studies in product design, full-stack
            development, and CMS engineering.
          </p>
        </div>

        {/* INDEX LIST */}
        <div className="flex flex-col">
          {projectArchive.map((project, i) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="
                  grid grid-cols-[3rem_1fr_auto] md:grid-cols-[5rem_1fr_180px]
                  items-center gap-6
                  py-7 md:py-9
                  border-t border-[#57552730]
                  group-hover:bg-white/30
                  transition-colors
                "
              >
                <span
                  className="
                    editorial-title text-2xl md:text-4xl
                    text-[#B97D7B]/70 group-hover:text-[#B97D7B]
                    transition-colors
                  "
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <h2
                    className="
                      editorial-title text-2xl md:text-4xl
                      text-[#2E2A0E] mb-1
                      group-hover:text-[#575527]
                      transition-colors
                    "
                  >
                    {project.title}
                  </h2>
                  <p className="text-sm md:text-base text-[#B97D7B] mb-2">
                    {project.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 4).map((item) => (
                      <span
                        key={item}
                        className="
                          text-[10px] uppercase tracking-[0.15em]
                          text-[#928E5E]
                          border border-[#57552730] rounded-full
                          px-2.5 py-1
                        "
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className="
                    relative hidden md:block
                    h-[110px] w-[160px]
                    rounded-2xl overflow-hidden
                    opacity-0 group-hover:opacity-100
                    -translate-x-2 group-hover:translate-x-0
                    transition-all duration-300
                  "
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div
          className="
            mt-4 pt-4
            border-t border-double border-[#575527]
            flex justify-between
            text-[10px] uppercase tracking-[0.25em] text-[#928E5E]
          "
        >
          <span>End of Archive</span>
          <span>{projectArchive.length} Entries</span>
        </div>
      </div>
    </motion.div>
  );
}
