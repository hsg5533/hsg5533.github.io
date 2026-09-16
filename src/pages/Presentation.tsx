import React, { useEffect } from "react";
import "../assets/css/presentation.css";
import image28 from "../assets/img/background/image28.png";
import image29 from "../assets/img/background/image29.png";
import image30 from "../assets/img/background/image30.png";
import image31 from "../assets/img/background/image31.png";

import Appshot from "../components/Appshot";

export default function Presentation() {
  useEffect(() => {
    const slides = [...document.querySelectorAll(".slide")];
    const bars = [...document.querySelectorAll(".progress a")];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("in");
          const i = slides.indexOf(e.target);
          bars.forEach((b, j) => b.classList.toggle("on", i === j));
        });
      },
      { threshold: 0.45 },
    );
    slides.forEach((s) => io.observe(s));
  }, []);
  return (
    <main>
      <nav className="progress" aria-label="슬라이드 이동">
        <a href="#s1" className="on" aria-label="1장 표지"></a>
        <a href="#s2" aria-label="2장 키워드"></a>
        <a href="#s3" aria-label="3장 히스토리"></a>
        <a href="#s4" aria-label="4장 좋아하는 것"></a>
        <a href="#s5" aria-label="5장 자기소개"></a>
        <a href="#s6" aria-label="6장 교육"></a>
        <a href="#s7" aria-label="7장 자격증"></a>
        <a href="#s8" aria-label="8장 부전마켓타운"></a>
        <a href="#s9" aria-label="9장 부전마켓타운 점주"></a>
        <a href="#s10" aria-label="10장 대기어때"></a>
        <a href="#s11" aria-label="11장 Coding.com"></a>
        <a href="#s12" aria-label="12장 비전"></a>
        <a href="#s13" aria-label="13장 마무리"></a>
      </nav>
      <section className="slide cover" id="s1">
        <div className="chapter">
          <span>
            <b>정호상</b> 포트폴리오
          </span>
          <span className="num">2022</span>
        </div>
        <div className="wrap">
          <h1 className="mark up">
            열린<em>코더</em>
          </h1>
          <div className="meta stagger">
            <div>
              <span>이름</span>
              <strong>정호상</strong>
            </div>
            <div>
              <span>분야</span>
              <strong>웹 개발, 백엔드</strong>
            </div>
            <div>
              <span>좌우명</span>
              <strong>
                모르는 것은
                <br />
                부끄러운 것이 아니다
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section className="slide" id="s2">
        <div className="chapter">
          <span>키워드</span>
          <span className="num">02</span>
        </div>
        <div className="wrap keys">
          <h2 className="h1 up">
            저를 설명하는
            <br />네 가지
          </h2>
          <ol className="stagger">
            <li>
              <span className="num">01</span>
              <div>
                <h3 className="h3">조용하고 꼼꼼한 성격</h3>
                <p className="body">꼼꼼하고 깔끔하게 살아가는 것이 목표</p>
              </div>
            </li>
            <li>
              <span className="num">02</span>
              <div>
                <h3 className="h3">어마어마한 친화력</h3>
                <p className="body">특유의 친화력과 다정한 성격</p>
              </div>
            </li>
            <li>
              <span className="num">03</span>
              <div>
                <h3 className="h3">섬세한 관찰력</h3>
                <p className="body">특유의 눈썰미로 변화를 관찰하는 능력</p>
              </div>
            </li>
            <li>
              <span className="num">04</span>
              <div>
                <h3 className="h3">이타 주의적 생각</h3>
                <p className="body">항상 남을 먼저 생각하는 사람</p>
              </div>
            </li>
          </ol>
        </div>
      </section>
      <section className="slide" id="s3">
        <div className="chapter">
          <span>히스토리</span>
          <span className="num">03</span>
        </div>
        <div className="wrap">
          <h2
            className="h1 up"
            style={{ marginBottom: "clamp(1.5rem, 4vh, 3rem)" }}
          >
            개발자가 되기까지
          </h2>
          <div className="stagger">
            <div className="tl-row">
              <span className="year">1995</span>
              <h3 className="h3">위대한 여정의 시작</h3>
            </div>
            <div className="tl-row">
              <span className="year">2010</span>
              <h3 className="h3">컴퓨터에 관심이 생김</h3>
            </div>
            <div className="tl-row">
              <span className="year">2015</span>
              <h3 className="h3">동명대학교 입학</h3>
            </div>
            <div className="tl-row">
              <span className="year">2019</span>
              <h3 className="h3">실시간 객체인식 프로그램 개발</h3>
            </div>
            <div className="tl-row now">
              <span className="year">2022</span>
              <h3 className="h3">가장 찬란한 지금</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="slide" id="s4">
        <div className="chapter">
          <span>좋아하는 것</span>
          <span className="num">04</span>
        </div>
        <div className="wrap">
          <h2
            className="h1 up"
            style={{ marginBottom: "clamp(1.5rem, 4vh, 3rem)" }}
          >
            일하지 않을 때는
          </h2>
          <div className="likes stagger">
            <div className="like">
              <h3 className="h2">차 (TEA)</h3>
              <p className="body">느긋한 티타임</p>
            </div>
            <div className="like">
              <h3 className="h2">음악</h3>
              <p className="body">즐거운 시간</p>
            </div>
            <div className="like">
              <h3 className="h2">카메라</h3>
              <p className="body">사진 찍는 게 취미</p>
            </div>
          </div>
        </div>
      </section>

      <section className="slide" id="s5">
        <div className="chapter">
          <span>자기소개</span>
          <span className="num">05</span>
        </div>
        <div className="wrap intro">
          <div className="ph portrait up">증명사진</div>
          <div className="txt stagger">
            <h2 className="h1">
              배우는 자세로
              <br />
              일하는 사람
            </h2>
            <p className="lead">
              저는 어릴 적 컴퓨터에 관한 관심이 많았습니다. 아버지를 따라서
              컴퓨터 공부를 하였으며 기본적인 컴퓨터 조립 및 수리를 공부한 적이
              있습니다. 개발자로 꿈을 키운 것은 대학교를 진학한 후부터였습니다.
              컴퓨터로 프로그램과 홈페이지를 만드는 일에 흥미를 느꼈고, 더
              배우고자 동명대학교 정보통신소프트웨어공학과를 졸업한 뒤 부산 IT
              교육센터에서 직업훈련 과정을 교육받으며 정보처리기사 자격증을
              취득하고 교육과정을 수료하였습니다.
            </p>
            <p className="body">
              저의 좌우명은 '모르는 것은 부끄러운 것이 아니다.' 입니다. 일을
              잘하지 못하거나 잘 모르더라도 배우는 자세가 있다는 것이 중요하다고
              생각합니다. 항상 사람을 먼저 생각하며, 일에 자부심을 느끼며 일하는
              것을 좋아합니다. 처음이라고 주저하지 않고 제대로 배워서 점점
              성장하는 직원이 되도록 노력하겠습니다.
            </p>
            <ul className="skills">
              <li>Spring</li>
              <li>Node.js</li>
              <li>React</li>
              <li>React Native</li>
              <li>Python</li>
              <li>MySQL</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="slide" id="s6">
        <div className="chapter">
          <span>교육</span>
          <span className="num">06</span>
        </div>
        <div className="wrap">
          <div
            className="up"
            style={{
              display: "grid",
              gap: "1rem",
              marginBottom: "clamp(1.5rem, 4vh, 2.5rem)",
              maxWidth: "68ch",
            }}
          >
            <h2 className="h1">
              부산 IT 교육센터
              <br />
              빅데이터 과정 수료
            </h2>
            <p className="body">
              개발자에 관한 공부를 하고자 국비지원 교육을 알아보았습니다.
              빅데이터에 대한 관심이 높아져 교육과정을 빅데이터 과정으로
              신청하였습니다. 대학교 수업과정에는 없었던 자바와 데이터베이스
              문법, Spring 및 JSP를 활용한 홈페이지 개발, Android Studio를 통한
              어플리케이션 개발 방법을 교육받았습니다.
            </p>
          </div>
          <div className="docs stagger">
            <div className="ph">수료증</div>
            <div className="ph">교육훈련과정 이수내역 1</div>
            <div className="ph">교육훈련과정 이수내역 2</div>
          </div>
        </div>
      </section>

      <section className="slide" id="s7">
        <div className="chapter">
          <span>자격증</span>
          <span className="num">07</span>
        </div>
        <div className="wrap license">
          <div className="ph up">국가기술자격증</div>
          <div
            className="stagger"
            style={{ display: "grid", gap: "clamp(0.8rem, 2vh, 1.3rem)" }}
          >
            <p className="mono accent">정보처리기사 · 2022.06.17</p>
            <h2 className="h1">
              독학의 한계를
              <br />
              교육으로 넘었습니다
            </h2>
            <p className="body">
              IT 회사 취업 준비와 개발자의 기초를 배우기 위하여 자격증을
              알아보았습니다. 대부분의 IT 회사에서 정보처리기사 자격증을
              우대사항으로 두는 것을 보고 준비하였습니다.
            </p>
            <p className="body">
              혼자서 공부할 때에는 많은 시행착오가 있었습니다. 교재를 사서
              인터넷 강의를 들으며 공부하고 싶었으나 독학의 한계에 부딪혀, 이를
              극복하고자 국비지원 교육을 알아보게 되었습니다.
            </p>
            <p className="body">
              그렇게 부산 IT 교육센터를 알게 되었고, 빅데이터 시각화를 통한
              빅데이터 UI 컨텐츠 개발 훈련과정에서 배운 내용을 바탕으로 3개월
              동안 공부하여 독학보다 수월하게 자격증을 취득할 수 있었습니다.
            </p>
          </div>
        </div>
      </section>

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

      <section className="slide" id="s10">
        <div className="chapter">
          <span>프로젝트 · 빅데이터</span>
          <span className="num">10</span>
        </div>
        <div className="wrap project">
          <div className="about stagger">
            <h2 className="h1">대기어때</h2>
            <p>
              공공데이터 포털과 에어코리아의 데이터를 BeautifulSoup,
              selenium으로 동적 크롤링해 2010년부터 2020년까지의 전국 미세먼지
              데이터를 수집했습니다.
            </p>
            <p>
              pandas와 tensorflow로 데이터를 정제한 뒤, 전국 데이터는 연평균
              기준 블럭 맵 이미지로 나타내고 지역 데이터는 LSTM으로 분석 및
              예측했습니다.
            </p>
            <p>
              예측 결과는 MySQL에 저장하고 MyBatis로 불러와 메인 화면에 Chart.js
              그래프로 보여줍니다. 홈페이지는 Spring Boot로 만들었고, 로그인과
              회원가입, 페이징과 검색이 되는 문의게시판을 구현했습니다.
            </p>
            <ul className="tags">
              <li>Spring Boot</li>
              <li>Python</li>
              <li>TensorFlow</li>
              <li>Chart.js</li>
            </ul>
          </div>

          <Appshot variant="web" shots={[]} />
        </div>
      </section>

      <section className="slide" id="s11">
        <div className="chapter">
          <span>프로젝트 · Spring</span>
          <span className="num">11</span>
        </div>
        <div className="wrap project flip">
          <div className="about stagger">
            <h2 className="h1">Coding.com</h2>
            <p>
              프로그래밍을 소통하면서 배우는 목적으로 STS와 Spring Boot를 사용해
              개발한 홈페이지입니다. MySQL과 MyBatis로 게시글 작성, 수정, 삭제와
              댓글, 로그인 및 회원가입을 구현했습니다.
            </p>
            <p>
              게시글 작성 시 파일 업로드가 가능하고, 이미지 파일이면 썸네일로
              표시됩니다. 최신 글이 위로 올라오도록 정렬해 새 글을 먼저 볼 수
              있습니다.
            </p>
            <p>
              페이징으로 한 페이지에 보이는 게시글 수를 제한했고, 제목과 내용,
              작성자로 검색하는 기능도 넣었습니다.
            </p>
            <ul className="tags">
              <li>Spring Boot</li>
              <li>MyBatis</li>
              <li>MySQL</li>
              <li>JSP</li>
            </ul>
          </div>

          <Appshot variant="web" shots={[]} />
        </div>
      </section>

      <section className="slide" id="s12">
        <div className="chapter">
          <span>비전</span>
          <span className="num">12</span>
        </div>
        <div className="wrap">
          <h2
            className="h1 up"
            style={{ marginBottom: "clamp(2rem, 6vh, 4rem)" }}
          >
            이상에서 성취까지
          </h2>
          <div className="vision stagger">
            <div className="step">
              <p className="mono">이상</p>
              <h3 className="h2">발전을 위한 희망</h3>
            </div>
            <div className="step">
              <p className="mono">노력</p>
              <h3 className="h2">
                함께, 즐겁게,
                <br />
                후회없이
              </h3>
            </div>
            <div className="step">
              <p className="mono">성취</p>
              <h3 className="h2">이상을 현실로</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="slide end" id="s13">
        <div className="chapter">
          <span>마무리</span>
          <span className="num">13</span>
        </div>
        <div className="wrap stagger">
          <p className="mono accent">감사합니다</p>
          <h2 className="display">
            성장하는 개발자가
            <br />
            되겠습니다
          </h2>
          <hr className="rule" style={{ width: "min(100%, 32rem)" }} />
          <p className="lead">이상, 정호상이었습니다.</p>
        </div>
      </section>
    </main>
  );
}
