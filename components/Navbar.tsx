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
};

function NavItem({ label, active, onClick, href, mobile }: NavItemProps) {
  const base = `transition ${active ? "text-black font-semibold " : "text-black hover:opacity-100"}`;
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
    if (!isHome) { setBgOpacity(1); return; }

    setBgOpacity(0); // reset when navigating back to home

    const onScroll = () => {
      // start fading in after 50% of viewport height, fully opaque by 80%
      const start    = window.innerHeight * 0.5;
      const end      = window.innerHeight * 0.8;
      const progress = Math.max(0, Math.min(1, (window.scrollY - start) / (end - start)));
      setBgOpacity(progress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount in case page loads mid-scroll
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

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
      {/* Desktop nav — full-width bar with scroll-driven white bg */}
      <nav
        className="fixed top-0 left-0 right-0 z-100  hidden md:block transition-shadow duration-300"
        
      >
        <div className="flex items-center justify-end gap-6 px-8 py-4"
        style={{
          backgroundColor: `rgba(255,255,255,${bgOpacity})`,
          borderBottom: bgOpacity > 0.1 ? `1px solid rgba(0,0,0,${bgOpacity * 0.5})` : "none",
        }}>
          <NavItem label="Home"    active={isHome}   onClick={goHome} />
          <NavItem label="Works"   active={isWorks}  onClick={() => scrollToSection("works")} />
          <NavItem label="Extras"  active={isExtras} href="/extras" />
          <NavItem label="About"   active={isAbout}  href="/about" />
          <NavItem label="Resume"  active={isResume} href="/2026_CindyNakhammouane_Resume .pdf" />
          {/* <NavItem label="Contact" active={false}  onClick={() => scrollToSection("contact")} /> */}
          <button className="cursor-pointer  rounded-full border border-black px-4 py-2 text-black font-semibold transition hover:bg-black hover:text-white" onClick={() => scrollToSection("contact")}>
            Contact
          </button>
        </div>
      </nav>

      {/* Mobile dark overlay */}
      <div
        onClick={closeMobile}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 md:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setMobileOpen(p => !p)}
        className="fixed right-5 top-5 z-[60] p-1 grid size-10 cursor-pointer place-items-center rounded-full border border-mid-gray bg-light-gray md:hidden"
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
      >
          {mobileOpen ? 
          <Image src="/x.svg" alt="" width={20} height={20} />
          : <Image src="/hamburger.svg" alt="" width={20} height={20} />
          }
      </button>

      {/* Mobile dropdown */}
      <div
        className={`fixed left-0 top-0 z-50 w-full overflow-hidden border-b border-mid-gray bg-light-gray text-black shadow-lg transition-all duration-500 md:hidden ${
          mobileOpen ? "max-h-72 opacity-100" : "pointer-events-none max-h-0"
        }`}
      >
        <div className="flex flex-col gap-5 px-10 py-6">
          <NavItem mobile label="Home"    active={isHome}   onClick={goHome} />
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
