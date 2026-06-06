import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  wide?: boolean;
};

export default function ProjectCard({ project, wide = false }: ProjectCardProps) {
  return (
    <Link
      href={`/works/${project.slug}`}
      className="group block rounded-3xl border border-white/70 bg-light-black p-6"
    >
      <div
        className={`overflow-hidden rounded-2xl bg-neutral-700 ${
          wide ? "aspect-[16/7]" : "aspect-[16/9]"
        }`}
      >
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-5 flex items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <Image
            src="/thumb-icon.svg"
            alt=""
            width={44}
            height={44}
            className="shrink-0"
          />

          <div>
            <h3 className="text-body font-bold">{project.title}</h3>
            <p className="mt-1 max-w-md text-tiny text-white/75">
              {project.shortDescription}
            </p>
          </div>
        </div>

       <div
            className="
                grid size-12 shrink-0 place-items-center
                rounded-full bg-white

                scale-0 opacity-0
                origin-bottom-right

                transition-all duration-500
                ease-[cubic-bezier(0.22,1,0.36,1)]

                group-hover:scale-100
                group-hover:opacity-100
            "
            >
            <Image
                src="/arrow.svg"
                alt=""
                width={24}
                height={24}
            />
            </div>
      </div>
    </Link>
  );
}