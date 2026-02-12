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
          <img src={image1} alt="퍼블리싱1" />
        </div>
        <div className="pr-img slide1">
          <img src={image2} alt="퍼블리싱2" />
        </div>
        <div className="pr-img slide1">
          <img src={image3} alt="퍼블리싱3" />
        </div>
        <div className="pr-img slide1">
          <img src={image4} alt="퍼블리싱4" />
        </div>
        <input type="button" value="〈" className="pr-btn btn_L1" />
        <input type="button" value="〉" className="pr-btn btn_R1" />
        <div className="indis1"></div>
      </div>
      <div className="pr-text-box">
        <div className="pr-text">
          <div className="pr-title">헬퍼잇 어플리케이션</div>
          <div className="pr-desc">
            Data Base: mysql, mariadb
            <br />
            Back End: Django
            <br />
            Front End: React Native
          </div>
          <p className="pr-txt">
            (주)불타는고구마에서 헬퍼잇 어플리케이션 프로젝트의 프론트엔드 앱
            제작 및 배포 업무를 담당하였습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
