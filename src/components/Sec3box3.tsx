import React from "react";
import image12 from "../assets/img/background/image12.png";
import image13 from "../assets/img/background/image13.png";
import image14 from "../assets/img/background/image14.png";
import image15 from "../assets/img/background/image15.png";

export default function Sec3box3() {
  return (
    <div className="project">
      <div className="pr-top">
        <div className="pr-box">
          <div className="pr-img slide3">
            <img src={image12} alt="" />
          </div>
          <div className="pr-img slide3">
            <img src={image13} alt="" />
          </div>
          <div className="pr-img slide3">
            <img src={image14} alt="" />
          </div>
          <div className="pr-img slide3">
            <img src={image15} alt="" />
          </div>
          <input type="button" value="〈" className="pr-btn btn_L3" />
          <input type="button" value="〉" className="pr-btn btn_R3" />
          <div className="indis3"></div>
        </div>
      </div>
      <div className="pr-text-box">
        <div className="pr-text">
          <div className="pr-title">헬퍼잇 클린</div>
          <div className="pr-desc">React, JAVASCRIPT</div>
          <p className="pr-txt">
            팀 프로젝트로 전국 캠핑장을 조회할 수 있고 캠핑 용품도 구매할 수
            있는 사이트를 제작했습니다.
          </p>
        </div>
        <div className="link-box">
          <div className="link-btn">
            <a target="_blank" href="https://clean.helperit.co.kr/">
              호스팅
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
