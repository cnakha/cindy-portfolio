import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import Footer from "@/components/Footer";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const project = projects.find((project) => project.id === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="px-8 pt-32">
      <article className="mx-auto max-w-5xl">
        <p className="text-white/60">Project</p>

        <h1 className="mt-2 text-6xl font-black">{project.title}</h1>

        <p className="mt-6 max-w-3xl text-xl text-white/80">
          {project.description}
        </p>

        {/* <div className="mt-8 flex flex-wrap gap-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white px-4 py-2 text-sm text-black"
            >
              {tag}
            </span>
          ))}
        </div> */}

        <div className="mt-12 overflow-hidden rounded-3xl border border-white/70">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full object-cover"
          />
        </div>

        <section className="mt-16 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black">Overview</h2>
            <p className="mt-4 text-white/75">
              Add your project overview here. Explain what the project is, who
              it is for, and what problem it solves.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-black">Role</h2>
            <p className="mt-4 text-white/75">
              Add your role, tools, timeline, team, and contribution here.
            </p>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}