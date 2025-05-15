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
      <div className="pr-top">
        <div className="pr-box">
          <div className="pr-img slide2">
            <img src={image5} alt="" />
          </div>
          <div className="pr-img slide2">
            <img src={image6} alt="" />
          </div>
          <div className="pr-img slide2">
            <img src={image7} alt="" />
          </div>
          <div className="pr-img slide2">
            <img src={image8} alt="" />
          </div>
          <div className="pr-img slide2">
            <img src={image9} alt="" />
          </div>
          <div className="pr-img slide2">
            <img src={image10} alt="" />
          </div>
          <div className="pr-img slide2">
            <img src={image11} alt="" />
          </div>
          <input type="button" value="〈" className="pr-btn btn_L2" />
          <input type="button" value="〉" className="pr-btn btn_R2" />
          <div className="indis2"></div>
        </div>
      </div>
      <div className="pr-text-box">
        <div className="pr-text">
          <div className="pr-title">헬퍼잇 랜딩페이지</div>
          <div className="pr-desc">React, JAVASCRIPT</div>
          <p className="pr-txt">
            팀 프로젝트로 전국 캠핑장을 조회할 수 있고 캠핑 용품도 구매할 수
            있는 사이트를 제작했습니다.
          </p>
        </div>
        <div className="link-box">
          <div className="link-btn">
            <a target="_blank" href="https://helperit.co.kr">
              호스팅
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
