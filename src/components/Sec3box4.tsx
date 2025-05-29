import React from "react";
import image16 from "../assets/img/background/image16.png";
import image17 from "../assets/img/background/image17.png";
import image18 from "../assets/img/background/image18.png";
import image19 from "../assets/img/background/image19.png";

export default function Sec3box4() {
  return (
    <div className="project">
      <div className="pr-box">
        <div className="pr-img slide4">
          <img src={image16} alt="인터오션1" />
        </div>
        <div className="pr-img slide4">
          <img src={image17} alt="인터오션2" />
        </div>
        <div className="pr-img slide4">
          <img src={image18} alt="인터오션3" />
        </div>
        <div className="pr-img slide4">
          <img src={image19} alt="인터오션4" />
        </div>
        <input type="button" value="〈" className="pr-btn btn_L4" />
        <input type="button" value="〉" className="pr-btn btn_R4" />
        <div className="indis4"></div>
      </div>
      <div className="pr-text-box">
        <div className="pr-text">
          <div className="pr-title">인터오션 헬스케어사업부</div>
          <div className="pr-desc">HTML, CSS, JAVASCRIPT</div>
          <p className="pr-txt">
            인터오션의 헬스케어사업부 렌딩페이지 유지보수를 담당하였습니다.
            <br />
            사내에서 사용중인 카페24 웹호스팅을 사용하여 호스팅하였습니디.
          </p>
        </div>
        <div className="link-box">
          <div className="link-btn">
            <a target="_blank" rel="noreferrer" href="https://iomedical.co.kr/">
              호스팅
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
