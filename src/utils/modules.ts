import { RefObject, useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { IConstraintDefinition, Mouse } from "./types";

export function useView(ref: RefObject<Element | null>, threshold: number) {
  const savedElement = useRef<Element>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    savedElement.current = ref.current;
  }, [ref]);
  useEffect(() => {
    if (!savedElement.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold },
    );
    observer.observe(savedElement.current);
    return () => observer.disconnect();
  }, [savedElement, threshold]);
  return inView;
}

export function isMobile() {
  const ua = navigator.userAgent.toLowerCase();
  const mobileRegex =
    /android|iphone|ipad|ipod|blackberry|bb10|opera mini|windows phone/;
  const isUA = mobileRegex.test(ua);
  const hasTouch = "ontouchstart" in window;
  const narrowScreen = window.innerWidth <= 1024;
  return isUA || (hasTouch && narrowScreen);
}

const offsetZ = 200; // translateZ 오프셋 값
const amplitudeX = 550; // X축 이동 범위(진폭)
const amplitudeY = 300; // Y축 이동 범위(진폭)
const amplitudeZ = 500; // Z축 이동 범위(진폭)

// transform 문자열에서 translateZ 값을 추출해 숫자(px 단위)를 반환하는 헬퍼 함수
function getTranslateZ(transform: string) {
  const match = transform.match(/translateZ\((-?\d+(\.\d+)?)px\)/);
  return match ? parseFloat(match[1]) : -Infinity;
}

// highLight 함수: inline style의 translateZ 값을 비교해서 zoom-in/zoom-out 적용
export function highLight(imgs: NodeListOf<Element>) {
  let maxZ = -Infinity;
  let front: Element;
  imgs.forEach((img) => {
    if (!img.parentElement) return;
    const card = img.parentElement;
    const transform = card.style.transform; // e.g., "translateX(0px) translateZ(700px) rotateY(0deg)"
    const z = getTranslateZ(transform);
    if (z > maxZ) {
      maxZ = z;
      front = img;
    }
  });
  imgs.forEach((img) => {
    img.classList.remove("zoom-in", "zoom-out");
    if (img === front) {
      img.classList.add("zoom-in");
    } else {
      img.classList.add("zoom-out");
    }
  });
}

export class Swiper {
  area: HTMLElement;
  card: string;
  mode: string;
  width: number;
  height: number;
  initialX: number;
  initialY: number;
  hThreshold: number;
  vThreshold: number;
  isClick: boolean;
  cards: NodeListOf<HTMLElement>;
  sequence: string[];
  constructor(area: HTMLElement, card: string, mode = "horizontal") {
    this.area = area; // 컨테이너 요소 참조
    this.card = card; // 카드 선택자를 저장
    this.mode = mode; // 회전 방향 모드 (horizontal / vertical)
    this.width = 0; // 컨테이너 너비
    this.height = 0; // 컨테이너 높이
    this.initialX = 0; // 마우스/터치 시작 X좌표
    this.initialY = 0; // 마우스/터치 시작 Y좌표
    this.hThreshold = 0; // 가로 임계값
    this.vThreshold = 0; // 세로 임계값
    this.isClick = false; // 드래그 중인지 여부
    this.cards = this.area.querySelectorAll<HTMLElement>(this.card); // 모든 카드 요소(NodeList)
    this.sequence = Array.from(this.cards).map((card) => card.id); // 카드의 ID 순서를 배열로 저장
  }
  init() {
    this.width = this.area.offsetWidth; // 컨테이너 실제 너비
    this.height = this.area.offsetHeight; // 컨테이너 실제 높이
    this.hThreshold = this.width / this.cards.length; // 가로 방향으로 회전하기 위한 임계값
    this.vThreshold = this.height / this.cards.length; // 세로 방향으로 회전하기 위한 임계값
  }
  setInitalPoint(e: MouseEvent | Touch) {
    this.initialX = e.clientX; // 처음 클릭/터치 X좌표 저장
    this.initialY = e.clientY; // 처음 클릭/터치 Y좌표 저장
  }
  calculateDistance(e: MouseEvent | Touch) {
    const deltaX = e.clientX - this.initialX; // X축으로 움직인 거리
    const deltaY = e.clientY - this.initialY; // Y축으로 움직인 거리
    const horizontal = this.mode === "horizontal";
    const main = horizontal ? deltaX : deltaY; // 모드가 회전에 쓰는 축
    const cross = horizontal ? deltaY : deltaX; // 그와 직각인 축
    // 교차축이 더 크면 회전 의도가 아니다(모바일 세로 스크롤 등). 0을 돌려 임계값에서 걸리게 한다.
    return Math.abs(main) > Math.abs(cross) ? main : 0;
  }
  rotateObject(e: MouseEvent | Touch) {
    if (!this.isClick) return; // 클릭/터치 중이 아니면 종료
    const delta = this.calculateDistance(e); // 이동 방향과 거리 계산
    const horizontal = this.mode === "horizontal";
    const threshold = horizontal ? this.hThreshold : this.vThreshold; // 방향별 임계값
    if (Math.abs(delta) < threshold) return; // 임계값보다 이동이 작으면 회전 없음
    delta > 0 ? this.moveNext() : this.movePrev(); // 양수면 다음 카드, 음수면 이전 카드로 이동
    this.isClick = !this.isClick; // 클릭/터치 상태 해제
  }
  shuffle() {
    const cards = this.area.querySelectorAll<HTMLElement>(this.card); // 현재 DOM에서 모든 카드 조회
    this.cards.forEach((card) => (card.style.transition = "none")); // 위치를 재배치하기 전 트랜지션 끔
    this.sequence.forEach((id) => {
      const card = document.getElementById(id); // 순서 배열에 있는 ID에 해당하는 카드
      card && this.area.appendChild(card); // 컨테이너의 맨 뒤로 순서대로 붙임
    });
    void this.area.offsetWidth; // 리플로우 강제 발생 (재배치 후 적용)
    cards.forEach((card) => (card.style.transition = "")); // 트랜지션 다시 켬
    cards.forEach((card, index) => {
      // index를 이용해 회전 각도 계산
      const angleDeg = index * (360 / this.cards.length); // 전체 카드를 원형으로 배치하기 위한 각도
      const angleRad = (angleDeg * Math.PI) / 180; // 라디안 변환
      const translateZ = amplitudeZ * Math.cos(angleRad) + offsetZ; // Z축 이동 거리
      // 회전 + 3D 위치 설정
      if (this.mode === "horizontal") {
        const translateX = amplitudeX * Math.sin(angleRad); // X축 이동 거리
        card.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${angleDeg}deg)`;
      } else {
        const translateY = amplitudeY * Math.sin(angleRad); // Y축 이동 거리
        card.style.transform = `translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${angleDeg}deg)`;
      }
    });
  }
  movePrev() {
    const value = this.sequence.pop(); // 배열의 마지막 ID를 꺼냄
    this.sequence.unshift(value!); // 맨 앞에 추가하여 순서 재조정
    this.shuffle(); // 새 순서대로 다시 배치
  }
  moveNext() {
    const value = this.sequence.shift(); // 배열의 첫 번째 ID를 꺼냄
    this.sequence.push(value!); // 맨 뒤에 추가하여 순서 재조정
    this.shuffle(); // 새 순서대로 다시 배치
  }
}

// 물리 모드 진입: 3D 변환으로 그려지던 현재 화면 위치를 left/top으로 굳힌다.
// 물리 엔진은 transform을 자기 것으로 덮어쓰기 때문에, 좌표를 레이아웃으로 옮겨두지 않으면 카드가 튄다.
export function freeze(container: HTMLElement) {
  const base = container.getBoundingClientRect();
  container.querySelectorAll<HTMLElement>(".card").forEach((card) => {
    const rect = card.getBoundingClientRect(); // 원근이 적용된 현재 화면 위치
    card.style.transition = "none";
    card.style.transform = "none";
    card.querySelector(".skill-icon")?.classList.remove("zoom-in", "zoom-out");
    const home = card.getBoundingClientRect(); // 원근을 걷어낸 본래 크기
    // 크기는 카드 본래 크기로 통일하고, 화면상 중심만 그대로 이어받는다
    card.style.left = `${rect.left + rect.width / 2 - home.width / 2 - base.left}px`;
    card.style.top = `${rect.top + rect.height / 2 - home.height / 2 - base.top}px`;
  });
}

// 캐러셀 복귀: 떨어진 위치를 transform 오프셋으로 옮겨 담고 left/top을 되돌린다.
// 이렇게 해야 이어지는 shuffle의 1초 트랜지션이 바닥 → 링으로 이어진다.
export function release(container: HTMLElement) {
  container.querySelectorAll<HTMLElement>(".card").forEach((card) => {
    const drop = card.getBoundingClientRect();
    card.style.transition = "none";
    card.style.transform = "";
    card.style.left = "";
    card.style.top = "";
    const home = card.getBoundingClientRect();
    // 회전은 중심을 보존하므로 중심 기준으로 오프셋을 잡아야 정확하다
    const deltaX = drop.left + drop.width / 2 - (home.left + home.width / 2);
    const deltaY = drop.top + drop.height / 2 - (home.top + home.height / 2);
    card.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    void card.offsetWidth; // 리플로우 강제
    card.style.transition = "";
  });
}

const max = 40;
const thick = 10; // 벽 두께
const definition: IConstraintDefinition = {
  stiffness: 0.2,
  angularStiffness: 0.3,
  render: { visible: false },
};

function rectangle(
  body: Matter.Body,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  Matter.Body.setPosition(body, { x, y });
  Matter.Body.setVertices(body, [
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: width, y: height },
    { x: 0, y: height },
  ]);
}

function createWall(x: number, y: number, width: number, height: number) {
  return Matter.Bodies.rectangle(x, y, width, height, { isStatic: true });
}

// 컨테이너의 직접 자식들을 강체로 굴린다. 훅은 조건부 호출이 안 되므로
// on/off는 enabled로 받아 effect 안에서 가른다.
export function usePhysics(ref: RefObject<HTMLElement | null>, drop: boolean) {
  // 물리 모드: 컨테이너의 카드들을 그대로 강체로 굴린다
  useEffect(() => {
    const container = ref.current;
    if (!container || !drop) return;
    // Matter.js 엔진과 러너 생성
    const engine = Matter.Engine.create();
    const runner = Matter.Runner.create();
    engine.positionIterations = 10;
    engine.velocityIterations = 10;
    // 초기 창 크기 구조 분해 할당
    const bounds = container.getBoundingClientRect();
    const { width, height } = bounds;
    // 벽 생성
    const floor = createWall(width / 2, height + thick / 2, width, thick);
    const ceiling = createWall(width / 2, -thick / 2, width, thick);
    const leftWall = createWall(-thick / 2, height / 2, thick, height);
    const rightWall = createWall(width + thick / 2, height / 2, thick, height);
    Matter.Composite.add(engine.world, [floor, ceiling, leftWall, rightWall]);
    // 직접 자식 요소들을 각각 하나의 물리 객체로 변환
    const objects = Array.from(container.children).flatMap((el) => {
      if (!(el instanceof HTMLElement)) return [];
      const { left, top, width, height } = el.getBoundingClientRect();
      const initialX = left - bounds.left + width / 2;
      const initialY = top - bounds.top + height / 2;
      const body = Matter.Bodies.rectangle(initialX, initialY, width, height);
      Matter.Composite.add(engine.world, body);
      return { el, body, initialX, initialY };
    });
    // 마우스 제어
    const mouse: Mouse = Matter.Mouse.create(container);
    const constraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: definition,
    });
    mouse.pixelRatio = 1;
    Matter.Composite.add(engine.world, constraint);
    // Matter의 wheel/touch 핸들러는 preventDefault를 무조건 호출해 페이지 스크롤을 막는다.
    // wheel은 쓰지 않으니 떼어내고, touch는 카드를 실제로 잡았을 때만 Matter에 넘긴다.
    const { mousemove, mousedown, mouseup, mousewheel } = mouse;
    mousewheel && container.removeEventListener("wheel", mousewheel);
    mousedown && container.removeEventListener("touchstart", mousedown);
    mousemove && container.removeEventListener("touchmove", mousemove);
    const drag = objects.map(({ body }) => body);
    const touchStart = (event: TouchEvent) => {
      const { clientX, clientY } = event.changedTouches[0];
      const { left, top } = container.getBoundingClientRect();
      const point = { x: clientX - left, y: clientY - top };
      // 손가락이 카드 위에 있을 때만 잡는다. 빈 곳이면 스크롤로 넘긴다.
      if (Matter.Query.point(drag, point).length > 0 && mousedown) {
        mousedown(event);
      }
    };
    const touchMove = (event: TouchEvent) => {
      if (constraint.body && mousemove) mousemove(event);
    };
    container.addEventListener("touchstart", touchStart, { passive: false });
    container.addEventListener("touchmove", touchMove, { passive: false });
    // 속도 제한
    Matter.Events.on(engine, "beforeUpdate", () => {
      objects.forEach(({ body }) => {
        const { x, y } = body.velocity;
        const speed = Math.hypot(x, y);
        if (speed > max) {
          const scale = max / speed;
          Matter.Body.setVelocity(body, { x: x * scale, y: y * scale });
        }
      });
    });
    // 엔진 실행
    Matter.Runner.run(runner, engine);
    // 애니메이션 프레임 업데이트
    let animationFrame = 0;
    const update = () => {
      objects.forEach(({ el, body, initialX, initialY }) => {
        el.style.transform = `translate(${body.position.x - initialX}px, ${body.position.y - initialY}px) rotate(${body.angle}rad)`;
      });
      animationFrame = requestAnimationFrame(update);
    };
    update();
    // 창 크기 변경 시 벽 업데이트
    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      rectangle(ceiling, width / 2, -thick / 2, width, thick);
      rectangle(floor, width / 2, height + thick / 2, width, thick);
      rectangle(leftWall, -thick / 2, height / 2, thick, height);
      rectangle(rightWall, width + thick / 2, height / 2, thick, height);
    };
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animationFrame);
      Matter.Runner.stop(runner);
      Matter.Events.off(engine, "beforeUpdate");
      Matter.Composite.clear(engine.world, false);
      Matter.Engine.clear(engine);
      window.removeEventListener("resize", resize);
      container.removeEventListener("touchstart", touchStart);
      container.removeEventListener("touchmove", touchMove);
      mousemove && container.removeEventListener("mousemove", mousemove);
      mousedown && container.removeEventListener("mousedown", mousedown);
      mouseup && container.removeEventListener("mouseup", mouseup);
      mouseup && container.removeEventListener("touchend", mouseup);
      Matter.Mouse.clearSourceEvents(mouse);
    };
  }, [ref, drop]);
}
