export interface Project {
  id: string;
  title: string;
  description: string;
  timeline: string;
  context: string;
  fullDescription: string;
  role: string;
  skills: string[];
  tools: string[];
  features?: string[];
  status?: string;
  link?: string;
  challenges: string;
  outcome: string;
  imageUrl: string;
  imageUrl2?: string;
  vid?: string;
  liveUrl?: string;
  githubUrl?: string;
  problem: string;
  subProblem?: string;
  keyProblems?: string[];
  keyProblemDescriptions?: string[];
  solution: string;
  milestones?: string[];
}

export const projects: Project[] = [
{
  id: "worldnotes",
  title: "WorldNotes",
  timeline: "June 2025 — Present",
  description: "Blurring the line between social platform and digital graffiti, explore the world through 3D notes and doodles left behind by others on a street map view",
  context: "Fullstack Web App Development, UI/UX Design",
  fullDescription:
    "WorldNotes is a spatial web experiment blending maps, art, and 3D spaces. Users create notes by sharing thoughts and drawing doodles then posting and anchoring them to a globally shared street view map. Designed for casual web strolling, this web app fuels the creative spirit and builds a global community centering authentic creative expression.",
  role: "Project Manager, Lead Fullstack Developer and UI/UX Designer. I built this app end-to-end from ideation to launch",
  skills: ["UI/UX Design", "Fullstack Web App Development", "Wireframing", "SEO"],
  tools: ["React", "Next.js", "TypeScript", "Three.js", "NoSQL"],
  challenges: "The main challenge was implementing real-time collaboration while maintaining performance with hundreds of concurrent users. I solved this by implementing efficient data structures and optimized WebSocket connections.",
  outcome: "This project is currently in active development with plans to launch a beta version in late 2026.",
  imageUrl: "projects/worldnotes/thumbnail.png",
  imageUrl2: "worldnotes/welcomeScreen.png",
  problem: "Existing social media platforms are losing their genuity and overall appeal",
  subProblem: "After interviewing a pool of social media creators and everyday users, many say these are the reasons for the rise of disinterest in social media:",
  solution: "I created WorldNotes to embrace the values and practice of digital graffiti: self-expression, pictography, and creativity. Unique features like 3D note placement, custom drawing tools, and Street View mapping are integrated to create a unique craft-based social media platform.",
  milestones: [
    "User Testing and Feedback Integration",
    "Refine UI and Micro-interactions",
    "Improve SEO",
    "Implement Web-Vital Monitoring System",
  ],
  keyProblems:[
    "Loss of Human Touch and Authenticity",
    "Overly Curated Feeds",
    "Lack of Fresh Approaches to Online Social Interaction"],
  keyProblemDescriptions:[
    "Hyper brand-driven content, the stress of performativity, and the rise of AI-generated posts and bot accounts have diluted the sense of genuine human presence online.",
    "Most platforms use filters and optimized algorithms to maximize user engagement, this leads to tiring social media addictions and restricted natural content discovery.",
    "Social platforms are beginning to share derivative features and blend into each other. People want new and innovative ways to connect with people online.",
  ],
  status: "WorldNotes is currently under development",
  },
 {
    id: "folio",
    title: "FolioFolds",
    description: "Assemble and share interactive 3D mockups of books, cards, zines, origamis, and fliers with support of complex folds, bindings, cutouts, and AR viewing",
    context: "Product Design, UI/UX Design",
    fullDescription: "From birthday cards to origami, FolioFolds is a web application I designed for designing, assembling, and sharing interactive 3D mockups of unique printed forms. The platform supports complex folds, bindings, cutouts, and offers AR viewing capabilities.",
    features: [
      "Supports PDF, PNG, and JPEG imports to create 3D models",
      "Drag-and-drop interface",
      "Real-time 3D rendering powered by WebGL",
      "AR viewing capabilities for mobile devices",
      "Embbed models on external websites",
      "User accounts for saving and managing projects",
      "Allows folds, cutouts, textured paper, and bindings",
      "Animate page flips or manually flip through publications",
    ],
    challenges: "Creating a user-friendly interface that could handle the complexity of 3D modeling while ensuring smooth performance across devices.",
    outcome: "This project is currently in active development with plans to launch a beta version in late 2026.",
    imageUrl: "projects/folio/thumbnail.png",
    imageUrl2: "projects/folio/thumbnail.png",
    timeline: "June 2025 — Present",
    role: "Project Manager, Fullstack Developer, and UI/UX Designer",
    skills: ["UI/UX Design", "Fullstack Development", "Web Development", "Prototyping", "User Testing"],
    tools: ["Figma", "React", "Next.js", "Typescript", "Three.js", "WebGL"],
    problem: "Designers want a tool to help display interactable printworks in 3D that's both intuitive and accessible to expert designers and casual users.",
    subProblem: "There is a need for a stream-lined way to construct complex 3D versions of printworks that provides accessibility. Here are key problems we identified:",
    solution: "Wanting a better way to showcase my design projects online, I designed FolioFolds, a web application that allows users to create and share interactive 3D mockups of printed works. The platform makes creating paper folds, cutouts, and bindings easier by provided tailored tools for paper engineering. Users can embedd finished piece into a website or view it in AR using their mobile devices. Publications can be flipped through manually or viewed through animated video, fostering a vibrant ecosystem of print design enthusiasts.",
    keyProblems:[
      "Lack of Intuitive 3D Visualization for Printed Materials",
      "Physical Prototyping Is Time-Consuming and Expensive",
      "Print Works Lose Impact When Shown Digitally",
    ],
    keyProblemDescriptions:[
      "Professional 3D and CAD tools struggle to capture the tactile complexity of print work and have too much technical depth for casual users.",
      "Physically prototyping folds, bindings, cutouts, and page structures often requires multiple physical mockups",
      "Traditional digital documentations (flat scans, photos, or videos) struggle to capture the dimensionality, tactility, and interactive discovery of physical publications.",
    ],
    // status: "FolioFolds is finalizing its design and beginning development... Stay tuned for updates!",
    },
   {
    id: "graffgraff",
    title: "GraffGraff",
    status: "View the live site here!",
    link: "https://graffgraff.com",
    githubUrl: "https://github.com/cnakha/GraffGraff",
    description: "Website and community gallery hosting online multiplayer nonsensical art games made to empower and inspire creativity in daily life",
    context: "Fullstack Development, UI/UX Design",
    fullDescription: "GRAFFGRAFF is a web experience and digital community gallery that empowers creativity through physical and online nonsensical creativity games. Graffiti, also known as “Graff”, is the practice of unapologetic self expression, socialization, commentary, and art. The user experience is a direct reflection of this concept providing several modes of play that stray from strictly online interactions as well as provide an unfiltered shared art collective in celebration of carefree creative expression and freedom. My work was exhibited at UIC YES! 2026.",
    tools: ["React", "Node.js","Typescript" , "Tailwind", "Firebase", "Vercel", "Figma", "Illustrator", "Photoshop"],
    challenges: "Creating an intuitive interface that could handle complex project hierarchies while remaining accessible to users of all technical levels.",
    outcome: "Successfully developed 5 different wearable biomedical devices that monitor various health metrics, each successfully tested and validated in real-world scenarios.",
    imageUrl: "projects/graffgraff/thumbnail.jpg",
    imageUrl2: "projects/graffgraff/thumbnail.jpg",
    timeline: "Jan 2025 — May 2025",
    role: "Solo Fullstack Developer and UI/UX Designer",
    skills: ["UI/UX Design", "Fullstack Development", "Project Management"],
    problem: "People want to be more creative, so I asked myself, how can we use digital communities to inspire nonsensical creativity?",
    solution: "What drew me to creating this project was the desire to find a way to reduce dread to the creative process as well as the feeling of lacking creativity that I’ve observed my friends and peers experiencing. Creative discouragement can come from an assortment of reasons such as the pressure to create something good, not feeling talented, or overthinking. Through GRAFFGRAFF I strive to create an approachable place to escape creative discouragement and remind people to embrace the fun and nonsensical nature of creativity again. What I created was a website and community gallery made to empower and inspire being more creative in our daily lives through hosting online multiplayer nonsensical creativity games/exercises. Additionally, I designed a signage display, sticker sheets, custom letter forms, and handouts to promote the project",    
  },
  {
    id: "ycgh",
    title: "You Can Grow Here",
    description: "Therapeutic VR journey for anxiety management, published research on adapting anxiety relief wellness techniques in VR (SIGGRAPH 2025, HCI 2026)",
    context: "VR Experience, Research Paper",
    fullDescription: "You Can Grow Here is an immersive VR experience developed for and exhibited at the CAVE2™ environment in the Electronic Visualization Laboratory at the University of Illinois Chicago, aligning with the United Nation's Sustainable Development Goal of Good Health and Well-Being. In response to the mental health challenges intensified by the COVID-19 pandemic, the project explores how interactive storytelling, ambient sound, and 3D typography can support emotional reflection, explore modes of group therapy, and teach anxiety coping strategies. Built in Unity with custom assets from Blender and Maya, the experience differs from most clinical VR programs, allowing users to independently explore emotions, manage anxiety, and practice evidence-based calming techniques within a safe, narrative-driven space that builds emotional resilience.",
    features: [
      "Interactive 3D Typography",
      "Immersive 3D Environments",
      "Spatial Audio Design",
      "User-driven Narrative Exploration",
      "Evidence-based Anxiety Management Exercises",
      "CAVE2™ Volumetric Theater Integration",
    ],
    status: "Check out the published research paper here!",
    link:"https://dl.acm.org/doi/10.1145/3721250.3743037",
    challenges: "Designing the user flow and creating story-driven emotional impact with 3D typography as a main actor in our project.",
    outcome: "Our project was successfully exhibited in UIC's CAVE2 with over 50 guests and presented as a research poster at SIGGRAPH 2025, showcasing the potential of VR for mental health support.",
    imageUrl: "projects/ycgh/thumbnail.png",
    imageUrl2: "projects/ycgh/interaction2.jpeg",
    vid: "projects/ycgh/YCGH_Concept_Vid.mp4",
    timeline: "Jan 2025 — May 2025",
    role: "Equal contributing VR Developer and UI/UX Designer along side 3 other interdisciplinary students from computer science and design backgrounds: Hope Jo, Gaeun Lee, Khin Yuupar Myat",
    skills: ["Virtual Reality Development", "Human-Computer Interaction", "Prototyping", "3D Modeling", "User Testing", "Field Research", "Scripting"],
    tools: ["C#", "Unity", "Blender", "Maya", "Figma"],
    problem: "Anxiety continues to be one of the most prevalent and growing mental health challenges, with 43% of adults in 2024 reporting increased levels of anxiety compared to the previous year.",
    subProblem: "While traditional therapeutic approaches remain vital, there is a growing need for accessible, engaging tools that promote emotional awareness and coping strategies. Key challenges in mental health support include:",
    solution: "You Can Grow Here (YCGH) was developed to be a narrative-driven virtual reality (VR) experience that leverages interaction, storytelling, and design to foster emotional reflection and support mental well-being.",  
    keyProblems:[
      "Inaccessible Emotional Support",
      "Lack of Engaging and Emotionally Reflective Tools",
      "Difficulty Building Emotional Awareness"
    ],
    keyProblemDescriptions:[
      "Inconsistent access to therapy due to financial, geographic, or social barriers, impersonal tools, and strictly clinical tools limit access to emotional support.",
      "There's a need for interactive, sensory-rich experiences that help users sustain engagement and encourage deep emotional reflection.",
      "Internalizing and applying coping mechanisms in real-life situations can be hard without spaces for safe exploration and guided practice."
      ],
  },
   {
    id: "biomed",
    title: "Sensing Through Life",
    description: "Five wearable IoT devices and UI projects from my time at the Wearables and Nearables Technology Laboratory at the University of Illinois Chicago",
    context: "IoT, Hardware Assembly, UI/UX Design",
    fullDescription: "Projects from working in the Wearables and Nearables Technology Laboratory at the University of Illinois Chicago. I collaborated in an interdisciplinary group of biomedical engineering and computer science students, gaining hands-on experience assembling and designing various wearable devices and UIs. I acquisitioned, processed, and analyzed a diverse set of sensor data, created IoT systems, and worked with various Arduino sensors. Each project was developed in under two weeks and presented through a series of live demos and critques.",
    tools: ["React", "Node.js", "Processing", "Python", "C#", "Arduino", "Figma", "Illustrator", "Photoshop"],
    challenges: "Creating an intuitive interface that could handle complex project hierarchies while remaining accessible to users of all technical levels.",
    outcome: "Successfully developed 5 different wearable biomedical devices that monitor various health metrics, each successfully tested and validated in real-world scenarios.",
    imageUrl: "projects/biomed/thumbnail.png",
    imageUrl2: "projects/biomed/thumbnail.png",
    status:"Github",
    link:"https://github.com/cnakha/Wearable_Biomedical_Devices",
    timeline: "Jan 2025 — May 2025",
    role: "Lead Frontend Developer and UI/UX Designer, Fullstack Developer and Hardware Engineer alongside Kegan Jones, Rohan Kakarlapudi, and Sufyan Siddiqui",
    skills: ["UI/UX Design", "Fullstack Development", "Entrepreneurship", "Internet of Things", "Hardware Engineering", "User Testing", "Websockets"],
    problem: "Wearable technology has the potential to revolutionize personal health tracking, yet many devices fail due to not meeting consumer needs.",
    subProblem: "After researching users and wearable assistive health tech, listed are key problems we identified in the wearable health tech space:",
    solution: "My team developed five wearable bluetooth devices that monitor biometrics across heart rate, oxygen levels, stress, and activity patterns. The devices feature ergonomic designs, wireless communication, and intuitive accessibility focused UIs that provide real-time data visualization and alerts, helping users track their personal health and receive timely notifications on health anomalies.",
    keyProblems:[
      "Lack of Accessible Health Monitoring",
      "Poor Integration into Daily Life",
      "Need for Real-Time, Continuous Monitoring"
    ],
    keyProblemDescriptions:[
      "Many existing health monitoring devices are unaffordable or too complex for everyday users.",
      "There is a gap in designing devices that seamlessly blend into users' routines while maintaining comfort, aesthetics, and continuous operation without disruption.",
      "Current solutions don’t consistently offer real-time, continuous data streams that are accurate and intuitive enough to provide meaningful feedback or alerts."
      ],
    
  },
  // {
  //   id: "nxmf",
  //   title: "Bento",
  //   description: "Five wearable IoT devices and UI projects from my time at the Wearables and Nearables Technology Laboratory at the University of Illinois Chicago",
  //   context: "Design Engineering",
  //   fullDescription: "Projects from working in the Wearables and Nearables Technology Laboratory at the University of Illinois Chicago. I collaborated in an interdisciplinary group of biomedical engineering and computer science students, gaining hands-on experience assembling and designing various wearable devices and UIs. I acquisitioned, processed, and analyzed a diverse set of sensor data, created IoT systems, and worked with various Arduino sensors. Each project was developed in under two weeks and presented through a series of live demos and critques.",
  //   tools: ["React", "Node.js", "Processing", "Python", "C#", "Arduino", "Figma", "Illustrator", "Photoshop"],
  //   challenges: "Creating an intuitive interface that could handle complex project hierarchies while remaining accessible to users of all technical levels.",
  //   outcome: "Successfully developed 5 different wearable biomedical devices that monitor various health metrics, each successfully tested and validated in real-world scenarios.",
  //   imageUrl: "projects/biomed/thumbnail.png",
  //   imageUrl2: "projects/biomed/thumbnail.png",
  //   githubUrl: "https://github.com/cnakha/Wearable_Biomedical_Devices",
  //   timeline: "Jan 2025 — May 2025",
  //   role: "Lead Frontend Developer and UI/UX Designer, Fullstack Developer and Hardware Engineer alongside Kegan Jones, Rohan Kakarlapudi, and Sufyan Siddiqui",
  //   skills: ["UI/UX Design", "Fullstack Development", "Entrepreneurship", "Internet of Things", "Hardware Engineering", "User Testing", "Websockets"],
  //   problem: "Wearable technology has the potential to revolutionize personal health tracking, yet many devices fail due to not meeting consumer needs.",
  //   subProblem: "After researching users and wearable assistive health tech, listed are key problems we identified in the wearable health tech space:",
  //   solution: "My team developed five wearable bluetooth devices that monitor biometrics such as heart rate, oxygen levels, stress, and activity patterns. The devices feature ergonomic designs, wireless communication, and intuitive UIs that provide real-time data visualization and alerts, helping users track their personal health and receive timely notifications on health anomalies.",
  //   keyProblems:[
  //     "Lack of Accessible Health Monitoring",
  //     "Poor Integration into Daily Life",
  //     "Need for Real-Time, Continuous Monitoring"
  //   ],
  //   keyProblemDescriptions:[
  //     "Many existing health monitoring devices are unaffordable or too complex for everyday users.",
  //     "There is a gap in designing devices that seamlessly blend into users' routines while maintaining comfort, aesthetics, and continuous operation without disruption.",
  //     "Current solutions don’t consistently offer real-time, continuous data streams that are accurate and intuitive enough to provide meaningful feedback or alerts."
  //     ],
    
  // },
  //  {
  //   id: "bento",
  //   title: "Bento",
  //   description: "Five wearable IoT devices and UI projects from my time at the Wearables and Nearables Technology Laboratory at the University of Illinois Chicago",
  //   context: "Design Engineering",
  //   fullDescription: "Projects from working in the Wearables and Nearables Technology Laboratory at the University of Illinois Chicago. I collaborated in an interdisciplinary group of biomedical engineering and computer science students, gaining hands-on experience assembling and designing various wearable devices and UIs. I acquisitioned, processed, and analyzed a diverse set of sensor data, created IoT systems, and worked with various Arduino sensors. Each project was developed in under two weeks and presented through a series of live demos and critques.",
  //   tools: ["React", "Node.js", "Processing", "Python", "C#", "Arduino", "Figma", "Illustrator", "Photoshop"],
  //   challenges: "Creating an intuitive interface that could handle complex project hierarchies while remaining accessible to users of all technical levels.",
  //   outcome: "Successfully developed 5 different wearable biomedical devices that monitor various health metrics, each successfully tested and validated in real-world scenarios.",
  //   imageUrl: "projects/biomed/thumbnail.png",
  //   imageUrl2: "projects/biomed/thumbnail.png",
  //   githubUrl: "https://github.com/cnakha/Wearable_Biomedical_Devices",
  //   timeline: "Jan 2025 — May 2025",
  //   role: "Lead Frontend Developer and UI/UX Designer, Fullstack Developer and Hardware Engineer alongside Kegan Jones, Rohan Kakarlapudi, and Sufyan Siddiqui",
  //   skills: ["UI/UX Design", "Fullstack Development", "Entrepreneurship", "Internet of Things", "Hardware Engineering", "User Testing", "Websockets"],
  //   problem: "Wearable technology has the potential to revolutionize personal health tracking, yet many devices fail due to not meeting consumer needs.",
  //   subProblem: "After researching users and wearable assistive health tech, listed are key problems we identified in the wearable health tech space:",
  //   solution: "My team developed five wearable bluetooth devices that monitor biometrics such as heart rate, oxygen levels, stress, and activity patterns. The devices feature ergonomic designs, wireless communication, and intuitive UIs that provide real-time data visualization and alerts, helping users track their personal health and receive timely notifications on health anomalies.",
  //   keyProblems:[
  //     "Lack of Accessible Health Monitoring",
  //     "Poor Integration into Daily Life",
  //     "Need for Real-Time, Continuous Monitoring"
  //   ],
  //   keyProblemDescriptions:[
  //     "Many existing health monitoring devices are unaffordable or too complex for everyday users.",
  //     "There is a gap in designing devices that seamlessly blend into users' routines while maintaining comfort, aesthetics, and continuous operation without disruption.",
  //     "Current solutions don’t consistently offer real-time, continuous data streams that are accurate and intuitive enough to provide meaningful feedback or alerts."
  //     ],
    
  // },
];