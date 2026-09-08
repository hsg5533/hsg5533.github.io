import { useEffect, useRef, useState } from "react";
import { isMobile } from "../utils/modules";

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

export default function Cursor() {
  const mobile = isMobile(); // 훅보다 먼저 계산해도 무방
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    // 모바일 환경이면 커서 생성 종료
    if (mobile || !dot || !ring || !label) return;
    // 커서가 올라간 요소가 data-cursor-label을 선언했으면 그 문구를 띄운다
    const syncLabel = (target: EventTarget | null) => {
      if (!target || !(target instanceof Element)) return;
      const el = target.closest<HTMLElement>("[data-cursor-label]");
      const text = el?.dataset.cursorLabel ?? "";
      if (text) label.textContent = text; // 사라지는 동안에는 문구를 유지
      label.classList.toggle("cursor-label-on", Boolean(text));
    };
    const hideLabel = () => label.classList.remove("cursor-label-on");
    // 진짜 브라우저 바깥으로 마우스가 나갔을 때 호출
    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget) return; // 다른 요소로 이동했으면 무시
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      hideLabel();
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
      syncLabel(e.target);
    };
    const onMouseEnter = (e: MouseEvent) => {
      if (!isRender) setIsRender(true);
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.opacity = "1";
      ring.style.opacity = "0.5";
      syncLabel(e.target);
    };
    const onMouseLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      hideLabel();
    };
    const onVisibility = () => {
      if (isRender && document.visibilityState === "visible") {
        dot.style.opacity = "1";
        ring.style.opacity = "0.5";
      } else {
        dot.style.opacity = "0";
        ring.style.opacity = "0";
        hideLabel();
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
      label.style.left = `${ringX}px`;
      label.style.top = `${ringY}px`;
      frameId = requestAnimationFrame(animate);
    };
    window.addEventListener("mouseout", onMouseOut);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("visibilitychange", onVisibility);
    animate(); // 애니메이션 시작
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [isRender, mobile]); // 훅 호출 순서는 고정, 의존성에는 mobile도 포함

  // 모바일이면 컴포넌트 자체를 렌더하지 않음
  if (mobile) return null;

  // 항상 렌더되지만, 초기에는 opacity:0(숨김) 상태
  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <div ref={labelRef} className="cursor-label" aria-hidden="true" />
    </>
  );
}
