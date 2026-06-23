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

      <Picture type={"video"} autoplay={true} source={"/projects/graffgraff/graffgraff_mini_demo.mp4"}/>
      <div className="mt-10"/>
      <Picture type={"half"} popup={true} useAspectRatio source={"/projects/graffgraff/Nakhammouane1.png"} source2={"/projects/graffgraff/Nakhammouane2.png"}/>
      <div className="mt-10"/>
      <Picture type={"third"} popup={true} source={"/projects/graffgraff/people1.jpg"} source2={"/projects/graffgraff/Indeximage.gif"} source3={"/projects/graffgraff/people4.jpg"}/>
      {/* <div className="mt-10"/> */}
      {/* <Picture type={"third"} popup={true} source={"/projects/graffgraff/people5.jpg"} 
      source2={"/projects/graffgraff/people2.jpg"} source3={"/projects/graffgraff/people3.jpg"}/>
      
   */}
      <div className="mt-10"/>
      <Picture type={"half"} popup={true} useAspectRatio source={"/projects/graffgraff/spread.png"} source2={"/projects/graffgraff/characters.png"}/>

      <div className="mt-10"/>
      <Picture type={"half"} popup={true} useAspectRatio source={"/projects/graffgraff/testing.png"} source2={"/projects/graffgraff/Nakhammouane5.png"}/>

      <div className="mt-10"/>
      <Picture type={"video"} autoplay={false} source={"/projects/graffgraff/cricut-vid.mp4"}/>
      
      
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
          problem={graffgraff.problem }
          subProblem={graffgraff.subProblem}
          keyProblems={graffgraff.keyProblems}
          keyProblemDescriptions={graffgraff.keyProblemDescriptions}
        />
        <div className="mt-20"/>
  
        <Solution solution={graffgraff.solution} />
  
        <div className="mt-20"/>
          <div className="flex flex-col gap-4 max-w-4xl">
          <p className="text-display">Production Process</p>
        
        </div>

        <div className="mt-10"/>

        <div className="flex flex-col gap-4 ">
          <p className="text-subtitle mt-10">Research & Conceptual Development</p>
          <p className="text-body leading-relaxed max-w-4xl">Preliminary conceptual development started with brain dumping topics related to nonsensical creativity, looking specifically for sources of nonsense and creative inspiration in my own life and in the world around me.</p>
          <p className="text-body leading-relaxed max-w-4xl">My research explored methodologies to nonsense, the relationship between nonsensical creativity and forming digital communities, ways to strengthen creativity, and different modes of socialization.</p>
          <Note text="The consensus I found was that creativity is considered a skill that can be developed with practice and consistency, and that people are often more creative when they are in a social setting or collaborating with others. This lead me to experimenting with using games as a vehicle for this, experimenting with several modes of socialization/game play per creativity game." 
            title="Research Findings"/>
          <p className="text-body leading-relaxed max-w-4xl">In terms of market research, I searched for existing platforms and games that encourage creativity and self expression. Some notable places of inspiration were Gartic Phone, Jackbox, and Scribbl.io. Here I gained inspiration on user experience and game content design.</p>
          <div className="mt-2"/>
          {/* <Picture type={"half"} popup={true} source={"/projects/graffgraff/braindump.jpg"} source2={"/projects/graffgraff/socialization.png"}/> */}
          <p className="text-subtitle mt-10">6 Field Interviews and Conducting Field Surveys (30 Responses)</p>
          <p className="text-body leading-relaxed max-w-4xl">I conducted interviews with people of various levels of creativity to gain understanding on creative practices and views on creativity. I also guided them through various experimental nonsensical creativity exercises. Done with physical paper, I tested the game flow of potential games, measuring how much fun they had and how creative it made them feel afterwards.</p>
          <Note text= "People felt doing creative things consistently/daily made them feel more creative, they preferred drawing games over verbal, and preferred playing games with a social aspect" 
            title="Interview Findings"/>
          <p className="text-body leading-relaxed max-w-4xl">Continuing the efforts of my field interviews, I made a Google Forms survey to gain additional insight on people's current views on creativity and personal creative practices. I used these insights to help influence what exercises/features I should include in my social creativity games based on sentiment analysis regarding factors that played into creative discouragement.</p>
          <Picture type={"half"} popup={true} useAspectRatio source={"/projects/graffgraff/survey.png"} source2={"/projects/graffgraff/testing.png"}/>
          
          <p className="text-subtitle mt-10">Wireframing, Ideation, & Designing App Structure</p>
          <p className="text-body leading-relaxed max-w-4xl">The initial UI was wireframed in Figma to understand basic UX requirements on each page. Afterwards, I transferred over to Illustrator to create formal UI designs as well as curate a visual identity. Once the visuals were complete, I began planning the website structure and developing UI components for the website, modularly creating one page or game at a time.</p>
          <Picture type={"half"} useAspectRatio popup={true} source={"/projects/graffgraff/wireframe.png"} source2={"/projects/graffgraff/formal.png"}/>

          <p className="text-subtitle mt-10">Visual Identity & UI/UX Design</p>
          <p className="text-body leading-relaxed max-w-4xl">The visual identity for the game focusing on a sticker graffiti aesthetic for its association with creative expression and community that aligns with my project's values. I created GraffGraff characters that players can project themselves on to as well as created custom letter forms to build branding.</p>
        
          <p className="text-subtitle mt-10">Fullstack Development & Prototyping</p>
          <p className="text-body leading-relaxed max-w-4xl">I followed an Agile workflow with short sprints and modular commits to keep momentum and organization. Each development cycle began with defining small testable goals then designing the feature, implementing it, validating behavior, and gathering informal user feedback.</p>
        
          <p className="text-subtitle mt-10">Play Testing</p>
          <p className="text-body leading-relaxed max-w-4xl">Frequent play tests with control groups took place to evaluate the effectiveness of the game mechanics and user experience. It was imperative the design and game flow was intuitive, friendly, and engaging.</p>
          <Picture type={"third"} popup={true} source={"/projects/graffgraff/people5.jpg"} 
          source2={"/projects/graffgraff/people2.jpg"} source3={"/projects/graffgraff/people3.jpg"}/>
          <p className="text-subtitle mt-10">Next Milestones</p>
          <p className="text-body leading-relaxed max-w-4xl">Further developments on GraffGraff would be focused on expanding the game's multiplayer features such as providing real-time communication and collaborative gameplay options as well as implementing more game options and music direction.</p>
          <div className="mt-10"/>
        
        </div>
    </div>
  );
}