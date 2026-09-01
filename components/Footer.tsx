"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

const HEART_PATH = "M112.47,656.85C342.09,501.23,558.87,96.84,432.19,35c-121.73-59.42-164.68,165.45-164.68,165.45,0,0-205.18-128.74-238.85-12.26-49.3,170.54,410.26,227.28,743.62,181.63";
const HERO_VID = "https://firebasestorage.googleapis.com/v0/b/portfolio-website-6baaf.firebasestorage.app/o/portfolio_videos%2Fbeach2.mp4?alt=media&token=ead83c7b-bc5f-4c21-8086-d878756ea8ee";

function HeartDoodle() {
  const pl = useMotionValue(0);
  const op = useMotionValue(0);
  const footerRef = useRef<HTMLDivElement>(null);
  const cancelledRef = useRef(false);
  const loopRunningRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);


  useEffect(() => {
    const ease = [0.4, 0, 0.2, 1] as [number, number, number, number];

    const runLoop = async () => {
      if (loopRunningRef.current) return;
      loopRunningRef.current = true;
      cancelledRef.current = false;

      while (!cancelledRef.current) {
        pl.set(0); op.set(0);
        await new Promise<void>(r => setTimeout(r, 400));
        if (cancelledRef.current) break;

        // draw
        let revealed = false;
        await animate(pl, 1, {
          duration: 2.5, ease,
          onUpdate: (v) => {
            if (!revealed && v > 0.015) {
              revealed = true;
              animate(op, 1, { duration: 0.4, ease: "easeOut" });
            }
          },
        });
        if (cancelledRef.current) break;

        await new Promise<void>(r => setTimeout(r, 2000));
        if (cancelledRef.current) break;

        // undraw
        animate(op, 0, { duration: 0.4, delay: 1.6, ease: "easeIn" });
        await animate(pl, 0, { duration: 2, ease: "easeInOut" });
        if (cancelledRef.current) break;
        op.set(0); pl.set(0);

        await new Promise<void>(r => setTimeout(r, 400));
      }
      loopRunningRef.current = false;
    };

    const stopLoop = () => {
      cancelledRef.current = true;
      loopRunningRef.current = false;
      pl.set(0); op.set(0);
    };

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.1 }
    );

    const el = footerRef.current;
    if (el) obs.observe(el);
    return () => {
      obs.disconnect();
      stopLoop();
    };
  }, []);

  const maskId = "heart-mask";
  const caps = { strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  return (
    <div ref={footerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute right-[-45%] top-[15%] sm:right-[-28%] sm:top-[8%] md:right-[-30%] md:top-[8%] lg:right-[-20%] lg:top-[-0%] h-full w-full 
      scale-[0.42] sm:scale-[0.65] md:scale-[0.7] lg:scale-[0.90]">
      

        <svg
          viewBox="0 0 797.28 681.85"
          className="absolute right-0 top-0 h-[120%] w-auto"
          style={{ overflow: "visible" }}
        >

          <defs>
            <mask id={maskId}>
              <rect x="-20" y="-20" width="1440" height="800" fill="none" />
              <motion.path d={HEART_PATH} stroke="white" strokeWidth={50} fill="none"
              {...caps} style={{ pathLength: pl, opacity: op }} />
            </mask>
          </defs>

          {/* Blue shadow */}
          <g transform="translate(12, 14)">
            <motion.path d={HEART_PATH} stroke="#29abe2" strokeWidth={50} fill="none"
              {...caps} style={{ pathLength: pl, opacity: op }} />
          </g>
          {/* Black border */}
          <motion.path d={HEART_PATH} stroke="black" strokeWidth={53} fill="none"
            {...caps} style={{ pathLength: pl, opacity: op }} />
          
     
            {/* Video revealed through mask */}
          <foreignObject x="0" y="0" width="1390.25" height="750" mask={`url(#${maskId})`}>
            <video
              ref={videoRef}
              src={HERO_VID}
              autoPlay muted loop playsInline preload="auto"
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(1.3)" }}
            />
          </foreignObject>
        </svg>
      </div>
    </div>
  );
}

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
      className=" relative mt-20 pt-10 md:pt-20 overflow-hidden bg-light-gray  border-t-black border-x-0 border-b-0 text-black"
    >
      <HeartDoodle />

      <motion.div
        className="relative z-10 px-2 ml-2 md:ml-8"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
      >
        <motion.div variants={fadeUp} className=" max-w-[380px] sm:max-w-[420px] text-body md:max-w-[520px]">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="22" viewBox="0 0 57.35 30.8" fill="black">
            <path d="M54.68,1.37h-.46c-1.23,0-2.3.83-2.59,2.03-.66,2.69-1.71,5.74-2.97,9-.2.52-.4,1.04-.61,1.54-1.05,2.61-4.9,2.03-5.14-.77-.06-.76-.14-1.46-.22-2.08-.41-3.12-1.15-5.8-1.92-7.96-.38-1.06-1.39-1.76-2.51-1.76h-3.34c-1.29,0-2.4.93-2.63,2.2-.5,2.83-1.44,6.36-3.28,10.13-1.58,3.24-3.4,5.78-4.98,7.67-.03.04-.06.07-.1.1-1.55,1.54-2.98,2.6-4.28,3.18-1.31.59-2.76.89-4.35.89-1.86,0-3.55-.42-5.07-1.27-1.52-.85-2.7-2.01-3.53-3.5-.83-1.49-1.25-3.19-1.25-5.1,0-2.75.94-5.06,2.82-6.94,1.88-1.88,4.64-2.8,7.36-2.39,2.55.39,3.47,1.55,5.53,3.14,1.53,1.18,3.23.85,4.52-.87,1.12-1.48,1.92-3.17,1.06-4.56-.73-1.18-2.38-2.18-3.67-2.76C20.89.31,17.9-.05,15.3,0c-2.78.06-5.38,1-7.8,2.35-2.41,1.35-4.27,3.46-5.56,5.69s-1.94,4.77-1.94,7.63c0,4.42,1.42,8.05,4.26,10.88,2.84,2.83,6.5,4.25,10.96,4.25,2.42,0,4.57-.4,6.46-1.2,1.87-.79,3.85-2.2,5.94-4.24.05-.04.09-.09.13-.14,1.56-1.99,3.28-4.51,4.88-7.57.13-.24.25-.49.37-.73,1.27-2.57,5.16-1.64,5.07,1.23,0,.04,0,.09,0,.13-.12,3.33-.49,6.27-.89,8.69-.27,1.63.98,3.11,2.63,3.11h4.99c.96,0,1.84-.51,2.32-1.34,2.26-3.96,4.58-8.59,6.69-13.89,1.41-3.54,2.53-6.92,3.44-10.08.49-1.7-.79-3.4-2.57-3.4Z"/>
          </svg>
        </motion.div>

        <motion.p variants={fadeUp} className="mt-4 max-w-[380px] sm:max-w-[420px] text-body md:max-w-[520px]">
          I'm always interested in new opportunities and exciting projects.
          Let's get in touch and build something amazing!
        </motion.p>

        <motion.p variants={fadeUp} className="-mb-2 md:-mb-1 mt-8 font-semibold sm:max-w-[420px] text-body">
          Contact
        </motion.p>

        <motion.div variants={fadeUp} className="pb-30 sm:pb-10 flex md:justify-between items-end ">
          <div className="flex flex-wrap items-end gap-x-4 gap-y-6">
            {/* Email */}
            <div className="flex items-center gap-3">
              <a
                href="mailto:cindynakh@gmail.com"
                className="group relative inline-flex items-center gap-2 w-fit text-tiny"
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
        </motion.div>

        <motion.h2 variants={fadeUp}
            className="leading-[0.95] tracking-tight mt-10 lg:mt-20 text-black "
            style={{ fontFamily: "Century Gothic", fontSize: "clamp(46px, 10vw, 160px)" }}>
          Let's work <b>together</b>
        </motion.h2>


      </motion.div>
      <div className="relative z-10 mt-8 flex items-center justify-end bg-light-black w-full p-4 md:p-6 px-4 md:px-10">
        <p className="relative text-light-gray text-tiny text-right ">
          © 2026 Cindy Nakhammouane. All rights reserved.
        </p>
        </div>
    </footer>
  );
}
