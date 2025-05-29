import React from "react";
import image5 from "../assets/img/background/image5.png";
import image6 from "../assets/img/background/image6.png";
import image7 from "../assets/img/background/image7.png";
import image8 from "../assets/img/background/image8.png";
import image9 from "../assets/img/background/image9.png";
import image10 from "../assets/img/background/image10.png";
import image11 from "../assets/img/background/image11.png";

export default function Sec3box2() {
  return (
    <div className="project">
      <div className="pr-box">
        <div className="pr-img slide2">
          <img src={image5} alt="헬퍼잇1" />
        </div>
        <div className="pr-img slide2">
          <img src={image6} alt="헬퍼잇2" />
        </div>
        <div className="pr-img slide2">
          <img src={image7} alt="헬퍼잇3" />
        </div>
        <div className="pr-img slide2">
          <img src={image8} alt="헬퍼잇4" />
        </div>
        <div className="pr-img slide2">
          <img src={image9} alt="헬퍼잇5" />
        </div>
        <div className="pr-img slide2">
          <img src={image10} alt="헬퍼잇6" />
        </div>
        <div className="pr-img slide2">
          <img src={image11} alt="헬퍼잇7" />
        </div>
        <input type="button" value="〈" className="pr-btn btn_L2" />
        <input type="button" value="〉" className="pr-btn btn_R2" />
        <div className="indis2"></div>
      </div>
      <div className="pr-text-box">
        <div className="pr-text">
          <div className="pr-title">헬퍼잇 랜딩페이지</div>
          <div className="pr-desc">React, JAVASCRIPT</div>
          <p className="pr-txt">
            헬퍼잇 랜딩페이지 제작을 담당하였습니다.
            <br />
            웹을 리액트의 장점 중 하나인 컴포넌트를 활용하여 유지보수에
            용이하도록 개발하였습니다.
          </p>
        </div>
        <div className="link-box">
          <div className="link-btn">
            <a target="_blank" rel="noreferrer" href="https://helperit.co.kr">
              호스팅
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
