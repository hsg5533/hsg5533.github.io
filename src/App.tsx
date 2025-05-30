import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./assets/css/reset.css";
import "./assets/css/cursor.css";
import "./assets/css/font.css";
import "./assets/css/loading.css";
import "./assets/css/navbar.css";
import "./assets/css/top.css";
import "./assets/css/main.css";
import "./assets/css/swiper.css";
import "./assets/css/slider.css";
import "./assets/css/values.css";
import "./assets/css/sec1.css";
import "./assets/css/sec2.css";
import "./assets/css/sec3.css";
import "./assets/css/sec4.css";

import Header from "./components/Header";
import Main from "./components/Main";
import Sec1 from "./components/Sec1";
import Sec2 from "./components/Sec2";
import Sec3 from "./components/Sec3";
import Sec4 from "./components/Sec4";
import Top from "./components/Top";
import Values from "./components/Values";
import Cursor from "./components/Cursor";

function App() {
  useEffect(() => {
    AOS.init();
    const loaders = document.querySelector<HTMLElement>(".loading");
    if (loaders) {
      // 페이드아웃 시작
      loaders.classList.add("hidden");
      // 트랜지션이 끝나면 완전히 제거
      loaders.addEventListener(
        "transitionend",
        () => {
          loaders.style.display = "none";
        },
        { once: true }
      );
    }
  }, []);

  useEffect(() => {
    // 브라우저의 자동 스크롤 복원 방지
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // 초기 진입 및 새로고침 시 최상단으로 스크롤
    window.scrollTo(0, 0);
    // 새로고침 시에도 beforeunload 이벤트로 스크롤을 최상단으로
    const handleTop = () => window.scrollTo(0, 0);
    window.addEventListener("beforeunload", handleTop);
    return () => window.removeEventListener("beforeunload", handleTop);
  }, []);

  return (
    <>
      <div className="loading">
        <div className="donut multi"></div>
      </div>
      <Cursor />
      <Header />
      <Main />
      <Sec1 />
      <Values />
      <Sec2 />
      <Sec3 />
      <Sec4 />
      <Top />
    </>
  );
}

export default App;
