"use client";

import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useLayoutEffect } from "react";
import Status  from "@/components/works/Status";
import Bento  from "@/components/works/projects/Bento";
import Biomed from "@/components/works/projects/Biomed";
import Folio from "@/components/works/projects/Folio";
import YCGH from "@/components/works/projects/YCGH";
import Graffgraff from "@/components/works/projects/Graffgraff";
import Worldnotes from "@/components/works/projects/Worldnotes";


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

 useLayoutEffect(() => {
  window.scrollTo(0, 0);
}, [slug]);

  return (
    <main className="pt-32 bg-white text-black">
      <div className="mx-4 sm:mx-6 lg:mx-8">
        <article className="sm:mx-10 lg:mx-auto max-w-6xl">

          {/* Return to home button */}
          <div className="flex">
            <div 
              onClick={() => router.push("/")}
              className="cursor-pointer right-6 top-6 z-50  rounded-full border border-mid-gray bg-light-gray 
              px-6 py-3 text-caption text-black flex items-center gap-2 hover:-translate-x-2 transition ease-in-out">
              <Image src="/arrow.svg" alt="" width={24} height={24} className="rotate-180" />
              <p className="text-caption text-black/60 hover:text-black/100 transition">Cindy Nakhammouane</p>
            </div>
          </div>

          <h1 className="mt-8 mb-2 text-display font-black">{project.title}</h1>

          {project.status && 
            <Status 
              message={project.status} 
              hasLink={project.link !== undefined || project.githubUrl !== undefined}
              link={project.link}
              github={project.githubUrl ? project.githubUrl : undefined}
            />
          }

          <div className="flex items-center gap-4 mt-8 mb-2">
            <div>
              <p className="gray-title text-tiny">Overview</p>
            </div>
            <div className="opacity-60 text-tiny">
              {project.timeline}
            </div>
          </div>

          <p className="max-w-5xl text-subtitle font-medium mt-2 opacity-60">
            {project.fullDescription}
          </p>

          {/* Overview Details */}
          <div className="mt-10 ">
            <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-tiny gray-title">Context</p>
                </div>
                  <p className="text-body mt-2 max-w-[75%]">
                    {project.context}
                  </p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-tiny gray-title">Role(s)</p>
                </div>
                <p className="text-body mt-2 max-w-[75%]">
                  {project.role}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-tiny gray-title">Skills</p>
                </div>
                <p className="text-body mt-2 max-w-[75%]">
                  {Array.isArray(project.skills) ? project.skills.join(', ') : project.skills}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-tiny gray-title">Tools</p>
                </div>
                <p className="text-body mt-2 max-w-[75%]">
                  {Array.isArray(project.tools) ? project.tools.join(', ') : project.tools}
                </p>
              </div>
            </div>
          </div>


          <div className="mt-20"/>
          {/* <div className="h-px bg-mid-gray my-10"></div> */}

          {/* Project Details */}
          {slug === "bento" && <Bento />}
          {slug === "biomed" && <Biomed />}
          {slug === "folio" && <Folio />}
          {slug === "ycgh" && <YCGH/>}
          {slug === "graffgraff" && <Graffgraff />}
          {slug === "worldnotes" && <Worldnotes />}

          {/* Return to top button */}
          <div className="flex justify-end">
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer right-6 top-6 z-50 rounded-full border border-mid-gray bg-light-gray 
              px-6 py-3 text-caption text-black flex items-center gap-2 hover:-translate-y-2 transition ease-in-out">
              <p className="text-caption text-black/60 hover:text-black/100 transition">Go back to the top</p>
              <Image src="/arrow.svg" alt="" width={24} height={24} className="-rotate-90" />
            </div>
          </div>

        </article>
      </div>

      <Footer />
    </main>
  );
}