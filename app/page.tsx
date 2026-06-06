import Image from "next/image";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";
import { projects } from "@/lib/projects";

export default function HomePage() {
  return (
    <main className="bg-white">
<div className="mx-auto w-full max-w-[1440px]">
          <section className="relative h-[600px] overflow-hidden">
          <div className="relative h-full w-full">
            <picture>
              <source media="(max-width: 650px)" srcSet="/mobile-hero.svg" />

              <img
                src="/web-hero.svg"
                alt=""
                className="absolute left-0 top-0 w-[570px] max-w-none sm:w-[750px] md:w-[910px]"
              />
            </picture>

            <div className="absolute left-[100px] top-[170px] sm:left-[180px] sm:top-[180px] md:left-[200px] md:top-[214px] z-10 max-w-[620px] text-black">
              <p className="text-body font-semibold">
                Hi, I’m Cindy Nakhammouane
              </p>

              <h1 className="mt-2 font-bold leading-none text-display">
                Fullstack Developer <br /> and Designer
              </h1>

              <p className="mt-4 max-w-[350px] sm:max-w-[400px] text-body leading-tight md:max-w-[450px]">
                Researching, designing, user testing, and coding cool projects
                with product focused thinking.
              </p>
            </div>
          </div>
        </section>

        <FeaturedProjectsSection />
      </div>

      <Footer />
    </main>
  );
}