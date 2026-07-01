"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import FloralSticker from "./FloralSticker";
import WashiTape from "./WashiTape";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    projectType: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.projectType.trim() ||
      !formData.message.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.message.trim().length < 20) {
      setError("Message must be at least 20 characters long.");
      return;
    }

    const nameRegex = /^[A-Za-z\s'-]+$/;

    if (formData.fullName.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!nameRegex.test(formData.fullName.trim())) {
      setError(
        "Full name can only contain letters, spaces, apostrophes, and hyphens.",
      );
      return;
    }
    try {
      setLoading(true);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setSuccess(data.message);

      setFormData({
        fullName: "",
        email: "",
        projectType: "",
        message: "",
      });

      console.log(data);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      whileHover={{
        y: -6,
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
          border-[#ecc4c370]

          bg-gradient-to-br
          from-[#b97d7b]
          to-[#a86e6c]

          p-8
          md:p-10

          shadow-[0_32px_80px_rgba(89,56,56,0.22)]
        "
      >
        {/* WASHI TAPE */}

        <WashiTape
          className="
            left-[10%]
            right-[10%]
            top-0

            rounded-b-md
          "
        />

        {/* WATERMARK FLOWERS */}

        <div
          className="
            pointer-events-none

            absolute
            -right-10
            -top-10

            opacity-10
          "
        >
          <FloralSticker type="rose" size={260} />
        </div>

        <div
          className="
            pointer-events-none

            absolute
            bottom-6
            left-6

            opacity-10
          "
        >
          <FloralSticker type="daisy" size={90} />
        </div>

        {/* NOTE */}

        <div
          className="
          font-editorial-body
            mb-2

            inline-block

            rotate-[-1.5deg]

            text-white/80

            italic
          "
        >
          ♡ available for freelance & collaborations
        </div>

        {/* DIVIDER */}

        <div
          className="
            my-3

            flex
            items-center
            gap-3
          "
        >
          <div className="h-px flex-1 bg-white/20" />

          <span className="text-white/50">✿</span>

          <div className="h-px flex-1 bg-white/20" />
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="
            flex
            flex-col
            gap-5
          "
        >
          {/* NAME + EMAIL */}

          <div
            className="
              grid

              gap-4

              md:grid-cols-2
            "
          >
            <div>
              <label
                className="
                  mb-2
                  block

                  text-[11px]

                  uppercase

                  tracking-[0.28em]

                  text-white/80
                "
              >
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={(e) => {
                  const value = e.target.value;

                  setFormData({
                    ...formData,
                    fullName: value,
                  });

                  const nameRegex = /^[A-Za-z\s'-]*$/;

                  if (!nameRegex.test(value)) {
                    setNameError(
                      "Only letters, spaces, hyphens, and apostrophes are allowed.",
                    );
                  } else {
                    setNameError("");
                  }
                }}
                placeholder="Your name"
                className="
                font-editorial-body
                w-full

                rounded-2xl

                border
                border-[#575527]

                bg-[#ddd3c9cc]

                px-5
                py-4

                outline-none

                transition-all

                focus:border-[#ecc4c3]
                focus:ring-2
                focus:ring-[#928e5e]
              "
              />
              {nameError && (
                <p
                  className="
                  mt-2
                  text-xs
                  text-[#7B2525]
                "
                >
                  {nameError}
                </p>
              )}
            </div>

            <div>
              <label
                className="
                  mb-2
                  block

                  text-[11px]

                  uppercase

                  tracking-[0.28em]

                  text-white/80
                "
              >
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="hello@example.com"
                className="
                font-editorial-body
                  w-full

                  rounded-2xl

                  border
                  border-[#575527]

                  bg-[#ddd3c9cc]

                  px-5
                  py-4

                  outline-none

                  transition-all

                  focus:border-[#ecc4c3]
                  focus:ring-2
                focus:ring-[#928e5e]
                "
              />
            </div>
          </div>

          {/* PROJECT */}

          <div>
            <label
              className="
                mb-2
                block

                text-[11px]

                uppercase

                tracking-[0.28em]

                text-white/80
              "
            >
              Project Type
            </label>

            <input
              type="text"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              placeholder="Portfolio, Website, Dashboard..."
              className="
              font-editorial-body
                w-full

                rounded-2xl

                border
                border-[#575527]

                bg-[#ddd3c9cc]

                px-5
                py-4

                outline-none

                transition-all

                focus:border-[#ecc4c3]
                focus:ring-2
                focus:ring-[#928e5e]
              "
            />
          </div>

          {/* MESSAGE */}

          <div>
            <label
              className="
                mb-2
                block

                text-[11px]

                uppercase

                tracking-[0.28em]

                text-white/80
              "
            >
              Message
            </label>

            <textarea
              rows={5}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your vision..."
              className="
              font-editorial-body
                w-full

                resize-none

                rounded-[20px]

                border
                border-[#575527]

                bg-[#ddd3c9cc]

                px-5
                py-4

                outline-none

                transition-all

                focus:border-[#ecc4c3]
                focus:ring-2
                focus:ring-[#928e5e]
              "
            />
          </div>

          {success && (
            <p
              className="
                text-center
                text-sm
                text-[#fffaf5]
              "
            >
              ✓ {success}
            </p>
          )}

          {error && (
            <p
              className="
                text-center
                text-sm
                text-[#7B2525]
              "
            >
              ✕ {error}
            </p>
          )}

          {/* BUTTON */}

          <div className="flex justify-center">
            <button
              type="submit"
              className="
                inline-flex
                items-center
                gap-3

                border
                border-[#ecc4c3]

                bg-[#fffaf5]

                px-8
                py-4

                text-[11px]
                font-medium
                uppercase

                tracking-[0.22em]

                text-[#575527]

                shadow-[4px_4px_0_#ecc4c3,8px_8px_0_rgba(185,125,123,0.25)]

                transition-all

                hover:-translate-x-1
                hover:-translate-y-1
                hover:shadow-[7px_7px_0_#ecc4c3,12px_12px_0_rgba(185,125,123,0.2)]
              "
            >
              <span>✦</span>
              {loading ? "Sending..." : "Start Our Project"}
              <span>→</span>
            </button>
          </div>
        </form>

        {/* FOOTNOTE */}

        <div
          className="
            mt-8

            flex
            justify-between

            text-[10px]

            uppercase

            tracking-[0.3em]

            text-white/40
          "
        >
          <span>Open For Opportunities</span>

          <span>Est. 2026</span>
        </div>
      </div>
    </motion.div>
  );
}
