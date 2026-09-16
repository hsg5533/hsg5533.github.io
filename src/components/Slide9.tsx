import Appshot from "./Appshot";

export default function Slide9() {
  return (
    <section className="slide" id="s9">
      <div className="chapter">
        <span>프로젝트 · React</span>
        <span className="num">09</span>
      </div>
      <div className="wrap project flip">
        <div className="about stagger">
          <h2 className="h1">
            부전마켓타운
            <br />
            <span className="accent">점주 페이지</span>
          </h2>
          <p>
            고객 페이지에 보여질 상품과 상점 설명, 로고를 등록하는 점주용
            웹입니다. Node.js로 구성된 고객 페이지와 백엔드 서버 및 DB를
            공유합니다.
          </p>
          <p>
            점주가 쉽게 관리할 수 있도록 모바일 환경에 맞게 디자인했습니다.
            고객 페이지 방문자 수를 확인할 수 있고, 상품 이미지와 가격,
            대표상품과 할인상품을 설정할 수 있습니다.
          </p>
          <p>
            이미지 업로드로 관리자에게 문의를 남기고 답변을 받을 수 있으며,
            관리자가 등록한 공지사항도 확인할 수 있습니다.
          </p>
          <ul className="tags">
            <li>React</li>
            <li>Node.js</li>
            <li>MySQL</li>
            <li>File Upload</li>
          </ul>
        </div>

        <Appshot variant="app" shots={[]} />
      </div>
    </section>
  );
}
