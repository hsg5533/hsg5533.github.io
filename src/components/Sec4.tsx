import React from "react";
import kakao from "../assets/img/icon/kakao.png";
import email from "../assets/img/icon/email.png";
import github from "../assets/img/icon/githubicon.png";

export default function Sec4() {
  return (
    <div className="sec sec4" id="sec4">
      <div className="title_box2">
        <h2>CONTACT</h2>
      </div>
      <div className="sec4box">
        <div className="item_box">
          <div className="item">
            <a href="https://open.kakao.com/o/s8XLlGCf">
              <img src={kakao} alt="" />
              <div className="item_desc">KAKAO</div>
            </a>
          </div>
          <div className="item">
            <a href="mailto:4576874@naver.com">
              <img src={email} alt="" />
              <div className="item_desc">EMAIL</div>
            </a>
          </div>
          <div className="item">
            <a href="https://github.com/yeyiwon">
              <img src={github} alt="" />
              <div className="item_desc">GITHUB PROFILE</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
