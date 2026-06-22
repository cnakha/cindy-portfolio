"use client";

type QuoteProps = {
  text: string;
  author: string;
};

export default function Quote({ text, author }: QuoteProps) {
  return (
    <div className="flex flex-col gap-4 justify-center text-center items-center max-w-3xl mx-auto">
        <p className="text-caption">"{text}"</p>
        <p className="text-quote italic opacity-60">— {author}</p>
    </div>
  );
}