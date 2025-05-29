import React from "react";
import image20 from "../assets/img/background/image20.png";
import image21 from "../assets/img/background/image21.png";
import image22 from "../assets/img/background/image22.png";
import image23 from "../assets/img/background/image23.png";

export default function Sec3box5() {
  return (
    <div className="project">
      <div className="pr-box">
        <div className="pr-img slide5">
          <img src={image20} alt="" />
        </div>
        <div className="pr-img slide5">
          <img src={image21} alt="" />
        </div>
        <div className="pr-img slide5">
          <img src={image22} alt="" />
        </div>
        <div className="pr-img slide5">
          <img src={image23} alt="" />
        </div>
        <input type="button" value="〈" className="pr-btn btn_L5" />
        <input type="button" value="〉" className="pr-btn btn_R5" />
        <div className="indis5"></div>
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
              rel="noreferrer"
              href="https://github.com/hsg5533/market-admin.git"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
