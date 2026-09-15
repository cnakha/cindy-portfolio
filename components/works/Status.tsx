"use client";

import { useState } from "react";
import Image from "next/image";

type Status = {
    link?: string;
    status?: string;
    hasLink: boolean;
    github?: string;
    figma?: string;
}

export default function Status({ status, hasLink, link, github, figma }: Status) {
    const [active, setActive] = useState(false);
    const [active2, setActive2] = useState(false);
    const [active3, setActive3] = useState(false);

    const underline = (
        <span
            className={`rounded-full pointer-events-none absolute left-0 h-[5px] bg-black transition-all duration-300 ease-out w-full ${
            active ? "h-[10px] -bottom-3.5" : "h-[5px] -bottom-2"
            }`}
        />
    );

    const underline2 = (
        <span
            className={`rounded-full pointer-events-none absolute left-0 h-[5px] bg-black transition-all duration-300 ease-out w-full ${
            active2 ? "h-[10px] -bottom-3.5" : "h-[5px] -bottom-2"
            }`}
        />
    );

      const underline3 = (
        <span
            className={`rounded-full pointer-events-none absolute left-0 h-[5px] bg-black transition-all duration-300 ease-out w-full ${
            active3 ? "h-[10px] -bottom-3.5" : "h-[5px] -bottom-2"
            }`}
        />
    );


    return (
        <div className="flex gap-2">
            {status && (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-block cursor-pointer pl-1"
                    onMouseEnter={() => setActive(true)}
                    onMouseLeave={() => setActive(false)}
                >
                    <div className="flex gap-1">
                        <h2 className="text-tiny font-semibold">{status}</h2>
                        <Image src="/arrow.svg" alt="" width={10} height={10} className="-rotate-45" />
                    </div>
                    {underline}
                </a>
            )}
            {github && (
                <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-block cursor-pointer pl-1"
                    onMouseEnter={() => setActive2(true)}
                    onMouseLeave={() => setActive2(false)}
                >
                    <div className="flex gap-1">
                        <h2 className="text-tiny font-semibold">Github</h2>
                        <Image src="/arrow.svg" alt="" width={10} height={10} className="-rotate-45" />
                    </div>
                    {underline2}
                </a>
            )}
            {figma && (
                <a
                    href={figma}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-block cursor-pointer pl-1"
                    onMouseEnter={() => setActive3(true)}
                    onMouseLeave={() => setActive3(false)}
                >
                    <div className="flex gap-1">
                        <h2 className="text-tiny font-semibold">Figma</h2>
                        <Image src="/arrow.svg" alt="" width={10} height={10} className="-rotate-45" />
                    </div>
                    {underline3}
                </a>
            )}
        </div>
    );
}