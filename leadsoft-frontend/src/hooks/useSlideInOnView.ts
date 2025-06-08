import { useEffect, useRef } from "react";
import { useInView } from "./useInView";

export function useSlideInOnView(className = "slide-in", options: IntersectionObserverInit = {}) {
  const [ref, isInView] = useInView(options);
  const elementRef = useRef<HTMLElement | null>(null);

  const combinedRef = (el: HTMLElement | null) => {
    elementRef.current = el;
    if (el) ref.current = el;
  };

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    if (isInView) {
      el.classList.remove("visible");
      void el.offsetWidth; 
      el.classList.add("visible");
    } else {
      el.classList.remove("visible");
    }
  }, [isInView]);

  return combinedRef;
}
