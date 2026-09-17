import Appshot from "./Appshot";
import image5 from "../assets/img/background/image5.png";
import image6 from "../assets/img/background/image6.png";
import image7 from "../assets/img/background/image7.png";

export default function Slide10() {
  return (
    <section className="slide" id="s10">
      <div className="chapter">
        <span>프로젝트 · React</span>
        <span className="num">10</span>
      </div>
      <div className="wrap project">
        <div className="about stagger">
          <h2 className="h1">
            헬퍼잇
            <br />
            <span className="accent">랜딩페이지</span>
          </h2>
          <p>
            헬퍼잇 서비스를 소개하는 랜딩페이지 제작을 담당했습니다. 앱을 알리는
            첫 화면인 만큼, 서비스가 무엇을 해주는지 스크롤만으로 읽히도록
            섹션을 나눴습니다.
          </p>
          <p>
            React의 컴포넌트 구조를 살려 반복되는 섹션과 카드를 재사용 가능한
            단위로 쪼갰습니다. 문구나 이미지가 바뀌어도 데이터만 고치면 되도록
            만들어 유지보수 비용을 줄였습니다.
          </p>
          <ul className="tags">
            <li>React</li>
            <li>JavaScript</li>
            <li>컴포넌트 설계</li>
          </ul>
        </div>
        <Appshot
          variant="web"
          shots={[
            { src: image5, alt: "" },
            { src: image6, alt: "" },
            { src: image7, alt: "" },
          ]}
        />
      </div>
    </section>
  );
}
