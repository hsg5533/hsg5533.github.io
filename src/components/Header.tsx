import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import hamburger from "../assets/img/icon/burger-button.svg";
import { isMobile } from "../utils/modules";

const items = [
  { label: "MAIN", href: "#main" },
  { label: "ABOUT ME", href: "#sec1" },
  { label: "VALUES", href: "#values" },
  { label: "HISTORY", href: "#history" },
  { label: "SKILLS", href: "#sec2" },
  { label: "RESUME", href: "#resume" },
  { label: "PROJECT", href: "#sec3" },
  { label: "CONTACT", href: "#sec4" },
  { label: "SPEED", href: "/speed" },
  { label: "WONDER", href: "/wonder" },
];

export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLElement | null>(null);

  const handleItemClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute("href") || "";
      if (href.startsWith("#")) {
        const targetEl = document.querySelector<HTMLElement>(href);
        if (targetEl) {
          const top = window.scrollY + targetEl.getBoundingClientRect().top;
          window.scrollTo({ top, behavior: "smooth" });
        } else {
          navigate("/");
        }
      } else {
        navigate(href);
      }
      setOpen(false);
    },
    [navigate],
  );

  useEffect(() => {
    const onResize = () => !isMobile() && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <header className="header">
        <a href="#main" className="brand" onClick={handleItemClick}>
          HOSANG<span className="brand-dot">.</span>
        </a>
        <button className="hamburger" onClick={() => setOpen(true)}>
          <img src={hamburger} alt="메뉴" />
        </button>
        <ul className="navbar navbar-desktop">
          {items.map((it) => (
            <li key={it.href}>
              <a href={it.href} onClick={handleItemClick}>
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </header>
      <div
        className={`drawer-backdrop ${open ? "open" : ""}`}
        onClick={() => setOpen(false)}
      />
      <nav className={`drawer ${open ? "open" : ""}`} ref={drawerRef}>
        <div className="drawer-header">
          <span className="drawer-title">MENU</span>
          <button className="drawer-close" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>
        <ul className="drawer-nav">
          {items.map((it) => (
            <li key={it.href}>
              <a href={it.href} onClick={handleItemClick}>
                {it.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
