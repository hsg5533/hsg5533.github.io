import React from "react";

export default function Sec1() {
  return (
    <div className="sec sec1" id="sec1">
      <div className="sec1_box">
        <div className="sec1-title">
          <h2>ABOUT ME</h2>
        </div>
        <div
          className="sec1_content"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="sec1_facts">
            <div className="fact-row">
              <span className="fact-label">NAME</span>
              <span className="fact-value">정호상</span>
            </div>
            <div className="fact-row">
              <span className="fact-label">BIRTH</span>
              <span className="fact-value">1996.04.25</span>
            </div>
            <div className="fact-row">
              <span className="fact-label">EDUCATION</span>
              <span className="fact-value">4년제 정보통신공학사학위</span>
            </div>
            <div className="fact-row">
              <span className="fact-label">CERTIFICATE</span>
              <span className="fact-value">2022.06.17 정보처리기사</span>
            </div>
          </div>
          <div className="sec1_frame">
            <div className="sec1_frame-img" />
          </div>
        </div>
      </div>
    </div>
  );
}
