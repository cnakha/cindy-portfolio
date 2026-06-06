export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    slug: "worldnotes",
    title: "WorldNotes",
    shortDescription: "A worldwide notes and doodles sharing website.",
    description:
      "WorldNotes is a creative web experience where users can leave notes and doodles in 3D space through Google Street View.",
    image: "/projects/worldnotes.jpg",
    tags: ["Next.js", "Firebase", "Google Maps", "Three.js"],
  },
  {
    slug: "foliofolds",
    title: "FolioFolds",
    shortDescription: "A 3D interactive book and portfolio viewer.",
    description:
      "FolioFolds is an interactive 3D book experience for viewing design work, PDFs, and visual stories.",
    image: "/projects/foliofolds.jpg",
    tags: ["React", "Three.js", "Design"],
  },
  {
    slug: "graffgraff",
    title: "GraffGraff",
    shortDescription: "A collaborative drawing and party game.",
    description:
      "GraffGraff is a creative multiplayer drawing game focused on playful collaboration.",
    image: "/projects/graffgraff.jpg",
    tags: ["Next.js", "React", "Firebase"],
  },
  {
    slug: "ycgh",
    title: "You Can Grow Here",
    shortDescription: "A collaborative drawing and party game.",
    description:
      "GraffGraff is a creative multiplayer drawing game focused on playful collaboration.",
    image: "/projects/worldnotes.jpg",
    tags: ["Next.js", "React", "Firebase"],
  },
  {
    slug: "biomed",
    title: "Sensing Through Life",
    shortDescription: "A collaborative drawing and party game.",
    description:
      "GraffGraff is a creative multiplayer drawing game focused on playful collaboration.",
    image: "/projects/graffgraff.jpg",
    tags: ["Next.js", "React", "Firebase"],
  },
  {
    slug: "bento",
    title: "Bento",
    shortDescription: "A collaborative drawing and party game.",
    description:
      "GraffGraff is a creative multiplayer drawing game focused on playful collaboration.",
    image: "/projects/graffgraff.jpg",
    tags: ["Next.js", "React", "Firebase"],
  },
];