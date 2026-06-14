"use client";

type PictureProps = {
  type: "wide" | "half" | "third" | "left" | "right";
  source: string;
  source2?: string;
  source3?: string;
  title?: string;
  description?: string;
};

export default function Picture({
  type,
  source,
  source2,
  source3,
  title,
  description,
}: PictureProps) {
  const imageClass = "h-full w-full object-cover rounded-2xl";

  if (type === "wide") {
    return (
      <img
        src={source}
        alt={title || "Project image"}
        className="w-full rounded-2xl object-cover"
      />
    );
  }

  if (type === "half") {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <img src={source} alt="" className={`${imageClass} aspect-[4/3]`} />
        {source2 && (
          <img src={source2} alt="" className={`${imageClass} aspect-[4/3]`} />
        )}
      </div>
    );
  }

  if (type === "third") {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <img src={source} alt="" className={`${imageClass} aspect-[4/3]`} />
        {source2 && (
          <img src={source2} alt="" className={`${imageClass} aspect-[4/3]`} />
        )}
        {source3 && (
          <img src={source3} alt="" className={`${imageClass} aspect-[4/3]`} />
        )}
      </div>
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
      <img
        src={source}
        alt={title || "Project image"}
        className={`${imageClass} aspect-[4/3]`}
      />
    );

    return (
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
    );
  }

  return null;
}