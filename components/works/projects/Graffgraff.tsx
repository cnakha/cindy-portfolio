"use client";
import Problem from "../Problem";
import Solution from "../Solution";
import NextSteps from "../NextSteps";
import Picture from "../Picture";
import Items from "../Items";
import Note from "../Note";
import { projects } from "@/lib/projects";

export default function Graffgraff() {
    const graffgraff = projects.find((p) => p.id === "graffgraff");

    if (!graffgraff) {
      return null;
    }

  return (
    <div className="flex flex-col mt-8 text-black">
    
      {/* <Picture type={"wide"} source={"/projects/graffgraff/thumbnail.jpg"}/>
      <div className="mt-10"/> */}
      <Picture type={"third"} source={"/projects/graffgraff/people1.jpg"} source2={"/projects/graffgraff/thumbnail.jpg"} source3={"/projects/graffgraff/people4.jpg"}/>
      <div className="mt-10"/>
      <Picture type={"third"} source={"/projects/graffgraff/people5.jpg"} 
      source2={"/projects/graffgraff/people2.jpg"} source3={"/projects/graffgraff/people3.jpg"}/>
      <div className="mt-10"/>
      <Picture type={"wide"} source={"/projects/graffgraff/testing.png"}/>
      <div className="mt-10"/>
      <Picture type={"wide"} source={"/projects/graffgraff/Nakhammouane1.png"}/>
      <div className="mt-10"/>
      <Picture type={"wide"} source={"/projects/graffgraff/Nakhammouane2.png"}/>
      <div className="mt-10"/>
      <Picture type={"wide"} source={"/projects/graffgraff/characters.png"}/>
      <div className="mt-10"/>

      {/* <div className="mt-30"/>
        <div className="relative flex flex-col">
            <h2 className="text-display">Project Breakdown</h2>
            <span
                className={`absolute left-0 -bottom-4 h-[5px] bg-blue transition-all duration-300 ease-out w-full`}
            />
        </div>
        <div className="mt-20"/> */}
        {/* <Problem
          problem={graffgraff.problem }
          subProblem={graffgraff.subProblem}
          keyProblems={graffgraff.keyProblems}
          keyProblemDescriptions={graffgraff.keyProblemDescriptions}
        />
        <div className="mt-20"/>
  
        <Solution solution={graffgraff.solution} /> */}
  
        <div className="mt-20"/>
    </div>
  );
}