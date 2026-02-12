import React from "react";
import image12 from "../assets/img/background/image12.png";
import image13 from "../assets/img/background/image13.png";
import image14 from "../assets/img/background/image14.png";
import image15 from "../assets/img/background/image15.png";

export default function Sec3box3() {
  return (
    <div className="project">
      <div className="pr-box">
        <div className="pr-img slide3">
          <img src={image12} alt="헬퍼잇 클린1" />
        </div>
        <div className="pr-img slide3">
          <img src={image13} alt="헬퍼잇 클린2" />
        </div>
        <div className="pr-img slide3">
          <img src={image14} alt="헬퍼잇 클린3" />
        </div>
        <div className="pr-img slide3">
          <img src={image15} alt="헬퍼잇 클린4" />
        </div>
        <input type="button" value="〈" className="pr-btn btn_L3" />
        <input type="button" value="〉" className="pr-btn btn_R3" />
        <div className="indis3"></div>
      </div>
      <div className="pr-text-box">
        <div className="pr-text">
          <div className="pr-title">헬퍼잇 클린</div>
          <div className="pr-desc">React, JAVASCRIPT</div>
          <p className="pr-txt">
            (주)불타는고구마에서 헬퍼잇의 서비스 중 하나인 청소 웹 제작을
            담당하였습니다.
            <br />
            디스코드의 웹훅을 사용하여 웹에서 청소 신청을 하면 디스코드로
            메세지가 전송하는 기능을 구현하였습니다.
          </p>
        </div>
        <div className="link-box">
          <div className="link-btn">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://clean.helperit.co.kr/"
            >
              호스팅
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
