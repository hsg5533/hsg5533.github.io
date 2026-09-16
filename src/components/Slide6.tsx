export default function Slide6() {
  return (
    <section className="slide" id="s6">
      <div className="chapter">
        <span>교육</span>
        <span className="num">06</span>
      </div>
      <div className="wrap">
        <div
          className="up"
          style={{
            display: "grid",
            gap: "1rem",
            marginBottom: "clamp(1.5rem, 4vh, 2.5rem)",
            maxWidth: "68ch",
          }}
        >
          <h2 className="h1">
            부산 IT 교육센터
            <br />
            빅데이터 과정 수료
          </h2>
          <p className="body">
            개발자에 관한 공부를 하고자 국비지원 교육을 알아보았습니다.
            빅데이터에 대한 관심이 높아져 교육과정을 빅데이터 과정으로
            신청하였습니다. 대학교 수업과정에는 없었던 자바와 데이터베이스
            문법, Spring 및 JSP를 활용한 홈페이지 개발, Android Studio를 통한
            어플리케이션 개발 방법을 교육받았습니다.
          </p>
        </div>
        <div className="docs stagger">
          <div className="ph">수료증</div>
          <div className="ph">교육훈련과정 이수내역 1</div>
          <div className="ph">교육훈련과정 이수내역 2</div>
        </div>
      </div>
    </section>
  );
}
