import { useEffect, useRef, useState } from "react";
import react from "../assets/img/icon/react.png";
import reactnative from "../assets/img/icon/reactnative.png";
import springboot from "../assets/img/icon/springboot.png";
import js from "../assets/img/icon/js.png";
import ts from "../assets/img/icon/ts.png";
import java from "../assets/img/icon/java.png";
import html from "../assets/img/icon/Html.png";
import css from "../assets/img/icon/css.png";
import vscode from "../assets/img/icon/vscode.png";
import python from "../assets/img/icon/python.png";
import sql from "../assets/img/icon/sql.png";
import mysql from "../assets/img/icon/mysql.png";
import php from "../assets/img/icon/php.png";
import claudeCode from "../assets/img/icon/claude-code.png";
import codex from "../assets/img/icon/codex.png";
import git from "../assets/img/icon/git.png";
import {
  freeze,
  highLight,
  isMobile,
  release,
  Swiper,
  usePhysics,
  useView,
} from "../utils/modules";

const skills = [
  { id: "first-card", src: react, alt: "React" },
  { id: "second-card", src: reactnative, alt: "React Native" },
  { id: "third-card", src: springboot, alt: "Spring Boot" },
  { id: "fourth-card", src: js, alt: "JavaScript" },
  { id: "fifth-card", src: ts, alt: "TypeScript" },
  { id: "sixth-card", src: java, alt: "Java" },
  { id: "seventh-card", src: html, alt: "HTML5" },
  { id: "eighth-card", src: css, alt: "CSS3" },
  { id: "ninth-card", src: vscode, alt: "Visual Studio Code" },
  { id: "tenth-card", src: python, alt: "Python" },
  { id: "eleventh-card", src: sql, alt: "SQL" },
  { id: "twelfth-card", src: mysql, alt: "MySQL" },
  { id: "thirteenth-card", src: php, alt: "PHP" },
  { id: "fourteenth-card", src: claudeCode, alt: "Claude Code" },
  { id: "fifteenth-card", src: codex, alt: "Codex" },
  { id: "sixteenth-card", src: git, alt: "Git" },
];

export default function Sec2() {
  const mobile = isMobile(); // 모바일 여부
  const containerRef = useRef<HTMLDivElement>(null); // 카드 컨테이너 참조
  const swiperRef = useRef<Swiper | null>(null); // 화살표 버튼에서 쓸 Swiper 인스턴스
  const directionRef = useRef<"prev" | "next">("next"); // 복귀 시 회전 방향
  const inView = useView(containerRef, 0.1); // 화면 가시 여부
  const [drop, setDrop] = useState(false); // 물리 모드 여부

  usePhysics(containerRef, drop);

  useEffect(() => {
    if (!inView || drop || !containerRef.current) return;
    const container = containerRef.current;
    release(container); // 물리 모드가 남긴 인라인 스타일 정리
    const mode = mobile ? "vertical" : "horizontal";
    const swiper = new Swiper(container, ".card", mode); // Swiper 인스턴스 생성
    swiperRef.current = swiper;
    const imgs = container.querySelectorAll(".card .skill-icon"); // 로고 이미지
    swiper.init(); // 초기화 작업 수행

    const handleDragStart = (e: MouseEvent) => {
      swiper.isClick = true; // 드래그 시작 상태로 전환
      swiper.setInitalPoint(e); // 드래그 시작 위치 설정
    };
    const handleTouchStart = (e: TouchEvent) => {
      swiper.isClick = true; // 터치 시작 상태로 전환
      swiper.setInitalPoint(e.touches[0]); // 터치 시작 위치 설정
    };
    const handleDragMove = (e: MouseEvent) => {
      swiper.rotateObject(e); // 마우스 이동에 따라 회전 검사
    };
    const handleTouchMove = (e: TouchEvent) => {
      swiper.rotateObject(e.touches[0]); // 터치 이동에 따라 회전 검사
    };
    const handleDragEnd = () => {
      swiper.isClick = false; // 드래그/터치 해제
    };

    container.addEventListener("mousedown", handleDragStart);
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("mousemove", handleDragMove);
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("mouseup", handleDragEnd);
    container.addEventListener("touchend", handleDragEnd);
    // 브라우저가 스크롤을 위해 제스처를 가져가면 touchcancel이 온다. 그때 캐러셀은 손을 뗀다.
    container.addEventListener("touchcancel", handleDragEnd);

    directionRef.current === "prev" ? swiper.movePrev() : swiper.moveNext();

    highLight(imgs);
    // 자동 슬라이드 & 하이라이트
    const intervalId = setInterval(() => {
      swiper.moveNext();
      highLight(imgs);
    }, 1500);

    return () => {
      clearInterval(intervalId);
      container.removeEventListener("mousedown", handleDragStart);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("mousemove", handleDragMove);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("mouseup", handleDragEnd);
      container.removeEventListener("touchend", handleDragEnd);
      container.removeEventListener("touchcancel", handleDragEnd);
      swiperRef.current = null;
    };
  }, [inView, drop]);

  // 화살표는 물리 모드에서만 보인다. 누른 방향으로 캐러셀을 되돌린다.
  const handleAlign = (direction: "prev" | "next") => {
    directionRef.current = direction;
    setDrop(false);
  };

  return (
    <div className="sec sec2" id="sec2">
      <div className="sec2-title">
        <h2>SKILLS</h2>
      </div>
      <div className="skill-title">FRONT-END & BACK-END & Tools</div>
      <div className="skill-title">USED IT</div>
      <div
        className={drop ? "container drop" : "container"}
        ref={containerRef}
        onClick={({ clientX, clientY }) => {
          if (drop || mobile || !containerRef.current || !swiperRef.current)
            return;
          const { initialX, initialY } = swiperRef.current;
          if (Math.hypot(clientX - initialX, clientY - initialY) > 10) return; // 드래그였으면 무시
          freeze(containerRef.current); // 현재 위치를 left/top으로 굳힌다
          setDrop(true);
        }}
        onDragStart={(event) => event.preventDefault()}
      >
        {skills.map(({ id, src, alt }) => (
          <div
            key={id}
            id={id}
            className="card"
            data-cursor-label={drop ? undefined : "아이콘을 클릭해보세요"}
          >
            <img className="skill-icon" src={src} alt={alt} />
          </div>
        ))}
      </div>
      <div className={drop ? "skill-nav" : "skill-nav is-hidden"}>
        <button
          type="button"
          className="skill-arrow"
          aria-label="이전 스킬"
          onClick={() => handleAlign("prev")}
        >
          &#9664;
        </button>
        <button
          type="button"
          className="skill-arrow"
          aria-label="다음 스킬"
          onClick={() => handleAlign("next")}
        >
          &#9654;
        </button>
      </div>
    </div>
  );
}
