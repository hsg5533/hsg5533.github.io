import Appshot from "./Appshot";
import image16 from "../assets/img/background/image16.png";
import image17 from "../assets/img/background/image17.png";
import image18 from "../assets/img/background/image18.png";

export default function Slide14() {
  return (
    <section className="slide" id="s14">
      <div className="chapter">
        <span>프로젝트 · 퍼블리싱</span>
        <span className="num">14</span>
      </div>
      <div className="wrap project">
        <div className="about stagger">
          <h2 className="h1">
            인터오션
            <br />
            <span className="accent">헬스케어사업부</span>
          </h2>
          <p>
            인터오션 헬스케어사업부 랜딩페이지의 유지보수를 담당했습니다. 새로
            만드는 일이 아니라 이미 돌아가는 페이지를 이어받는 일이었습니다.
          </p>
          <p>
            HTML, CSS, JavaScript로 작성된 기존 코드를 먼저 읽고, 사업부에서
            요청한 내용과 이미지 수정을 반영했습니다. 사내에서 쓰고 있던 카페24
            웹호스팅으로 배포했습니다.
          </p>
          <p>
            남이 쓴 코드를 함부로 바꾸지 않고 구조를 지키면서 고치는 법을 익힌
            작업입니다.
          </p>
          <ul className="tags">
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>카페24</li>
          </ul>
        </div>
        <Appshot
          variant="web"
          shots={[
            { src: image16, alt: "" },
            { src: image17, alt: "" },
            { src: image18, alt: "" },
          ]}
        />
      </div>
    </section>
  );
}
