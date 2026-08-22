import React from "react";

export default function Values() {
  return (
    <div className="sec values" id="values">
      <div className="values-inner">
        <div className="values-header">
          <span className="values-kicker">HOW I WORK</span>
          <h2>VALUES</h2>
        </div>
        <div
          className="values-grid"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="values-item item-photo">
            <span className="values-index">01</span>
            <p>
              조용하고 꼼꼼한 성격 꼼꼼하고
              <br />
              깔끔하게 살아가는 것이 목표
            </p>
          </div>
          <div className="values-item item-wide">
            <span className="values-index">02</span>
            <p>
              어마어마한 친화력 특유의
              <br />
              친화력과 다정한 성격
            </p>
          </div>
          <div className="values-item item-accent">
            <span className="values-index">03</span>
            <p>
              섬세한 관찰력 특유의
              <br />
              눈썰미로 변화를 관찰하는 능력
            </p>
          </div>
          <div className="values-item item-soft">
            <span className="values-index">04</span>
            <p>
              이타 주의적 생각 항상
              <br />
              남을 먼저 생각하는 사람
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
