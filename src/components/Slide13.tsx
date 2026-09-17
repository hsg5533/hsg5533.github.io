import Appshot from "./Appshot";
import image52 from "../assets/img/background/image52.png";
import image53 from "../assets/img/background/image53.png";
import image54 from "../assets/img/background/image54.png";
import image55 from "../assets/img/background/image55.png";

export default function Slide13() {
  return (
    <section className="slide" id="s13">
      <div className="chapter">
        <span>프로젝트 · AI</span>
        <span className="num">13</span>
      </div>
      <div className="wrap project flip">
        <div className="about stagger">
          <h2 className="h1">
            주얼리
            <br />
            <span className="accent">컨시어지 챗봇</span>
          </h2>
          <p>
            (주)세미콜론즈에서 제작한 AI 상담 챗봇입니다. 무엇을 골라야 할지
            모르는 손님에게 매장 직원이 먼저 말을 거는 경험을 대화로 옮겼습니다.
          </p>
          <p>
            취향과 예산을 묻고 답을 좁혀가며 반지를 추천하고, 위치를 기준으로
            가까운 매장을 안내합니다. 다이아몬드는 기준이 낯선 만큼 4C 같은
            항목을 대화 안에서 풀어 설명하도록 했습니다.
          </p>
          <p>
            React로 대화 화면을 만들고 Node.js와 MySQL로 상담 내역과 상품
            데이터를 관리했습니다.
          </p>
          <ul className="tags">
            <li>React</li>
            <li>Node.js</li>
            <li>MySQL</li>
            <li>AI 챗봇</li>
          </ul>
        </div>
        <Appshot
          variant="app"
          shots={[
            { src: image52, alt: "" },
            { src: image53, alt: "" },
            { src: image54, alt: "" },
            { src: image55, alt: "" },
          ]}
        />
      </div>
    </section>
  );
}
