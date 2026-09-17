import React, { useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../assets/css/presentation.css";

const slide = import.meta.glob<{ default: React.ComponentType }>(
  "../components/Slide*.tsx",
  { eager: true },
);

const slides = Array.from(
  { length: Object.keys(slide).length },
  (_, i) => slide[`../components/Slide${i + 1}.tsx`].default,
);

async function downloadPdf(target: string, name: string) {
  const targets = Array.from(document.querySelectorAll<HTMLElement>(target));
  if (!targets.length) return;
  const { backgroundColor } = getComputedStyle(document.documentElement);
  const { width, height } = targets[0].getBoundingClientRect();
  const pdf = new jsPDF({
    unit: "px",
    format: [width, height],
    orientation: width >= height ? "landscape" : "portrait",
  });
  for (const [index, element] of targets.entries()) {
    if (index > 0) pdf.addPage();
    const canvas = await html2canvas(element, {
      backgroundColor,
      useCORS: true,
      scale: 1,
      onclone: (doc) => {
        doc.querySelectorAll(target).forEach((s) => s.classList.add("in"));
        doc.head.insertAdjacentHTML(
          "beforeend",
          "<style>*{transition:none!important;animation:none!important}</style>",
        );
      },
    });
    const src = canvas.toDataURL("image/jpeg", 1);
    pdf.addImage(src, "JPEG", 0, 0, width, height);
  }
  pdf.save(name);
}

export default function Presentation() {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "p") {
        e.preventDefault();
        e.stopPropagation();
        downloadPdf(".slide", "정호상_포트폴리오.pdf");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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
        <a href="#s8" aria-label="8장 빙그리"></a>
        <a href="#s9" aria-label="9장 헬퍼잇"></a>
        <a href="#s10" aria-label="10장 헬퍼잇 랜딩페이지"></a>
        <a href="#s11" aria-label="11장 헬퍼잇 클린"></a>
        <a href="#s12" aria-label="12장 영덕 알리미"></a>
        <a href="#s13" aria-label="13장 주얼리 컨시어지 챗봇"></a>
        <a href="#s14" aria-label="14장 인터오션 헬스케어사업부"></a>
        <a href="#s15" aria-label="15장 부전마켓타운 어드민"></a>
        <a href="#s16" aria-label="16장 부전마켓타운"></a>
        <a href="#s17" aria-label="17장 부전마켓타운 점주"></a>
        <a href="#s18" aria-label="18장 대기어때"></a>
        <a href="#s19" aria-label="19장 Coding.com"></a>
        <a href="#s20" aria-label="20장 비전"></a>
        <a href="#s21" aria-label="21장 마무리"></a>
      </nav>
      {slides.map((Slide, i) => (
        <Slide key={i} />
      ))}
    </main>
  );
}
