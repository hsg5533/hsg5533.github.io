import React, { useEffect } from "react";
import Sec3box1 from "./Sec3box1";
import Sec3box2 from "./Sec3box2";
import Sec3box3 from "./Sec3box3";

interface SliderOptions {
  img: string;
  btnLeft: string;
  btnRight: string;
  indicator: string;
  dots: string;
  active: string;
}

const sliderConfigs: SliderOptions[] = [
  {
    img: ".slide",
    btnLeft: ".btn_L",
    btnRight: ".btn_R",
    indicator: ".indis",
    dots: "indi",
    active: "indi_active",
  },
  {
    img: ".slide2",
    btnLeft: ".btn_L2",
    btnRight: ".btn_R2",
    indicator: ".indis2",
    dots: "indi2",
    active: "indi2_active",
  },
  {
    img: ".slide3",
    btnLeft: ".btn_L3",
    btnRight: ".btn_R3",
    indicator: ".indis3",
    dots: "indi3",
    active: "indi3_active",
  },
];

function initSlider({
  img,
  btnLeft,
  btnRight,
  indicator,
  dots,
  active,
}: SliderOptions) {
  let current = 0;
  const timer = 1000;
  const indis: HTMLElement[] = [];
  const imgs = document.querySelectorAll<HTMLElement>(img);
  const left = document.querySelector<HTMLElement>(btnLeft)!;
  const right = document.querySelector<HTMLElement>(btnRight)!;
  const container = document.querySelector<HTMLElement>(indicator)!;
  const count = imgs.length;
  imgs[0].style.left = "0";

  // 인디케이터 생성
  for (let i = 0; i < count; i++) {
    const dot = document.createElement("div");
    dot.classList.add(dots);
    if (i === 0) dot.classList.add(active);
    container.appendChild(dot);
    indis.push(dot);
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
    indis[from].classList.remove(active);
    indis[to].classList.add(active);
  };

  // 내비게이션 핸들러
  right.addEventListener("click", () => {
    slide(current % count, "-100%", (current + 1) % count, "100%");
    current++;
  });
  left.addEventListener("click", () => {
    slide(current % count, "100%", (current - 1 + count) % count, "-100%");
    current--;
  });

  // 자동 재생
  setInterval(() => right.click(), timer + 2000);

  // 인디케이터 클릭
  indis.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      const activeIdx = indis.findIndex((el) => el.classList.contains(active));
      if (activeIdx < idx) {
        slide(activeIdx, "-100%", idx, "100%");
        current = idx;
      } else if (activeIdx > idx) {
        slide(activeIdx, "100%", idx, "-100%");
        current = idx;
      }
    });
  });
}

export default function Sec3() {
  useEffect(() => sliderConfigs.forEach((config) => initSlider(config)), []);
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
    </>
  );
}
