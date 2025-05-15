import React, { useEffect } from "react";

export default function Header() {
  useEffect(() => {
    const navbarLinks = document.querySelectorAll<HTMLElement>(".navbar a");
    navbarLinks.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = link.getAttribute("href")!;
        const targetEl = document.querySelector<HTMLElement>(href)!;

        // 부드러운 스크롤
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      })
    );

    // 스크롤 시 실행 함수 (내비게이션 스타일 업데이트)
    window.addEventListener("scroll", () => {
      const scrollPos =
        window.pageYOffset || document.documentElement.scrollTop;

      // 링크 활성화 토글
      navbarLinks.forEach((link) => {
        const href = link.getAttribute("href")!;
        const targetEl = document.querySelector<HTMLElement>(href)!;
        const elemTop = targetEl.offsetTop;
        const elemBottom = elemTop + targetEl.offsetHeight;
        if (elemTop <= scrollPos && scrollPos < elemBottom) {
          navbarLinks.forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });

      // 링크 색상 변경
      const sectionIds = ["main", "sec1", "sec2", "sec3", "sec4"];
      const sections = sectionIds.map((id) => document.getElementById(id)!);
      // If any section is missing, skip color update
      if (sections.some((sec) => sec === null)) return;
      const positions = sections.map((sec) => sec.offsetTop);
      const [sec0Top, sec1Top, sec2Top, sec3Top, sec4Top] = positions;
      if (
        (scrollPos >= sec0Top && scrollPos < sec1Top) ||
        (scrollPos >= sec2Top && scrollPos < sec3Top) ||
        scrollPos >= sec4Top
      ) {
        navbarLinks.forEach((link) => (link.style.color = "#fffff0"));
      } else {
        navbarLinks.forEach((link) => (link.style.color = "#25252b"));
      }
    });
  }, []);

  return (
    <div className="header">
      <ul className="navbar">
        <li>
          <a href="#main">MAIN</a>
        </li>
        <li>
          <a href="#sec1">ABOUT ME</a>
        </li>
        <li>
          <a href="#sec2">STACK</a>
        </li>
        <li>
          <a href="#sec3">DEMO</a>
        </li>
        <li>
          <a href="#sec4">CONTACT</a>
        </li>
      </ul>
    </div>
  );
}
