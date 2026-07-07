"use client";
import Problem from "../Problem";
import Solution from "../Solution";
import NextSteps from "../NextSteps";
import Picture from "../Picture";
import Items from "../Items";
import Note from "../Note";
import Slideshow from "../Slideshow";
import Quote from "../Quote";
import { projects } from "@/lib/projects";

export default function YCGH() {
  const ycgh = projects.find((p) => p.id === "ycgh");
  if (!ycgh) {
    return null;
  }

  const doc_vid = "https://firebasestorage.googleapis.com/v0/b/portfolio-website-6baaf.firebasestorage.app/o/portfolio_videos%2FYCGH_Video_Documentation_FINAL.mp4?alt=media&token=c72fad37-0a48-4ad6-b566-d1aaeb8d9641";

  
  return (
    <div className="flex flex-col mt-8 text-black">

      <p className="text-subtitle">Concept Video</p>
      <div className="mt-4"/>
      <Picture type={"video"}  source={"/projects/ycgh/YCGH_Concept_Vid.mp4"}/>
      <div className="mt-10"/>

      <Picture type={"third"} popup={true} source={"/projects/ycgh/island_view.png"} source2={"/projects/ycgh/interaction1.jpg"} source3={"/projects/ycgh/thumbnail.png"}/>
      <div className="mt-10"/>
      <Picture type={"third"} popup={true} source={"/projects/ycgh/interaction3.jpg"} source2={"/projects/ycgh/interaction4.jpeg"} source3={"/projects/ycgh/interaction2.jpeg"}/>
      <div className="mt-10"/>

      <div className="mt-30"/>
        <div className="relative flex flex-col">
            <h2 className="text-display">Project Overview</h2>
            <span
                className={`absolute left-0 -bottom-4 h-[5px] bg-black transition-all duration-300 ease-out w-full`}
            />
        </div>
        <div className="mt-20"/>
        <Problem
          problem={ycgh.problem }
          subProblem={ycgh.subProblem}
          keyProblems={ycgh.keyProblems}
          keyProblemDescriptions={ycgh.keyProblemDescriptions}
        />
        <div className="mt-20"/>
  
        <Solution solution={ycgh.solution} />

        <div className="mt-20"/>
        <p className="text-subtitle">Documentation Video</p>
        <div className="mt-4"/>
        <Picture type={"video"} autoplay={false} source={doc_vid}/>
  
        <div className="mt-20"/>
  
        <div className="flex flex-col gap-4 ">
          <p className="text-display">SIGGRAPH 2025 Convention</p>
          <p className="text-body max-w-4xl">ACM SIGGRAPH is the world’s premier international conference of computer graphics and interactive techniques, known for its competitive selection process and global prestige.</p>
          <p className="text-body mt-2 max-w-4xl">After being accepted, my team put together a research poster to present at the SIGGRAPH 2025 Convention in Vancouver over the course of 5 days for over 12,000 attendees.</p>
          
          <div className="mt-4"/>
          <p className="text-subtitle">Outcome</p>
          <p className="text-body">Our project received significant attention at SIGGRAPH 2025, sparking engaging discussions about the future of AR/VR in mental health and adjacent fields. The positive feedback from attendees highlighted the potential impact of our work in making anxiety management more accessible and effective through immersive technology.</p>
          <div className="mt-4"/>
          <Quote
            text="The experience is emotionally engaging, using gentle gameplay mechanics, environmental storytelling, ambient sound, and evolving typography."
            author="Reviewer"
          />
          <div className="mt-4"/>
          <Quote
            text="While VR for mental health isn’t new, the focus on narrative, improvisation, and user interaction makes this project stand out. It’s a thoughtful blend of disciplines with potential for real-world impact."
            author="Reviewer"
          />

          <div className="mt-4"/>
          <Picture type={"third"} popup={true} useAspectRatio={true} source={"/projects/ycgh/2025_SIGGRAPH_POSTER_YCGH_Final.png"}/>
          <div className="mt-10"/>
        </div>
    </div>
  );
}