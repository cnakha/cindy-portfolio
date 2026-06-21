"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";

export default function HomePage() {
  return (
    <main className="bg-white">
      <div className="mx-auto w-full max-w-[1440px]">
        <section className="relative h-[450px] md:h-[600px] overflow-hidden">
          <div className="relative h-full w-full">
            <motion.div
              className="absolute left-0 top-0"
              initial={{
                opacity: 0,
                y: 100,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <picture>
                <source media="(max-width: 750px)" srcSet="/mobile-hero.svg" />

                <img
                  src="/web-hero.svg"
                  alt=""
                  className="-translate-x-[45px] w-[500px] max-w-none sm:w-[550px] md:w-[920px]"
                />
              </picture>
            </motion.div>

            <div className="absolute left-[30px] top-[160px] z-10 max-w-[620px] text-black sm:left-[60px] sm:top-[170px] md:left-[160px] md:top-[214px]">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.35,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="text-list font-semibold"
              >
                Hi, I’m Cindy Nakhammouane
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="mt-2 font-bold leading-none text-display"
              >
                Fullstack Developer <br /> and Designer
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.65,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="mt-4 max-w-[320px] text-body leading-tight sm:max-w-[320px] md:max-w-[450px]"
              >
                Researching, designing, user testing, and coding cool projects
                with product focused thinking.
              </motion.p>
            </div>
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 0.85,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <FeaturedProjectsSection />
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}