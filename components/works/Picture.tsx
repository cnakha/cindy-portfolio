"use client";

type PictureProps = {
    type: string; //wide, half, third, long
    source: string;
    source2?: string;
    source3?: string;
    info?: boolean;
    title?: string;
    description?: string;
};

export default function Picture({ type, source, info, title, description }: PictureProps) {
  return (
    <div>
      <h2>Picture</h2>
      <p>This is the Picture project.</p>
    </div>
  );
}