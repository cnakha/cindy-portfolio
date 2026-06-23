"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const html = document.documentElement;

    html.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);

    requestAnimationFrame(() => {
      html.style.scrollBehavior = "";
    });
  }, [pathname]);

  return null;
}