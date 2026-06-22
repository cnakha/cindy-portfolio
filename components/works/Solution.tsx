"use client";


type SolutionProps = {
  solution: string;
};

export default function Solution({ solution }: SolutionProps) {
  return (
    <div className="flex flex-col gap-2">
        <div className="flex">
            <p className="text-tiny gray-title">Solution</p>
        </div>
      <p className="text-subtitle font-medium opacity-60 max-w-5xl">{solution}</p>
    </div>
  );
}