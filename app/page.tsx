"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import Footer from "@/components/Footer";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";
import { useRouter } from "next/navigation";

const SQ   = 4;
const UNIT = SQ + 4;      

function hexToRgb(hex: string) {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ] as const;
}
function ha(hex: string, a: number) {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r},${g},${b},${a.toFixed(3)})`;
}

const coloredCells = new Map<string, string>();

const SWIRL_PALETTE = [
  "#b8e7fc", // sky blue
  "#ff66cf", // hot pink
  "#fc7540", // light pink
  "#79d746", // mint
  "#61b7f9", // tan
  "#9500ff", // royal blue
  "#dfe94d", // yellow-green
  "#81eccf", // teal
];
function pickSwirlColor() {
  return SWIRL_PALETTE[Math.floor(Math.random() * SWIRL_PALETTE.length)];
}

// Particles hop: they freeze while visible, then teleport to next orbit position
// when they blink off→on. This creates discrete hops instead of smooth gliding.
type SwirlParticle = {
  x: number; y: number;
  angle:    number;
  radius:   number;
  radiusV:  number;
  angularV: number;
  color:    string;
  showing:      boolean;
  frameCounter: number;
  showFrames:   number;
  hideFrames:   number;
  life:  number;
  decay: number;
  displayAlpha:  number;  // lerped 0→1 on show, 1→0 on hide
  displayRadius: number;  // lerped 0→SQ/2 on show, back to 0 on hide
};

const HERO_VID = "https://firebasestorage.googleapis.com/v0/b/portfolio-website-6baaf.firebasestorage.app/o/portfolio_videos%2FHero.mp4?alt=media&token=44a88620-8569-4faa-95d6-f51483167ce1";

const FLOWER_PATH1 = "M25,577.71c95.25,137.87,249.66,121.36,312.55,74.6,159.22-118.38,93.37-183.04,46.39-188.28-91.67-10.23-167.91,76.6-78.84,104.34,66.02,20.56,105.69,7.87,146.2,9.17,95.6,3.06,239.74,62.55,201.7,99.06-51.25,49.19-252.09,47.81-104.73-104.68,74.02-76.6,185.91-16.85,258.94-83.23,28.42-25.83,13.07-75.01-48-88.85-60.23-13.65-123.13,11.46-106.72,62.3,26.04,80.68,366.13,229.3,492.22,134.65,109.76-82.39,5.18-206.96-42.59-251.68";
const FLOWER_PATH2 = "M1114.65,327.22c28.41-11.45,122.52,105.42,165.93,111.1,83.57,10.94,109.1-164.89,59.35-200.68-45.93-33.05-176.76,47.95-189.95,25.28-13.39-23.03,84.28-66.62,78.65-137.09-4.7-58.92-86.06-114.84-122.44-97.69-55.23,26.04-6.18,220.21-31.79,225.92-24.84,5.54-56.76-180.21-121.64-184.03-57.71-3.4-134.85,137.56-97.78,193.51,35.73,53.93,184.21,19.47,190.45,46.76,5.91,25.83-130.1,49.92-131.81,101.03-1.58,47.38,100.05,109.83,152.45,83.1,64.03-32.65,12.88-152.84,48.57-167.22Z";

function HeroFlower() {
  const pl1 = useMotionValue(0);
  const pl2 = useMotionValue(0);
  const op1 = useMotionValue(0); // hide paths when length=0 to kill cap dots
  const op2 = useMotionValue(0);

  useEffect(() => {
    let cancelled = false;
    const ease = [0.4, 0, 0.2, 1] as [number, number, number, number];

    const loop = async () => {
      while (!cancelled) {
        // start fully hidden
        pl1.set(0); pl2.set(0); op1.set(0); op2.set(0);
        await new Promise<void>(r => setTimeout(r, 500));
        if (cancelled) break;

        // draw stem — fade in opacity once stroke has real length
        let stem1Revealed = false;
        await animate(pl1, 1, {
          duration: 2.5, ease,
          onUpdate: (v) => {
            if (!stem1Revealed && v > 0.015) {
              stem1Revealed = true;
              animate(op1, 1, { duration: 0.4, ease: "easeOut" });
            }
          },
        });
        if (cancelled) break;

        // draw petals
        let petal1Revealed = false;
        await animate(pl2, 1, {
          duration: 3, ease,
          onUpdate: (v) => { if (!petal1Revealed && v > 0.015) { op2.set(1); petal1Revealed = true; } },
        });
        if (cancelled) break;

        // hold 2s
        await new Promise<void>(r => setTimeout(r, 2000));
        if (cancelled) break;

        // undraw petals — fade opacity out over the last 0.4s so no end-dot shows
        animate(op2, 0, { duration: 0.4, delay: 1.6, ease: "easeIn" });
        await animate(pl2, 0, { duration: 2, ease: "easeInOut" });
        if (cancelled) break;
        op2.set(0); pl2.set(0);

        // undraw stem — same
        animate(op1, 0, { duration: 0.4, delay: 1.6, ease: "easeIn" });
        await animate(pl1, 0, { duration: 2, ease: "easeInOut" });
        if (cancelled) break;
        op1.set(0); pl1.set(0);

        await new Promise<void>(r => setTimeout(r, 300));
      }
    };

    loop();
    return () => { cancelled = true; };
  }, []);

  const maskId = "flower-mask";
  const sharedCaps = { strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* scale down on small screens, anchored top-right */}
      <div className="absolute right-[-5%] md:right-[-8%] lg:right-[-5%] top-[50%] sm:top-[30%] md:top-[14%] lg:top-0 
      h-full origin-top-right scale-[0.42] sm:scale-[0.65] md:scale-[0.8] lg:scale-[0.95]">
        <svg
          viewBox="0 0 1390.25 730.38"
          preserveAspectRatio="xMidYMid meet"
          className="h-full w-auto overflow-visible"
          style={{ minWidth: "55vw", overflow: "visible" }}
        >
          <defs>
            <mask id={maskId}>
              <rect x="-120" y="-60" width="1630" height="880" fill="black" />
              <motion.path d={FLOWER_PATH1} stroke="white" strokeWidth={54} fill="none"
                {...sharedCaps} style={{ pathLength: pl1, opacity: op1 }} />
              <motion.path d={FLOWER_PATH2} stroke="white" strokeWidth={54} fill="none"
                {...sharedCaps} style={{ pathLength: pl2, opacity: op2 }} />
            </mask>
          </defs>

          {/* Blue Shadow Flower, offset — bottommost layer */}
          <g transform="translate(12, 14)">
            <motion.path d={FLOWER_PATH1} stroke="#29abe2" strokeWidth={50} fill="none"
              {...sharedCaps} style={{ pathLength: pl1, opacity: op1 }} />
            <motion.path d={FLOWER_PATH2} stroke="#29abe2" strokeWidth={50} fill="none"
              {...sharedCaps} style={{ pathLength: pl2, opacity: op2 }} />
          </g>

          {/* Black border sits between shadow and video mask */}
          <motion.path d={FLOWER_PATH1} stroke="black" strokeWidth={57} fill="none"
            {...sharedCaps} style={{ pathLength: pl1, opacity: op1 }} />
          <motion.path d={FLOWER_PATH2} stroke="black" strokeWidth={57} fill="none"
            {...sharedCaps} style={{ pathLength: pl2, opacity: op2 }} />

          {/* Video revealed through mask — topmost, oversized so it fills stroke edges */}
          <foreignObject x="-120" y="-60" width="1630" height="880" mask={`url(#${maskId})`}>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src={HERO_VID}
              autoPlay muted loop playsInline preload="metadata"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </foreignObject>
        </svg>
      </div>
    </div>
  );
}



export default function HomePage() {
  const router = useRouter();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    router.push(`/#${id}`);
  };


  const stagger = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
  };
  const fadeUp = {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  };

  return (
    <main className="bg-white">

      {/* hero flower bg + text */}
      <section className="relative w-full ">
        <div className="relative w-full overflow-hidden  min-h-[100svh] sm:min-h-[80svh] md:min-h-[100svh] sm:overflow-visible">

          <HeroFlower />

          <motion.div
            className="relative z-10 pointer-events-none flex flex-col justify-start px-[5%] pt-24 pb-[10%] sm:absolute sm:inset-x-0 sm:top-0 lg:pt-20 sm:pb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={stagger}
          >
         

            <motion.h1
              variants={fadeUp}
              className="leading-[0.9] tracking-tight mt-10 md:mt-10 lg:mt-20 text-black "
              style={{ fontFamily: "Century Gothic", fontSize: "clamp(46px, 10vw, 160px)" }}
            >
              Hi, I'm Cindy
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="hidden lg:block mt-8 text-black text-wrap text-body leading-tight max-w-[700px]"
            >
              A multifaceted <b>Developer</b> and <b>Designer</b> curating tech solutions through research, designing, user testing, developing, and product focused thinking.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="lg:hidden mt-4 text-black text-wrap  text-body leading-snug max-w-[400px] md:max-w-[520px]"
            >
              A multifaceted <b>Developer</b> and <b>Designer</b> curating tech solutions through research, designing, user testing, developing, and product focused thinking.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-8 flex pointer-events-auto "
            >
              <span 
              onClick={() => scrollToSection("contact")}
              className="black-button hover:scale-[1.05] cursor-pointer transition-transform duration-300 ease-in-out ">Let's get in touch</span>
            </motion.p>
          </motion.div>

        </div>
      </section>
      <div className="border border-b-light-black mb-20"/>

      {/* ── projects + footer ── */}
      <div className="mx-auto w-full max-w-[1440px]">
        <div id="works"><FeaturedProjectsSection /></div>
      </div>

      <div className="mt-20 mx-auto w-full max-w-[1440px]">
        <FeaturedProjectsSection showExtras/>
      </div>
      
      <Footer />

    </main>
  );
}
