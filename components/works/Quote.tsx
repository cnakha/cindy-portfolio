"use client";

type QuoteProps = {
  text: string;
  author: string;
};

export default function Quote({ text, author }: QuoteProps) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
        <p className="text-body">{text}</p>
        <p className="text-caption italic">{author}</p>
    </div>
  );
}