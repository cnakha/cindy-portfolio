"use client";

type ProblemProps = {
  problem: string;
  subProblem?: string;
  keyProblems?: string[];
  keyProblemDescriptions?: string[];
};

export default function Problem({ problem, subProblem, keyProblems, keyProblemDescriptions }: ProblemProps) {
  return (
    <div className="flex flex-col gap-2">
        <div className="flex">
            <p className="text-tiny gray-title">Problem</p>
        </div>
      <p className="text-subtitle max-w-2xl">{problem}</p>
      {subProblem && <p className="text-caption opacity-60 mb-8 max-w-xl">{subProblem}</p>}

      {keyProblems && keyProblems.length > 0 && keyProblemDescriptions && keyProblemDescriptions.length === keyProblems.length && (
            <div className="px-10 flex flex-wrap gap-6 justify-center w-full">
                {keyProblems.map((problem, idx) => (
                <div
                key={idx}
                className="flex flex-col text-left items-start bg-light-gray border border-mid-gray rounded-xl p-6 min-w-[220px] max-w-xs flex-1"
                >
                <h5 className="text-caption mb-4 font-semibold">{problem}</h5>
                <p className="text-caption opacity-60">{keyProblemDescriptions[idx]}</p>
                </div>
                ))}
            </div>
        )}
    </div>
  );
}