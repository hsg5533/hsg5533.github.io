import React from "react";

const items = [
  {
    range: "2015.03 ~ 2018.08",
    desc: <>동명대학교 정보통신공학과 졸업</>,
  },
  {
    range: "2021.12.28. ~ 2022.07.30",
    desc: (
      <>
        빅데이터 시각화를 통한 빅데이터 UI콘텐츠 개발
        <br />
        (재)부산인재개발원 부산IT교육센터
      </>
    ),
  },
  {
    range: "2022.09.13. ~ 2023.02.24",
    desc: (
      <>
        RnD 및 부전마켓타운 웹 서비스 개발
        <br />
        주식회사 테이블온
      </>
    ),
  },
  {
    range: "2023.05.01 ~ 2025.01.01",
    desc: (
      <>
        React Native 하이브리드 헬퍼잇 앱 개발 및 배포
        <br />
        주식회사 불타는고구마
      </>
    ),
  },
  {
    range: "2025.02.06 ~ 2025.05.15",
    desc: (
      <>
        인터오션 헬스케어사업부 홈페이지 관리
        <br />
        주식회사 인터오션
      </>
    ),
  },
];

export default function History() {
  return (
    <div className="sec timeline" id="history">
      <div className="history-header" data-aos="fade-up" data-aos-duration="1000">
        <h1>History</h1>
        <p>개발의 꿈을 이루기 위한 끊임없는 연구</p>
      </div>
      <div className="history-list">
        {items.map((item, i) => (
          <div
            className="history-row"
            key={item.range}
            data-aos="fade-up"
            data-aos-duration="700"
            data-aos-delay={i * 80}
          >
            <span className="history-range">{item.range}</span>
            <span className="history-desc">{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
