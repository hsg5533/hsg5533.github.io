import React, { useEffect, useRef, useState } from "react";
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
  const [inView, setInView] = useState(false); // 화면 가시 여부 상태

  // IntersectionObserver로 .container 가시성 감지
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const container = containerRef.current!;
    const swiper = new Swiper(container, ".card", "horizontal"); // Swiper 인스턴스 생성
    swiper.init(); // 초기화 작업 수행
    container.addEventListener("mousedown", (e) => {
      swiper.isClick = true; // 드래그 시작 상태로 전환
      swiper.setInitalPoint(e); // 드래그 시작 위치 설정
    });
    container.addEventListener("touchstart", (e) => {
      swiper.isClick = true; // 터치 시작 상태로 전환
      swiper.setInitalPoint(e.touches[0]); // 터치 시작 위치 설정
    });
    container.addEventListener("mousemove", (e) => {
      swiper.rotateObject(e); // 마우스 이동에 따라 회전 검사
    });
    container.addEventListener("touchmove", (e) => {
      swiper.rotateObject(e.touches[0]); // 터치 이동에 따라 회전 검사
    });
    container.addEventListener("mouseup", () => {
      swiper.isClick = false; // 드래그 해제
    });
    container.addEventListener("touchend", () => {
      swiper.isClick = false; // 터치 해제
    });
    swiper.moveNext();
    // 자동 슬라이드 & 하이라이트
    const id = setInterval(() => swiper.moveNext(), 1500);
    return () => clearInterval(id); // don’t forget cleanup!
  }, [inView]);

  return (
    <div className="sec sec2" id="sec2">
      <div className="sec2-title">
        <h2>SKILLS</h2>
      </div>
      <div className="skill-title">FRONT-END & BACK-END</div>
      <div className="skill-title">USED IT</div>
      <div className="container" ref={containerRef}>
        <div id="first-card" className="card">
          <img src={react} alt="react" />
        </div>
        <div id="second-card" className="card">
          <img src={reactnative} alt="reactnative" />
        </div>
        <div id="third-card" className="card">
          <img src={springboot} alt="springboot" />
        </div>
        <div id="fourth-card" className="card">
          <img src={js} alt="javascript" />
        </div>
        <div id="fifth-card" className="card">
          <img src={ts} alt="typescript" />
        </div>
        <div id="sixth-card" className="card">
          <img src={java} alt="java" />
        </div>
        <div id="seventh-card" className="card">
          <img src={html} alt="html" />
        </div>
        <div id="eighth-card" className="card">
          <img src={css} alt="css" />
        </div>
        <div id="ninth-card" className="card">
          <img src={vscode} alt="vscode" />
        </div>
        <div id="tenth-card" className="card">
          <img src={python} alt="python" />
        </div>
        <div id="eleventh-card" className="card">
          <img src={sql} alt="sql" />
        </div>
        <div id="twelfth-card" className="card">
          <img src={mysql} alt="mysql" />
        </div>
      </div>
    </div>
  );
}
