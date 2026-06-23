"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";

export default function HomePage() {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const hasAnimated = sessionStorage.getItem("homeHeroAnimated");

    if (!hasAnimated) {
      setShouldAnimate(true);
      sessionStorage.setItem("homeHeroAnimated", "true");
    }
  }, []);

  return (
    <main className="bg-white">
      <div className="mx-auto w-full max-w-[1440px]">
        <section className="relative h-[450px] overflow-hidden md:h-[600px]">
          <div className="relative h-full w-full">
            <motion.div
              className="absolute left-0 top-0"
              initial={
                shouldAnimate
                  ? { opacity: 0, y: 100, scale: 0.96 }
                  : false
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: shouldAnimate ? 0.75 : 0,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <picture>
                <source media="(max-width: 750px)" srcSet="/mobile-hero.svg" />
                <img
                  src="/web-hero.svg"
                  alt=""
                  className="-translate-x-[0px] w-[500px] max-w-none sm:w-[550px] md:w-[920px]"
                />
              </picture>
            </motion.div>

            <div className="absolute left-[85px] top-[140px] z-10 max-w-[620px] text-black sm:left-[110px] sm:top-[170px] md:left-[210px] md:top-[214px]">
              <motion.p
                initial={shouldAnimate ? { opacity: 0, y: 14 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: shouldAnimate ? 0.35 : 0,
                  duration: shouldAnimate ? 0.5 : 0,
                  ease: "easeOut",
                }}
                className="text-list font-semibold"
              >
                Hi, I’m Cindy Nakhammouane
              </motion.p>

              <motion.h1
                initial={shouldAnimate ? { opacity: 0, y: 14 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: shouldAnimate ? 0.5 : 0,
                  duration: shouldAnimate ? 0.5 : 0,
                  ease: "easeOut",
                }}
                className="mt-2 font-bold leading-none text-display"
              >
                Fullstack Developer <br /> and Designer
              </motion.h1>

              <motion.p
                initial={shouldAnimate ? { opacity: 0, y: 14 } : false}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{
                  delay: shouldAnimate ? 0.65 : 0,
                  duration: shouldAnimate ? 0.5 : 0,
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
          initial={shouldAnimate ? { opacity: 0, y: 24, scale: 0.98 } : false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: shouldAnimate ? 0.85 : 0,
            duration: shouldAnimate ? 0.6 : 0,
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