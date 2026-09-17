import Appshot from "./Appshot";
import image20 from "../assets/img/background/image20.png";
import image21 from "../assets/img/background/image21.png";
import image22 from "../assets/img/background/image22.png";

export default function Slide15() {
  return (
    <section className="slide" id="s15">
      <div className="chapter">
        <span>프로젝트 · React</span>
        <span className="num">15</span>
      </div>
      <div className="wrap project flip">
        <div className="about stagger">
          <h2 className="h1">
            부전마켓타운
            <br />
            <span className="accent">어드민</span>
          </h2>
          <p>
            테이블온에서 부전시장을 온라인 마켓으로 옮기는 프로젝트를
            진행했습니다. 그중 여러 지점과 점포를 한 화면에서 관리하는 관리자
            페이지를 맡았습니다.
          </p>
          <p>
            점포와 상품 등록을 승인하고, 공지사항을 내려보내고, 점주 문의에
            답하는 흐름을 담았습니다. 고객 페이지·점주 페이지와 Node.js 백엔드와
            데이터베이스를 공유하도록 설계했습니다.
          </p>
          <p>
            고객, 점주, 운영자 세 갈래의 화면이 하나의 데이터를 바라본다는 것을
            처음 의식하며 만든 프로젝트입니다.
          </p>
          <ul className="tags">
            <li>React</li>
            <li>Node.js</li>
            <li>Express</li>
            <li>MySQL</li>
          </ul>
        </div>
        <Appshot
          variant="web"
          shots={[
            { src: image20, alt: "" },
            { src: image21, alt: "" },
            { src: image22, alt: "" },
          ]}
        />
      </div>
    </section>
  );
}
