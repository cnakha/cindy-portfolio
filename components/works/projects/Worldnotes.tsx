"use client";
import Problem from "../Problem";
import Solution from "../Solution";
import Outcome from "../Outcome";
import Picture from "../Picture";
import { projects } from "@/lib/projects";

export default function Worldnotes() {
  const worldnotes = projects.find((p) => p.id === "worldnotes");

  if (!worldnotes) {
    return null;
  }

  return (
    <div className="flex flex-col mt-8 text-black">

      <Picture type={"wide"} source={"/projects/worldnotes/welcomeScreen.png"}/>
      <div className="mt-10"/>
      <Picture type={"right"} source={"/projects/worldnotes/traversal.png"}
        title={"Discover Art and Stories From Around the World"}
        description={"Start your adventure by landing at a random location scattered with 3D notes left behind by others. Exploration feels natural: click-to-move in Street View, use the overview or mini map, or search specific places. The navigation bar allows quick refreshes of nearby notes, filters, and stepping through notes."}
      />
      <div className="mt-2"/>
      <Picture type={"left"} source={"/projects/worldnotes/post_viewer.png"}
        title={"See the Full Picture and React with Your Community"}
        description={"A post viewer will be shown if you click on a note, here we can see information about the note’s title, creator, location, description, and community reactions."}
      />
      <div className="mt-2"/>
      <Picture type={"right"} source={"/projects/worldnotes/profile.png"}
        title={"Show Off Your Notes the Way You Want"}
        description={"Profiles show you all the notes you post, draft, repost, like, and save. The cover page is a place the user can display their favorite notes in any way they desire."}
      />
      <div className="mt-2"/>
      <Picture type={"left"} source={"/projects/worldnotes/post_viewer.png"}
        title={"Create Notes with Fun and Easy to Use Tools"}
        description={"The note creation canvas provides custom tools and brushes. Drawing, text, pixel art, and animation are all supported along with a layers panel, color picker, and color palette creator."}
      />


      <div className="mt-30"/>
      <div className="relative flex flex-col">
          <h2 className="text-display">Project Breakdown</h2>
          <span
              className={`absolute left-0 -bottom-4 h-[5px] bg-blue transition-all duration-300 ease-out w-full`}
          />
      </div>
      <div className="mt-20"/>
      <Problem
        problem={worldnotes.problem }
        subProblem={worldnotes.subProblem}
        keyProblems={worldnotes.keyProblems}
        keyProblemDescriptions={worldnotes.keyProblemDescriptions}
      />
      <div className="mt-20"/>

      <Solution solution={worldnotes.solution} />
      <div className="mt-20"/>
      <Outcome outcome={worldnotes.outcome} />

    </div>
  );
}