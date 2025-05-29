import React from "react";
import image1 from "../assets/img/background/image1.png";
import image2 from "../assets/img/background/image2.png";
import image3 from "../assets/img/background/image3.png";
import image4 from "../assets/img/background/image4.png";

export default function Sec3box1() {
  return (
    <div className="project">
      <div className="pr-box">
        <div className="pr-img slide1">
          <img src={image1} alt="" />
        </div>
        <div className="pr-img slide1">
          <img src={image2} alt="" />
        </div>
        <div className="pr-img slide1">
          <img src={image3} alt="" />
        </div>
        <div className="pr-img slide1">
          <img src={image4} alt="" />
        </div>
        <input type="button" value="〈" className="pr-btn btn_L1" />
        <input type="button" value="〉" className="pr-btn btn_R1" />
        <div className="indis1"></div>
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
            <a target="_blank" href="https://github.com/hsg5533/coding.git">
              GitHub
            </a>
          </div>
          <div className="link-btn">
            <a target="_blank" href="https://hsg5533.github.io/coding/">
              호스팅
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
