"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Project, projectArchive } from "@/data/projectArchive";

interface Props {
  project: Project;
}

export default function ProjectCaseFile({ project }: Props) {
  const index = projectArchive.findIndex((p) => p.id === project.id);
  const total = projectArchive.length;
  const prev = projectArchive[index === 0 ? total - 1 : index - 1];
  const next = projectArchive[index === total - 1 ? 0 : index + 1];

  return (
    <div className="min-h-screen bg-[#DDD3C9]">
      <div className="max-w-[1300px] mx-auto px-8 md:px-16 py-8 md:py-14">
        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b-[3px] border-[#575527]">
          <div className="flex items-center gap-6">
            <Link
              href="/projects"
              className="uppercase tracking-[0.3em] text-sm text-[#B97D7B] hover:-translate-y-1 transition-all inline-block"
            >
              ← Index
            </Link>
            <Link
              href="/"
              className="uppercase tracking-[0.25em] text-xs text-[#928E5E] hover:text-[#575527] transition-colors"
            >
              Home
            </Link>
          </div>

          {/* JUMP RAIL */}
          <div className="flex items-center gap-1.5">
            {projectArchive.map((p, i) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                title={p.title}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] tracking-wide border transition-all ${
                  p.id === project.id
                    ? "bg-[#575527] text-[#DDD3C9] border-[#575527]"
                    : "border-[#57552740] text-[#928E5E] hover:border-[#575527] hover:text-[#575527]"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </Link>
            ))}
          </div>

          <p className="text-sm tracking-[0.25em] uppercase text-[#928E5E]">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </p>
        </div>

        {/* TITLE BLOCK */}
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-[#928E5E] mb-3">
            Case Study &middot; {project.role}
          </p>
          <h1
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: "clamp(2.4rem, 7vw, 6rem)",
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: "-0.01em",
              color: "#575527",
              marginBottom: "1rem",
            }}
          >
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-[#B97D7B] mb-8 max-w-2xl">
            {project.subtitle}
          </p>

          {/* CTAs */}
          {(project.liveUrl || project.repoUrl) && (
            <div className="flex flex-wrap gap-4 mb-12">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-full bg-[#575527] text-[#DDD3C9] text-xs uppercase tracking-[0.2em] hover:bg-[#B97D7B] transition-colors"
                >
                  View Live →
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-full border border-[#575527] text-[#575527] text-xs uppercase tracking-[0.2em] hover:bg-white/40 transition-colors"
                >
                  View Code ↗
                </a>
              )}
            </div>
          )}

          {/* HERO IMAGE */}
          <div className="relative h-[320px] md:h-[520px] rounded-[32px] overflow-hidden glass-card mb-16">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>

          {/* CHALLENGE / SOLUTION */}
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#928E5E] mb-3">
                Challenge
              </p>
              <p className="leading-[1.9] text-[#575527dd] text-justify first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:leading-[0.8] first-letter:text-[#B97D7B] first-letter:editorial-title">
                {project.challenge}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[#928E5E] mb-3">
                Solution
              </p>
              <p className="leading-[1.9] text-[#575527dd] text-justify">
                {project.solution}
              </p>
            </div>
          </div>

          {/* OUTCOME */}
          <div className="mt-12 pt-8 border-t border-[#57552730]">
            <p className="text-xs uppercase tracking-[0.3em] text-[#928E5E] mb-3">
              Outcome
            </p>
            <p className="leading-[1.9] text-[#575527dd] max-w-3xl">
              {project.outcome}
            </p>
          </div>

          {/* STACK */}
          <div className="flex flex-wrap gap-3 mt-12">
            {project.stack.map((item) => (
              <span
                key={item}
                className="px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-[#57552720] text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        {/* FOOTER NAV */}
        <div className="mt-20 pt-6 border-t border-double border-[#575527] flex justify-between items-center gap-4">
          <Link href={`/projects/${prev.id}`} className="group">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#928E5E] mb-1">
              Previous
            </p>
            <p className="editorial-title text-lg md:text-2xl text-[#575527] group-hover:text-[#B97D7B] transition-colors">
              ← {prev.title}
            </p>
          </Link>
          <Link href={`/projects/${next.id}`} className="group text-right">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#928E5E] mb-1">
              Next
            </p>
            <p className="editorial-title text-lg md:text-2xl text-[#575527] group-hover:text-[#B97D7B] transition-colors">
              {next.title} →
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
