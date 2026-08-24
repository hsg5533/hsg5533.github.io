import { useEffect, useRef } from "react";
import { useView } from "../utils/modules";
import react from "../assets/img/icon/react.png";
import reactnative from "../assets/img/icon/reactnative.png";
import springboot from "../assets/img/icon/springboot.png";
import python from "../assets/img/icon/python.png";
import vscode from "../assets/img/icon/vscode.png";
import mysql from "../assets/img/icon/mysql.png";
import java from "../assets/img/icon/java.png";
import html from "../assets/img/icon/Html.png";
import css from "../assets/img/icon/css.png";
import sql from "../assets/img/icon/sql.png";
import js from "../assets/img/icon/js.png";
import ts from "../assets/img/icon/ts.png";

const offsetZ = 200; // translateZ 오프셋 값
const amplitudeX = 550; // X축 이동 범위(진폭)
const amplitudeY = 300; // Y축 이동 범위(진폭)
const amplitudeZ = 500; // Z축 이동 범위(진폭)

const skills = [
  { id: "first-card", src: react, alt: "react" },
  { id: "second-card", src: reactnative, alt: "reactnative" },
  { id: "third-card", src: springboot, alt: "springboot" },
  { id: "fourth-card", src: js, alt: "javascript" },
  { id: "fifth-card", src: ts, alt: "typescript" },
  { id: "sixth-card", src: java, alt: "java" },
  { id: "seventh-card", src: html, alt: "html" },
  { id: "eighth-card", src: css, alt: "css" },
  { id: "ninth-card", src: vscode, alt: "vscode" },
  { id: "tenth-card", src: python, alt: "python" },
  { id: "eleventh-card", src: sql, alt: "sql" },
  { id: "twelfth-card", src: mysql, alt: "mysql" },
];

// transform 문자열에서 translateZ 값을 추출해 숫자(px 단위)를 반환하는 헬퍼 함수
function getTranslateZ(transform: string) {
  const match = transform.match(/translateZ\((-?\d+(\.\d+)?)px\)/);
  return match ? parseFloat(match[1]) : -Infinity;
}

// highLight 함수: inline style의 translateZ 값을 비교해서 zoom-in/zoom-out 적용
function highLight(imgs: NodeListOf<Element>) {
  let maxZ = -Infinity;
  let front: Element;
  imgs.forEach((img) => {
    if (!img.parentElement) return;
    const card = img.parentElement;
    const transform = card.style.transform; // e.g., "translateX(0px) translateZ(700px) rotateY(0deg)"
    const z = getTranslateZ(transform);
    if (z > maxZ) {
      maxZ = z;
      front = img;
    }
  });
  imgs.forEach((img) => {
    img.classList.remove("zoom-in", "zoom-out");
    if (img === front) {
      img.classList.add("zoom-in");
    } else {
      img.classList.add("zoom-out");
    }
  });
}

class Swiper {
  area: HTMLElement;
  card: string;
  mode: string;
  width: number;
  height: number;
  initialX: number;
  initialY: number;
  hThreshold: number;
  vThreshold: number;
  isClick: boolean;
  cards: NodeListOf<HTMLElement>;
  sequence: string[];
  constructor(area: HTMLElement, card: string, mode = "horizontal") {
    this.area = area; // 컨테이너 요소 참조
    this.card = card; // 카드 선택자를 저장
    this.mode = mode; // 회전 방향 모드 (horizontal / vertical)
    this.width = 0; // 컨테이너 너비
    this.height = 0; // 컨테이너 높이
    this.initialX = 0; // 마우스/터치 시작 X좌표
    this.initialY = 0; // 마우스/터치 시작 Y좌표
    this.hThreshold = 0; // 가로 임계값
    this.vThreshold = 0; // 세로 임계값
    this.isClick = false; // 드래그 중인지 여부
    this.cards = document.querySelectorAll<HTMLElement>(this.card); // 모든 카드 요소(NodeList)
    this.sequence = Array.from(this.cards).map((card) => card.id); // 카드의 ID 순서를 배열로 저장
  }
  init() {
    this.width = this.area.offsetWidth; // 컨테이너 실제 너비
    this.height = this.area.offsetHeight; // 컨테이너 실제 높이
    this.hThreshold = this.width / this.cards.length; // 가로 방향으로 회전하기 위한 임계값
    this.vThreshold = this.height / this.cards.length; // 세로 방향으로 회전하기 위한 임계값
  }
  setInitalPoint(e: MouseEvent | Touch) {
    this.initialX = e.clientX; // 처음 클릭/터치 X좌표 저장
    this.initialY = e.clientY; // 처음 클릭/터치 Y좌표 저장
  }
  calculateDistance(e: MouseEvent | Touch) {
    const deltaX = e.clientX - this.initialX; // X축으로 움직인 거리
    const deltaY = e.clientY - this.initialY; // Y축으로 움직인 거리
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      return deltaX; // 가로 이동 거리가 더 크면
    } else {
      return deltaY; // 세로 이동 거리가 더 크면
    }
  }
  rotateObject(e: MouseEvent | Touch) {
    if (!this.isClick) return; // 클릭/터치 중이 아니면 종료
    const delta = this.calculateDistance(e); // 이동 방향과 거리 계산
    const threshold =
      this.mode === "horizontal" ? this.hThreshold : this.vThreshold; // 방향별 임계값
    if (Math.abs(delta) < threshold) {
      return;
    } // 임계값보다 이동이 작으면 회전 없음
    if (delta > 0) {
      this.moveNext(); // 양수면 다음 카드로 이동
    } else {
      this.movePrev(); // 음수면 이전 카드로 이동
    }
    this.isClick = !this.isClick; // 클릭/터치 상태 해제
  }
  shuffle() {
    const cards = document.querySelectorAll<HTMLElement>(this.card); // 현재 DOM에서 모든 카드 조회
    this.cards.forEach((card) => {
      card.style.transition = "none"; // 위치를 재배치하기 전 트랜지션 끔
    });
    this.sequence.forEach((id) => {
      const card = document.getElementById(id); // 순서 배열에 있는 ID에 해당하는 카드
      if (card) {
        this.area.appendChild(card); // 컨테이너의 맨 뒤로 순서대로 붙임
      }
    });
    void this.area.offsetWidth; // 리플로우 강제 발생 (재배치 후 적용)
    cards.forEach((card) => {
      card.style.transition = ""; // 트랜지션 다시 켬
    });
    cards.forEach((card, index) => {
      // index를 이용해 회전 각도 계산
      const angleDeg = index * (360 / this.cards.length); // 전체 카드를 원형으로 배치하기 위한 각도
      const angleRad = (angleDeg * Math.PI) / 180; // 라디안 변환
      const translateZ = amplitudeZ * Math.cos(angleRad) + offsetZ; // Z축 이동 거리
      // 회전 + 3D 위치 설정
      if (this.mode === "horizontal") {
        const translateX = amplitudeX * Math.sin(angleRad); // X축 이동 거리
        card.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${angleDeg}deg)`;
      } else {
        const translateY = amplitudeY * Math.sin(angleRad); // Y축 이동 거리
        card.style.transform = `translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${angleDeg}deg)`;
      }
    });
  }
  movePrev() {
    const value = this.sequence.pop(); // 배열의 마지막 ID를 꺼냄
    this.sequence.unshift(value!); // 맨 앞에 추가하여 순서 재조정
    this.shuffle(); // 새 순서대로 다시 배치
  }
  moveNext() {
    const value = this.sequence.shift(); // 배열의 첫 번째 ID를 꺼냄
    this.sequence.push(value!); // 맨 뒤에 추가하여 순서 재조정
    this.shuffle(); // 새 순서대로 다시 배치
  }
}

export default function Sec2() {
  const containerRef = useRef<HTMLDivElement>(null); // 카드 컨테이너 참조
  const inView = useView(containerRef, 0.1); // 화면 가시 여부

  useEffect(() => {
    if (!inView || !containerRef.current) return;
    const container = containerRef.current;
    const swiper = new Swiper(container, ".card", "horizontal"); // Swiper 인스턴스 생성
    const imgs = container.querySelectorAll(".card img"); // 로고 이미지
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

    swiper.moveNext();
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
    };
  }, [inView]);

  return (
    <div className="sec sec2" id="sec2">
      <div className="sec2-title">
        <h2>SKILLS</h2>
      </div>
      <div className="skill-title">FRONT-END & BACK-END</div>
      <div className="skill-title">USED IT</div>
      <div className="container" ref={containerRef}>
        {skills.map(({ id, src, alt }) => (
          <div key={id} id={id} className="card">
            <img src={src} alt={alt} />
          </div>
        ))}
      </div>
    </div>
  );
}
