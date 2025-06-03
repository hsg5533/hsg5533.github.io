import React from "react";
import kakao from "../assets/img/icon/kakao.png";
import email from "../assets/img/icon/email.png";
import github from "../assets/img/icon/githubicon.png";

export default function Sec4() {
  return (
    <div className="sec sec4" id="sec4">
      <div className="sec4-title">
        <h2>CONTACT</h2>
      </div>
      <div className="sec4-box">
        <div className="contact-item">
          <a href="https://open.kakao.com/me/hsg5533">
            <img src={kakao} alt="kakao" />
            <div className="contact-item-desc">KAKAO</div>
          </a>
        </div>
        <div className="contact-item">
          <a href="mailto:hsg55334@naver.com">
            <img src={email} alt="email" />
            <div className="contact-item-desc">EMAIL</div>
          </a>
        </div>
        <div className="contact-item">
          <a href="https://github.com/hsg5533">
            <img src={github} alt="guthub" />
            <div className="contact-item-desc">GITHUB PROFILE</div>
          </a>
        </div>
      </div>
    </div>
  );
}
