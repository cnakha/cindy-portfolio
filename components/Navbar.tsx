"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type NavItemProps = {
  label: string;
  active: boolean;
  onClick?: () => void;
  href?: string;
  mobile?: boolean;
};

function NavItem({ label, active, onClick, href, mobile }: NavItemProps) {
  const className = mobile
    ? `relative flex w-fit items-center gap-2 text-caption transition ${
        active ? "font-bolder opacity-100" : "opacity-60"
      }`
    : `group relative cursor-pointer pb-1 transition ${
        active ? "font-bolder opacity-100" : "opacity-60 hover:opacity-100"
      }`;

  const underline = !mobile && (
    <span
      className={`absolute left-0 -bottom-1 h-[10px] bg-blue transition-all duration-300 ease-out ${
        active ? "w-full" : "w-0  opacity-50"
      }`}
    />
  );

  const mobileBar = mobile && active && (
    <span className="absolute -left-4 top-1/2 h-[18px] w-[8px] -translate-y-1/2 bg-blue" />
  );

  const content = (
    <>
      {mobileBar}
      {label}
      {underline}
    </>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className}>
      {content}
    </button>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = pathname === "/";
  const isAbout = pathname === "/about";
  const isWorks = pathname.startsWith("/works");

  const goHome = () => {
    setMobileOpen(false);

    if (pathname !== "/") {
        router.push("/");
        return;
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

const scrollToSection = (id: string) => {
  setMobileOpen(false);

  const section = document.getElementById(id);

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    return;
  }

  router.push(`/#${id}`);
};

  return (
    <>
      {/* Desktop nav */}
      <nav className="fixed right-6 top-6 shadow-sm z-50 hidden rounded-full border border-mid-gray bg-light-gray px-6 py-3 text-caption text-black md:block">
        <div className="flex gap-8">
          <NavItem
            label="Home"
            active={isHome}
            onClick={goHome}
            />

          <NavItem
            label="Works"
            active={isWorks}
            onClick={() => scrollToSection("featured-projects")}
          />

          <NavItem label="About" href="/about" active={isAbout} />

          <NavItem
            label="Contact"
            active={false}
            onClick={() => scrollToSection("contact")}
          />
        </div>
      </nav>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen((prev) => !prev)}
        className="fixed right-5 top-5 z-[60] cursor-pointer hover:scale-110 transition border border-mid-gray grid size-11 place-items-center rounded-full bg-light-gray md:hidden"
        aria-label="Toggle menu"
      >
        <Image
          src={mobileOpen ? "/x.svg" : "/hamburger.svg"}
          alt=""
          width={24}
          height={24}
        />
      </button>

      {/* Mobile dropdown */}
      <div
        className={`fixed  z-50 w-full overflow-hidden border border-mid-gray bg-light-gray text-black shadow-lg transition-all duration-300 ease-in md:hidden ${
          mobileOpen
            ? "max-h-[260px] opacity-100"
            : "max-h-0  pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-5 px-10 py-5">
          <NavItem
            mobile
            label="Home"
            active={isHome}
            onClick={goHome}
            />

          <NavItem
            mobile
            label="Works"
            active={isWorks}
            onClick={() => scrollToSection("featured-projects")}
          />

          <NavItem
            mobile
            label="About"
            href="/about"
            active={isAbout}
            onClick={() => setMobileOpen(false)}
          />

          <NavItem
            mobile
            label="Contact"
            active={false}
            onClick={() => scrollToSection("contact")}
          />
        </div>
      </div>
    </>
  );
}