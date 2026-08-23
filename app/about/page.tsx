"use client";
import Picture from "@/components/works/Picture";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

export default function AboutPage() {
  return (
    <main className="bg-white text-black">
      <motion.section
        className="mx-auto max-w-6xl px-8 pt-30"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Images */}
          <div className="flex flex-col gap-4 items-start">
            <motion.div variants={fadeUp} className="w-full h-full">
              <Picture
                source="/wood.jpg"
                description="A photo of me in front of a wooden wall."
                type="wide"
                useAspectRatio={false}
              />
            </motion.div>
            <motion.div variants={fadeUp} className="w-full h-full">
              <Picture
                source="/grad_pic.png"
                description="A photo of me at graduation."
                type="wide"
                useAspectRatio={false}
              />
            </motion.div>
          </div>

          {/* Text */}
          <div>
            <motion.section variants={stagger} initial="hidden" animate="show">
              <motion.h1 variants={fadeUp} className="text-display">Background</motion.h1>

              <motion.p variants={fadeUp} className="mt-8 text-body">
                Hi, I'm Cindy Nakhammouane a Fullstack Developer and UI/UX Designer based in Chicago, IL. I recently graduated from the
                University of Illinois Chicago's first ever Computer Science and Design cohort
                combining the capabilities of modern computer programming and visual design.
                <br /><br />
                Creating is my favorite freedom. Since forever, I've always been drawn
                toward expressing myself through various creative avenues, but I also
                enjoyed problem solving and engineering. Naturally I grew a curiosity
                towards finding ways to blend the worlds of technology and art together.
                What I love about creative technology is that the medium is constantly
                evolving and full of refreshing projects and potential I would love
                to contribute to.
              </motion.p>
            </motion.section>

            <motion.section
              className="order-3 md:col-start-2"
              variants={stagger}
              initial="hidden"
              animate="show"
            >
              <motion.h2 variants={fadeUp} className="text-subtitle mt-10">Tools I Use</motion.h2>

              <motion.div variants={fadeUp} className="mt-8 grid gap-4 md:gap-20 grid-cols-2 max-w-[300px]">
                <div>
                  <div className="flex">
                    <p className="text-tiny  gray-title">Design</p>
                  </div>
                  <ul className="mt-3 text-tiny leading-tight">
                    <li>Adobe Creative Suite</li>
                    <li>Photoshop</li>
                    <li>InDesign</li>
                    <li>Illustrator</li>
                    <li>After Effects</li>
                    <li>Figma</li>
                    <li>Canva</li>
                  </ul>
                </div>
                <div>
                  <div className="flex">
                    <p className="text-tiny  gray-title">Developer</p>
                  </div>
                  <ul className="mt-3 text-tiny leading-tight">
                    <li>React</li>
                    <li>Next.js</li>
                    <li>TypeScript</li>
                    <li>JavaScript</li>
                    <li>Tailwind</li>
                    <li>Python</li>
                    <li>C/C++</li>
                    <li>Firebase</li>
                    <li>SQL</li>
                    <li>REST API</li>
                    <li>FastAPI</li>
                    <li>Claude</li>
                  </ul>
                </div>
              </motion.div>
            </motion.section>
          </div>
        </div>
      </motion.section>

      <Footer />
    </main>
  );
}
