import { useEffect, useRef } from "react";
import type { RefObject } from "react";

type Handler = () => void;

function useOutsideClick<T extends HTMLElement>(
  handler: Handler,
  listenCapturing: boolean = true
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(
    () => {
      const handleClick = (e: MouseEvent) => {
        // Ensure the ref is connected to an element and the click target is not within it
        if (ref.current && !ref.current.contains(e.target as Node)) {
          handler();
        }
      };

      document.addEventListener("click", handleClick, listenCapturing);

      // Cleanup function to remove the event listener on unmount
      return () => {
        document.removeEventListener("click", handleClick, listenCapturing);
      };
    },
    [handler, listenCapturing] // Re-run the effect if handler or listenCapturing changes
  );

  return ref;
}

export default useOutsideClick;
