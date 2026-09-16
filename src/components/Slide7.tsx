import license from "../assets/img/background/license.png";

export default function Slide7() {
  return (
    <section className="slide" id="s7">
      <div className="chapter">
        <span>자격증</span>
        <span className="num">07</span>
      </div>
      <div className="wrap license">
        <div className="ph up">
          <img src={license} />
        </div>
        <div
          className="stagger"
          style={{ display: "grid", gap: "clamp(0.8rem, 2vh, 1.3rem)" }}
        >
          <p className="mono accent">정보처리기사 · 2022.06.17</p>
          <h2 className="h1">
            독학의 한계를
            <br />
            교육으로 넘었습니다
          </h2>
          <p className="body">
            IT 회사 취업 준비와 개발자의 기초를 배우기 위하여 자격증을
            알아보았습니다. 대부분의 IT 회사에서 정보처리기사 자격증을
            우대사항으로 두는 것을 보고 준비하였습니다.
          </p>
          <p className="body">
            혼자서 공부할 때에는 많은 시행착오가 있었습니다. 교재를 사서 인터넷
            강의를 들으며 공부하고 싶었으나 독학의 한계에 부딪혀, 이를
            극복하고자 국비지원 교육을 알아보게 되었습니다.
          </p>
          <p className="body">
            그렇게 부산 IT 교육센터를 알게 되었고, 빅데이터 시각화를 통한
            빅데이터 UI 컨텐츠 개발 훈련과정에서 배운 내용을 바탕으로 3개월 동안
            공부하여 독학보다 수월하게 자격증을 취득할 수 있었습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
