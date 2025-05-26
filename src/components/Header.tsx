import React, { useEffect, useRef, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLUListElement>(null);

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
  }, []);

  // open 토글 시 실제 높이 맞춰주기
  useEffect(() => {
    if (navRef.current) {
      navRef.current.style.maxHeight = open
        ? `${navRef.current.scrollHeight}px`
        : `0px`;
    }
  }, [open]);

  return (
    <header className="header">
      {/* 모바일 햄버거 버튼 */}
      <button className="hamburger" onClick={() => setOpen(!open)}>
        <span />
        <span />
        <span />
      </button>
      <ul ref={navRef} className={`navbar ${open ? "open" : ""}`}>
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
    </header>
  );
}
