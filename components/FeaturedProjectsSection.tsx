"use client";

import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import { extras, ExtraProject } from "@/lib/extras";

export default function FeaturedProjectsSection() {
  const [activeSlug, setActiveSlug] = useState(projects[0]?.id);
  const [mode, setMode] = useState<"featured" | "extra">("featured");
  const [selectedExtra, setSelectedExtra] = useState<ExtraProject | null>(
    null
  );

  const clickedSlugRef = useRef<string | null>(null);
  const unlockTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showingExtra = mode === "extra";

  

  useEffect(() => {
    if (showingExtra) return;

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
  }, [showingExtra]);

  const handleProjectClick = (id: string) => {
    clickedSlugRef.current = id;
    setActiveSlug(id);

    if (unlockTimeoutRef.current) {
      clearTimeout(unlockTimeoutRef.current);
    }

    unlockTimeoutRef.current = setTimeout(() => {
      clickedSlugRef.current = null;
    }, 800);
  };

  const toggleMode = () => {
    setMode(showingExtra ? "featured" : "extra");
    setActiveSlug(showingExtra ? projects[0]?.id : extras[0]?.id);
  };

  const listItems = showingExtra ? extras : projects;
  const asideContentRef = useRef<HTMLDivElement | null>(null);
  const [asideHeight, setAsideHeight] = useState<number | "auto">("auto");

  useEffect(() => {
    if (!asideContentRef.current) return;

    const updateHeight = () => {
      if (!asideContentRef.current) return;
      setAsideHeight(asideContentRef.current.offsetHeight);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(asideContentRef.current);

    return () => observer.disconnect();
  }, [mode, listItems.length]);

  return (
    <>
      <section
        id="featured-projects"
        className="relative mx-auto md:mt-8 md:grid max-w-[1440px] grid-cols-[260px_1fr] items-start gap-8 px-6 md:px-8"
      >
      <motion.aside
        animate={{ height: asideHeight }}
        transition={{
          height: {
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          },
        }}
        className="sticky md:top-8 hidden overflow-hidden rounded-3xl border border-mid-gray bg-light-gray text-black md:block"
      >
        <div ref={asideContentRef} className="p-8">
            <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              layout
              initial="hidden"
              animate="show"
              exit="exit"
              variants={asideContainerVariants}
            >
              <motion.h2
                variants={asideFadeVariants}
                className="mb-7 text-tiny font-bold"
              >
                {showingExtra ? "Extra Works" : "Featured Projects"}
              </motion.h2>

              <motion.ul
                variants={asideListVariants}
                className="space-y-3 text-list"
              >
                {listItems.map((item) => {
                  const active = activeSlug === item.id;

                  return (
                    <motion.li key={item.id} variants={asideItemVariants}>
                      {showingExtra ? (
                        <button
                          onClick={() => {
                            setActiveSlug(item.id);
                            setSelectedExtra(item as ExtraProject);
                          }}
                          className={`group relative block cursor-pointer pl-4 text-left transition ${
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

                          {item.title}
                        </button>
                      ) : (
                        <a
                          href={`#project-${item.id}`}
                          onClick={() => handleProjectClick(item.id)}
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

                          {item.title}
                        </a>
                      )}
                    </motion.li>
                  );
                })}
              </motion.ul>

              <motion.button
                variants={asideFadeVariants}
                onClick={toggleMode}
                className="group mt-10 flex cursor-pointer flex-row items-center gap-2 text-list"
              >
                <span>
                  {showingExtra ? "View Featured Works" : "View Extra Works"}
                </span>

                <div className="transition-transform duration-200 group-hover:translate-x-1">
                  <Image src="/arrow.svg" alt="" width={24} height={24} />
                </div>
              </motion.button>
            </motion.div>
          </AnimatePresence>
          </div>
        </motion.aside>

        <div className="flex w-full mt-8">
          <div className="flex-1" />

          <motion.div
            key={mode}
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
            className="grid w-full max-w-5xl gap-4"
          >
            {!showingExtra ? (
              <>
                <motion.div
                  variants={projectItemVariants}
                  id={`project-${projects[0].id}`}
                  data-project-trigger={projects[0].id}
                  className="scroll-mt-28"
                >
                  <ProjectCard project={projects[0]} wide />
                </motion.div>

                <div className="relative grid gap-4 lg:grid-cols-2">
                  <motion.div
                    variants={projectItemVariants}
                    id={`project-${projects[1].id}`}
                    data-project-trigger={projects[1].id}
                    className="scroll-mt-28"
                  >
                    <ProjectCard project={projects[1]} />
                  </motion.div>

                  <motion.div
                    variants={projectItemVariants}
                    id={`project-${projects[2].id}`}
                    className="scroll-mt-28"
                  >
                    <ProjectCard project={projects[2]} />
                  </motion.div>

                  <div
                    data-project-trigger={projects[2].id}
                    className="pointer-events-none absolute left-0 top-1/2 h-px w-px"
                  />
                </div>

                <motion.div
                  variants={projectItemVariants}
                  id={`project-${projects[3].id}`}
                  data-project-trigger={projects[3].id}
                  className="scroll-mt-28"
                >
                  <ProjectCard project={projects[3]} wide />
                </motion.div>

                <div className="relative grid gap-4 lg:grid-cols-2">
                  <motion.div
                    variants={projectItemVariants}
                    id={`project-${projects[4].id}`}
                    data-project-trigger={projects[4].id}
                    className="scroll-mt-28"
                  >
                    <ProjectCard project={projects[4]} />
                  </motion.div>

                  <motion.div
                    variants={projectItemVariants}
                    id={`project-${projects[5].id}`}
                    className="scroll-mt-28"
                  >
                    <ProjectCard project={projects[5]} />
                  </motion.div>

                  <div
                    data-project-trigger={projects[5].id}
                    className="pointer-events-none absolute left-0 top-1/2 h-px w-px"
                  />
                </div>
              </>
            ) : (
              <div className="columns-2 gap-3 md:columns-3">
                {extras.map((project) => (
                  <motion.button
                    variants={projectItemVariants}
                    key={project.id}
                    onClick={() => {
                      setActiveSlug(project.id);
                      setSelectedExtra(project);
                    }}
                    className="mb-3 block w-full cursor-pointer break-inside-avoid overflow-hidden rounded-2xl border border-mid-gray bg-light-black"
                  >
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="h-auto w-full object-contain transition duration-300 hover:scale-105"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {selectedExtra && (
        <div 
          onClick={() => setSelectedExtra(null)}
          className="fixed inset-0 z-[100] bg-black/70"
        >
          <div className="fixed left-1/2 top-6 z-[110] flex w-[calc(100%-48px)] max-w-4xl -translate-x-1/2 items-center justify-between rounded-xl bg-white px-8 py-5 text-black shadow-lg">
            <div>
              <h2 className="text-body font-bold">{selectedExtra.title}</h2>
              <p className="text-tiny">{selectedExtra.description}</p>
            </div>

            <button
              onClick={() => setSelectedExtra(null)}
              className="grid p-3 cursor-pointer place-items-center border border-mid-gray rounded-full bg-light-gray text-black transition hover:scale-105"
              aria-label="Close project popup"
            >
              <Image src="/x.svg" alt="" width={24} height={24}/>
            </button>
          </div>

          <div className="hide-scrollbar h-full overflow-y-auto px-6 pb-16 pt-36">
            <div className="mx-auto grid max-w-2xl gap-6">
              {[selectedExtra.coverImage, ...selectedExtra.images].map(
                (image, index) => (
                  <img
                    key={`${image}-${index}`}
                    src={image}
                    alt=""
                    className="w-full rounded-2xl object-cover"
                  />
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const projectItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.96,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const asideContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const asideFadeVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.18,
      ease: "easeIn" ,
    },
  },
};

const asideListVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.035,
      staggerDirection: -1,
    },
  },
};

const asideItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -12,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    x: -8,
    transition: {
      duration: 0.16,
      ease: "easeIn",
    },
  },
};