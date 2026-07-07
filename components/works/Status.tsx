"use client";

import { useState } from "react";


type Status = {
    link?: string;
    message: string;
    hasLink: boolean;
    github?: string;
}

export default function Status({ message, hasLink, link, github }: Status) {
    const [active, setActive] = useState(false);
    const [active2, setActive2] = useState(false);

    const underline = (
        <span
            className={`pointer-events-none absolute left-0 h-[5px] bg-black transition-all duration-300 ease-out w-full ${
            active ? "h-[10px] -bottom-3.5" : "h-[5px] -bottom-2"
            }`}
        />
    );

    const underline2 = (
        <span
            className={`pointer-events-none absolute left-0 h-[5px] bg-black transition-all duration-300 ease-out w-full ${
            active2 ? "h-[10px] -bottom-3.5" : "h-[5px] -bottom-2"
            }`}
        />
    );

    return (
        <div className="flex">
            {hasLink ? (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-block cursor-pointer"
                    onMouseEnter={() => setActive(true)}
                    onMouseLeave={() => setActive(false)}
                >
                    <h2 className="text-tiny font-semibold">{message}</h2>
                    {underline}
                    
                </a>
            ) : (
                <div className="relative flex flex-col">
                    <h2 className="text-tiny font-semibold">{message}</h2>
                    <span
                        className={`absolute left-0 -bottom-2 h-[5px] bg-black transition-all duration-300 ease-out w-full`}
                    />
                </div>
            )}
            {github && (
                <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-block cursor-pointer ml-2"
                    onMouseEnter={() => setActive2(true)}
                    onMouseLeave={() => setActive2(false)}
                >
                    <h2 className="text-tiny font-semibold">Github</h2>
                    {underline2}
                    
                </a>
            )}
        </div>
    );
}