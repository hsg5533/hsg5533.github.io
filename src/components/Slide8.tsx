import image28 from "../assets/img/background/image28.png";
import Appshot from "./Appshot";

export default function Slide8() {
  return (
    <section className="slide" id="s8">
      <div className="chapter">
        <span>프로젝트 · React</span>
        <span className="num">08</span>
      </div>
      <div className="wrap project">
        <div className="about stagger">
          <h2 className="h1">부전마켓타운</h2>
          <p>
            시장을 전자 쇼핑몰처럼 표현하고자 개인적으로 개발했습니다. 고객이
            쉽게 접근할 수 있도록 모바일에 맞게 디자인했으며, Node.js로 백엔드
            서버를 구성했습니다.
          </p>
          <p>
            카카오 API로 시장과 상점의 위치를 지도에 표시하고, 문자와
            카카오톡으로 링크를 공유하는 기능을 넣었습니다. 장바구니와, 토스
            API 및 여러 PG사와 연동 가능한 결제 기능도 구현했습니다.
          </p>
          <p>
            상점과 상품 등록은 점주용 웹에서 따로 처리하도록 구성했습니다.
          </p>
          <ul className="tags">
            <li>React</li>
            <li>Node.js</li>
            <li>Kakao Map</li>
            <li>Toss Payments</li>
          </ul>
        </div>

        <Appshot variant="app" shots={[{ src: image28, alt: "" }]} />
      </div>
    </section>
  );
}
