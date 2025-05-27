import React from "react";
import image24 from "../assets/img/background/image24.png";
import image25 from "../assets/img/background/image25.png";
import image26 from "../assets/img/background/image26.png";
import image27 from "../assets/img/background/image27.png";

export default function Sec3box6() {
  return (
    <div className="project">
      <div className="pr-box">
        <div className="pr-img slide6">
          <img src={image24} alt="" />
        </div>
        <div className="pr-img slide6">
          <img src={image25} alt="" />
        </div>
        <div className="pr-img slide6">
          <img src={image26} alt="" />
        </div>
        <div className="pr-img slide6">
          <img src={image27} alt="" />
        </div>
        <input type="button" value="〈" className="pr-btn btn_L6" />
        <input type="button" value="〉" className="pr-btn btn_R6" />
        <div className="indis6"></div>
      </div>
      <div className="pr-text-box">
        <div className="pr-text">
          <div className="pr-title">부전마켓타운 (어드민)</div>
          <div className="pr-desc">
            Data Base: mysql, mariadb
            <br />
            Back End: node.js, Express
            <br />
            Front End: React
          </div>
          <p className="pr-txt">
            테이블온 회사에서 부전마켓을 온라인 마켓으로 만드는 프로젝트를
            진행하였습니다.
            <br />
            해당 프로젝트는 부전마켓의 여러가지 지점을 온라인으로 관리할 수 있는
            페이지입니다.
          </p>
        </div>
        <div className="link-box">
          <div className="link-btn">
            <a
              target="_blank"
              href="https://github.com/hsg5533/market-owner.git"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
