import Appshot from "./Appshot";
import image49 from "../assets/img/background/image49.jpg";
import image50 from "../assets/img/background/image50.jpg";
import image51 from "../assets/img/background/image51.jpg";

export default function Slide12() {
  return (
    <section className="slide" id="s12">
      <div className="chapter">
        <span>프로젝트 · React Native</span>
        <span className="num">12</span>
      </div>
      <div className="wrap project">
        <div className="about stagger">
          <h2 className="h1">영덕 알리미</h2>
          <p>
            (주)세미콜론즈에서 제작한 지역 정보 어플리케이션입니다. 영덕군청이
            제공하는 공지사항과 행사 정보, 관광 정보, 재난문자를 한곳에서 볼 수
            있습니다.
          </p>
          <p>
            React Native로 앱을 만들고, php 기반 그누보드와 MySQL로 데이터를
            관리했습니다. 군청 담당자가 익숙한 게시판 형태로 글을 올리면 앱에
            그대로 반영되도록 구성했습니다.
          </p>
          <p>
            주 사용자가 지역 주민인 만큼 글자 크기와 터치 영역을 넉넉하게 잡고,
            재난문자처럼 급한 정보는 먼저 보이도록 배치했습니다.
          </p>
          <ul className="tags">
            <li>React Native</li>
            <li>PHP</li>
            <li>MySQL</li>
            <li>공공 정보</li>
          </ul>
        </div>
        <Appshot
          variant="app"
          shots={[
            { src: image49, alt: "" },
            { src: image50, alt: "" },
            { src: image51, alt: "" },
          ]}
        />
      </div>
    </section>
  );
}
