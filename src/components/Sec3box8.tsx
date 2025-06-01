import React from "react";
import image32 from "../assets/img/background/image32.png";
import image33 from "../assets/img/background/image33.png";
import image34 from "../assets/img/background/image34.png";
import image35 from "../assets/img/background/image35.png";
import image36 from "../assets/img/background/image36.png";
import image37 from "../assets/img/background/image37.png";

export default function Sec3box8() {
  return (
    <div className="project">
      <div className="pr-box">
        <div className="pr-img slide8">
          <img src={image32} alt="" />
        </div>
        <div className="pr-img slide8">
          <img src={image33} alt="" />
        </div>
        <div className="pr-img slide8">
          <img src={image34} alt="" />
        </div>
        <div className="pr-img slide8">
          <img src={image35} alt="" />
        </div>
        <div className="pr-img slide8">
          <img src={image36} alt="" />
        </div>
        <div className="pr-img slide8">
          <img src={image37} alt="" />
        </div>
        <input type="button" value="〈" className="pr-btn btn_L8" />
        <input type="button" value="〉" className="pr-btn btn_R8" />
        <div className="indis8"></div>
      </div>
      <div className="pr-text-box">
        <div className="pr-text">
          <div className="pr-title">대기어때</div>
          <div className="pr-desc">
            Data Base: mysql, mariadb
            <br />
            Back End: Spring boot
            <br />
            Front End: jsp
          </div>
          <p className="pr-txt">
            국비지원 교육과정에서 팀프로젝트 중 부산광역시의 미세먼지를 안내하는
            프로젝트를 진행하였습니다.
            <br />
            해당 프로젝트는 부산광역시의 미세먼지 데이터를 수집해서 데이터
            분석을 진행한 후 웹으로 시각화하는 프로젝트입니다.
          </p>
        </div>
        <div className="link-box">
          <div className="link-btn">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://github.com/hsg5533/howair.git"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
