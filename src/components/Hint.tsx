import { useCallback } from "react";
import "../assets/css/hint.css";

export default function Hint({ visible }: { visible: boolean }) {
  const handleClick = useCallback(() => {
    const target = document.querySelector<HTMLElement>("#sec1");
    if (!target) return;
    const top = window.scrollY + target.getBoundingClientRect().top;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return (
    <button
      type="button"
      className={`scroll-hint${visible ? "" : " scroll-hint-hidden"}`}
      onClick={handleClick}
      aria-label="다음 섹션으로 스크롤"
    >
      <span className="scroll-hint-mouse">
        <span className="scroll-hint-wheel" />
      </span>
      <span className="scroll-hint-label">SCROLL</span>
    </button>
  );
}
