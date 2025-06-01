import React from "react";
import image28 from "../assets/img/background/image28.png";
import image29 from "../assets/img/background/image29.png";
import image30 from "../assets/img/background/image30.png";
import image31 from "../assets/img/background/image31.png";

export default function Sec3box7() {
  return (
    <div className="project">
      <div className="pr-box">
        <div className="pr-img slide7">
          <img src={image28} alt="" />
        </div>
        <div className="pr-img slide7">
          <img src={image29} alt="" />
        </div>
        <div className="pr-img slide7">
          <img src={image30} alt="" />
        </div>
        <div className="pr-img slide7">
          <img src={image31} alt="" />
        </div>
        <input type="button" value="〈" className="pr-btn btn_L7" />
        <input type="button" value="〉" className="pr-btn btn_R7" />
        <div className="indis7"></div>
      </div>
      <div className="pr-text-box">
        <div className="pr-text">
          <div className="pr-title">부전마켓타운 (고객)</div>
          <div className="pr-desc">
            Data Base: mysql, mariadb
            <br />
            Back End: node.js, Express
            <br />
            Front End: React
          </div>
          <p className="pr-txt">
            주식회사 테이블온 회사에서 부전마켓을 온라인 마켓으로 만드는
            프로젝트를 진행하였습니다.
            <br />
            해당 프로젝트는 부전마켓의 고객이 여러가지 물건 구매 및 배송조회가
            가능한 페이지입니다.
          </p>
        </div>
        <div className="link-box">
          <div className="link-btn">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/hsg5533/market-client.git"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
