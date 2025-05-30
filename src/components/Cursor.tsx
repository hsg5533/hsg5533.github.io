import React, { useEffect, useRef } from "react";

const { innerWidth, innerHeight } = window;

let FrameId: number;
let mouseX = innerWidth / 2;
let mouseY = innerHeight / 2;
let dotX = mouseX;
let dotY = mouseY;
let ringX = mouseX;
let ringY = mouseY;

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const onMouseUp = () => {
      ring.style.transform = "translate(-50%, -50%) scale(1)";
      ring.style.opacity = "0.5";
    };
    const onMouseDown = () => {
      ring.style.transform = "translate(-50%, -50%) scale(1.5)";
      ring.style.opacity = "0.2";
    };
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onMouseEnter = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.opacity = "1";
      ring.style.opacity = "0.5";
    };
    const onMouseLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        dot.style.opacity = "1";
        ring.style.opacity = "0.5";
      } else {
        dot.style.opacity = "0";
        ring.style.opacity = "0";
      }
    };
    const animate = () => {
      dotX = lerp(dotX, mouseX, 0.2);
      dotY = lerp(dotY, mouseY, 0.2);
      ringX = lerp(ringX, mouseX, 0.1);
      ringY = lerp(ringY, mouseY, 0.1);
      dot.style.left = `${dotX}px`;
      dot.style.top = `${dotY}px`;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      FrameId = requestAnimationFrame(animate);
    };
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    animate();
    return () => {
      cancelAnimationFrame(FrameId);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
