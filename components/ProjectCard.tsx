"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  wide?: boolean;
};

export default function ProjectCard({ project, wide = false }: ProjectCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        // only apply inView trick on touch screens
        if (window.matchMedia("(hover: none)").matches) {
          setInView(entry.isIntersecting);
        }
      },
      { threshold: 0.9 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const active = inView; // true on mobile when card is centred in view

  return (
    <Link
      ref={ref}
      scroll={true}
      href={`/works/${project.id}`}
      className="group relative block h-full rounded-2xl transition-all duration-700"
    >
      {/* Arrow — floats outside top-right corner */}
      <div
        className={`
          absolute top-6 right-6 z-10
          size-10 flex items-center justify-center
          rounded-full bg-black
          origin-top-right
          transition-all duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${active
            ? "scale-100 opacity-100"
            : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"}
        `}
      >
        <Image src="/arrow.svg" alt="" width={18} height={18} className="invert rotate-[-45deg]" />
      </div>

      {/* Image — top-right corner curves on hover / in-view */}
      <div
        className={`
          overflow-hidden rounded-t-2xl border border-black border-b-0
          bg-neutral-700 aspect-[12/8]
          transition-all duration-500
          ${active ? "rounded-tr-[250px]" : "group-hover:rounded-tr-[250px]"}
        `}
      >
        <img
          src={project.imageUrl}
          alt={project.title}
          className={`h-full w-full object-cover transition duration-900 ${active ? "scale-[1.03]" : "group-hover:scale-[1.03]"}`}
        />
      </div>

      <div className="text-black rounded-b-2xl bg-light-gray border border-black p-4 sm:p-8 pb-4">
        <h3 className="text-subtitle text-black">{project.title}</h3>
        <p className="mt-2 text-tiny leading-relaxed text-black">{project.description}</p>
        <div className="flex">
          <p className="mt-4 bg-light-black text-white py-2 px-4 rounded-lg text-tiny leading-relaxed">{project.context}</p>
        </div>
      </div>
    </Link>
  );
}
