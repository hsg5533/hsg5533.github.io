import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../assets/css/resume.css";
import me from "../assets/img/icon/me.png";
import Loading from "../components/Loading";
import { isMobile } from "../utils/modules";

interface mobileImage {
  key: string;
  title: string;
  src: string[];
}

interface target {
  key: string;
  title: string;
  elements: (HTMLElement | null)[];
}

const desktopRoot: CSSProperties = { backgroundColor: "#fff" };

const mobileRoot: CSSProperties = {
  position: "absolute",
  top: 0,
  left: "-9999px",
  width: "1200px",
};

async function captureElement(element: HTMLElement) {
  const contentHeight = Math.max(
    element.scrollHeight,
    element.offsetHeight,
    element.clientHeight,
  );
  const contentWidth = Math.max(
    element.scrollWidth,
    element.offsetWidth,
    element.clientWidth,
  );
  const canvas = await html2canvas(element, {
    useCORS: true,
    allowTaint: false,
    width: contentWidth,
    height: contentHeight,
    windowWidth: contentWidth,
    windowHeight: contentHeight,
    scrollX: -element.scrollLeft,
    scrollY: -element.scrollTop,
    scale: Math.max(2, window.devicePixelRatio || 1),
  });
  return canvas.toDataURL("image/png");
}

async function imageDataToPdf(
  srcs: string[],
  orientation: "portrait" | "landscape" = "portrait",
) {
  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 5;
  const contentW = pageW - margin * 2;
  const contentH = pageH - margin * 2;
  for (let i = 0; i < srcs.length; i++) {
    if (i > 0) pdf.addPage();
    const img = new Image();
    img.src = srcs[i];
    await new Promise<void>((resolve) => (img.onload = () => resolve()));
    const imgH = (img.height * contentW) / img.width;
    if (imgH > contentH) {
      const ratio = contentH / imgH;
      pdf.addImage(srcs[i], "PNG", margin, margin, contentW * ratio, contentH);
    } else {
      pdf.addImage(srcs[i], "PNG", margin, margin, contentW, imgH);
    }
  }
  return pdf;
}

async function captureToPdf(
  elements: HTMLElement[],
  orientation: "portrait" | "landscape" = "portrait",
) {
  const srcs: string[] = [];
  for (const element of elements) {
    srcs.push(await captureElement(element));
  }
  return await imageDataToPdf(srcs, orientation);
}

async function getMobileImages(targets: target[]) {
  const images: mobileImage[] = [];
  for (const target of targets) {
    const elements = target.elements.filter(Boolean);
    if (elements.length === 0) continue;
    const srcs: string[] = [];
    for (const element of elements) {
      if (!element) continue;
      srcs.push(await captureElement(element));
    }
    images.push({ key: target.key, title: target.title, src: srcs });
  }
  return images;
}

export default function Resume() {
  const paperRefs = useRef<(HTMLElement | null)[]>([]);
  const [mobileImages, setMobileImages] = useState<mobileImage[]>([]);

  const onClick = useCallback(async () => {
    const pdf = await captureToPdf(
      Array.from(document.querySelectorAll<HTMLElement>(".pdf-target")),
      "portrait",
    );
    pdf.save("이력서.pdf");
  }, []);

  useEffect(() => {
    const btn = document.getElementById("save");
    if (!btn) return;
    btn.addEventListener("click", onClick);
    return () => btn.removeEventListener("click", onClick);
  }, [onClick]); // 버튼 노출 상태 바뀌므로 의존성 유지

  useEffect(() => {
    (async () => {
      if (isMobile()) {
        setMobileImages(
          await getMobileImages([
            {
              key: "resume",
              title: "이력서",
              elements: [paperRefs.current[0]],
            },
            {
              key: "introduce",
              title: "자기소개",
              elements: [paperRefs.current[1]],
            },
          ]),
        );
      }
    })();
  }, []);

  if (isMobile() && mobileImages.length > 0) {
    return (
      <div className="mobile-pdf-viewer">
        {mobileImages.map((img) => {
          return (
            <section className="mobile-pdf-card">
              <div className="mobile-pdf-head">
                <strong>{img.title}</strong>
                <div className="mobile-pdf-actions">
                  <button
                    type="button"
                    onClick={async () => {
                      const pdf = await imageDataToPdf(img.src, "portrait");
                      pdf.save(`${img.title}.pdf`);
                    }}
                  >
                    다운로드
                  </button>
                </div>
              </div>
              <div className="mobile-pdf-body">
                {img.src.map((s, i) => (
                  <img
                    key={i}
                    src={s}
                    alt={img.title}
                    className="mobile-pdf-canvas"
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <Loading
        isOpen={isMobile() && mobileImages.length === 0}
        message={"문서 생성 중..."}
      />
      <div style={isMobile() ? mobileRoot : desktopRoot}>
        <section
          className="page pdf-target"
          ref={(el) => {
            paperRefs.current[0] = el;
          }}
        >
          <h1 className="title">이 력 서</h1>
          <table className="profile-table">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <tbody>
              <tr className="profile-row">
                <td rowSpan={4} className="photo">
                  <img src={me} alt="증명사진" />
                </td>
                <th>이름</th>
                <td className="center bold">정호상</td>
                <th>지원부문</th>
                <td className="center bold">S/W 개발자</td>
              </tr>
              <tr className="profile-row">
                <th>생년월일</th>
                <td className="center bold">1996년 04월 25일</td>
                <th>병역</th>
                <td className="center bold">
                  필_육군(통신병: 2017.04~2018.12)
                </td>
              </tr>
              <tr className="profile-row">
                <th>이메일</th>
                <td className="center bold">hsg5533@naver.com</td>
                <th>핸드폰</th>
                <td className="center bold">010-4420-6430</td>
              </tr>
              <tr className="profile-row">
                <th>주소</th>
                <td colSpan={3} className="center bold">
                  부산 해운대구 반송1동 아랫반송로 26번길 15-10
                </td>
              </tr>
              <tr>
                <td colSpan={5} className="subtitle">
                  학력사항
                </td>
              </tr>
              <tr>
                <th>재학기간</th>
                <th colSpan={2}>학력사항</th>
                <th>전공</th>
                <th>졸업구분</th>
              </tr>
              <tr>
                <td className="center bold">2015.03 ~ 2018.08</td>
                <td colSpan={2} className="center bold">
                  동명대학교
                </td>
                <td className="center bold">정보통신소프트웨어과</td>
                <td className="center bold">졸업</td>
              </tr>
              <tr>
                <td className="center bold">2012.03 ~ 2015.02</td>
                <td colSpan={2} className="center bold">
                  내성고등학교
                </td>
                <td className="center bold">자연계열 (이과)</td>
                <td className="center bold">졸업</td>
              </tr>
              <tr>
                <td colSpan={5} className="subtitle">
                  교육이수
                </td>
              </tr>
              <tr>
                <th>기간</th>
                <th colSpan={3}>교육명</th>
                <th>교육기관명</th>
              </tr>
              <tr>
                <td className="center bold">2021.12.28. ~ 2022.07.30</td>
                <td colSpan={3} className="center bold">
                  빅데이터 시각화를 통한 빅데이터 UI콘텐츠 개발
                </td>
                <td className="center bold">
                  (재)부산인재개발원 부산IT교육센터
                </td>
              </tr>
              <tr>
                <th>주요내용</th>
                <td colSpan={4} className="center bold">
                  JAVA(JDK 8), HTML, JSP/Servlet, Oracle 11g, MySQL,
                  SpringFramework, Android Studio(kotlin)
                </td>
              </tr>
              <tr>
                <td colSpan={5} className="subtitle">
                  자격증/어학점수
                </td>
              </tr>
              <tr>
                <th colSpan={2}>자격증(점수)</th>
                <th colSpan={2}>발행처</th>
                <th>취득일</th>
              </tr>
              <tr>
                <td colSpan={2} className="center bold">
                  정보처리기사
                </td>
                <td colSpan={2} className="center bold">
                  한국산업인력공단
                </td>
                <td className="center bold">2022.06</td>
              </tr>
              <tr>
                <td colSpan={2} className="center bold">
                  자동차운전면허증 (1종보통)
                </td>
                <td colSpan={2} className="center bold">
                  경남지방경찰청
                </td>
                <td className="center bold">2011.10</td>
              </tr>
              <tr>
                <td colSpan={5} className="subtitle">
                  대외활동 (프로젝트, 개인프로젝트, 수행과제)
                </td>
              </tr>
              <tr>
                <th>기간</th>
                <th>구분</th>
                <th>기관명</th>
                <th colSpan={2}>프로젝트명</th>
              </tr>
              <tr>
                <td className="center bold">2022.03.27~2022.04.09</td>
                <td className="center bold">팀프로젝트</td>
                <td className="center bold">부산IT교육센터</td>
                <td colSpan={2} className="center bold">
                  스프링 프로젝트 레시피톡(recipetalk)
                </td>
              </tr>
              <tr>
                <th>개발환경(&개발인원)</th>
                <td colSpan={4} className="center bold">
                  Tomcat, Java, Spring Legacy, Mybatis, MySQL (개발인원: 4명)
                </td>
              </tr>
              <tr>
                <th>담당역할</th>
                <td colSpan={4} className="center bold">
                  스프링 프레임워크를 통한 회원가입, 로그인, 게시판 기능, 댓글
                  및 이미지 파일 업로드 기능 구현
                </td>
              </tr>
              <tr>
                <td className="center bold">2021.05.09~2022.05.22</td>
                <td className="center bold">팀프로젝트</td>
                <td className="center bold">부산IT교육센터</td>
                <td colSpan={2} className="center bold">
                  안드로이드 프로젝트 펫워크(petwalk)
                </td>
              </tr>
              <tr>
                <th>개발환경(&개발인원)</th>
                <td colSpan={4} className="center bold">
                  Android Studio, kotlin, Firebase (개발인원: 4명)
                </td>
              </tr>
              <tr>
                <th>담당역할</th>
                <td colSpan={4} className="center bold">
                  Firebase의 실시간 데이터베이스를 통한 회원가입과 로그인 기능
                  및 게시판 기능, 사진 업로드 기능 구현
                </td>
              </tr>
              <tr>
                <td colSpan={5} className="subtitle">
                  사회활동/아르바이트
                </td>
              </tr>
              <tr>
                <th>기간</th>
                <th>기관명</th>
                <th colSpan={2}>담당업무(상세내용)</th>
                <th>퇴사사유</th>
              </tr>
              <tr>
                <td className="center bold">2022.09.13. ~ 2023.02.24</td>
                <td className="center bold">테이블온</td>
                <td colSpan={2} className="center bold">
                  RnD 및 웹 서비스 개발
                </td>
                <td className="center bold">경영악화</td>
              </tr>
              <tr>
                <td className="center bold">2023.05.01 ~ 2025.01.01</td>
                <td className="center bold">불타는고구마</td>
                <td colSpan={2} className="center bold">
                  React Native 하이브리드 앱 개발 및 배포
                </td>
                <td className="center bold">개인사정</td>
              </tr>
              <tr>
                <td className="center bold">2025.02.06 ~ 2025.05.15</td>
                <td className="center bold">인터오션</td>
                <td colSpan={2} className="center bold">
                  자사 홈페이지 유지보수
                </td>
                <td className="center bold">계약만료</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section
          className="page pdf-target"
          ref={(el) => {
            paperRefs.current[1] = el;
          }}
        >
          <table className="essay-table">
            <tbody>
              <tr>
                <th>자기소개</th>
              </tr>
              <tr>
                <td>
                  저는 새로운 사람을 만나거나 새로운 환경에 적응하는 데 있어
                  거리낌이 없는 사람입니다. 적극적으로 소통하며 분위기를 이끌어
                  나가는 능력은 다양한 협업 상황에서 저의 강점이 되었습니다.
                  활동적이고 에너지가 넘치는 성격 덕분에 체력적으로나 정신적으로
                  부담이 있는 프로젝트 상황에서도 쉽게 지치지 않고, 항상
                  긍정적인 태도로 임할 수 있습니다. 또한, 스트레스 상황에서도
                  냉정하게 상황을 파악하고 판단하는 능력을 바탕으로 현실적인
                  문제 해결에 집중할 수 있습니다. 7년 이상 한 조직에서 근무하며
                  소통과 팀워크의 중요성을 깊이 체감했습니다. 제가 속해 있던
                  팀은 주로 공동 프로젝트 위주로 운영되었고, 다양한 업무를
                  동시에 수행해야 했습니다. 업무 우선순위를 설정하고, 팀원들의
                  진행 상황을 함께 고려하며 유연하게 협업하는 방식은 효율성과
                  만족도를 동시에 높여주었습니다. 특히, 동료 간의 갈등이 생길 때
                  먼저 다가가 문제를 풀고 팀워크를 회복시키는 데 주저함이
                  없었습니다. 물론 소프트웨어 개발 분야에서는 아직 현업의 실무
                  경험이 부족한 것이 저의 단점이라 생각합니다. 하지만 이를
                  누구보다 빠르게 채우기 위해 지속적인 학습과 실전 중심의
                  프로젝트 경험을 쌓아가고 있으며, 현업 개발자들과의 소통과 코드
                  리뷰, 기술 공유 등을 통해 실무에 빠르게 적응할 수 있는 기반을
                  다지고 있습니다. 저는 단순히 기술적인 역량만 뛰어난 개발자가
                  아닌, 팀과 함께 성장하며 협업의 가치를 실현할 수 있는 개발자가
                  되고자 합니다. 동료와 함께 문제를 해결하고, 함께 배워 목표를
                  달성하는 과정에서 큰 성취감을 느낍니다. 앞으로도 공동의 목표를
                  향해 기꺼이 헌신하고, 팀에 긍정적인 영향을 줄 수 있는 구성원이
                  되겠습니다.
                </td>
              </tr>
            </tbody>
          </table>
          <table className="essay-table">
            <tbody>
              <tr>
                <th>지원동기</th>
              </tr>
              <tr>
                <td>
                  소프트웨어 산업은 높은 진입장벽과 빠른 기술 변화 속에서도,
                  명확한 기술적 강점과 고객 중심의 개발 역량을 갖춘 기업이
                  안정적인 성장을 이어갈 수 있다고 생각합니다. 금호미쓰이화학은
                  화학 분야의 기술적 전문성과 다양한 고객사 인프라를 바탕으로
                  차별화된 기술 경쟁력을 확보하고 있으며, 이러한 점이 저에게 큰
                  동기와 도전 의식을 불러일으켰습니다. 과거 저는 난연성 우레아
                  도료 개발 및 기능성 소재 포뮬레이션, 기술 대응, 테스트 설계
                  등의 경험을 통해 복잡한 문제를 체계적으로 해결하는 능력을
                  길렀습니다. 이를 바탕으로 소프트웨어 개발에서도 요구사항 분석,
                  기술 설계, 협업 기반의 개발 사이클을 효과적으로 수행할 수
                  있다고 확신합니다.
                </td>
              </tr>
            </tbody>
          </table>
          <table className="essay-table">
            <tbody>
              <tr>
                <th>주요업적 및 경력 설명</th>
              </tr>
              <tr>
                <td>
                  저는 웹 / 앱 개발 분야에서 다양한 프로젝트를 수행하며 실무
                  경험을 쌓았습니다. 특히 프론트엔드 개발을 통해 UI / UX 사용성
                  개선 방향과 사용자와의 커뮤니케이션 역량을 강화할 수
                  있었습니다. 이제는 이러한 경험을 바탕으로 문제 해결과 지속적인
                  혁신을 추구하는 개발자가 되고자 합니다. 현재는 웹 기반
                  프론트엔드 개발과 백엔드 시스템 연동, 데이터 시각화 구축 등에
                  관심을 갖고 역량을 키워나가고 있습니다.
                </td>
              </tr>
            </tbody>
          </table>
          <table className="essay-table">
            <tbody>
              <tr>
                <th>입사 후 계획</th>
              </tr>
              <tr>
                <td>
                  기술은 빠르게 변화하지만, 사용자의 니즈와 고객 만족이라는
                  본질은 변하지 않습니다. 입사 후에는 소프트웨어 개발자로서
                  기업의 고객 중심 가치를 실현할 수 있도록 끊임없이 배우고
                  성장해 나가겠습니다. 특히 제품 개발을 위한 요구사항 분석,
                  서비스 설계, 품질 개선 등 전 과정에서 프로세스를 빠르게
                  이해하고 기술적으로 기여할 수 있는 역량을 갖추겠습니다. 또한
                  스스로를 낮추고 동료를 존중하며, 열린 자세로 협업에 임할
                  것입니다. 문제를 단순히 해결하는 데 그치지 않고, 고객과 기업의
                  가치를 함께 높일 수 있는 차별화된 솔루션을 고민하며, 시장의
                  변화 속에서도 유연하고 주도적인 개발자로 성장해 나가겠습니다.
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        {!isMobile && (
          <div id="pdfActions" className="pdf-actions no-print">
            <button id="save" type="button">
              PDF 저장
            </button>
          </div>
        )}
      </div>
    </>
  );
}
