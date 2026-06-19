"use client";

type ItemsProps = {
  titles: string[];
  descriptions: string[];
};

export default function Items({ titles, descriptions }: ItemsProps) {
  return (
    <div>
    {titles && titles.length > 0 && descriptions && descriptions.length === titles.length && (
    <div className="px-10 flex flex-wrap gap-6 justify-center w-full">
        {titles.map((title, idx) => (
            <div
                key={idx}
                className="flex flex-col text-left items-start bg-light-gray border border-mid-gray rounded-xl p-6 min-w-[220px] max-w-xs flex-1"
            >
                <h5 className="text-caption mb-4 font-semibold">{title}</h5>
                <p className="text-caption opacity-60">{descriptions[idx]}</p>
            </div>
        ))}
    </div>
    )}
    </div>
  );
}