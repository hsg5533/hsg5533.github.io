import React, { useEffect } from "react";

const box = import.meta.glob<{ default: React.ComponentType }>(
  "./Sec3box*.tsx",
  { eager: true },
);
const boxes = Object.keys(box)
  .sort()
  .map((key) => box[key].default);

interface SliderOptions {
  img: string;
  btnL: string;
  btnR: string;
  dots: string;
}

const sliderConfigs: SliderOptions[] = Array.from({ length: 9 }, (_, i) => {
  return {
    img: `.slide${i + 1}`,
    btnL: `.btn_L${i + 1}`,
    btnR: `.btn_R${i + 1}`,
    dots: `.indis${i + 1}`,
  };
});

function slider({ img, btnL, btnR, dots }: SliderOptions) {
  let current = 0;
  const timer = 1000;
  const indis: HTMLElement[] = [];
  const imgs = document.querySelectorAll<HTMLElement>(img);
  const left = document.querySelector<HTMLElement>(btnL)!;
  const right = document.querySelector<HTMLElement>(btnR)!;
  const index = document.querySelector<HTMLElement>(dots)!;
  const count = imgs.length;

  // 스타일 지정
  left.style.left = "0";
  right.style.right = "0";
  imgs[0].style.left = "0";
  index.style.transform = "translateX(-50%)";
  index.style.position = "absolute";
  index.style.display = "flex";
  index.style.bottom = "10px";
  index.style.left = "50%";
  index.style.gap = "10px";

  // 인디케이터 생성
  for (let i = 0; i < count; i++) {
    const div = document.createElement("div");
    div.style.width = "7px";
    div.style.height = "7px";
    div.style.borderRadius = "50%";
    div.style.background = i === 0 ? "#ff5470" : "#6f6d78";
    index.appendChild(div);
    indis.push(div);
  }

  // 슬라이드 함수
  const slide = (from: number, fromPos: string, to: number, toPos: string) => {
    imgs[from].animate([{ left: "0" }, { left: fromPos }], {
      duration: timer,
      fill: "forwards",
    });
    imgs[to].style.left = toPos;
    imgs[to].animate([{ left: toPos }, { left: "0" }], {
      duration: timer,
      fill: "forwards",
    });
    indis[from].style.background = "#6f6d78";
    indis[to].style.background = "#ff5470";
  };

  // 내비게이션 핸들러
  left.addEventListener("click", () => {
    slide(current % count, "100%", (current - 1 + count) % count, "-100%");
    current--;
  });
  right.addEventListener("click", () => {
    slide(current % count, "-100%", (current + 1) % count, "100%");
    current++;
  });

  // 자동 재생
  setInterval(() => right.click(), timer + 2000);

  // 인디케이터 클릭
  indis.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      const activeIdx = ((current % count) + count) % count;
      if (activeIdx === idx) {
        return;
      }
      if (activeIdx < idx) {
        slide(activeIdx, "-100%", idx, "100%");
      }
      if (activeIdx > idx) {
        slide(activeIdx, "100%", idx, "-100%");
      }
      current = idx;
    });
  });
}

// Sec3box1~9의 렌더 순서와 반드시 일치해야 하는 인덱스 라벨
const titles = [
  "헬퍼잇 어플리케이션",
  "헬퍼잇 랜딩페이지",
  "헬퍼잇 클린",
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
            <div
              className={`sec3-panel${i === 0 ? " active" : ""}`}
              key={i}
            >
              <Box />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
