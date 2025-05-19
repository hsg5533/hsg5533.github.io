// React와 hooks를 임포트합니다.
import React, { useRef, useState, useEffect } from "react";
// js의 주요 모듈들을 임포트합니다.
import {
  Engine,
  Runner,
  Composite,
  Bodies,
  Mouse,
  MouseConstraint,
  Body,
  Events,
} from "matter-js";

// 물리 시뮬레이션용 객체를 저장하는 타입 정의
interface PhysicsObject {
  el: HTMLElement; // 실제 DOM 요소
  body: Body; // 매터 바디 객체
  width: number; // 요소 너비
  height: number; // 요소 높이
}

// 경계(벽) 4개를 모아두는 타입 정의
interface Boundary {
  floor: Body;
  ceiling: Body;
  leftWall: Body;
  rightWall: Body;
}

// 벽 두께 상수
const wallThickness = 10;

export default function Values() {
  // 시뮬레이션 중 생성된 물리 객체들을 참조하기 위한 useRef
  const objectsRef = useRef<PhysicsObject[]>([]);
  // 엔진과 러너를 저장할 ref
  const engineRef = useRef<Engine | null>(null);
  const runnerRef = useRef<Runner | null>(null);
  // 경계 객체들을 저장할 ref
  const boundaryRef = useRef<Boundary | null>(null);

  // 브라우저 창 크기를 상태로 관리
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const { width, height } = size;

  // 윈도우 리사이즈 시 size 상태 업데이트
  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // size가 변경될 때마다 시뮬레이션 초기화
  useEffect(() => {
    // 시뮬레이션을 그릴 부모 요소를 찾습니다.
    const overlay = document.querySelector<HTMLElement>(".area");
    if (!overlay) return; // 요소가 없으면 종료

    // 드래그·선택 이벤트 기본 동작 차단

    // js 엔진과 러너 생성
    const engine = Engine.create();
    engine.positionIterations = 10; // 위치 반복 횟수 조정
    engine.velocityIterations = 10; // 속도 반복 횟수 조정
    const runner = Runner.create();
    engineRef.current = engine;
    runnerRef.current = runner;

    // 경계(바닥, 천장, 좌/우 벽) 생성 및 월드에 추가
    const floor = Bodies.rectangle(
      width / 2,
      height + wallThickness / 2,
      width,
      wallThickness,
      { isStatic: true }
    );
    const ceiling = Bodies.rectangle(
      width / 2,
      -wallThickness / 2,
      width,
      wallThickness,
      { isStatic: true }
    );
    const leftWall = Bodies.rectangle(
      -wallThickness / 2,
      height / 2,
      wallThickness,
      height,
      { isStatic: true }
    );
    const rightWall = Bodies.rectangle(
      width + wallThickness / 2,
      height / 2,
      wallThickness,
      height,
      { isStatic: true }
    );
    boundaryRef.current = { floor, ceiling, leftWall, rightWall };
    Composite.add(engine.world, [floor, ceiling, leftWall, rightWall]);

    // .physics 클래스를 가진 모든 요소를 찾아 물리 객체로 변환
    const elements = overlay.querySelectorAll<HTMLElement>(".physics");
    const objects: PhysicsObject[] = [];
    elements.forEach((el) => {
      const isStatic = el.classList.contains("static");
      const rect = el.getBoundingClientRect();
      const overlayRect = overlay.getBoundingClientRect();
      // 오버레이 내부 좌표로 변환
      const centerX = rect.left - overlayRect.left + rect.width / 2;
      const centerY = rect.top - overlayRect.top + rect.height / 2;
      // 물리 바디 생성
      const body = Bodies.rectangle(centerX, centerY, rect.width, rect.height, {
        isStatic,
      });
      Composite.add(engine.world, body);
      objects.push({ el, body, width: rect.width, height: rect.height });
    });
    objectsRef.current = objects;

    // 마우스 객체 생성: overlay에 이벤트 등록
    const mouse = Mouse.create(overlay);
    // MouseConstraint 생성시 element 옵션이 IMouseConstraintDefinition에 없으므로 제거
    const constraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        damping: 0.3,
        render: { visible: false },
      },
    });
    Composite.add(engine.world, constraint);

    // 업데이트 전에 속도 제한 로직 실행
    Events.on(engine, "beforeUpdate", () => {
      const maxSpeed = 40;
      objectsRef.current.forEach(({ body }) => {
        if (!body.isStatic) {
          const { x: vx, y: vy } = body.velocity;
          const speed = Math.hypot(vx, vy);
          if (speed > maxSpeed) {
            const scale = maxSpeed / speed;
            Body.setVelocity(body, { x: vx * scale, y: vy * scale });
          }
        }
      });
    });

    // 러너 실행
    Runner.run(runner, engine);

    // 매 프레임마다 DOM 위치와 회전각을 업데이트
    const update = () => {
      objectsRef.current.forEach(({ el, body, width: w, height: h }) => {
        el.style.left = `${body.position.x - w / 2}px`;
        el.style.top = `${body.position.y - h / 2}px`;
        el.style.transform = `rotate(${body.angle}rad)`;
      });
      requestAnimationFrame(update);
    };
    update();

    // 언마운트 시 정리(cleanup): 러너 중단, 월드 및 엔진 클리어
    return () => {
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [width, height]);

  // 창 크기 변경 시 경계(벽) 위치와 크기 업데이트
  useEffect(() => {
    const boundary = boundaryRef.current;
    if (!boundary) return;
    const { floor, ceiling, leftWall, rightWall } = boundary;

    Body.setPosition(floor, { x: width / 2, y: height + wallThickness / 2 });
    Body.setVertices(floor, [
      { x: 0, y: height },
      { x: width, y: height },
      { x: width, y: height + wallThickness },
      { x: 0, y: height + wallThickness },
    ]);

    Body.setPosition(ceiling, { x: width / 2, y: -wallThickness / 2 });
    Body.setVertices(ceiling, [
      { x: 0, y: -wallThickness },
      { x: width, y: -wallThickness },
      { x: width, y: 0 },
      { x: 0, y: 0 },
    ]);

    Body.setPosition(leftWall, { x: -wallThickness / 2, y: height / 2 });
    Body.setVertices(leftWall, [
      { x: -wallThickness, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: height },
      { x: -wallThickness, y: height },
    ]);

    Body.setPosition(rightWall, {
      x: width + wallThickness / 2,
      y: height / 2,
    });
    Body.setVertices(rightWall, [
      { x: width, y: 0 },
      { x: width + wallThickness, y: 0 },
      { x: width + wallThickness, y: height },
      { x: width, y: height },
    ]);
  }, [width, height]);

  // 시뮬레이션 컨테이너와 10개의 박스 요소 렌더링
  return (
    <div className="simulation">
      <h2>Values</h2>
      <div className="area">
        <header className="physics">
          <h1>My Awesome Website</h1>
        </header>
        <main className="physics">
          <h2>소개</h2>
          <p>
            이 웹사이트는 컨텐츠 위에 물리 시뮬레이션을 오버레이하여 박스와
            선반이 브라우저 창 전체 범위 내에서 움직이는 모습을 보여줍니다.
          </p>
          <p>아래의 오버레이에서 박스를 드래그하여 상호작용해보세요!</p>
        </main>
        <footer className="physics">
          <p>&copy; 2025 My Awesome Website</p>
        </footer>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="box physics">
            {/* 박스 번호 표시 */}
            <h1 style={{ fontSize: "3rem" }}>{i}</h1>
          </div>
        ))}
        <div className="shelf1 physics static">
          조용하고 꼼꼼한 성격 꼼꼼하고 깔끔하게 살아가는 것이 목표
        </div>
        <div className="shelf2 physics static">
          어마어마한 친화력 특유의 친화력과 다정한 성격
        </div>
        <div className="shelf3 physics static">
          섬세한 관찰력 특유의 눈썰미로 변화를 관찰하는 능력
        </div>
        <div className="shelf4 physics static">
          이타 주의적 생각 항상 남을 먼저 생각하는 사람
        </div>
      </div>
    </div>
  );
}
