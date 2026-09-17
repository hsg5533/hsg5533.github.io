import Appshot from "./Appshot";
import image33 from "../assets/img/background/image33.png";
import image36 from "../assets/img/background/image36.png";
import image37 from "../assets/img/background/image37.png";

export default function Slide18() {
  return (
    <section className="slide" id="s18">
      <div className="chapter">
        <span>프로젝트 · 빅데이터</span>
        <span className="num">18</span>
      </div>
      <div className="wrap project">
        <div className="about stagger">
          <h2 className="h1">대기어때</h2>
          <p>
            공공데이터 포털과 에어코리아의 데이터를 BeautifulSoup, selenium으로
            동적 크롤링해 2010년부터 2020년까지의 전국 미세먼지 데이터를
            수집했습니다.
          </p>
          <p>
            pandas와 tensorflow로 데이터를 정제한 뒤, 전국 데이터는 연평균 기준
            블럭 맵 이미지로 나타내고 지역 데이터는 LSTM으로 분석 및
            예측했습니다.
          </p>
          <p>
            예측 결과는 MySQL에 저장하고 MyBatis로 불러와 메인 화면에 Chart.js
            그래프로 보여줍니다. 홈페이지는 Spring Boot로 만들었고, 로그인과
            회원가입, 페이징과 검색이 되는 문의게시판을 구현했습니다.
          </p>
          <ul className="tags">
            <li>Spring Boot</li>
            <li>Python</li>
            <li>TensorFlow</li>
            <li>Chart.js</li>
          </ul>
        </div>
        <Appshot
          variant="web"
          shots={[
            { src: image33, alt: "" },
            { src: image36, alt: "" },
            { src: image37, alt: "" },
          ]}
        />
      </div>
    </section>
  );
}
