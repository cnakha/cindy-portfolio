"use client";

import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import Status  from "@/components/works/Status";
import Bento  from "@/components/works/projects/Bento";
import Biomed from "@/components/works/projects/Biomed";
import Folio from "@/components/works/projects/Folio";
import YCGH from "@/components/works/projects/YCGH";
import Graffgraff from "@/components/works/projects/Graffgraff";
import Worldnotes from "@/components/works/projects/Worldnotes";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const item = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] } },
};


export default function ProjectPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const project = projects.find((project) => project.id === slug);

  console.log(slug);
  console.log(project);

  if (!project) {
    notFound();
  }


  return (
    <main className="pt-20 md:pt-24 bg-white text-black">
      <div className="mx-4 sm:mx-6  lg:mx-8">
        <motion.article
          className="sm:mx-10 lg:mx-auto max-w-5xl"
          variants={container}
          initial="hidden"
          animate="visible"
        >

          {/* Return to home button */}
          <motion.div variants={item} className="flex">
            <div
              onClick={() => router.push("/")}
              className="cursor-pointer right-6 top-6 black-button
              px-4 py-2 flex items-center gap-2 hover:-translate-x-2 transition ease-in-out">
              <Image src="/arrow.svg" alt="" width={20} height={20} className="rotate-180 invert" />
              <p 
              style={{ WebkitTouchCallout: "none" } as object}
              className="pointer-events-none text-tiny text-white">Home</p>
            </div>
          </motion.div>

          <motion.h1 variants={item} className="mt-4 mb-8 leading-[0.95]" 
          style={{ fontFamily: "Century Gothic", fontSize: "clamp(46px, 10vw, 160px)"}}>
            {project.title}
            </motion.h1>

          {project.status &&
            <motion.div variants={item}>
              <Status
                message={project.status}
                hasLink={project.link !== undefined || project.githubUrl !== undefined}
                link={project.link}
                github={project.githubUrl ? project.githubUrl : undefined}
              />
            </motion.div>
          }

          <motion.div variants={item} className="flex items-end justify-between gap-4 mt-8 mb-2">
            <div>
              <p className="gray-title text-tiny">Overview</p>
            </div>
            <div className="opacity-60 text-tiny">
              {project.timeline}
            </div>
          </motion.div>

          <motion.p variants={item} className="max-w-5xl text-subtitle mt-2 opacity-60">
            {project.fullDescription}
          </motion.p>

          {/* Overview Details */}
          <motion.div variants={item} className="flex flex-col md:gap-4 mt-10 border border-mid-gray p-4 rounded-2xl">
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white">
                <div className="flex items-center gap-2">
                  <p className="text-tiny gray-title">Context</p>
                </div>
                  <p className="text-body mt-2 max-w-[75%]">
                    {project.context}
                  </p>
              </div>
              <div className="bg-white ">
                <div className="flex items-center gap-2">
                  <p className="text-tiny gray-title">Role(s)</p>
                </div>
                <p className="text-body mt-2 max-w-[75%]">
                  {project.role}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="bg-white">
                <div className="flex items-center gap-2">
                  <p className="text-tiny gray-title">Skills</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(Array.isArray(project.skills) ? project.skills : [project.skills]).map((s) => (
                    <span key={s} className="text-body text-black bg-light-gray rounded-lg px-3 py-1">{s}</span>
                  ))}
                </div>
              </div>
              <div className="bg-white">
                <div className="flex items-center gap-2">
                  <p className="text-tiny gray-title">Tools</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(Array.isArray(project.tools) ? project.tools : [project.tools]).map((t) => (
                    <span key={t} className="text-body text-black bg-light-gray rounded-lg px-3 py-1">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>


          <div className="mt-10"/>
          {/* <div className="h-px bg-mid-gray my-10"></div> */}

          {/* Project Details */}
          {slug === "bento" && <Bento />}
          {slug === "biomed" && <Biomed />}
          {slug === "folio" && <Folio />}
          {slug === "ycgh" && <YCGH/>}
          {slug === "graffgraff" && <Graffgraff />}
          {slug === "worldnotes" && <Worldnotes />}

          {/* Bottom nav: prev / scroll-to-top / next */}
          {(() => {
            const idx  = projects.findIndex(p => p.id === slug);
            const prev = projects[(idx - 1 + projects.length) % projects.length];
            const next = projects[(idx + 1) % projects.length];

            const NavThumb = ({ project: p, direction }: { project: typeof projects[0]; direction: "left" | "right" }) => (
              <a
                href={`/works/${p.id}`}
                className="group relative flex flex-col items-center gap-2 w-32 sm:w-40"
              >

                {/* thumbnail */}
                <div className={`relative w-full aspect-[3/2] border border-black overflow-hidden rounded-xl bg-neutral-200 transition-all duration-500 ${
                  direction === "right" ? "group-hover:rounded-tr-[100px]" : "group-hover:rounded-tl-[100px]"
                }`}>
                  <img
                    src={`/${p.imageUrl}`}
                    alt={p.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className={`flex w-full px-1 ${direction === "right" ? "justify-end" : ""}`}>
                  <div className={` flex gap-2 text-tiny text-nowrap opacity-100 group-hover:opacity-50 transition ${direction === "right" ? "text-right" : "text-left"} leading-snug`}>
                    <Image src="/arrow.svg" alt="" width={10} height={10} className={`${direction === "right" ? "hidden" : ""} rotate-180`} />
                    {p.title}
                    <Image src="/arrow.svg" alt="" width={10} height={10} className={`${direction === "right" ? "" : "hidden"}`} />
                  </div>
                </div>
              </a>
            );

            return (
              <div className="mt-16">
                {/* mobile: thumbs side by side, button below */}
                <div className="flex flex-col items-center gap-10 sm:hidden">
                  <div className="flex w-full justify-between">
                    <NavThumb project={prev} direction="left" />
                    <NavThumb project={next} direction="right" />
                  </div>
                  <div
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="cursor-pointer black-button px-6 py-3 flex items-center gap-2 hover:-translate-y-1 transition ease-in-out"
                  >
                    <p className="text-tiny text-white">Go back to the top</p>
                    <Image src="/arrow.svg" alt="" width={18} height={18} className="-rotate-90 invert" />
                  </div>
                </div>

                {/* desktop: prev | button | next */}
                <div className="hidden sm:flex items-center justify-between gap-4">
                  <div className="flex-1 flex justify-start">
                    <NavThumb project={prev} direction="left" />
                  </div>
                  <div
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="cursor-pointer black-button px-6 py-3 flex items-center gap-2 hover:-translate-y-1 transition ease-in-out duration-900 shrink-0"
                  >
                    <p 
                    style={{ WebkitTouchCallout: "none" } as object}
                    className="text-tiny text-white pointer-events-none">Go back to the top</p>
                    <Image src="/arrow.svg" alt="" width={18} height={18} className="-rotate-90 invert" />
                  </div>
                  <div className="flex-1 flex justify-end">
                    <NavThumb project={next} direction="right" />
                  </div>
                </div>
              </div>
            );
          })()}

        </motion.article>
      </div>

      <Footer />
    </main>
  );
}