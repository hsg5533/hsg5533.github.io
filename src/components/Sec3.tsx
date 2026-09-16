import React, { useEffect } from "react";
import { SliderOptions } from "../utils/types";
import { slider } from "../utils/modules";

const box = import.meta.glob<{ default: React.ComponentType }>(
  "./Sec3box*.tsx",
  { eager: true },
);
// titles 순서: 빙그리(10) → 헬퍼잇(1) → … → coding.com(9)
const order = [10, 1, 2, 3, 11, 12, 4, 5, 6, 7, 8, 9];
const boxes = order.map((number) => box[`./Sec3box${number}.tsx`].default);

const sliderConfigs: SliderOptions[] = Array.from(
  { length: boxes.length },
  (_, i) => {
    return {
      img: `.slide${i + 1}`,
      btnL: `.btn_L${i + 1}`,
      btnR: `.btn_R${i + 1}`,
      dots: `.indis${i + 1}`,
    };
  },
);

// boxOrder의 렌더 순서와 반드시 일치해야 하는 인덱스 라벨
const titles = [
  "빙그리 어플리케이션",
  "헬퍼잇 어플리케이션",
  "헬퍼잇 랜딩페이지",
  "헬퍼잇 클린",
  "영덕 알리미 어플리케이션",
  "주얼리 컨시어져 챗봇",
  "인터오션 헬스케어사업부",
  "부전마켓타운 (어드민)",
  "부전마켓타운 (점주)",
  "부전마켓타운 (고객)",
  "대기어때",
  "coding.com",
];

export default function Sec3() {
  useEffect(() => {
    sliderConfigs.forEach((config) => slider(config));
    const items = document.querySelectorAll<HTMLElement>(".sec3-index-item");
    const panels = document.querySelectorAll<HTMLElement>(".sec3-panel");
    items.forEach((item, i) => {
      item.addEventListener("click", () => {
        items.forEach((el) => el.classList.remove("active"));
        panels.forEach((el) => el.classList.remove("active"));
        item.classList.add("active");
        panels[i].classList.add("active");
      });
    });
  }, []);

  return (
    <div className="sec sec3" id="sec3">
      <div className="sec3-header">
        <span className="sec3-kicker">SELECTED WORK</span>
        <h2>PROJECT</h2>
      </div>
      <div className="sec3-layout">
        <nav className="sec3-index">
          {titles.map((title, i) => (
            <button
              type="button"
              className={`sec3-index-item${i === 0 ? " active" : ""}`}
              key={i}
            >
              <span className="sec3-index-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="sec3-index-label">{title}</span>
            </button>
          ))}
        </nav>
        <div className="sec3-stage">
          {boxes.map((Box, i) => (
            <div className={`sec3-panel${i === 0 ? " active" : ""}`} key={i}>
              <Box />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
