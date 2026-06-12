"use client";

import { useState } from "react";


type Status = {
    link?: string;
    message: string;
    hasLink: boolean;
}

export default function Status({ message, hasLink, link }: Status) {
    const [active, setActive] = useState(false);

     const underline = (
            <span
                className={`absolute left-0  h-[5px] bg-blue transition-all duration-300 ease-out w-full ${
                    active ? "h-[10px] -bottom-3.5" : "h-[5px] -bottom-2"
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
                    className="relative cursor-pointer "
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
                        className={`absolute left-0 -bottom-2 h-[5px] bg-blue transition-all duration-300 ease-out w-full`}
                    />
                </div>
            )}
            
        </div>
    );
}