"use client";

import { useState } from "react";
import Image from "next/image";

type PictureProps = {
  type: "wide" | "half" | "third" | "left" | "right" | "captioned" | "video";
  source: string;
  source2?: string;
  source3?: string;
  title?: string;
  description?: string;
  popup?: boolean;

  autoplay?: boolean;         
  useAspectRatio?: boolean;
};

export default function Picture({
  type,
  source,
  source2,
  source3,
  title,
  description,
  popup = false,
  autoplay = true,
  useAspectRatio = false,
}: PictureProps) {
  const [popupImage, setPopupImage] = useState<string | null>(null);

  const imageClass = "h-full w-full object-cover rounded-2xl";

  const Popup = () =>
    popupImage ? (
      <div
        className=" cursor-pointer fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4"
        onClick={() => setPopupImage(null)}
      >
        <img
          src={popupImage}
          alt={title || "Project image popup"}
          className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    ) : null;

 const ImageWithPopup = ({
  src,
  alt = title || "Project image",
  className,
}: {
  src: string;
  alt?: string;
  className: string;
}) => (
  <div className={`group relative overflow-hidden rounded-2xl ${popup ? "cursor-pointer" : ""}`}>
    <img
      src={src}
      alt={alt}
      className={className}
      onClick={() => popup && setPopupImage(src)}
    />

    {popup && (
      <div
        className="
          pointer-events-none absolute bottom-4 right-4 z-10
          hidden sm:grid
          size-12 shrink-0 place-items-center
          rounded-full bg-white
          border border-dark-gray

          scale-0 opacity-0
          origin-bottom-right

          transition-all duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]

          group-hover:scale-100
          group-hover:opacity-100
        "
      >
        <Image src="/zoom.svg" alt="" width={24} height={24} />
      </div>
    )}
  </div>
);

  if (type === "wide") {
    return (
      <>
        <ImageWithPopup
          src={source}
          className={
            useAspectRatio
              ? "w-full rounded-2xl h-auto"
              : "w-full rounded-2xl object-cover"
          }
        />
        <Popup />
      </>
    );
  }

  if (type === "video") {
    return (
      <video
        src={source}
        className="w-full rounded-2xl object-cover"
        autoPlay={autoplay}
        controls
        muted={autoplay}
        playsInline
      />
    );
  }

  if (type === "captioned") {
    return (
      <>
        <div className="flex flex-col justify-center items-center">
          <ImageWithPopup
            src={source}
            className="w-full rounded-t-2xl border border-mid-gray border-b-0 object-cover"
          />
          <div className="flex justify-center items-center rounded-b-2xl w-full bg-light-gray px-6 py-4 gap-4 border border-mid-gray">
            <p className="text-caption opacity-60">{description}</p>
          </div>
        </div>
        <Popup />
      </>
    );
  }

  if (type === "half") {
    return (
      <>
        <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ImageWithPopup
            src={source}
            alt=""
            className={useAspectRatio ? imageClass : `${imageClass} aspect-[4/3]`}
          />

          {source2 && (
            <ImageWithPopup
              src={source2}
              alt=""
              className={useAspectRatio ? imageClass : `${imageClass} aspect-[4/3]`}
            />
          )}
        </div>
        <Popup />
      </>
    );
  }

 if (type === "third") {
  const imageCount = [source, source2, source3].filter(Boolean).length;

  return (
    <>
      <div
        className={`grid gap-4 ${
          imageCount === 1
            ? "grid-cols-1 max-w-md mx-auto"
            : imageCount === 2
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1 sm:grid-cols-3"
        }`}
      >
        <ImageWithPopup
          src={source}
          alt=""
          className={useAspectRatio ? imageClass : `${imageClass} aspect-[4/3]`}
        />

        {source2 && (
          <ImageWithPopup
            src={source2}
            alt=""
            className={useAspectRatio ? imageClass : `${imageClass} aspect-[4/3]`}
          />
        )}

        {source3 && (
          <ImageWithPopup
            src={source3}
            alt=""
            className={useAspectRatio ? imageClass : `${imageClass} aspect-[4/3]`}
          />
        )}
      </div>
      <Popup />
    </>
  );
}

  if (type === "left" || type === "right") {
    const textBlock = (
      <div className="flex h-full justify-center items-center">
        <div className="flex flex-col justify-center">
          {title && <h3 className="text-subtitle max-w-md">{title}</h3>}
          {description && <p className="mt-4 text-body opacity-60 max-w-md">{description}</p>}
        </div>
      </div>
    );

    const imageBlock = (
      <ImageWithPopup
        src={source}
        className={`${imageClass} aspect-[4/3]`}
      />
    );

    return (
      <>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {type === "left" ? (
            <>
              <div className="order-2 sm:order-1">{imageBlock}</div>
              <div className="order-1 sm:order-2">{textBlock}</div>
            </>
          ) : (
            <>
              <div>{textBlock}</div>
              <div>{imageBlock}</div>
            </>
          )}
        </div>
        <Popup />
      </>
    );
  }

  return null;
}