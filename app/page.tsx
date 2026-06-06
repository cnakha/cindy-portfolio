import Image from "next/image";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";
import { projects } from "@/lib/projects";

export default function HomePage() {
  return (
    <main className="bg-white">
      <section className="relative h-[600px] overflow-hidden">
        <div className="max-w-6xl">
          <div className="relative w-full border">
           <picture>
              <source media="(max-width: 650px)" srcSet="/mobile-hero.svg" />

              <img
                src="/web-hero.svg"
                alt=""
                className="
                  absolute
                  left-0
                  top-0
                  w-[570px] sm:w-[750px] md:w-[910px]
                  max-w-none
                "
              />
            </picture>

            <div className="absolute left-[200px] top-[214px] z-10 max-w-[620px] text-black">
              <p className="text-body font-semibold">Hi, I’m Cindy Nakhammouane</p>

              <h1 className="mt-2 font-bold leading-none text-display">
                Fullstack Developer <br/> and Designer
              </h1>

              <p className="mt-4 max-w-[400px] md:max-w-[450px] text-body leading-tight">
                Researching, designing, user testing, and coding cool projects
                with product focused thinking.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FeaturedProjectsSection />

      <Footer />
    </main>
  );
}