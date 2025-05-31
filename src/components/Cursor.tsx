import React, { useEffect, useRef, useState } from "react";

const { innerWidth } = window;

let dotX = 0;
let dotY = 0;
let ringX = 0;
let ringY = 0;
let mouseX = 0;
let mouseY = 0;
let frameId: number;

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

function isMobile() {
  const ua = navigator.userAgent.toLowerCase();
  const mobileRegex =
    /android|iphone|ipad|ipod|blackberry|bb10|opera mini|windows phone/;
  const isUA = mobileRegex.test(ua);
  const hasTouch = "ontouchstart" in window;
  const narrowScreen = innerWidth <= 1024;
  return isUA || (hasTouch && narrowScreen);
}

export default function Cursor() {
  const mobile = isMobile(); // 훅보다 먼저 계산해도 무방
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    // 모바일 환경이면 커서 생성 종료
    if (mobile) {
      return;
    }
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    // 진짜 브라우저 바깥으로 마우스가 나갔을 때 호출
    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget === null) {
        dot.style.opacity = "0";
        ring.style.opacity = "0";
      }
    };
    const onMouseUp = () => {
      ring.style.transform = "translate(-50%, -50%) scale(1)";
      ring.style.opacity = "0.5";
    };
    const onMouseDown = () => {
      ring.style.transform = "translate(-50%, -50%) scale(1.5)";
      ring.style.opacity = "0.2";
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isRender) {
        setIsRender(true);
        dot.style.opacity = "1";
        ring.style.opacity = "0.5";
      }
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onMouseEnter = (e: MouseEvent) => {
      if (!isRender) {
        setIsRender(true);
      }
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
      if (isRender && document.visibilityState === "visible") {
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
      frameId = requestAnimationFrame(animate);
    };
    window.addEventListener("mouseout", onMouseOut);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    animate(); // 애니메이션 시작
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [isRender, mobile]); // 훅 호출 순서는 고정, 의존성에는 mobile도 포함

  // 모바일이면 컴포넌트 자체를 렌더하지 않음
  if (mobile) {
    return null;
  }

  // 항상 렌더되지만, 초기에는 opacity:0(숨김) 상태
  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
