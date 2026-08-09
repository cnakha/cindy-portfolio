import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  wide?: boolean;
};

export default function ProjectCard({
  project,
  wide = false,
}: ProjectCardProps) {
  
  return (
    <Link
      scroll={true}
      href={`/works/${project.id}`}
      className="group relative block h-full rounded-3xl bg-light-black transition-ease-all duration-700 shadow-sm "
    >
      <div
        className={`overflow-hidden rounded-t-2xl bg-neutral-700 aspect-[16/8]`}
      >
        <img
          src={project.imageUrl}
          alt={project.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="">
        <div className="text-black text-white p-4 sm:p-8 pb-6">
          <h3 className="text-subtitle font-bold">{project.title}</h3>
          <p className="mt-2 text-tiny font-semibold leading-relaxed">{project.context}</p>
          <p className="mt-2 text-tiny opacity-50 leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      <div
        className="
          absolute top-4 right-4 z-10
          place-items-center p-2 px-4 gap-2
          rounded-full  bg-light-gray
          border border-mid-gray
          scale-0 opacity-0 origin-top-right
          transition-all duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          group-hover:scale-100 group-hover:opacity-100
          flex flex-row font-semibold
        "
      >
        <p className="text-tiny text-nowrap text-black ">
          Read More
        </p>
        <Image src="/arrow.svg" alt="" width={24} height={24} />
      </div>
    </Link>
  );
}