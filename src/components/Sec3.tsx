import React, { useEffect } from "react";
import Sec3box1 from "./Sec3box1";
import Sec3box2 from "./Sec3box2";
import Sec3box3 from "./Sec3box3";
import Sec3box4 from "./Sec3box4";
import Sec3box5 from "./Sec3box5";
import Sec3box6 from "./Sec3box6";
import Sec3box7 from "./Sec3box7";

interface SliderOptions {
  img: string;
  btnL: string;
  btnR: string;
  dots: string;
}

const sliderConfigs: SliderOptions[] = Array.from({ length: 7 }, (_, i) => {
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
    div.style.width = "15px";
    div.style.height = "15px";
    div.style.borderRadius = "50%";
    div.style.background = i === 0 ? "#333" : "#aaa";
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
    indis[from].style.background = "#aaa";
    indis[to].style.background = "#333";
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

export default function Sec3() {
  useEffect(() => sliderConfigs.forEach((config) => slider(config)), []);
  return (
    <>
      <div className="sec sec3" id="sec3">
        <div className="sec3-title">
          <h2>PORJECT</h2>
        </div>
        <Sec3box1 />
      </div>
      <div className="sec sec3">
        <Sec3box2 />
      </div>
      <div className="sec sec3">
        <Sec3box3 />
      </div>
      <div className="sec sec3">
        <Sec3box4 />
      </div>
      <div className="sec sec3">
        <Sec3box5 />
      </div>
      <div className="sec sec3">
        <Sec3box6 />
      </div>
      <div className="sec sec3">
        <Sec3box7 />
      </div>
    </>
  );
}
