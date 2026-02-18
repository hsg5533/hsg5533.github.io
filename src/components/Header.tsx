import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import hamburger from "../assets/img/icon/burger-button.svg";

export default function Header() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();

  const onClick = useCallback(
    (e: Event) => {
      e.preventDefault();

      const link = e.currentTarget as HTMLAnchorElement;
      const href = link.getAttribute("href") || "";

      // 1) 같은 페이지 내 앵커 스크롤
      if (href.startsWith("#")) {
        const targetEl = document.querySelector<HTMLElement>(href);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setOpen(false);
        return;
      }

      // 2) 라우트 이동
      navigate(href);
      setOpen(false);
    },
    [navigate],
  );

  useEffect(() => {
    const navbarLinks =
      document.querySelectorAll<HTMLAnchorElement>(".navbar a");
    navbarLinks.forEach((link) => link.addEventListener("click", onClick));
    return () => {
      navbarLinks.forEach((link) => link.removeEventListener("click", onClick));
    };
  }, [onClick]);

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
      <button className="hamburger" onClick={() => setOpen(!open)}>
        <img src={hamburger} alt="메뉴" />
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
        <li>
          <a href="/speed">SPEED</a>
        </li>
        <li>
          <a href="/finder">FINDER</a>
        </li>
        <li>
          <a href="/resume">RESUME</a>
        </li>
        <li>
          <a href="/wonder">WONDER</a>
        </li>
      </ul>
    </header>
  );
}
