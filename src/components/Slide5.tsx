import me from "../assets/img/background/me.png";

export default function Slide5() {
  return (
    <section className="slide" id="s5">
      <div className="chapter">
        <span>자기소개</span>
        <span className="num">05</span>
      </div>
      <div className="wrap intro">
        <div className="ph portrait up">
          <img src={me} />
        </div>
        <div className="txt stagger">
          <h2 className="h1">
            배우는 자세로
            <br />
            일하는 사람
          </h2>
          <p className="lead">
            저는 어릴 적 컴퓨터에 관한 관심이 많았습니다. 아버지를 따라서 컴퓨터
            공부를 하였으며 기본적인 컴퓨터 조립 및 수리를 공부한 적이 있습니다.
            개발자로 꿈을 키운 것은 대학교를 진학한 후부터였습니다. 컴퓨터로
            프로그램과 홈페이지를 만드는 일에 흥미를 느꼈고, 더 배우고자
            동명대학교 정보통신소프트웨어공학과를 졸업한 뒤 부산 IT 교육센터에서
            직업훈련 과정을 교육받으며 정보처리기사 자격증을 취득하고 교육과정을
            수료하였습니다.
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
  );
}
