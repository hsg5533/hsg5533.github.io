// Values.tsx
import React, { useRef, useState, useEffect } from "react";
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

interface PhysicsObject {
  el: HTMLElement;
  body: Body;
  width: number;
  height: number;
}

interface Boundary {
  floor: Body;
  ceiling: Body;
  leftWall: Body;
  rightWall: Body;
}

const wallThickness = 10;
const letters = "저를소개합니다".split("");

export default function Values() {
  // refs for Matter.js
  const objectsRef = useRef<PhysicsObject[]>([]);
  const engineRef = useRef<Engine | null>(null);
  const runnerRef = useRef<Runner | null>(null);
  const boundaryRef = useRef<Boundary | null>(null);

  // ref for the area DOM node
  const areaRef = useRef<HTMLDivElement | null>(null);

  // track viewport visibility
  const [inView, setInView] = useState(false);

  // track window size
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const { width, height } = size;

  // update size on resize
  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // observe when .area enters/exits viewport
  useEffect(() => {
    const el = areaRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // initialize / cleanup Matter.js when inView changes
  useEffect(() => {
    if (!inView) return;

    const overlay = areaRef.current!;
    const engine = Engine.create();
    engine.positionIterations = 10;
    engine.velocityIterations = 10;
    const runner = Runner.create();

    engineRef.current = engine;
    runnerRef.current = runner;

    // create boundaries
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

    // wrap all .physics elements
    const elements = overlay.querySelectorAll<HTMLElement>(".physics");
    const objects: PhysicsObject[] = [];
    const overlayRect = overlay.getBoundingClientRect();

    elements.forEach((el) => {
      const isStatic = el.classList.contains("static");
      const rect = el.getBoundingClientRect();
      const centerX = rect.left - overlayRect.left + rect.width / 2;
      const centerY = rect.top - overlayRect.top + rect.height / 2;
      const body = Bodies.rectangle(centerX, centerY, rect.width, rect.height, {
        isStatic,
      });
      Composite.add(engine.world, body);
      objects.push({ el, body, width: rect.width, height: rect.height });
    });
    objectsRef.current = objects;

    // mouse control
    const mouse = Mouse.create(overlay);
    const constraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, damping: 0.3, render: { visible: false } },
    });
    Composite.add(engine.world, constraint);

    // speed cap
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

    // run physics
    Runner.run(runner, engine);

    // render loop
    const update = () => {
      objectsRef.current.forEach(({ el, body, width: w, height: h }) => {
        el.style.left = `${body.position.x - w / 2}px`;
        el.style.top = `${body.position.y - h / 2}px`;
        el.style.transform = `rotate(${body.angle}rad)`;
      });
      requestAnimationFrame(update);
    };
    update();

    // cleanup on exit or unmount
    return () => {
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      objectsRef.current = [];
      boundaryRef.current = null;
      engineRef.current = null;
      runnerRef.current = null;
    };
  }, [inView, width, height]);

  // update boundary positions on resize
  useEffect(() => {
    const b = boundaryRef.current;
    if (!b) return;
    const { floor, ceiling, leftWall, rightWall } = b;

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

  return (
    <div className="simulation" data-aos="fade-up" data-aos-duration="1000">
      <div className="area" ref={areaRef}>
        {letters.map((char, i) => (
          <div
            key={i}
            className="box physics"
            style={{ left: `${((i + 1) / (letters.length + 1)) * 100}%` }}
          >
            <h1 style={{ fontSize: "3rem" }}>{char}</h1>
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
