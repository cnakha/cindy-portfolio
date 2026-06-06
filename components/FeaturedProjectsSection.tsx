"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export default function FeaturedProjectsSection() {
  const [activeSlug, setActiveSlug] = useState(projects[0]?.id);
  const clickedSlugRef = useRef<string | null>(null);
  const unlockTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateActiveProject = () => {
      if (clickedSlugRef.current) return;

      const triggers = document.querySelectorAll("[data-project-trigger]");
      const targetY = window.innerHeight * 0.38;

      let currentSlug = projects[0]?.id;

      triggers.forEach((trigger) => {
        const rect = trigger.getBoundingClientRect();

        if (rect.top <= targetY) {
          currentSlug =
            trigger.getAttribute("data-project-trigger") || currentSlug;
        }
      });

      setActiveSlug(currentSlug);
    };

    updateActiveProject();

    window.addEventListener("scroll", updateActiveProject, { passive: true });
    window.addEventListener("resize", updateActiveProject);

    return () => {
      window.removeEventListener("scroll", updateActiveProject);
      window.removeEventListener("resize", updateActiveProject);

      if (unlockTimeoutRef.current) {
        clearTimeout(unlockTimeoutRef.current);
      }
    };
  }, []);

  const handleProjectClick = (slug: string) => {
    clickedSlugRef.current = slug;
    setActiveSlug(slug);

    if (unlockTimeoutRef.current) {
      clearTimeout(unlockTimeoutRef.current);
    }

    unlockTimeoutRef.current = setTimeout(() => {
      clickedSlugRef.current = null;
    }, 800);
  };

  return (
    <section
  id="featured-projects"
  className="relative mx-auto mt-8 grid max-w-[1440px] grid-cols-[250px_1fr] items-start gap-8 px-8"
>
  <aside className="sticky top-8 hidden h-fit rounded-3xl border border-mid-gray bg-light-gray p-8 text-black shadow-sm md:block">
     <h2 className="mb-7 text-tiny font-bold">Featured Projects</h2>

        <ul className="space-y-3 text-list">
          {projects.map((project) => {
            const active = activeSlug === project.id;

            return (
              <li key={project.id}>
                <a
                  href={`#project-${project.id}`}
                  onClick={() => handleProjectClick(project.id)}
                  className={`group relative block pl-4 transition ${
                    active ? "opacity-100" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <span
                    className={`absolute left-0 top-1/2 h-[18px] w-[8px] -translate-y-1/2 bg-blue transition-all duration-200 ${
                      active
                        ? "scale-y-100 opacity-100"
                        : "scale-y-0 opacity-0"
                    }`}
                  />

                  {project.title}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-row items-center gap-2">
          <p className="text-list">View Extra Works</p>
          <Image src="/arrow.svg" alt="" width={24} height={24} />
        </div>
      </aside>

      <div className="flex w-full mt-8">
        <div className="flex-1" />

        <div className="grid w-full max-w-5xl gap-4">
          <div
            id={`project-${projects[0].id}`}
            data-project-trigger={projects[0].id}
            className="scroll-mt-28"
          >
            <ProjectCard project={projects[0]} wide />
          </div>

          <div className="relative grid gap-4 md:grid-cols-2">
            <div
              id={`project-${projects[1].id}`}
              data-project-trigger={projects[1].id}
              className="scroll-mt-28"
            >
              <ProjectCard project={projects[1]} />
            </div>

            <div id={`project-${projects[2].id}`} className="scroll-mt-28">
              <ProjectCard project={projects[2]} />
            </div>

            <div
              data-project-trigger={projects[2].id}
              className="pointer-events-none absolute left-0 top-1/2 h-px w-px"
            />
          </div>

          <div
            id={`project-${projects[3].id}`}
            data-project-trigger={projects[3].id}
            className="scroll-mt-28"
          >
            <ProjectCard project={projects[3]} wide />
          </div>

          <div className="relative grid gap-4 md:grid-cols-2">
            <div
              id={`project-${projects[4].id}`}
              data-project-trigger={projects[4].id}
              className="scroll-mt-28"
            >
              <ProjectCard project={projects[4]} />
            </div>

            <div id={`project-${projects[5].id}`} className="scroll-mt-28">
              <ProjectCard project={projects[5]} />
            </div>

            <div
              data-project-trigger={projects[5].id}
              className="pointer-events-none absolute left-0 top-1/2 h-px w-px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}