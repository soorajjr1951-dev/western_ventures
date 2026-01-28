"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function useScrollReveal(deps) {
  const pathname = usePathname();

  // ✅ Always normalize deps into an array
  const safeDeps = Array.isArray(deps) ? deps : [];

  useEffect(() => {
    const elements = document.querySelectorAll("[data-animate]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname, ...safeDeps]); // ✅ never crashes
}
