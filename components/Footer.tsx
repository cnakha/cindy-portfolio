"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("cindynakh@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer
      id="contact"
      className="relative mt-20 py-10 md:py-20 overflow-hidden border border-t-black text-black"
    >
      <motion.div
        className="relative z-10 px-2 ml-4 md:ml-10"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
      >
        <motion.h2 variants={fadeUp} className="hidden md:block md:ml-0 max-w-[240px] text-display md:max-w-none">
          Let's work together!
        </motion.h2>
        <motion.h2 variants={fadeUp} className="md:hidden max-w-[240px] text-wrap text-display">
          Let's work together!
        </motion.h2>

        <motion.p variants={fadeUp} className="mt-4 sm:mt-6 max-w-[380px] sm:max-w-[420px] text-body md:max-w-[520px]">
          I'm always interested in new opportunities and exciting projects.
          Let's get in touch and build something amazing!
        </motion.p>

        <motion.div variants={fadeUp} className="flex md:justify-between items-end mt-4">
          <div className="flex flex-wrap items-end gap-x-8 gap-y-6">
            {/* Email */}
            <div className="flex items-center gap-3">
              <a
                href="mailto:cindynakh@gmail.com"
                className="group relative inline-flex items-center gap-2 w-fit text-body"
              >
                cindynakh@gmail.com
                <span className="absolute left-0 -bottom-3 h-[10px] w-0 bg-black rounded-full transition-all duration-300 ease-out group-hover:w-full" />
              </a>
              <button
                onClick={copyEmail}
                className="transition hover:scale-110 cursor-pointer active:scale-95"
                aria-label="Copy email"
              >
                <Image src="/copy.svg" alt="Copy email" width={24} height={24} />
              </button>
            </div>

            {/* Social icon buttons */}
            <div className="flex items-center gap-4">
              <a href="https://github.com/cnakha" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition hover:scale-110 active:scale-95">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/cindynakh_design" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition hover:scale-110 active:scale-95">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.053.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.856.601 3.698 1.942 5.039 1.341 1.341 3.183 1.857 5.039 1.942C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 1.856-.085 3.698-.601 5.039-1.942 1.341-1.341 1.857-3.183 1.942-5.039C23.986 15.668 24 15.259 24 12c0-3.259-.014-3.668-.072-4.948-.085-1.856-.601-3.698-1.942-5.039C20.645.673 18.803.157 16.947.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/cindy-nakhammouane-348a63247/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition hover:scale-110 active:scale-95">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
          <p className="hidden md:block relative z-10 opacity-50 text-tiny text-right mr-10">
            Built by Cindy Nakhammouane
          </p>
        </motion.div>

        <p className="md:hidden relative z-10 mt-10 opacity-50 text-tiny text-right mr-4">
          Designed and developed by Cindy Nakhammouane
        </p>
      </motion.div>
    </footer>
  );
}
