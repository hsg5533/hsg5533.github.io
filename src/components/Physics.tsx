import React from "react";
import Matter from "matter-js";

// Matter.js가 생성하지만 @types/matter-js에는 누락된 이벤트 핸들러.
interface Mouse extends Matter.Mouse {
  mousemove?: EventListener;
  mousedown?: EventListener;
  mouseup?: EventListener;
  mousewheel?: EventListener;
}

interface IConstraintDefinition extends Matter.IConstraintDefinition {
  angularStiffness: number;
}

interface Object {
  el: HTMLElement;
  body: Matter.Body;
  initialX: number;
  initialY: number;
  transform: string;
}
const max = 40;
const thick = 10; // 벽 두께
const constraintOptions: IConstraintDefinition = {
  stiffness: 0.2,
  angularStiffness: 0.3,
  render: { visible: false },
};

export default function Physics({ children }: { children: React.ReactNode }) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // 드래그 기본 동작 방지
    container.addEventListener("dragstart", (event) => event.preventDefault());
    // Matter.js 엔진과 러너 생성
    const engine = Matter.Engine.create();
    const runner = Matter.Runner.create();
    engine.positionIterations = 10;
    engine.velocityIterations = 10;
    // 초기 창 크기 구조 분해 할당
    const bounds = container.getBoundingClientRect();
    const { width, height } = bounds;
    // 벽 생성
    const floor = Matter.Bodies.rectangle(
      width / 2,
      height + thick / 2,
      width,
      thick,
      { isStatic: true },
    );
    const ceiling = Matter.Bodies.rectangle(
      width / 2,
      -thick / 2,
      width,
      thick,
      { isStatic: true },
    );
    const leftWall = Matter.Bodies.rectangle(
      -thick / 2,
      height / 2,
      thick,
      height,
      { isStatic: true },
    );
    const rightWall = Matter.Bodies.rectangle(
      width + thick / 2,
      height / 2,
      thick,
      height,
      { isStatic: true },
    );
    Matter.Composite.add(engine.world, [floor, ceiling, leftWall, rightWall]);
    // 직접 자식 요소들을 각각 하나의 물리 객체로 변환
    const objects: Object[] = [];
    Array.from(container.children).forEach((el) => {
      if (!(el instanceof HTMLElement)) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left - bounds.left + rect.width / 2;
      const centerY = rect.top - bounds.top + rect.height / 2;
      const body = Matter.Bodies.rectangle(
        centerX,
        centerY,
        rect.width,
        rect.height,
        { isStatic: el.classList.contains("static") },
      );
      Matter.Composite.add(engine.world, body);
      objects.push({
        el,
        body,
        initialX: centerX,
        initialY: centerY,
        transform: el.style.transform,
      });
    });
    // 마우스 제어
    const mouse: Mouse = Matter.Mouse.create(container);
    const constraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: constraintOptions,
    });
    mouse.pixelRatio = 1;
    Matter.Composite.add(engine.world, constraint);
    // 속도 제한
    Matter.Events.on(engine, "beforeUpdate", () => {
      objects.forEach((obj) => {
        if (!obj.body.isStatic) {
          const { x: vx, y: vy } = obj.body.velocity;
          const speed = Math.hypot(vx, vy);
          if (speed > max) {
            const scale = max / speed;
            Matter.Body.setVelocity(obj.body, {
              x: vx * scale,
              y: vy * scale,
            });
          }
        }
      });
    });
    // 엔진 실행
    Matter.Runner.run(runner, engine);
    // 애니메이션 프레임 업데이트
    let animationFrame = 0;
    const update = () => {
      objects.forEach(({ el, body, initialX, initialY }) => {
        if (!el.classList.contains("static")) {
          el.style.transform = `translate(${body.position.x - initialX}px, ${body.position.y - initialY}px) rotate(${body.angle}rad)`;
        }
      });
      animationFrame = requestAnimationFrame(update);
    };
    update();
    // 창 크기 변경 시 벽 & 정적 객체 업데이트
    const resize = () => {
      const bounds = container.getBoundingClientRect();
      const { width, height } = bounds;
      // 벽 업데이트
      Matter.Body.setPosition(ceiling, {
        x: width / 2,
        y: -thick / 2,
      });
      Matter.Body.setVertices(ceiling, [
        { x: 0, y: 0 },
        { x: width, y: 0 },
        { x: width, y: thick },
        { x: 0, y: thick },
      ]);
      Matter.Body.setPosition(floor, {
        x: width / 2,
        y: height + thick / 2,
      });
      Matter.Body.setVertices(floor, [
        { x: 0, y: height },
        { x: width, y: height },
        { x: width, y: height + thick },
        { x: 0, y: height + thick },
      ]);
      Matter.Body.setPosition(leftWall, {
        x: -thick / 2,
        y: height / 2,
      });
      Matter.Body.setVertices(leftWall, [
        { x: 0, y: 0 },
        { x: thick, y: 0 },
        { x: thick, y: height },
        { x: 0, y: height },
      ]);
      Matter.Body.setPosition(rightWall, {
        x: width + thick / 2,
        y: height / 2,
      });
      Matter.Body.setVertices(rightWall, [
        { x: width, y: 0 },
        { x: width + thick, y: 0 },
        { x: width + thick, y: height },
        { x: width, y: height },
      ]);
      // 정적 요소(예: 선반)의 위치 및 치수 업데이트
      objects.forEach((obj) => {
        if (obj.body.isStatic) {
          const rect = obj.el.getBoundingClientRect();
          const left = rect.left - bounds.left;
          const top = rect.top - bounds.top;
          const centerX = left + rect.width / 2;
          const centerY = top + rect.height / 2;
          Matter.Body.setPosition(obj.body, { x: centerX, y: centerY });
          Matter.Body.setVertices(obj.body, [
            { x: left, y: top },
            { x: left + rect.width, y: top },
            { x: left + rect.width, y: top + rect.height },
            { x: left, y: top + rect.height },
          ]);
        }
      });
    };
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      Matter.Runner.stop(runner);
      Matter.Events.off(engine, "beforeUpdate");
      Matter.Composite.clear(engine.world, false);
      Matter.Engine.clear(engine);
      window.removeEventListener("resize", resize);
      container.removeEventListener("dragstart", (event) =>
        event.preventDefault(),
      );
      if (mouse.mousemove) {
        container.removeEventListener("mousemove", mouse.mousemove);
        container.removeEventListener("touchmove", mouse.mousemove);
      }
      if (mouse.mousedown) {
        container.removeEventListener("mousedown", mouse.mousedown);
        container.removeEventListener("touchstart", mouse.mousedown);
      }
      if (mouse.mouseup) {
        container.removeEventListener("mouseup", mouse.mouseup);
        container.removeEventListener("touchend", mouse.mouseup);
      }
      if (mouse.mousewheel) {
        container.removeEventListener("wheel", mouse.mousewheel);
      }
      Matter.Mouse.clearSourceEvents(mouse);
      objects.forEach(({ el, body, transform }) => {
        if (!body.isStatic) el.style.transform = transform;
      });
    };
  }, [children]);

  return (
    <div className="container" ref={containerRef}>
      {children}
    </div>
  );
}
