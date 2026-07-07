"use client";

import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import { extras, ExtraProject } from "@/lib/extras";
import { useRouter } from "next/navigation";

const MotionImage = motion(Image);

type FeaturedProjectsSectionProps = {
  showExtras?: boolean;
};

export default function FeaturedProjectsSection({
  showExtras = false,
}: FeaturedProjectsSectionProps) {
  const showingExtra = showExtras;
  const router = useRouter();

  const [activeSlug, setActiveSlug] = useState(
    showingExtra ? extras[0]?.id : projects[0]?.id
  );
  const [selectedExtra, setSelectedExtra] = useState<ExtraProject | null>(null);
  const [asideHeight, setAsideHeight] = useState<number | "auto">("auto");

  const clickedSlugRef = useRef<string | null>(null);
  const unlockTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const asideContentRef = useRef<HTMLDivElement | null>(null);

  const listItems = showingExtra ? extras : projects;

  const closePopup = () => setSelectedExtra(null);

  const isValidImageSrc = (src?: string) => {
  return Boolean(src) && (src!.startsWith("/") || src!.startsWith("http"));
};

  const preloadImages = (images: Array<string | undefined>) => {
    images.filter(isValidImageSrc).forEach((src) => {
      const img = new window.Image();
      img.src = src as string;
    });
  };

  useEffect(() => {
    setActiveSlug(showingExtra ? extras[0]?.id : projects[0]?.id);
  }, [showingExtra]);

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
  }, [showingExtra, listItems.length]);

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

  const handleExtraOpen = (project: ExtraProject) => {
    setActiveSlug(project.id);
    preloadImages([project.coverImage, ...project.images]);
    setSelectedExtra(project);
  };

  return (
    <>
      <section
        id={showingExtra ? "extra-projects" : "featured-projects"}
        className="relative mx-auto max-w-[1440px] grid-cols-[260px_1fr] items-start gap-8 px-6 md:mt-8 md:grid md:px-8"
      >

        {/* Aside and project list content here... */}
        <motion.aside
          animate={{ height: asideHeight }}
          transition={{
            height: {
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
          className="sticky hidden overflow-hidden rounded-3xl border border-light-black bg-black text-light-black md:top-18 md:block"
        >
          <div ref={asideContentRef} className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={showingExtra ? "extra" : "featured"}
                layout
                initial="hidden"
                animate="show"
                exit="exit"
                variants={asideContainerVariants}
              >

                <motion.ul
                  variants={asideListVariants}
                  className="space-y-3 text-body"
                >
                  {listItems.map((item) => {
                    const active = activeSlug === item.id;

                    return (
                      <motion.li key={item.id} variants={asideItemVariants}>
                        {showingExtra ? (
                          <button
                            onClick={() => handleExtraOpen(item as ExtraProject)}
                            className={`group relative block cursor-pointer pl-4 text-left text-white transition ${
                              active
                                ? "opacity-100"
                                : "opacity-60 hover:opacity-100"
                            }`}
                          >
                            <span
                              className={`absolute left-0 top-1/2 h-[18px] w-[8px] -translate-y-1/2 bg-white transition-all duration-200 ${
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
                            className={`group relative block pl-4 transition text-white ${
                              active
                                ? "opacity-100"
                                : "opacity-60 hover:opacity-100"
                            }`}
                          >
                            <span
                              className={`absolute left-0 top-1/2 h-[18px] w-[8px] -translate-y-1/2 bg-white transition-all duration-200 ${
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
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.aside>

        <div className=" flex w-full">
          <div className="flex-1" />

          <motion.div
            key={showingExtra ? "extra" : "featured"}
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
            className="grid w-full max-w-6xl gap-4"
          >
            
            {!showingExtra ? (
              <>
              <div className="flex justify-between mb-2 ">
                <p className="text-display text-black">Featured Works</p>
                {/* Go to extras page button */}
                <div className="flex">
                  <div 
                    onClick={() => router.push("/extras")}
                    className="hidden lg:flex cursor-pointer right-6 top-6 z-50 rounded-full border border-mid-gray bg-light-gray 
                    px-6 py-3 text-caption text-black flex items-center gap-2 hover:translate-x-2 transition ease-in-out">
                    <p className="text-caption text-black/60 hover:text-black/100 font-semibold transition">View Extra Works</p>
                    <Image src="/arrow.svg" alt="" width={24} height={24} className="" />
                  </div>
                </div>
              </div>

                <div className="relative grid gap-4 lg:grid-cols-2">
                  <motion.div
                    variants={projectItemVariants}
                    id={`project-${projects[0].id}`}
                    data-project-trigger={projects[0].id}
                    className="scroll-mt-28"
                  >
                    <ProjectCard project={projects[0]} />
                  </motion.div>

                  <motion.div
                    variants={projectItemVariants}
                    id={`project-${projects[1].id}`}
                    className="scroll-mt-28"
                  >
                    <ProjectCard project={projects[1]} />
                  </motion.div>

                  <div
                    data-project-trigger={projects[1].id}
                    className="pointer-events-none absolute left-0 top-1/2 h-px w-px"
                  />
                </div>

                <div className="relative grid gap-4 lg:grid-cols-2">
                  <motion.div
                    variants={projectItemVariants}
                    id={`project-${projects[2].id}`}
                    data-project-trigger={projects[2].id}
                    className="scroll-mt-28"
                  >
                    <ProjectCard project={projects[2]} />
                  </motion.div>

                  <motion.div
                    variants={projectItemVariants}
                    id={`project-${projects[3].id}`}
                    className="scroll-mt-28"
                  >
                    <ProjectCard project={projects[3]} />
                  </motion.div>

                  <div
                    data-project-trigger={projects[3].id}
                    className="pointer-events-none absolute left-0 top-1/2 h-px w-px"
                  />
                </div>

                <div className="relative grid gap-4 lg:grid-cols-2">
                  <motion.div
                    variants={projectItemVariants}
                    id={`project-${projects[4].id}`}
                    data-project-trigger={projects[4].id}
                    className="scroll-mt-28"
                  >
                    <ProjectCard project={projects[4]} />
                  </motion.div>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-4">
              <p className="text-display text-black ">Extra Works</p>
              <div className="columns-2 gap-3 md:columns-3">
                {extras.map((project, index) => (
                  <motion.button
                    variants={projectItemVariants}
                    key={project.id}
                    onClick={() => handleExtraOpen(project)}
                    onMouseEnter={() =>
                      preloadImages([project.coverImage, ...project.images])
                    }
                    className="mb-3 block w-full cursor-pointer break-inside-avoid overflow-hidden rounded-2xl border border-mid-gray bg-light-black"
                  >
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      width={600}
                      height={800}
                      sizes="(max-width: 768px) 50vw, 33vw"
                      priority={index < 3}
                      className="h-auto w-full object-contain transition duration-300 hover:scale-105"
                    />
                  </motion.button>
                ))}
              </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedExtra && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closePopup}
            className="fixed inset-0 z-[100] bg-black/70"
          >
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed left-1/2 top-6 z-[110] flex w-[calc(100%-48px)] max-w-3xl -translate-x-1/2 items-center justify-between rounded-xl bg-white px-8 py-5 text-black shadow-lg"
            >
              <div>
                <h2 className="text-body font-bold">{selectedExtra.title}</h2>
                <p className="mt-1 text-tiny">{selectedExtra.description}</p>
              </div>

              <button
                onClick={closePopup}
                className="grid cursor-pointer place-items-center rounded-full border border-mid-gray bg-light-gray p-3 text-black transition hover:scale-105"
                aria-label="Close project popup"
              >
                <Image src="/x.svg" alt="" width={24} height={24} />
              </button>
            </motion.div>

            <div className="hide-scrollbar h-full overflow-y-auto px-6 pb-16 pt-36">
              <div
                onClick={(e) => e.stopPropagation()}
                className="mx-auto grid max-w-2xl gap-6"
              >
                {selectedExtra.video && (
                  <motion.video
                    src={selectedExtra.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full rounded-2xl object-cover"
                  />
                )}

                {[selectedExtra.coverImage, ...selectedExtra.images]
                  .filter((image): image is string => Boolean(image) && image.startsWith("/"))
                  .map((image, index) => (
                    <MotionImage
                      key={`${image}-${index}`}
                      src={image}
                      alt={`${selectedExtra.title} image ${index + 1}`}
                      width={900}
                      height={1200}
                      sizes="(max-width: 768px) 100vw, 672px"
                      priority={index === 0}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{
                        duration: 0.25,
                        delay: 0.12 + index * 0.05,
                      }}
                      className="h-auto w-full rounded-2xl object-cover"
                    />
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const projectItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
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
      ease: "easeIn",
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