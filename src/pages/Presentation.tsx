import React, { useEffect } from "react";
import "../assets/css/presentation.css";

const slide = import.meta.glob<{ default: React.ComponentType }>(
  "../components/Slide*.tsx",
  { eager: true },
);
// 1장부터 13장까지 문서 순서대로 렌더한다. progress 내비게이션의 순서와 일치해야 한다.
const slides = Array.from(
  { length: Object.keys(slide).length },
  (_, i) => slide[`../components/Slide${i + 1}.tsx`].default,
);

export default function Presentation() {
  useEffect(() => {
    const slides = [...document.querySelectorAll(".slide")];
    const bars = [...document.querySelectorAll(".progress a")];
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          reveal.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    const band = new Set<Element>();
    const current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          e.isIntersecting ? band.add(e.target) : band.delete(e.target);
        });
        const i = slides.findIndex((slide) => band.has(slide));
        if (i < 0) return;
        bars.forEach((b, j) => b.classList.toggle("on", i === j));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    slides.forEach((slide) => {
      reveal.observe(slide);
      current.observe(slide);
    });
    return () => {
      reveal.disconnect();
      current.disconnect();
    };
  }, []);
  return (
    <main>
      <nav className="progress" aria-label="슬라이드 이동">
        <a href="#s1" className="on" aria-label="1장 표지"></a>
        <a href="#s2" aria-label="2장 키워드"></a>
        <a href="#s3" aria-label="3장 히스토리"></a>
        <a href="#s4" aria-label="4장 좋아하는 것"></a>
        <a href="#s5" aria-label="5장 자기소개"></a>
        <a href="#s6" aria-label="6장 교육"></a>
        <a href="#s7" aria-label="7장 자격증"></a>
        <a href="#s8" aria-label="8장 부전마켓타운"></a>
        <a href="#s9" aria-label="9장 부전마켓타운 점주"></a>
        <a href="#s10" aria-label="10장 대기어때"></a>
        <a href="#s11" aria-label="11장 Coding.com"></a>
        <a href="#s12" aria-label="12장 비전"></a>
        <a href="#s13" aria-label="13장 마무리"></a>
      </nav>
      {slides.map((Slide, i) => (
        <Slide key={i} />
      ))}
    </main>
  );
}
