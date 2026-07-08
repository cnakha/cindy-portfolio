export type ExtraProject = {
  id: string;
  coverImage: string;
  images: string[];
  description: string;
  title: string;
  video?: string;
};

export const extras: ExtraProject[] = [
    {
      id: "time-poster",
      coverImage: "/extras/Time_Poster.png",
      images: [],
      description: "Composition and photo editing practice and study.",
      title: "Fluid Time Poster",
    },
    {
      id: "coding-poster",
      coverImage: "/extras/Coding_Poster.png",
      images: [],
      description: "Playful visual language following algorithmic code + design.",
      title: "Coding Poster"
    },
    {
      id: "vfx",
      coverImage: "/extras/vfx/vfx.png",
      images: ["/extras/vfx/spread1.png", "/extras/vfx/spread2.png", "/extras/vfx/tv.png", "/extras/vfx/blender.png"],
      description: "Book on the social space of VFX, retro futurism style.",
      title: "VFX and the Space Between"
    },
    {
      id: "riso-animation",
      coverImage: "/extras/Riso_Animation.gif",
      images: ["/extras/Cindy_RisoScan_Animation1.gif"],
      description: "Riso printed animations, Animated in Photoshop",
      title: "Riso Astronaut Animation"
    },
    {
      id: "lolla",
      coverImage: "/extras/Lollapalooza.jpg",
      images: [],
      description: "Typography + Shapes + Images study.",
      title: "Lollapalooza Calendar"
    },
    {
      id: "memento",
      coverImage: "/extras/memento/memento.png",
      images: ["/extras/memento/all.png", "/extras/memento/cover.jpg", "/extras/memento/back.jpg", "/extras/memento/inside1.jpg",
              "/extras/memento/inside2.jpg"],
      description: "Memento concept, Riso printed, analog images, narrative/visual design exploration.",
      title: "Memento"
    },
    {
      id: "photography",
      coverImage: "/extras/photography/bus_stop.jpg",
      images: ["/extras/photography/garden.jpg", "/extras/photography/glasses.jpg", "/extras/photography/ships.jpg",
              "/extras/photography/boots.jpg", "/extras/photography/plants.jpg"],
      description: "",
      title: "Photography Collage"
    },
    {
      id: "conops",
      coverImage: "/extras/nasa/Conops.png",
      images: ["/extras/nasa/diagram.png", "/extras/nasa/rover.png"],
      description: "CONOPS / systems-style document visuals, clean layout practice as part of L'SPACE Program. Role: Chief Scientist",
      title: "NASA Rover Conops"
    },
    {
      id: "countdown",
      coverImage: "/extras/countdown/10_style_frame.jpg",
      video: "/extras/countdown/Bug_Countdown.mp4",
      images: ["/extras/countdown/10_sb.jpg", "/extras/countdown/3_Style_Frame.jpg", "/extras/countdown/3_sb.jpg",
               "/extras/countdown/4_Style_Frame.jpg", "/extras/countdown/6_style_frame.jpg", "/extras/countdown/7_style_frame.jpg"
      ],
      description: "10 second countdown Photoshop animation, collaborated with Hope Jo",
      title: "Bug Countdown"
    },
    {
      id: "goblet",
      coverImage: "/extras/goblet/img1.png",
      images: ["/extras/goblet/img2.png", "/extras/goblet/img3.png", "/extras/goblet/img4.png",
                "/extras/goblet/img5.png", "/extras/goblet/collage1.png", "/extras/goblet/collage2.png",
                "/extras/goblet/grid_art.png", "/extras/goblet/color1.png", "/extras/goblet/color2.png",
                "/extras/goblet/color3.png", "/extras/goblet/color4.png", "/extras/goblet/color5.png",
                "/extras/goblet/b1.png", "/extras/goblet/b2.png"
      ],
      description: "Typography, printing, and book binding",
      title: "The Crystal Goblet"
    },
    
    {
      id: "trippy",
      coverImage: "/extras/trippy2.gif",
      images: ["/extras/Trippy_Animation.gif"],
      description: "Trippy animation loop, Analog images, experimental timing + shapes.",
      title: "Trippy Animation"
    },
    {
      id: "love",
      coverImage: "/extras/Love.png",
      images: [],
      description: "Visualizing relationship maps.",
      title: "Love Through the Sky"
    },
    {
      id: "antparty",
      coverImage: "/extras/ant_party.png",
      images: ["/extras/Garden_Card2.png", "/extras/ticket.png"],
      description: "Business card concepts",
      title: "ANT PARTY Card"
    },
   
  ];