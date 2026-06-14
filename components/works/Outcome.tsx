"use client";


type OutcomeProps = {
  outcome: string;
};

export default function Outcome({ outcome }: OutcomeProps) {
  return (
    <div className="flex flex-col gap-2">
        <div className="flex">
            <p className="text-tiny gray-title">Outcome</p>
        </div>
      <p className="text-subtitle font-medium opacity-60 max-w-3xl">{outcome}</p>
    </div>
  );
}