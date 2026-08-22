import React from "react";
import kakao from "../assets/img/icon/kakao.png";
import github from "../assets/img/icon/githubicon.png";

export default function Sec4() {
  return (
    <div className="sec sec4" id="sec4">
      <div className="sec4-inner">
        <span className="sec4-kicker">GET IN TOUCH</span>
        <a className="sec4-email" href="mailto:hsg5533@naver.com">
          hsg5533@naver.com
        </a>
        <div className="sec4-secondary">
          <a
            className="sec4-chip"
            target="_blank"
            rel="noreferrer"
            href="https://open.kakao.com/me/hsg5533"
          >
            <img src={kakao} alt="" />
            <span>KAKAO</span>
          </a>
          <a
            className="sec4-chip"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/hsg5533"
          >
            <img src={github} alt="" />
            <span>GITHUB</span>
          </a>
        </div>
      </div>
    </div>
  );
}
