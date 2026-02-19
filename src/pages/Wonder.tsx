import React, { useEffect, useRef, useState } from "react";
import "../assets/css/wonder.css";

type TrackEvent = { t: number; freq: number; dur: number };
type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  hue: string;
};
type TabId = "particles" | "melody" | "kaleido" | "fortune" | "freq";
type U8AB = Uint8Array & { buffer: ArrayBuffer };

const NOTES = [0, 2, 4, 5, 7, 9, 11, 12];
const OCTS = [3, 4, 5, 6];

// 노트 이름
const NOTE_NAMES = [
  "C",
  "C♯",
  "D",
  "D♯",
  "E",
  "F",
  "F♯",
  "G",
  "G♯",
  "A",
  "A♯",
  "B",
];

// 코나미 코드
const KONAMI_SEQ = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

// 문서 루트의 CSS 변수 값 읽기
function getVarColor(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

// DPI(디바이스 픽셀 비율)에 맞춰 캔버스 실제 크기 조정
function resizeCanvas(cv: HTMLCanvasElement): void {
  const { width, height } = cv.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const w = Math.floor(width * ratio);
  const h = Math.floor(height * ratio);
  if (cv.width !== w || cv.height !== h) {
    cv.width = w;
    cv.height = h;
  }
}

// 포인터 이벤트를 캔버스 좌표로 변환
function canvasPos(
  canvas: HTMLCanvasElement,
  e: { clientX: number; clientY: number },
) {
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) * (canvas.width / rect.width);
  const y = (e.clientY - rect.top) * (canvas.height / rect.height);
  return { x, y };
}

// MIDI → Hz
function midiToHz(n: number): number {
  return 440 * Math.pow(2, (n - 69) / 12);
}

// 주파수 클램프 (20Hz~20kHz)
function clampHz(v: number): number {
  return Math.min(20000, Math.max(20, v));
}

// 코나미 코드 판정(버퍼 길이가 같을 때만 비교)
function isKonami(buf: string[]): boolean {
  if (buf.length !== KONAMI_SEQ.length) return false;
  return KONAMI_SEQ.every(
    (k, i) => (buf[i] ?? "").toLowerCase() === k.toLowerCase(),
  );
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// 파티클 버스트(생성만) — 컴포넌트는 결과만 push
function makeBurst(x: number, y: number, count: number) {
  const colors = [
    getVarColor("--accent"),
    getVarColor("--accent-2"),
    getVarColor("--good"),
    getVarColor("--warn"),
    getVarColor("--bad"),
  ];

  const out: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = rand(0, Math.PI * 2);
    const speed = rand(0.8, 4);
    out.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: rand(50, 110),
      size: rand(1, 3.8),
      hue: colors[(Math.random() * colors.length) | 0],
    });
  }
  return out;
}

let gAudioCtx: AudioContext | null = null;
let gAnalyser: AnalyserNode | null = null;
let gMaster: GainNode | null = null;

function buildAudio(): void {
  if (gAudioCtx) return;

  const AC = window.AudioContext;
  const ctx = new AC();

  // 마스터 게인(헤드룸) → 컴프레서(옵션) → 애널라이저 → 출력
  const master = ctx.createGain();
  master.gain.value = 0.9;

  const analyser = ctx.createAnalyser();
  analyser.fftSize = 2048;
  analyser.smoothingTimeConstant = 0.85;

  master.connect(analyser);
  analyser.connect(ctx.destination);

  gAudioCtx = ctx;
  gMaster = master;
  gAnalyser = analyser;
}

/** 사용자 제스처 직후 호출 권장 (모바일/사파리 정책 대응) */
async function ensureAudio() {
  buildAudio();

  if (gAudioCtx?.state === "suspended") {
    await gAudioCtx.resume();
  }
}

/** 오디오 노드 접근자 */
function getAudio() {
  buildAudio();
  return { ctx: gAudioCtx!, master: gMaster!, analyser: gAnalyser! };
}

export default function Wonder() {
  const [tab, setTab] = useState<TabId>("particles");
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const scopeRef = useRef<HTMLCanvasElement>(null);
  const position = useRef<{ x: number; y: number } | null>(null);
  const particles = useRef<Particle[]>([]);
  const dragging = useRef(false);
  const intensity = useRef(36);
  const gravity = useRef(0.18);
  const scopeRAF = useRef<number | null>(null);
  const scopeBuf = useRef<U8AB | null>(null);
  const track = useRef<TrackEvent[]>([]);
  const start = useRef(0);
  const [record, setRecord] = useState(false);
  const [sweep, setSweep] = useState(false);
  const [sweepEnd, setSweepEnd] = useState(880);
  const [sweepStart, setSweepStart] = useState(440);
  const [sweepDuration, setSweepDuration] = useState(2.0);
  const [hertz, setHertz] = useState(440);
  const [volume, setVolume] = useState(0.9);
  const [duration, setDuration] = useState(1.0);
  const [wave, setWave] = useState<OscillatorType>("sine");
  const oscillatorNode = useRef<OscillatorNode | null>(null);
  const gainNode = useRef<GainNode | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // 초기/윈도우 리사이즈에 맞춰 3개 캔버스 동기 리사이즈
    const onResize = () => {
      if (particlesRef.current) resizeCanvas(particlesRef.current);
      if (scopeRef.current) resizeCanvas(scopeRef.current);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const cv = particlesRef.current!;
    const ctx = cv.getContext("2d")!;
    const buf: string[] = [];

    window.addEventListener("keydown", (e) => {
      buf.push(e.key);
      if (buf.length > KONAMI_SEQ.length) buf.shift();
      if (isKonami(buf)) {
        const cv = particlesRef.current!;
        const rect = cv.getBoundingClientRect();
        for (let i = 0; i < 18; i++) {
          const x = Math.random() * rect.width;
          const y = Math.random() * rect.height;
          const fakeEvt = { clientX: rect.left + x, clientY: rect.top + y };
          const pos = canvasPos(cv, fakeEvt);
          particles.current.push(...makeBurst(pos.x, pos.y, 80));
        }
      }
    });
    window.addEventListener("keydown", (e) => {
      if (e.key.toLowerCase() === "c") particles.current.length = 0;
    });

    const frame = () => {
      resizeCanvas(cv);
      ctx.clearRect(0, 0, cv.width, cv.height);

      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.vy += gravity.current * 0.08;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;

        if (p.life <= 0) {
          particles.current.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = Math.max(0, p.life / 110);
        ctx.fillStyle = p.hue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(frame);
    };
    animationRef.current = requestAnimationFrame(frame);

    cv.addEventListener("pointerdown", (e) => {
      dragging.current = true;
      const pos = canvasPos(cv, e);
      particles.current.push(...makeBurst(pos.x, pos.y, intensity.current));
      position.current = pos;
    });
    window.addEventListener(
      "pointermove",
      (e) => {
        if (!dragging.current) return;
        const { x, y } = canvasPos(cv, e);
        const last = position.current!;
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.hypot(dx, dy);
        const steps = Math.min(8, Math.max(1, Math.floor(dist / 6)));
        for (let i = 0; i < steps; i++) {
          const px = last.x + (dx * i) / steps;
          const py = last.y + (dy * i) / steps;
          particles.current.push(...makeBurst(px, py, 4));
        }
        position.current = { x, y };
      },
      { passive: true },
    );
    window.addEventListener("pointerup", () => (dragging.current = false));
    window.addEventListener("pointercancel", () => (dragging.current = false));
  }, []);

  useEffect(() => {
    if (tab === "freq") {
      ensureAudio().then(() => {
        const { analyser } = getAudio();
        if (!scopeRef.current || !analyser) return;

        const draw = () => {
          if (!scopeRef.current) return;
          const canvas = scopeRef.current;
          const context = canvas.getContext("2d")!;
          resizeCanvas(canvas);
          const { width, height } = canvas;
          context.clearRect(0, 0, width, height);
          context.strokeStyle = "rgba(255,255,255,0.25)";
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(0, height / 2);
          context.lineTo(width, height / 2);
          context.stroke();
          if (
            !scopeBuf.current ||
            scopeBuf.current.length !== analyser.fftSize
          ) {
            // ArrayBuffer 기반으로 생성 + U8AB로 단언
            scopeBuf.current = new Uint8Array(
              new ArrayBuffer(analyser.fftSize),
            );
          }
          (analyser.getByteTimeDomainData as (a: Uint8Array) => void)(
            scopeBuf.current!,
          );

          const data = scopeBuf.current;
          context.strokeStyle = "rgba(255,255,255,0.9)";
          context.lineWidth = 2;
          context.beginPath();
          const step = width / data.length;
          for (let i = 0; i < data.length; i++) {
            const v = data[i] / 255; // 0..1
            const y = (1 - v) * height; // top..bottom
            if (i === 0) context.moveTo(0, y);
            else context.lineTo(i * step, y);
          }
          context.stroke();
          scopeRAF.current = requestAnimationFrame(draw);
        };

        if (!scopeRAF.current) scopeRAF.current = requestAnimationFrame(draw);
      });
    } else {
      scopeRAF.current && cancelAnimationFrame(scopeRAF.current);
      scopeRAF.current = null;
    }
  }, [tab]);

  // 단발음 재생
  const playFreq = async (freq: number, dur = 0.35) => {
    await ensureAudio();
    const { ctx, master } = getAudio();
    const now = ctx.currentTime;
    const o = ctx.createOscillator();
    const env = ctx.createGain();
    o.type = "triangle";
    o.frequency.value = freq;
    env.gain.value = 0;
    o.connect(env);
    env.connect(master);
    o.start(now);
    env.gain.linearRampToValueAtTime(0.9, now + 0.02);
    env.gain.linearRampToValueAtTime(0, now + dur);
    o.stop(now + dur + 0.02);
  };

  // 멜로디 녹음/재생

  const stopTone = () => {
    const { ctx } = getAudio();
    if (gainNode.current && ctx) {
      const now = ctx.currentTime;
      gainNode.current.gain.linearRampToValueAtTime(0, now + 0.05);
    }
    oscillatorNode.current?.stop();
    oscillatorNode.current = null;
    gainNode.current = null;
  };

  // 실시간 파라미터 반영
  useEffect(() => {
    const { ctx } = getAudio();
    if (!ctx || !oscillatorNode.current) return;
    oscillatorNode.current.frequency.setValueAtTime(
      clampHz(hertz),
      ctx.currentTime,
    );
  }, [hertz]);

  useEffect(() => {
    const { ctx } = getAudio();
    if (!ctx || !gainNode.current) return;
    gainNode.current.gain.linearRampToValueAtTime(
      volume,
      ctx.currentTime + 0.05,
    );
  }, [volume]);

  useEffect(() => {
    if (oscillatorNode.current) oscillatorNode.current.type = wave;
  }, [wave]);

  // 스위프(1회)

  return (
    <>
      <header className="sticky">
        <div className="max bar">
          <div className="logo">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 2l2.7 5.47L20.8 8l-4 3.9.94 5.8L12 15.9 6.26 17.7l.94-5.8L3.2 8l6.1-.53L12 2z"
                stroke="var(--accent)"
                strokeWidth="1.2"
                fill="rgba(124,221,255,0.08)"
              />
            </svg>
            <span style={{ color: "var(--text)" }}>wonderlab</span>
          </div>
        </div>
      </header>

      <div className="wonder">
        <div className="head max">
          <div className="tabs" role="tablist">
            <button
              className="tab"
              role="tab"
              aria-selected={tab === "particles"}
              aria-controls="pane-particles"
              id="tab-particles"
              onClick={() => setTab("particles")}
            >
              <span className="tab-icon">✦</span>
              파티클
            </button>
            <button
              className="tab"
              role="tab"
              aria-selected={tab === "melody"}
              aria-controls="pane-melody"
              id="tab-melody"
              onClick={() => setTab("melody")}
            >
              <span className="tab-icon">♪</span>
              멜로디
            </button>
            <button
              className="tab"
              role="tab"
              aria-selected={tab === "freq"}
              aria-controls="pane-freq"
              id="tab-freq"
              onClick={() => setTab("freq")}
            >
              <span className="tab-icon">〜</span>
              주파수
            </button>
          </div>
        </div>

        <div id="pane-particles" hidden={tab !== "particles"}>
          <div className="pane-body">
            <div className="controls">
              <label className="control">
                <span className="control-label">강도</span>
                <input
                  type="range"
                  min={8}
                  max={90}
                  defaultValue={36}
                  onChange={(e) =>
                    (intensity.current = Number(e.currentTarget.value))
                  }
                />
              </label>
              <label className="control">
                <span className="control-label">중력</span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.02}
                  defaultValue={0.18}
                  onChange={(e) =>
                    (gravity.current = Number(e.currentTarget.value))
                  }
                />
              </label>
              <button
                className="btn btn-danger"
                onClick={() => (particles.current.length = 0)}
              >
                지우기
              </button>
              <span className="hint">
                클릭/탭: 폭죽 · 드래그: 소용돌이 ·{" "}
                <span className="kbd">C</span> 지우기
              </span>
            </div>
          </div>
          <div className="canvas-wrap">
            <canvas
              aria-label="파티클 캔버스"
              tabIndex={0}
              ref={particlesRef}
            />
          </div>
        </div>

        {/* Melody Pane */}
        <div
          id="pane-melody"
          role="tabpanel"
          aria-labelledby="tab-melody"
          hidden={tab !== "melody"}
        >
          <div className="pane-body">
            <div className="controls" style={{ marginBottom: 16 }}>
              <button
                className="btn btn-accent pulse"
                onClick={async () => {
                  await ensureAudio();
                  if (track.current.length === 0) {
                    const demo = [0, 2, 4, 7, 12, 7, 4, 2, 0].map((n) => ({
                      t: n * 160,
                      freq: midiToHz(60 + n),
                      dur: 260,
                    }));
                    track.current.splice(0, 0, ...demo);
                  }
                  const { ctx, master } = getAudio();
                  const start = ctx.currentTime + 0.05;
                  for (const ev of track.current) {
                    const when = start + ev.t / 1000;
                    const o = ctx.createOscillator();
                    const g = ctx.createGain();
                    o.type = "sine";
                    o.frequency.value = ev.freq;
                    o.connect(g);
                    g.connect(master);
                    g.gain.setValueAtTime(0, when);
                    g.gain.linearRampToValueAtTime(0.9, when + 0.02);
                    g.gain.linearRampToValueAtTime(0, when + ev.dur / 1000);
                    o.start(when);
                    o.stop(when + ev.dur / 1000 + 0.02);
                  }
                }}
              >
                ▶ 재생
              </button>
              <button
                className={`btn ${record ? "btn-danger" : ""}`}
                onClick={() => {
                  setRecord((r) => {
                    const next = !r;
                    if (next) {
                      track.current.length = 0;
                      start.current = performance.now();
                    }
                    return next;
                  });
                }}
              >
                {record ? "■ 멈춤" : "● 녹음"}
              </button>
              <button
                className="btn"
                onClick={() => (track.current.length = 0)}
              >
                지우기
              </button>
            </div>

            <div className="grid" aria-label="멜로디 타일">
              {OCTS.map((oct) => (
                <React.Fragment key={`oct-${oct}`}>
                  <span className="oct-label">Oct {oct}</span>
                  {NOTES.map((step) => {
                    const midi = 12 * oct + step;
                    const name = NOTE_NAMES[midi % 12] + oct;
                    const freq = midiToHz(midi);
                    let hold: number | undefined;
                    const onUp = () => {
                      if (hold) window.clearInterval(hold);
                    };
                    return (
                      <button
                        key={name}
                        className="btn"
                        aria-label={name}
                        onPointerDown={(e) => {
                          e.preventDefault();
                          playFreq(freq, 0.5);
                          if (record) {
                            const t = performance.now() - start.current;
                            track.current.push({ t, freq, dur: 500 });
                          }
                          hold = window.setInterval(
                            () => playFreq(freq, 0.5),
                            400,
                          );
                        }}
                        onPointerUp={onUp}
                        onPointerLeave={onUp}
                        onPointerCancel={onUp}
                      >
                        {name}
                      </button>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Frequency Pane */}
        <div
          id="pane-freq"
          role="tabpanel"
          aria-labelledby="tab-freq"
          hidden={tab !== "freq"}
        >
          <div className="pane-body">
            <div className="section-title">기본 설정</div>
            <div className="freq-grid">
              <label className="control">
                <span className="control-label">주파수(Hz)</span>
                <input
                  type="number"
                  value={hertz}
                  onChange={(e) =>
                    setHertz(clampHz(Number(e.currentTarget.value)))
                  }
                />
              </label>
              <label className="control">
                <span className="control-label">길이(s)</span>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) =>
                    setDuration(
                      Math.min(
                        10,
                        Math.max(0.1, Number(e.currentTarget.value)),
                      ),
                    )
                  }
                />
              </label>
              <label className="control">
                <span className="control-label">파형</span>
                <select
                  value={wave}
                  onChange={(e) =>
                    setWave(e.currentTarget.value as OscillatorType)
                  }
                >
                  <option value="sine">sine</option>
                  <option value="square">square</option>
                  <option value="sawtooth">sawtooth</option>
                  <option value="triangle">triangle</option>
                </select>
              </label>
              <label className="control">
                <span className="control-label">볼륨</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round(volume * 100)}
                  onChange={(e) =>
                    setVolume(Number(e.currentTarget.value) / 100)
                  }
                />
              </label>
            </div>

            <div className="btn-group" style={{ marginBottom: 16 }}>
              <button
                className="btn btn-accent"
                onClick={async () => {
                  await ensureAudio();
                  const { ctx, master } = getAudio();
                  const o = ctx.createOscillator();
                  const v = ctx.createGain();
                  const env = ctx.createGain();
                  o.type = wave;
                  o.frequency.value = clampHz(hertz);
                  v.gain.value = volume;
                  env.gain.value = 0;
                  o.connect(env);
                  env.connect(v);
                  v.connect(master);
                  const now = ctx.currentTime;
                  env.gain.linearRampToValueAtTime(1, now + 0.02);
                  env.gain.linearRampToValueAtTime(0, now + duration);
                  o.start(now);
                  o.stop(now + duration + 0.02);
                }}
              >
                ▶ 1회 재생
              </button>
              <button
                className="btn"
                onClick={async () => {
                  await ensureAudio();
                  stopTone();
                  const { ctx, master } = getAudio();
                  const o = ctx.createOscillator();
                  const v = ctx.createGain();
                  o.type = wave;
                  o.frequency.value = clampHz(hertz);
                  v.gain.value = 0;
                  o.connect(v);
                  v.connect(master);
                  const now = ctx.currentTime;
                  v.gain.linearRampToValueAtTime(volume, now + 0.05);
                  o.start(now);
                  oscillatorNode.current = o;
                  gainNode.current = v;
                }}
              >
                ∞ 지속 재생
              </button>
              <button className="btn btn-danger" onClick={stopTone}>
                ■ 정지
              </button>
            </div>

            <div className="note">
              <strong>Sweep</strong>
              <div className="freq-grid">
                <label className="control">
                  <span className="control-label">시작(Hz)</span>
                  <input
                    type="number"
                    min={20}
                    max={20000}
                    step={1}
                    value={sweepStart}
                    onChange={(e) =>
                      setSweepStart(clampHz(Number(e.currentTarget.value)))
                    }
                  />
                </label>
                <label className="control">
                  <span className="control-label">끝(Hz)</span>
                  <input
                    type="number"
                    min={20}
                    max={20000}
                    step={1}
                    value={sweepEnd}
                    onChange={(e) =>
                      setSweepEnd(clampHz(Number(e.currentTarget.value)))
                    }
                  />
                </label>
                <label className="control">
                  <span className="control-label">시간(s)</span>
                  <input
                    type="number"
                    min={0.1}
                    max={20}
                    step={0.1}
                    value={sweepDuration}
                    onChange={(e) =>
                      setSweepDuration(
                        Math.min(
                          20,
                          Math.max(0.1, Number(e.currentTarget.value)),
                        ),
                      )
                    }
                  />
                </label>
                <label className="control">
                  <span className="control-label">곡선</span>
                  <select
                    value={sweep ? "exp" : "lin"}
                    onChange={(e) => setSweep(e.currentTarget.value === "exp")}
                  >
                    <option value="lin">linear</option>
                    <option value="exp">exponential</option>
                  </select>
                </label>
              </div>
              <button
                className="btn btn-accent"
                style={{ marginTop: 10 }}
                onClick={async () => {
                  await ensureAudio();
                  const { ctx, master } = getAudio();
                  const o = ctx.createOscillator();
                  const v = ctx.createGain();
                  o.type = wave;
                  const start = clampHz(sweepStart);
                  const end = clampHz(sweepEnd);
                  v.gain.value = 0;
                  o.connect(v);
                  v.connect(master);

                  const now = ctx.currentTime;
                  v.gain.linearRampToValueAtTime(volume, now + 0.05);

                  if (sweep) {
                    const safeStart = Math.max(0.001, start);
                    const safeEnd = Math.max(0.001, end);
                    o.frequency.setValueAtTime(safeStart, now);
                    o.frequency.exponentialRampToValueAtTime(
                      safeEnd,
                      now + sweepDuration,
                    );
                  } else {
                    o.frequency.setValueAtTime(start, now);
                    o.frequency.linearRampToValueAtTime(
                      end,
                      now + sweepDuration,
                    );
                  }

                  v.gain.linearRampToValueAtTime(0, now + sweepDuration + 0.05);
                  o.start(now);
                  o.stop(now + sweepDuration + 0.1);
                }}
              >
                ▶ 스위프 재생
              </button>
            </div>

            <div className="scope-wrap">
              <canvas aria-label="오실로스코프 파형" ref={scopeRef} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
