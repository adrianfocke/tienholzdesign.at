"use client";
import { useEffect, useState } from "react";

type Breakpoint = "initial" | "xs" | "sm" | "md" | "lg" | "xl";

export default function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("initial");

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 520) {
        setBreakpoint("initial");
      } else if (width < 768) {
        setBreakpoint("xs");
      } else if (width < 1024) {
        setBreakpoint("sm");
      } else if (width < 1280) {
        setBreakpoint("md");
      } else if (width < 1640) {
        setBreakpoint("lg");
      } else {
        setBreakpoint("xl");
      }
    };

    updateBreakpoint();
    const timer = setTimeout(updateBreakpoint, 0);

    window.addEventListener("resize", updateBreakpoint);
    window.addEventListener("load", updateBreakpoint);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateBreakpoint);
      window.removeEventListener("load", updateBreakpoint);
    };
  }, []);

  return breakpoint;
}
