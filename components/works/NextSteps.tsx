"use client";


type NextStepsProps = {
  nextSteps: string;
};

export default function NextSteps({ nextSteps }: NextStepsProps) {
  return (
    <div className="flex flex-col gap-2">
        <div className="flex">
            <p className="text-tiny gray-title">Next Milestones</p>
        </div>
      <p className="text-subtitle font-medium opacity-60 max-w-3xl">{nextSteps}</p>
    </div>
  );
}