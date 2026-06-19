"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type SlideItem = {
  src: string;
  type?: "image" | "video";
  alt?: string;
};

type SlideshowProps = {
  items: SlideItem[];
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Slideshow({ items }: SlideshowProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  if (!items || items.length === 0) return null;

  const currentItem = items[index];

  const goNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % items.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.45,
        ease: EASE,
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -80 : 80,
      opacity: 0,
      transition: {
        duration: 0.35,
        ease: EASE,
      },
    }),
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-mid-gray bg-light-gray p-2">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentItem.src}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            {currentItem.type === "video" ? (
              <video
                src={currentItem.src}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <img
                src={currentItem.src}
                alt={currentItem.alt || "Slideshow image"}
                className="h-full w-full object-cover"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous slide"
              className="
                absolute left-4 top-1/2 z-10 grid size-12 -translate-y-1/2
                place-items-center rounded-full border border-dark-gray bg-white
                transition hover:-translate-x-1
              "
            >
              <Image
                src="/arrow.svg"
                alt=""
                width={24}
                height={24}
                className="rotate-180"
              />
            </button>

            <button
              type="button"
              onClick={goNext}
              aria-label="Next slide"
              className="
                absolute right-4 top-1/2 z-10 grid size-12 -translate-y-1/2
                place-items-center rounded-full border border-dark-gray bg-white
                transition hover:translate-x-1
              "
            >
              <Image src="/arrow.svg" alt="" width={24} height={24} />
            </button>
          </>
        )}
      </div>

      {items.length > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {items.map((item, dotIndex) => (
            <button
              key={item.src}
              type="button"
              onClick={() => {
                setDirection(dotIndex > index ? 1 : -1);
                setIndex(dotIndex);
              }}
              aria-label={`Go to slide ${dotIndex + 1}`}
              className={[
                "h-2 rounded-full transition-all duration-300",
                dotIndex === index
                  ? "w-8 bg-black"
                  : "w-2 bg-black/20 hover:bg-black/40",
              ].join(" ")}
            />
          ))}
        </div>
      )}
    </div>
  );
}