import React from "react";
import image38 from "../assets/img/background/image38.png";
import image39 from "../assets/img/background/image39.png";
import image40 from "../assets/img/background/image40.png";
import image41 from "../assets/img/background/image41.png";

export default function Sec3box9() {
  return (
    <div className="project">
      <div className="pr-box">
        <div className="pr-img slide9">
          <img src={image38} alt="" />
        </div>
        <div className="pr-img slide9">
          <img src={image39} alt="" />
        </div>
        <div className="pr-img slide9">
          <img src={image40} alt="" />
        </div>
        <div className="pr-img slide9">
          <img src={image41} alt="" />
        </div>
        <input type="button" value="〈" className="pr-btn btn_L9" />
        <input type="button" value="〉" className="pr-btn btn_R9" />
        <div className="indis9"></div>
      </div>
      <div className="pr-text-box">
        <div className="pr-text">
          <div className="pr-title">coding.com</div>
          <div className="pr-desc">HTML, CSS, JAVASCRIPT</div>
          <p className="pr-txt">
            웹 사이트의 구조 및 설계를 공부하기 위해 제작하였습니다
          </p>
        </div>
        <div className="link-box">
          <div className="link-btn">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/hsg5533/coding.git"
            >
              GitHub
            </a>
          </div>
          <div className="link-btn">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://hsg5533.github.io/coding/"
            >
              호스팅
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
