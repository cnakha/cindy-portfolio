"use client";

import Image from "next/image";
import { useState } from "react";

export default function Footer() {
    const [copied, setCopied] = useState(false);

    const copyEmail = async () => {
    await navigator.clipboard.writeText("cindynakh@gmail.com");

    setCopied(true);

    setTimeout(() => {
        setCopied(false);
    }, 2000);
    };
  return (
    <footer
      id="contact"
      className="relative mt-24 overflow-hidden bg-light-gray text-black"
    >
      <Image
        src="/footer1.svg"
        alt=""
        width={420}
        height={420}
        className="pointer-events-none absolute z-0 w-[200px] left-4 top-4 md:left-0 md:top-0 md:w-[420px]"
      />

      <Image
        src="/footer2.svg"
        alt=""
        width={420}
        height={320}
        className="block md:hidden lg:block pointer-events-none absolute z-0 w-[180px] right-2 bottom-8 md:right-0 md:top-68 md:bottom-auto md:w-[420px]"
      />

      <div className="relative z-10  max-w-6xl px-2 sm:ml-8 pt-28 md:ml-54 lg:ml-58  md:pt-45">
        <h2 className="hidden md:block md:ml-0 max-w-[240px] text-display font-semibold md:max-w-none">
          Let’s work together!
        </h2>
        <h2 className="md:hidden ml-28 sm:ml-24 max-w-[240px] text-display font-semibold ">
          Let’s work <br/> together!
        </h2>

        <p className="ml-4 sm:ml-24 md:ml-0 mt-6 max-w-[330px] sm:max-w-[420px] text-body leading-tight md:mt-4 md:max-w-xl">
          I’m always interested in new opportunities and exciting projects.
          Let’s get in touch and build something amazing!
        </p>

        <div className="mt-8 ml-4 sm:ml-24 md:ml-0">
            <div className="grid max-w-3xl gap-y-8 md:mt-12 md:grid-cols-2 md:gap-x-8 md:gap-y-8">
            <div>
            <p className="text-tiny font-semibold">Email</p>

            <div className="flex items-center gap-3">
                <a
                href="mailto:cindynakh@gmail.com"
                className="group relative inline-block w-fit text-body"
                >
                cindynakh@gmail.com

                <span
                    className="
                    absolute
                    left-0
                    -bottom-2
                    h-[10px]
                    w-0
                    bg-blue
                    transition-all
                    duration-300
                    ease-out
                    group-hover:w-full
                    "
                />
                </a>

                <button
                    onClick={copyEmail}
                    className="transition hover:scale-110 cursor-pointer active:scale-95"
                    aria-label="Copy email"
                >
                    <Image
                        src="/copy.svg"
                        alt="Copy email"
                        width={24}
                        height={24}
                    />
                </button>

            </div>
            </div>

            <div className="md:order-2">
                <p className="text-tiny font-semibold">Github</p>
                <a
                href="https://github.com/cnakha"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block w-fit text-body"
                >
                cnakha
                <span
                    className="
                    absolute
                    left-0
                    -bottom-2
                    h-[10px]
                    w-0
                    bg-blue
                    transition-all
                    duration-300
                    ease-out
                    group-hover:w-full
                    "
                />
                </a>
            </div>

            <div>
                <p className="text-tiny font-semibold">Instagram</p>
                <a
                href="https://www.instagram.com/cindynakh_design"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block w-fit text-body"
                >
                cindynakh_design
                <span
                    className="
                    absolute
                    left-0
                    -bottom-2
                    h-[10px]
                    w-0
                    bg-blue
                    transition-all
                    duration-300
                    ease-out
                    group-hover:w-full
                    "
                />
                </a>
            </div>

            <div>
                <p className="text-tiny font-semibold">LinkedIn</p>
                <a
                href="https://www.linkedin.com/in/cindy-nakhammouane-348a63247/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block w-fit text-body"
                >
                cindy-nakhammouane-348a6324
                <span
                    className="
                    absolute
                    left-0
                    -bottom-2
                    h-[10px]
                    w-0
                    bg-blue
                    transition-all
                    duration-300
                    ease-out
                    group-hover:w-full
                    "
                />
                </a>
            </div>

            </div>
            <p className="relative z-10 mt-8  pb-38 md:pb-18 text-left text-tiny font-semibold md:mr-10 md:mt-10 md:pb-4  md:text-caption">
                Designed and Developed by Cindy Nakhammouane
            </p>
        </div>
    
      </div>

      <div
        className="relative left-1/2 h-[32px] w-screen -translate-x-1/2 bg-cover bg-center bg-repeat-x md:h-[30px]"
        style={{
          backgroundImage: "url('/line.svg')",
        }}
      />
    </footer>
  );
}