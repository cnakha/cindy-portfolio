"use client";
import Problem from "../Problem";
import Solution from "../Solution";
import NextSteps from "../NextSteps";
import Picture from "../Picture";
import Items from "../Items";
import Note from "../Note";
import { projects } from "@/lib/projects";

export default function Worldnotes() {
  const worldnotes = projects.find((p) => p.id === "worldnotes");

  const techStack = [
    'React', 'Next.js', 'TypeScript', 'Konva', 'Firebase Firestore', 'NextAuth'
  ];

  const techStackDescriptions = [
    'React powers the interactive UI components.',
    'Nested layouts and route groups separate pages. Server Components handle data fetching and SEO-friendly rendering; Client Components power interactive views.',
    'TypeScript ensures type safety across components, hooks, and API calls, reducing runtime bugs and streamlining refactors as features evolve.', 
    'Konva enables the custom note creation canvas with drawing, text, and pixel-art modes, supporting layers, transforms, and undo/redo functionality.',
    'Firebase Firestore serves as the NoSQL database, storing notes, user profiles, and community replies with geo-discovery and fast reads in mind.', 
    'NextAuth manages authentication and session flow, tying identities to Firestore documents for secure user interactions.'
  ];

  if (!worldnotes) {
    return null;
  }

  return (
    <div className="flex flex-col mt-8 text-black">

      <Picture type={"wide"} source={"/projects/worldnotes/thumbnail.png"}/>
      <div className="mt-10"/>
      <Picture type={"wide"} source={"/projects/worldnotes/welcomeScreen.png"}/>
      <div className="mt-10"/>
      <Picture type={"right"} source={"/projects/worldnotes/traversal.png"}
        title={"Discover Art and Stories From Around the World"}
        description={"Start your adventure by landing at a random location scattered with 3D notes left behind by others. Exploration is spontaneous and feels natural: click-to-move in Street View, use the overview or mini map, or search specific places. The navigation bar allows quick refreshes of nearby notes, filtering, and stepping through notes."}
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

      <div className="flex flex-col gap-4">
        <p className="text-display">Creating the MVP</p>
        <p className="text-subtitle mt-10">Inspiration and Discovery</p>
        <p className="text-body leading-relaxed">WorldNote's creative direction embraces geo-located hand-drawn pictorial posts over the standard text-based or video/photo uploaded content to offer a quirky nuance and emotional depth in social interactions that is under explored today. <br/>The challenge then became:</p>
        <p className="text-body italic leading-relaxed">How can we design a social platform that inspires creativity?</p>
        <p className="text-body leading-relaxed">WorldNotes is deeply informed by a blend of <span className="font-semibold">internet culture</span>, mapping tools, and communal creativity platforms such as the Unsent Project, GeoGuesser, Reddit's r/Place, and Gartic Phone.</p>
      </div>

      <div className="mt-20"/>

      <div className="flex flex-col gap-4">
        <p className="text-subtitle mt-10">Storyboarding & Designing App Structure</p>
        <p className="text-body leading-relaxed">With the vision set, I focused on structuring the app and story boarding user flows. There's a diverse set of traversals I had to consider: note traversal, content browsing, the note creation process, etc., so I mapped the app structure out to visualize navigation routes between different sections, ensuring a concise logical user flow.</p>
      </div>
      <div className="mt-10"/>
      <Picture type={"captioned"} popup={true} source={"/projects/worldnotes/user_flow.png"} description={"App Structure Diagram"} />
      
      <div className="mt-20"/>

      <div className="flex flex-col gap-4">
        <p className="text-subtitle mt-10">Wireframing the Layout</p>
        <p className="text-body leading-relaxed">I sketched out how key pages like the user profile, community page, and subsequent news and updates page would look and interact. Early iterations helped me find balance between clean and simpler layouts and a stylized scrap book layout without over investing in visuals too soon.</p>
      </div>
      <div className="mt-10"/>
      <Picture type={"captioned"} popup={true} source={"/projects/worldnotes/wireframing.png"} description={"Wireframes of User Profile and Community Page"} />
      
      <div className="mt-20"/>

      <div className="flex flex-col gap-4">
        <p className="text-subtitle mt-10">Formal UI Design</p>
        <p className="text-body leading-relaxed">After validating layouts, I shifted toward creating a formal visual design of components using Figma and Illustrator. In doing this process, I found myself redesigning elements multiple times to refine usability and aesthetics.</p>
        <p className="text-body leading-relaxed">WorldNote's branding embraces playfulness, bright colors, references the paper medium, and carries a lighthearted aesthetic to reflect the project’s creative spirit. The UI is intentionally inviting, encouraging hesitant users to have casual fun.</p>
      </div>
      <div className="mt-10"/>
      <Note title="Creating An Ecosystem" text="A design system ensures the interface feels visually unified, giving every interaction from map navigation to note creation a shared cohesive identity. The platform is also intentionally designed to be scalable. For example, the note creator is built to modularly 
      adopt new features, opening possibilities like animated gifs, music attachments, note borders, and stickers to expand the ways users can express themselves." />
      <div className="mt-10"/>
    
      <Picture type={"captioned"} popup={true} source={"/projects/worldnotes/UI_Design.png"} description={"Mockup Deigns of User Profile and Community Page"} />

      <div className="mt-20"/>

      <div className="flex flex-col gap-4">
        <p className="text-subtitle mt-10">Fullstack Development</p>
        <p className="text-body leading-relaxed">I followed an Agile workflow with short sprints and modular commits to keep momentum and organization. Each development cycle began with defining small testable goals then designing the feature, implementing it, validating behavior, and gathering informal user feedback.</p>
        <div className="mt-10"/>
        <Items titles={techStack} descriptions={techStackDescriptions} />
        <div className="mt-10"/>
        <p className="text-subtitle mt-10">Frontend Development</p>
        <p className="text-body leading-relaxed">The bulk of my development time went into implementing WorldNotes's unique UI. It was imperative early on to set up a system of designs such as core color schemes, fonts, text sizing conventions etc. as to have a cohesive look. Pre-planning React component implementations helped streamline production and provide reusable code.</p>
        <div className="mt-10"/>
        <p className="text-subtitle mt-10">Backend Development: Storing Notes, User Data, and Reactions</p>
        <p className="text-body leading-relaxed">Implementing a database was something completely new to me, so I wanted something that could handle real-time data, simple to iterate on, and friendly to a solo workflow. Firebase Firestore is what I ended up using to store key information about user accounts, posted notes, and interactions. I also had no experience with user authentication practices so I ended up using NextAuth and allowed users to create accounts using Google accounts.</p>
        
      </div>

      <div className="mt-20"/>

      <NextSteps nextSteps={worldnotes.outcome} />

      <div className="mt-20"/>
    

    </div>
  );
}