"use client";

import BiomedProjectsTabs from "./Random/BiomedProjectTabs";
import { projects } from "@/lib/projects";
import Problem from "../Problem";
import Solution from "../Solution";
import NextSteps from "../NextSteps";
import Picture from "../Picture";
import Items from "../Items";

export default function Biomed() {
  const biomed = projects.find((p) => p.id === "biomed");

  if (!biomed) {
    return null;
  }

  const features = [
      "Motion Tracking",
      "Real-time Data Visualization",
      "Time Tracking and Reporting",
      "Analytics Dashboards",
      "Custom Alerts and Notifications",
      "LED Indicators",
      "Bluetooth Connectivity",
      "Ergonomic Design",
    ];

  const tech = [
    'Processing',
    'React + Node.js + TailwindCSS',
    'Figma',
    'Arduino',
    "Python",
    '3D Printing',
  ];

  const techDescriptions = [
    'Processing is a visual programming environment used for creative coding, interactive graphics, and generative art.',
    'A modern full-stack web development stack. React powers dynamic UIs, Node.js handles backend logic and APIs, and TailwindCSS enables rapid, responsive interface styling.',
    'A collaborative design tool for creating user interfaces, prototypes, and design systems with real-time feedback.',
    'An open-source electronics platform based on easy-to-use hardware and software, ideal for building interactive projects and prototypes.',
    'A versatile programming language known for its simplicity and readability, widely used in data analysis, machine learning, web development, and automation.',
    'A manufacturing process that creates three-dimensional objects by layering materials based on digital models, enabling rapid prototyping and custom designs.',
  ];

  return (
    <div className="flex flex-col mt-8 text-black">
    
      <Picture type={"wide"} source={"/projects/biomed/thumbnail.png"}/>

      <BiomedProjectsTabs />

      <div className="mt-20"/>

      <div className="relative flex flex-col">
        <h2 className="text-display">Project Breakdown</h2>
        <span
            className={`absolute left-0 -bottom-4 h-[5px] bg-blue transition-all duration-300 ease-out w-full`}
        />
      </div>

      <div className="mt-20"/>
      <Problem
        problem={biomed.problem }
        subProblem={biomed.subProblem}
        keyProblems={biomed.keyProblems}
        keyProblemDescriptions={biomed.keyProblemDescriptions}
      />

      <div className="mt-20"/>
      <Solution solution={biomed.solution} />

      <section className="mt-10">
        <div className="w-full h-full px-6">
          <div className="rounded-xl border border-mid-gray bg-light-gray p-6 pb-10">
            <h3 className="text-body mb-4 font-semibold">Key Features</h3>
            <div className="grid grid-cols-1 gap-2 md:gap-8 md:grid-cols-2">
              <ul className="text-caption list-disc list-inside space-y-2">
                {features.slice(0, Math.ceil(features.length / 2)).map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <ul className="text-caption list-disc list-inside space-y-2">
                {features.slice(Math.ceil(features.length / 2)).map((feature, idx) => (
                  <li key={idx + Math.ceil(features.length / 2)}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <div className="mt-20"/>

      <div className="flex flex-col gap-4">
        <p className="text-display">The Development Cycle</p>
        <p className="text-body leading-relaxed">Each device followed a similar development cycle, beginning with research on existing biomedical wearables and sensor solutions to gain insight on product and app design. Then followed conceptualizing, diagraming, low fidelity prototyping and UI designs, final construction, testing, and final review.</p>

        <p className="text-subtitle mt-10">Understanding Technologies</p>
        <p className="text-body leading-relaxed">Before participating in this lab, I had limited experience with biomedical device design nor engineering in general. Through these projects, I gained hands-on experience in sensor integration, hardware engineering, data acquisition, UI/UX design, frontend development, and real-time monitoring. The following tools were instrumental in bringing the various biomedical devices to life:</p>
      
        <div className="mt-4"/>
        <Items titles={tech} descriptions={techDescriptions} />

        <p className="text-subtitle mt-10">Prototyping</p>
        <p className="text-body leading-relaxed">Sketches of physical device designs and UI were made followed by circuit diagrams to plan hardware integration and creating low-fidelity prototypes to test sensor response, placements, and data acquisition. UI assets were initially designed in Figma then finalized in Illustrator and Photoshop.</p>
      
        <Picture type={"captioned"} popup={true} source={"/projects/biomed/circuit_diagram.png"} description={"MotionSense Circuit Diagram"} />

        <p className="text-subtitle mt-10">Reflection and Designing for Health</p>
        <p className="text-body leading-relaxed">I found that the most important step in designing these devices was grasping a strong understanding of the patients' specific needs and overall health goals. Learning about the nuances and difficulties a variety of patients face when managing personal health devices and apps was key in ensuring compassionate designs. It was very important to prioritized clarity, accessibility, and comfort as displaying biometric data can often be non-intuitive, confusing, and overwhelming. Researching existing health monitoring UIs helped to identify effective hierarchy of information and the importance of clear labeling and soft visuals.</p>
        <div className="mt-10"/>
      </div>
    </div>
  );
}