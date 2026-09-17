import Appshot from "./Appshot";
import image42 from "../assets/img/background/image42.png";
import image43 from "../assets/img/background/image43.png";
import image44 from "../assets/img/background/image44.png";
import image45 from "../assets/img/background/image45.png";

export default function Slide8() {
  return (
    <section className="slide" id="s8">
      <div className="chapter">
        <span>프로젝트 · React Native</span>
        <span className="num">08</span>
      </div>
      <div className="wrap project">
        <div className="about stagger">
          <h2 className="h1">빙그리</h2>
          <p>
            React Native로 만든 크로스 플랫폼 어플리케이션입니다. 하나의
            코드베이스로 iOS와 안드로이드를 함께 대응하도록 화면과 네비게이션을
            구성했습니다.
          </p>
          <p>
            백엔드는 php 기반 그누보드를 활용하고 MySQL로 데이터베이스를
            구축했습니다. 이미 운영 중인 그누보드 구조를 그대로 살리면서 앱이
            필요한 데이터만 따로 주고받도록 연동했습니다.
          </p>
          <p>
            앱 제작부터 스토어 배포까지 직접 맡으면서, 만드는 일과 내보내는 일이
            다르다는 것을 배운 프로젝트입니다.
          </p>
          <ul className="tags">
            <li>React Native</li>
            <li>PHP</li>
            <li>MySQL</li>
            <li>그누보드</li>
          </ul>
        </div>
        <Appshot
          variant="app"
          shots={[
            { src: image42, alt: "" },
            { src: image43, alt: "" },
            { src: image44, alt: "" },
            { src: image45, alt: "" },
          ]}
        />
      </div>
    </section>
  );
}
