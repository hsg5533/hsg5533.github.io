import React, { useEffect } from "react";
import image1 from "../assets/img/background/image1.png";
import image2 from "../assets/img/background/image2.png";
import image3 from "../assets/img/background/image3.png";
import image4 from "../assets/img/background/image4.png";
import image5 from "../assets/img/background/image5.png";
import image6 from "../assets/img/background/image6.png";
import image7 from "../assets/img/background/image7.png";
import image8 from "../assets/img/background/image8.png";
import image9 from "../assets/img/background/image9.png";
import image10 from "../assets/img/background/image10.png";
import image11 from "../assets/img/background/image11.png";

interface SliderOptions {
  img: string;
  btn: string;
  btnLeft: string;
  btnRight: string;
  indicator: string;
  dots: string;
  active: string;
}

const sliderConfigs: SliderOptions[] = [
  {
    img: ".sec3_img",
    btn: ".sec3_btn",
    btnLeft: ".btn_L",
    btnRight: ".btn_R",
    indicator: ".indis",
    dots: "indi",
    active: "indi_active",
  },
  {
    img: ".sec3_img2",
    btn: ".sec3_btn2",
    btnLeft: ".btn_L2",
    btnRight: ".btn_R2",
    indicator: ".indis2",
    dots: "indi2",
    active: "indi2_active",
  },
];

function initSlider({
  img,
  btn,
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
  const btns = document.querySelectorAll<HTMLElement>(btn);
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

  // 버튼 잠시 비활성화
  const disableButtons = () => {
    btns.forEach((btn) => (btn.style.pointerEvents = "none"));
    setTimeout(
      () => btns.forEach((btn) => (btn.style.pointerEvents = "auto")),
      timer
    );
  };

  // 내비게이션 핸들러
  right.addEventListener("click", () => {
    disableButtons();
    slide(current % count, "-100%", (current + 1) % count, "100%");
    current++;
  });
  left.addEventListener("click", () => {
    disableButtons();
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
        disableButtons();
        slide(activeIdx, "-100%", idx, "100%");
        current = idx;
      } else if (activeIdx > idx) {
        disableButtons();
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
        <div className="title_box">
          <h2>PORJECT</h2>
        </div>
        <div className="sec3box">
          <div className="sec3boxtop">
            <div className="sec3_imgbox">
              <div className="sec_main">
                <div className="sec3_img">
                  <img src={image1} alt="" />
                </div>
                <div className="sec3_img">
                  <img src={image2} alt="" />
                </div>
                <div className="sec3_img">
                  <img src={image3} alt="" />
                </div>
                <div className="sec3_img">
                  <img src={image4} alt="" />
                </div>
                <input type="button" value="〈" className="sec3_btn btn_L" />
                <input type="button" value="〉" className="sec3_btn btn_R" />
                <div className="indis"></div>
              </div>
            </div>
          </div>
          <div className="sec3boxbot">
            <div className="sec3text">
              <div className="sec3title">coding.com</div>
              <div className="sec3desc">HTML, CSS, JAVASCRIPT</div>
              <p className="sec3p">
                웹 사이트의 구조 및 설계를 공부하기 위해 제작하였습니다
              </p>
            </div>
            <div className="sec3R">
              <div className="indexbutton">
                <a target="_blank" href="https://github.com/hsg5533/coding.git">
                  GitHub
                </a>
              </div>
              <div className="indexbutton">
                <a target="_blank" href="https://hsg5533.github.io/coding/">
                  호스팅
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sec sec3">
        <div className="sec3box2">
          <div className="sec3boxtop">
            <div className="sec3_imgbox2">
              <div className="sec3_img2 sec3_sildeimg5">
                <img src={image5} alt="" />
              </div>
              <div className="sec3_img2 sec3_sildeimg6">
                <img src={image6} alt="" />
              </div>
              <div className="sec3_img2 sec3_sildeimg7">
                <img src={image7} alt="" />
              </div>
              <div className="sec3_img2 sec3_sildeimg8">
                <img src={image8} alt="" />
              </div>
              <div className="sec3_img2 sec3_sildeimg9">
                <img src={image9} alt="" />
              </div>
              <div className="sec3_img2 sec3_sildeimg10">
                <img src={image10} alt="" />
              </div>
              <div className="sec3_img2 sec3_sildeimg11">
                <img src={image11} alt="" />
              </div>
              <input type="button" value="〈" className="sec3_btn2 btn_L2" />
              <input type="button" value="〉" className="sec3_btn2 btn_R2" />
              <div className="indis2"></div>
            </div>
          </div>
          <div className="sec3boxbot">
            <div className="sec3L">
              <div className="sec3text">
                <div className="sec3title">헬퍼잇 랜딩페이지</div>
                <div className="sec3desc">React, JAVASCRIPT</div>
                <p className="sec3p">
                  팀 프로젝트로 전국 캠핑장을 조회할 수 있고 캠핑 용품도 구매할
                  수 있는 사이트를 제작했습니다.
                </p>
              </div>
            </div>
            <div className="sec3R">
              <div className="sec3R">
                <div className="indexbutton">
                  <a
                    target="_blank"
                    href="https://github.com/yeyiwon/Healing_Camp"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
