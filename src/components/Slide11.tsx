import Appshot from "./Appshot";
import image12 from "../assets/img/background/image12.png";
import image13 from "../assets/img/background/image13.png";
import image14 from "../assets/img/background/image14.png";

export default function Slide11() {
  return (
    <section className="slide" id="s11">
      <div className="chapter">
        <span>프로젝트 · React</span>
        <span className="num">11</span>
      </div>
      <div className="wrap project flip">
        <div className="about stagger">
          <h2 className="h1">헬퍼잇 클린</h2>
          <p>
            헬퍼잇의 서비스 중 하나인 청소 신청 웹을 맡았습니다. 신청자가 주소와
            평수, 희망 일정을 입력하면 곧바로 견적과 예약으로 이어지도록 흐름을
            단순하게 잡았습니다.
          </p>
          <p>
            들어온 신청을 담당자가 놓치지 않도록 디스코드 웹훅을 붙였습니다.
            신청이 접수되면 내용이 정리된 메시지가 디스코드 채널로 바로
            전송됩니다.
          </p>
          <p>
            별도 관리자 페이지를 만드는 대신 이미 팀이 쓰고 있던 도구에
            연결한 선택이었고, 가장 적은 비용으로 실제 운영을 돌린 사례로
            남았습니다.
          </p>
          <ul className="tags">
            <li>React</li>
            <li>JavaScript</li>
            <li>Discord Webhook</li>
          </ul>
        </div>
        <Appshot
          variant="web"
          shots={[
            { src: image12, alt: "" },
            { src: image13, alt: "" },
            { src: image14, alt: "" },
          ]}
        />
      </div>
    </section>
  );
}
