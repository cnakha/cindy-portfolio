"use client";
import Picture from "@/components/works/Picture";
import Footer from "@/components/Footer";
import FeaturedProjectsSection from "@/components/FeaturedProjectsSection";

export default function ExtrasPAge() {
  return (
    <main className="bg-white pt-20">
      <FeaturedProjectsSection showExtras/>

      <Footer />
    </main>
  );
}