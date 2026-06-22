"use client";
import Problem from "../Problem";
import Solution from "../Solution";
import NextSteps from "../NextSteps";
import Picture from "../Picture";
import Items from "../Items";
import Note from "../Note";
import { projects } from "@/lib/projects";

export default function Folio() {
  const folio = projects.find((p) => p.id === "folio");
  if (!folio) { return null;}

  const tech = [
    'Three.js',
    'React + Next.js',
    'TypeScript',
    'WebGL + Shader Programming',
    'WebXR / AR',
    'Node.js / Express (Future scaling)',
    'Vercel Deployment',
  ];

  const techDescriptions = [
    'Three.js powers the real-time 3D rendering and interaction system, enabling detailed page-turn animations, fold mechanics, and material effects.',
    'React + Next.js provide a modern web architecture with component-based UI, server-side rendering, and fast client-side transitions.',
    'TypeScript ensures strong type-safety across rendering logic, UI components, and scene data, preventing errors and improving maintainability as the tool scales.',
    'WebGL and custom shader logic enable realistic paper behavior, bends, shadows, lighting, texture mapping, and subtle material effects that mimic physical print.',
    'WebXR enables augmented reality viewing, allowing users to place and explore digital publications in physical environments through supported devices.',
    'Node.js and Express are part of the planned backend expansion for cloud asset handling, collaboration tools, publication sharing, and persistent project storage.',
    'Vercel is used for fast deployment, preview environments, and CI/CD automation, ensuring seamless updates and reliable hosting for interactive WebGL experiences.',
  ];

  const accessibillity = [
    'Immediate feedback: changes are reflected in real-time 3D, reinforcing exploration through visual reward.',
    'Clear interaction cues and visual markers for actionable elements (drag edges, fold handles, navigation).',
    'Keyboard-friendly controls and focus-states for primary actions like rotating, flipping, and zooming.',
    'Encouraging unexpected outcomes: folds and page sequences can be rearranged on the fly.',
    'Play without penalty: undo/redo, safe drafts, and autosave encourage bold experimentation',
    'Warm, non-intimidating UI: soft motion, gallery-like space, and tooltips that feel like guidance rather than instruction',
  ];

  return (
    <div className="flex flex-col mt-8 text-black">
    
      <Picture type={"wide"} source={"/projects/folio/thumbnail.png"}/>
      <div className="mt-10"/>
      <Picture type={"right"} popup={true} source={"/projects/folio/landing.png"}
        title={"Import Images and PDFs, Select a Template, Then Start!"}
        description={"Users can import images, PDFs, select from a variety of templates, and customize their designs with intuitive tools."}
      />
      <div className="mt-2"/>
      <Picture type={"left"} popup={true} source={"/projects/folio/folding.png"}
        title={"Dynamically Fold your Pages Digitally"}
        description={"Handle paper folding with ease using intuitive gestures like pinch-to-fold and drag-to-unfold."}
      />
      <div className="mt-2"/>
      <Picture type={"right"} popup={true} source={"/projects/folio/Spine_UI.png"}
        title={"Create Unique Layouts and Binds"}
        description={"Move and resize elements freely to create unique layouts. Choose from various binding and page styles like spiral binds, stitched binds, textured paper, to glossy paper."}
      />
      <div className="mt-2"/>
      <Picture type={"left"} popup={true} source={"/projects/folio/cutting.png"}
        title={"Cut Pages with Ease and Precision"}
        description={"Users can easily create cutouts and custom shapes on their pages using cutting tools inspired by paper cutter sliders."}
      />
      <div className="mt-2"/>
      <Picture type={"right"} popup={true} source={"/projects/folio/share.png"}
        title={"Share & Publish Your Creations with the World"}
        description={"Creators can generate a share link or embed, allowing publications to live online like interactive artifacts — not static images or PDFs."}
      />
      <div className="mt-10"/>
      <div className="mt-30"/>
      <div className="relative flex flex-col">
          <h2 className="text-display">Project Breakdown</h2>
          <span
              className={`absolute left-0 -bottom-4 h-[5px] bg-blue transition-all duration-300 ease-out w-full`}
          />
      </div>
      <div className="mt-20"/>
      <Problem
        problem={folio.problem }
        subProblem={folio.subProblem}
        keyProblems={folio.keyProblems}
        keyProblemDescriptions={folio.keyProblemDescriptions}
      />
      <div className="mt-20"/>

      <Solution solution={folio.solution} />

      <div className="mt-20"/>

      <div className="flex flex-col gap-4">
        <p className="text-display">The Process</p>
        <p className="text-subtitle mt-10">Inspiration and Research</p>
        <p className="text-body leading-relaxed">Paper engineering and bookbinding have centuries of rich history and although the medium is more enriching in its physical form, exploring ways to convey these physical properties digitally can allow designers to share our work's potential more captivatingly as well as serve as a promising archival method.</p>
        <p className="text-body leading-relaxed">I researched traditional techniques and modern digital tools to understand how people interact with physical publications and to find physical qualities I could replicate. The challenge then became:</p>
        <p className="text-body leading-relaxed italic">How can we design a user friendly tool to construct prints in 3D that captures the tactility of traditional paper engineering?</p>
        
        <p className="text-subtitle mt-20">Design Philosophy</p>
        <p className="text-body leading-relaxed">The core design values for FolioFolds centered around simplicity, appreciation, and accessibility.</p>
        <Note title="Simplicity and Intuitiveness" text="Simplicity was key to ensure that users of all skill levels could easily navigate the interface and create their own foldable publications without feeling overwhelmed by complex tools or features." />
        <Note title="Digital Craft, Physical Sensibility" text="The UI design incorporates the aesthetic qualities of book art through its softness, tactility, and textures. The digital tools mimic traditional paper engineering techniques such as folding, while visually resembling current 3D modeling and design softwares. The gestures are reminiscent of handling real books (pinching, dragging, peeking, unfolding)" />
        <Note title="Celebration of Print Culture" text="FolioFolds elevates printed matter as living, interactive media, bridging the gap between physical craft and digital storytelling." />

        <p className="text-subtitle mt-20">Prototyping and Designing Behaviors</p>
        <p className="text-body leading-relaxed">I coded iterative UI prototypes to explore folding mechanics and 3D paper handling. It was important to nail how paper should move, react, and feel in a digital environment. Early explorations of binding systems included simple book bindings and hinge systems, gradually evolving into physics-informed page bends, easing curves, motion, weight, tension, and natural drag gestures.</p>
        
        <p className="text-subtitle mt-20">Interaction and Usability Tests</p>
        <p className="text-body leading-relaxed">I conducted informal testing sessions with design students, book artists, and casual users to refine usability and user flow. These sessions highlighted key needs: intuitive camera controls, clear affordance for flipping and unfolding, and a forgiving learning curve for newcomers.</p>
        <p className="text-body leading-relaxed">Based on feedback, I streamlined gesture input, introduced subtle visual prompts, and optimized transitions for clarity and comfort. The iterative feedback loop ensured the interface remains approachable for beginners while still offering creative depth for expert users.</p>

        <p className="text-subtitle mt-10">Technologies</p>
        <p className="text-body leading-relaxed">The following tools make up the core technology stack for FolioFolds:</p>
        <div className=""/>
        <Items titles={tech} descriptions={techDescriptions} />

        <p className="text-subtitle mt-20"/>
      </div>
    </div>
  );
}