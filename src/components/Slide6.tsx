import certificate1 from "../assets/img/background/certificate1.png";
import certificate2 from "../assets/img/background/certificate2.png";
import certificate3 from "../assets/img/background/certificate3.png";

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
            신청하였습니다. 대학교 수업과정에는 없었던 자바와 데이터베이스 문법,
            Spring 및 JSP를 활용한 홈페이지 개발, Android Studio를 통한
            어플리케이션 개발 방법을 교육받았습니다.
          </p>
        </div>
        <div className="docs stagger">
          <div className="ph">
            <img src={certificate1} />
          </div>
          <div className="ph">
            <img src={certificate2} />
          </div>
          <div className="ph">
            <img src={certificate3} />
          </div>
        </div>
      </div>
    </section>
  );
}
