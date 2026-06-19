"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Picture from "@/components/works/Picture";
import Image from "next/image";

// import Slideshow from "../../Slideshow";

type TabKey = "motionsense" | "sparkbeat2" | "sparkbeat" | "smartshoe" | "tiktok";

type ProjectData = {
  key: TabKey;
  label: string;
  title: string;
  context: string;
  techStack: string;
  hardware: string[];
  designCriteria: string[];
  evaluation: string;
  imageSources: string[];
  demoVideo?: string;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeSlide: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.35, ease: EASE },
  },
};

const PROJECTS: ProjectData[] = [
  {
    key: "motionsense",
    label: "MotionSense",
    title:
      "MotionSense — A Wearable System for Real-Time Assessment of Lower Body Form and Muscle Engagement During Exercise",
    context:
      "Poor exercise form, especially during lower body workouts like squats and deadlifts, can lead to long-term injuries and chronic back issues. Without real-time feedback, subtle mistakes often go unnoticed. MotionSense is a wearable multi-sensor system that monitors lower back posture, hamstring activation, and foot pressure, providing corrective insights that reduce injury and improve training effectiveness.",
    techStack: "React.js, Tailwind CSS, Node.js, Arduino C++",
    hardware: [
      "MIKROE EMG Click: Placed on the hamstrings to detect electrical activity during muscle engagement.",
      "FSR Sensors: Embedded into shoe insoles to measure foot pressure distribution.",
      "MPU6050 Accelerometer: Tracks lower back posture and chest angulation.",
      "FIREBEETLE BOARD-32P BLE 4.1: Provides Bluetooth device capabilities.",
      "18650 Li-Ion Battery: Powers the device for up to 8 hours of use.",
    ],
    designCriteria: [
      "Shoe insole for FSR sensors.",
      "Thigh strap houses EMG sensors.",
      "Waistband clip contains the FireBeetle board, accelerometer, and battery.",
      "Display real-time angle of hip hinge.",
      "Show heat maps, balance feedback, and voltage over time graphs.",
      "Visualize hamstring engagement.",
      "Create an assistive target form interface.",
    ],
    evaluation:
      "Preliminary testing using squats and lunges across multiple users showed that EMG sensors detected hamstring activation within 50 milliseconds, FSR readings distinguished balanced vs. forward-leaning postures, and accelerometers consistently tracked trunk angle. The system accurately identified poor form in 84% of misaligned trials.",
    demoVideo: "/projects/biomed/motionSense.mp4",
    imageSources: ["/projects/biomed/p1.png"],
  },
  {
    key: "sparkbeat2",
    label: "SparkBeat 2",
    title:
      "SparkBeat 2 — Wearable Sport Chest Band for Respiratory and Heart Rate Analysis",
    context:
      "This project collects clean ECG signals from the patient’s heart and measures respiratory rate by analyzing resistance changes when the patient exhales and inhales.",
    techStack: "Processing, Arduino C++",
    hardware: [
      "FireBeetle Board-328P with BLE4.1 x 2",
      "FireBeetle Proto Board",
      "AD8232 Heart Monitor",
      "ECG leads",
      "Snap-On ECG electrodes",
      "Force Sensitive Resistors",
    ],
    designCriteria: [
      "Fitness, stress, and meditation modes.",
      "Real-time heart rate and respiratory rate monitoring.",
      "Cardio zone indicators.",
      "Data logging and visualization.",
      "Adjustable fit and comfort.",
    ],
    evaluation:
      "The sport bands accurately captured ECG signals, with heart rate measurements within 3 bpm of clinical-grade monitors. Respiratory rate detection showed 95% accuracy in controlled breathing tests.",
    imageSources: ["/projects/biomed/p2_vert.png"],
  },
  {
    key: "sparkbeat",
    label: "SparkBeat",
    title:
      "SparkBeat — Smart Stress, Heart Rate, and Blood Oxygenation Tracking Wristband",
    context:
      "SparkBeat measures heart rate and blood oxygen saturation, providing insights into the wearer’s cardiovascular health.",
    techStack: "Processing, Arduino C++",
    hardware: [
      "Sparkfun Pulse Oximeter and Heart Rate Monitor",
      "FireBeetle Board-328P with BLE4.1",
      "18650 Li-Ion Battery",
      "Photoplethysmogram Sensors",
      "Stress indicative buzzer",
    ],
    designCriteria: [
      "Real-time heart rate and blood oxygenation monitoring.",
      "Comfortable wristband design.",
      "Stress detection and alerts.",
      "Heart rate over time visualization.",
      "Cardio zone indicators.",
    ],
    evaluation:
      "Testing with multiple users showed that the SparkBeat wristband accurately measured heart rate within 2 bpm of clinical-grade monitors and SpO2 levels within 2% accuracy.",
    imageSources: ["/projects/biomed/p4_vert.png"],
  },
  {
    key: "smartshoe",
    label: "Smart Shoe",
    title: "Smart Shoe — Insole for Motion, Balance, and Gait Analysis",
    context:
      "Smart Shoe is a shoe insole with force sensors and accelerometers that analyzes real-time walking patterns. It informs the user which part of the foot they use more while walking through a heatmap.",
    techStack: "Processing, Arduino C++",
    hardware: [
      "MPU-6050 Accelerometer: Detects motion and calculates the period of activity.",
      "Force Sensitive Resistors: Detect pressure while walking.",
      "LED lights that correspond to each FSR.",
      "18650 Li-Ion Battery: Powers the device for up to 8 hours.",
    ],
    designCriteria: [
      "Must be worn in the shoe.",
      "Identify real-time gait profile, acceleration, and balance quality.",
      "Display a real-time heatmap of foot pressure points.",
      "Graph the voltage over time of each FSR.",
    ],
    evaluation:
      "Testing with multiple users showed that the Smart Shoe accurately identified gait patterns, distinguishing between heel-strike, toe-strike, and flat-footed walking with 92% accuracy.",
    imageSources: ["/projects/biomed/p3_vert.png"],
  },
  {
    key: "tiktok",
    label: "TikTok Tattoo",
    title: "TikTok Tattoo — Interactive Tattoos",
    context:
      "TikTok Tattoo is a smart tattoo that explores skin-based interfaces and gives users the ability to control TikTok Web through touch interactions on the skin.",
    techStack: "Processing, Python, Arduino C++",
    hardware: [
      "FireBeetle Board-328P with BLE4.1: Provides Bluetooth device capabilities.",
      "MPR 121 Breakout Board: Uses capacitive sensing to detect touches.",
      "18650 Li-Ion Battery: Powers the device for up to 8 hours.",
    ],
    designCriteria: [
      "12 capacitive sensors.",
      "Vinyl base.",
      "Copper tape connections to link electrodes to the MPR121 board.",
      "Clear interface to display touch interactions.",
    ],
    evaluation:
      "The tattoo reliably detected swipe gestures and touch inputs, allowing users to scroll through TikTok videos with ease. Integration with TikTok Web was smooth with minimal delay.",
    demoVideo: "/projects/biomed/Tiktok_demo.mp4",
    imageSources: ["/projects/biomed/p5.png"],
  },
];

export default function BiomedProjectsTabs() {
  const [active, setActive] = useState<TabKey>("motionsense");

  const activeIndex = PROJECTS.findIndex((project) => project.key === active);
  const activeProject = PROJECTS[activeIndex];

  const goPrev = () => {
    const prevIndex = (activeIndex - 1 + PROJECTS.length) % PROJECTS.length;
    setActive(PROJECTS[prevIndex].key);
  };

  const goNext = () => {
    const nextIndex = (activeIndex + 1) % PROJECTS.length;
    setActive(PROJECTS[nextIndex].key);
  };

  if (!activeProject) return null;



  return (
    <section className="mt-20">
      {/* Mobile carousel tabs */}
      <div className="mb-4 flex items-center justify-center gap-3 md:hidden">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous project"
          className="cursor-pointer grid size-11 shrink-0 place-items-center rounded-full border border-mid-gray bg-light-gray transition hover:-translate-x-1"
        >
          <Image src="/arrow.svg" alt="" width={24} height={24} className="rotate-180" />
        </button>

        <div className="min-w-0 flex-1 p-2 text-center">
          <p className="text-caption text-black/50 font-semibold">
            {activeProject.label}
          </p>
        </div>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next project"
          className="cursor-pointer grid size-11 shrink-0 place-items-center rounded-full border border-mid-gray bg-light-gray transition hover:translate-x-1"
        >
          <Image src="/arrow.svg" alt="" width={24} height={24} />
        </button>
      </div>

      {/* Desktop tabs */}
      <div
        role="tablist"
        aria-label="Biomedical projects"
        className="mb-4 hidden justify-center md:flex"
      >
        <div className="flex gap-10 px-6 rounded-full border border-mid-gray bg-light-gray p-2">
          {PROJECTS.map(({ key, label }) => {
            const selected = active === key;

            return (
              <button
                key={key}
                id={`tab-${key}`}
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${key}`}
                onClick={() => setActive(key)}
                className={[
                  "cursor-pointer relative whitespace-nowrap rounded-full py-2 text-caption transition-all duration-300",
                  selected
                    ? "text-black"
                    : "text-black/60 hover:text-black",
                ].join(" ")}
              >
                {label}
                <span
                    className={`absolute left-0 -bottom-0 h-[10px] bg-blue transition-all duration-300 ease-out ${
                        selected ? "w-full" : "w-0  opacity-50"
                    }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-3xl border border-mid-gray bg-light-gray p-4 sm:p-6 lg:p-8">
        <div className="rounded-2xl border border-mid-gray bg-white p-5 sm:p-8 lg:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.key}
              id={`panel-${activeProject.key}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeProject.key}`}
              variants={fadeSlide}
              initial="initial"
              animate="animate"
              exit="exit"
              className="origin-top"
            >
              <div className="flex flex-col gap-10">
                <h3 className="mt-3 text-subtitle font-black leading-tight">
                  {activeProject.title}
                </h3>

                <InfoBlock title="Context">
                  <p>{activeProject.context}</p>
                </InfoBlock>

                {activeProject.demoVideo && (
                  <MediaBlock title="Demo Video">
                    <video
                      src={activeProject.demoVideo}
                      loop
                      autoPlay
                      muted
                      playsInline
                      controls
                      className="h-full w-full rounded-xl object-cover"
                    />
                  </MediaBlock>
                )}

                {activeProject.imageSources.length > 0 && (
                  <MediaBlock title="Gallery">
                    <Picture type="wide" source={activeProject.imageSources[0]} />
                  </MediaBlock>
                )}

                <InfoBlock title="Tech Stack">
                  <p>{activeProject.techStack}</p>
                </InfoBlock>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
                  <InfoBlock title="Hardware">
                    <ul className="list-disc space-y-2 pl-5">
                      {activeProject.hardware.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </InfoBlock>

                  <InfoBlock title="Design Criteria">
                    <ul className="list-disc space-y-2 pl-5">
                      {activeProject.designCriteria.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </InfoBlock>
                </div>

                <InfoBlock title="Evaluation">
                  <p>{activeProject.evaluation}</p>
                </InfoBlock>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function InfoBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="">
        <div className="flex">
            <p className="text-tiny gray-title">{title}</p>
        </div>
      <div className="mt-2 text-body text-black/70">{children}</div>
    </div>
  );
}

function MediaBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
        <div className="overflow-hidden rounded-xl bg-white">{children}</div>
    </div>
  );
}