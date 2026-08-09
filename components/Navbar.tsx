"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

type NavItemProps = {
  label: string;
  active: boolean;
  onClick?: () => void;
  href?: string;
  mobile?: boolean;
  light?: boolean;
};

function NavItem({ label, active, onClick, href, mobile, light }: NavItemProps) {
  const color = light ? "text-white hover:opacity-70" : "text-black hover:opacity-60";
  const base = `transition font-medium ${color}`;
  const content = <span>{label}</span>;

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={base}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`cursor-pointer text-left ${mobile ? "w-full" : ""} ${base}`}>
      {content}
    </button>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router   = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bgOpacity, setBgOpacity]   = useState(1);

  const isHome   = pathname === "/";
  const isWorks  = pathname.includes("/works");
  const isExtras = pathname === "/extras";
  const isAbout  = pathname === "/about";
  const isResume = pathname === "/resume";

  // On non-home pages the bar is always opaque.
  // On home, fade it in as user scrolls past the hero.
  useEffect(() => {
    const onScroll = () => {
      const start    = window.innerHeight * 0.5;
      const end      = window.innerHeight * 0.8;
      const progress = Math.max(0, Math.min(1, (window.scrollY - start) / (end - start)));
      setBgOpacity(progress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const goHome = () => {
    closeMobile();
    if (pathname !== "/") { router.push("/"); return; }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    closeMobile();
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    router.push(`/#${id}`);
  };

  return (
    <>
      {/* Desktop nav — floating pill, top-right */}
      {(() => {
        const isDark = bgOpacity < 0.5;
        const bg = isDark
          ? "rgba(0,0,0,1)"
          : `rgba(255,255,255,1)`;
        return (
          <nav className="fixed top-2 right-2 z-100 hidden md:block">
            <div
              className="flex items-center gap-6 pl-4 pr-2 py-2 rounded-full transition-all duration-300"
              style={{ backgroundColor: bg }}
            >
              <button
                type="button"
                onClick={goHome}
                aria-label="Home"
                className={`cursor-pointer transition hover:opacity-60 ${isDark ? "text-white" : "text-black"}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="22" viewBox="0 0 57.35 30.8" fill="currentColor">
                  <path d="M54.68,1.37h-.46c-1.23,0-2.3.83-2.59,2.03-.66,2.69-1.71,5.74-2.97,9-.2.52-.4,1.04-.61,1.54-1.05,2.61-4.9,2.03-5.14-.77-.06-.76-.14-1.46-.22-2.08-.41-3.12-1.15-5.8-1.92-7.96-.38-1.06-1.39-1.76-2.51-1.76h-3.34c-1.29,0-2.4.93-2.63,2.2-.5,2.83-1.44,6.36-3.28,10.13-1.58,3.24-3.4,5.78-4.98,7.67-.03.04-.06.07-.1.1-1.55,1.54-2.98,2.6-4.28,3.18-1.31.59-2.76.89-4.35.89-1.86,0-3.55-.42-5.07-1.27-1.52-.85-2.7-2.01-3.53-3.5-.83-1.49-1.25-3.19-1.25-5.1,0-2.75.94-5.06,2.82-6.94,1.88-1.88,4.64-2.8,7.36-2.39,2.55.39,3.47,1.55,5.53,3.14,1.53,1.18,3.23.85,4.52-.87,1.12-1.48,1.92-3.17,1.06-4.56-.73-1.18-2.38-2.18-3.67-2.76C20.89.31,17.9-.05,15.3,0c-2.78.06-5.38,1-7.8,2.35-2.41,1.35-4.27,3.46-5.56,5.69s-1.94,4.77-1.94,7.63c0,4.42,1.42,8.05,4.26,10.88,2.84,2.83,6.5,4.25,10.96,4.25,2.42,0,4.57-.4,6.46-1.2,1.87-.79,3.85-2.2,5.94-4.24.05-.04.09-.09.13-.14,1.56-1.99,3.28-4.51,4.88-7.57.13-.24.25-.49.37-.73,1.27-2.57,5.16-1.64,5.07,1.23,0,.04,0,.09,0,.13-.12,3.33-.49,6.27-.89,8.69-.27,1.63.98,3.11,2.63,3.11h4.99c.96,0,1.84-.51,2.32-1.34,2.26-3.96,4.58-8.59,6.69-13.89,1.41-3.54,2.53-6.92,3.44-10.08.49-1.7-.79-3.4-2.57-3.4Z"/>
                </svg>
              </button>
              <NavItem light={isDark} label="Works"   active={isWorks}  onClick={() => scrollToSection("works")} />
              <NavItem light={isDark} label="Extras"  active={isExtras} href="/extras" />
              <NavItem light={isDark} label="About"   active={isAbout}  href="/about" />
              <NavItem light={isDark} label="Resume"  active={isResume} href="/2026_CindyNakhammouane_Resume .pdf" />
              <button
                onClick={() => scrollToSection("contact")}
                className={`cursor-pointer rounded-full border px-4 py-1 hover:scale-[1.05] transition ${
                  isDark
                    ? "border-white bg-white text-black "
                    : "border-black bg-black text-white "
                }`}
              >
                Contact
              </button>
            </div>
          </nav>
        );
      })()}

      {/* Mobile dark overlay */}
      <div
        onClick={closeMobile}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile logo — always visible top-right */}
      <button
        type="button"
        onClick={goHome}
        aria-label="Home"
        className="fixed left-6 top-6 z-[30] cursor-pointer text-black transition hover:opacity-60 md:hidden"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="22" viewBox="0 0 57.35 30.8" fill="currentColor">
          <path d="M54.68,1.37h-.46c-1.23,0-2.3.83-2.59,2.03-.66,2.69-1.71,5.74-2.97,9-.2.52-.4,1.04-.61,1.54-1.05,2.61-4.9,2.03-5.14-.77-.06-.76-.14-1.46-.22-2.08-.41-3.12-1.15-5.8-1.92-7.96-.38-1.06-1.39-1.76-2.51-1.76h-3.34c-1.29,0-2.4.93-2.63,2.2-.5,2.83-1.44,6.36-3.28,10.13-1.58,3.24-3.4,5.78-4.98,7.67-.03.04-.06.07-.1.1-1.55,1.54-2.98,2.6-4.28,3.18-1.31.59-2.76.89-4.35.89-1.86,0-3.55-.42-5.07-1.27-1.52-.85-2.7-2.01-3.53-3.5-.83-1.49-1.25-3.19-1.25-5.1,0-2.75.94-5.06,2.82-6.94,1.88-1.88,4.64-2.8,7.36-2.39,2.55.39,3.47,1.55,5.53,3.14,1.53,1.18,3.23.85,4.52-.87,1.12-1.48,1.92-3.17,1.06-4.56-.73-1.18-2.38-2.18-3.67-2.76C20.89.31,17.9-.05,15.3,0c-2.78.06-5.38,1-7.8,2.35-2.41,1.35-4.27,3.46-5.56,5.69s-1.94,4.77-1.94,7.63c0,4.42,1.42,8.05,4.26,10.88,2.84,2.83,6.5,4.25,10.96,4.25,2.42,0,4.57-.4,6.46-1.2,1.87-.79,3.85-2.2,5.94-4.24.05-.04.09-.09.13-.14,1.56-1.99,3.28-4.51,4.88-7.57.13-.24.25-.49.37-.73,1.27-2.57,5.16-1.64,5.07,1.23,0,.04,0,.09,0,.13-.12,3.33-.49,6.27-.89,8.69-.27,1.63.98,3.11,2.63,3.11h4.99c.96,0,1.84-.51,2.32-1.34,2.26-3.96,4.58-8.59,6.69-13.89,1.41-3.54,2.53-6.92,3.44-10.08.49-1.7-.79-3.4-2.57-3.4Z"/>
        </svg>
      </button>

      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setMobileOpen(p => !p)}
        className="fixed right-5 top-5 z-[60] p-1 grid size-10 cursor-pointer  md:hidden"
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
      >
          {mobileOpen ? 
          <Image src="/x.svg" alt="" width={30} height={30} />
          : <Image src="/hamburger.svg" alt="" width={30} height={30} />
          }
      </button>

      {/* Mobile dropdown */}
      <div
        className={`fixed left-0 top-0 z-50 w-full overflow-hidden border-b border-mid-gray bg-light-gray text-black shadow-lg transition-all duration-500 md:hidden ${
          mobileOpen ? "max-h-72 opacity-100" : "pointer-events-none max-h-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-6 py-6">
          <button type="button" onClick={goHome} aria-label="Home" className="cursor-pointer text-black transition hover:opacity-60">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="22" viewBox="0 0 57.35 30.8" fill="currentColor">
              <path d="M54.68,1.37h-.46c-1.23,0-2.3.83-2.59,2.03-.66,2.69-1.71,5.74-2.97,9-.2.52-.4,1.04-.61,1.54-1.05,2.61-4.9,2.03-5.14-.77-.06-.76-.14-1.46-.22-2.08-.41-3.12-1.15-5.8-1.92-7.96-.38-1.06-1.39-1.76-2.51-1.76h-3.34c-1.29,0-2.4.93-2.63,2.2-.5,2.83-1.44,6.36-3.28,10.13-1.58,3.24-3.4,5.78-4.98,7.67-.03.04-.06.07-.1.1-1.55,1.54-2.98,2.6-4.28,3.18-1.31.59-2.76.89-4.35.89-1.86,0-3.55-.42-5.07-1.27-1.52-.85-2.7-2.01-3.53-3.5-.83-1.49-1.25-3.19-1.25-5.1,0-2.75.94-5.06,2.82-6.94,1.88-1.88,4.64-2.8,7.36-2.39,2.55.39,3.47,1.55,5.53,3.14,1.53,1.18,3.23.85,4.52-.87,1.12-1.48,1.92-3.17,1.06-4.56-.73-1.18-2.38-2.18-3.67-2.76C20.89.31,17.9-.05,15.3,0c-2.78.06-5.38,1-7.8,2.35-2.41,1.35-4.27,3.46-5.56,5.69s-1.94,4.77-1.94,7.63c0,4.42,1.42,8.05,4.26,10.88,2.84,2.83,6.5,4.25,10.96,4.25,2.42,0,4.57-.4,6.46-1.2,1.87-.79,3.85-2.2,5.94-4.24.05-.04.09-.09.13-.14,1.56-1.99,3.28-4.51,4.88-7.57.13-.24.25-.49.37-.73,1.27-2.57,5.16-1.64,5.07,1.23,0,.04,0,.09,0,.13-.12,3.33-.49,6.27-.89,8.69-.27,1.63.98,3.11,2.63,3.11h4.99c.96,0,1.84-.51,2.32-1.34,2.26-3.96,4.58-8.59,6.69-13.89,1.41-3.54,2.53-6.92,3.44-10.08.49-1.7-.79-3.4-2.57-3.4Z"/>
            </svg>
          </button>
          <NavItem mobile label="Works"   active={isWorks}  onClick={() => scrollToSection("works")} />
          <NavItem mobile label="Extras"  active={isExtras} href="/extras" onClick={closeMobile} />
          <NavItem mobile label="About"   active={isAbout}  href="/about"  onClick={closeMobile} />
          <NavItem mobile label="Resume"  active={isResume} href="/2026_CindyNakhammouane_Resume .pdf" onClick={closeMobile} />
          <NavItem mobile label="Contact" active={false}    onClick={() => scrollToSection("contact")} />
        </div>
      </div>
    </>
  );
}
