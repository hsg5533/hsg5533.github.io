import Appshot from "./Appshot";

export default function Slide11() {
  return (
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
  );
}
