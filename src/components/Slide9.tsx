import Appshot from "./Appshot";
import image1 from "../assets/img/background/image1.png";
import image2 from "../assets/img/background/image2.png";
import image3 from "../assets/img/background/image3.png";
import image4 from "../assets/img/background/image4.png";

export default function Slide9() {
  return (
    <section className="slide" id="s9">
      <div className="chapter">
        <span>프로젝트 · React Native</span>
        <span className="num">09</span>
      </div>
      <div className="wrap project flip">
        <div className="about stagger">
          <h2 className="h1">헬퍼잇</h2>
          <p>
            (주)불타는고구마에서 생활 서비스 중개 앱인 헬퍼잇의 프론트엔드
            개발과 배포를 담당했습니다. React Native로 화면을 만들고 Django
            백엔드가 내려주는 API에 맞춰 연동했습니다.
          </p>
          <p>
            데이터베이스는 MySQL과 MariaDB를 사용했습니다. 서비스가 실제 사용자를
            받는 앱이었던 만큼, 화면을 만드는 것보다 오류 없이 배포해 두는 일이
            더 중요하다는 것을 배웠습니다.
          </p>
          <p>
            스토어 심사와 버전 관리까지 맡으며 앱의 수명 주기 전체를 경험한
            첫 실무 프로젝트입니다.
          </p>
          <ul className="tags">
            <li>React Native</li>
            <li>Django</li>
            <li>MySQL</li>
            <li>MariaDB</li>
          </ul>
        </div>
        <Appshot
          variant="app"
          shots={[
            { src: image1, alt: "" },
            { src: image2, alt: "" },
            { src: image3, alt: "" },
            { src: image4, alt: "" },
          ]}
        />
      </div>
    </section>
  );
}
