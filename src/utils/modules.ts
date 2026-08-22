import { RefObject, useEffect, useRef, useState } from "react";

export function useView(ref: RefObject<Element | null>, threshold: number) {
  const savedElement = useRef<Element>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    savedElement.current = ref.current;
  }, [ref]);
  useEffect(() => {
    if (!savedElement.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold },
    );
    observer.observe(savedElement.current);
    return () => observer.disconnect();
  }, [savedElement, threshold]);
  return inView;
}

export function isMobile() {
  const ua = navigator.userAgent.toLowerCase();
  const mobileRegex =
    /android|iphone|ipad|ipod|blackberry|bb10|opera mini|windows phone/;
  const isUA = mobileRegex.test(ua);
  const hasTouch = "ontouchstart" in window;
  const narrowScreen = window.innerWidth <= 1024;
  return isUA || (hasTouch && narrowScreen);
}
