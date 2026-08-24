import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; // 한국어 가져오기
import Hint from "./Hint";

dayjs.extend(relativeTime);
dayjs.locale("ko");

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>(null);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    if (!delay) return;
    const tick = setInterval(
      () => savedCallback.current && savedCallback.current(),
      delay,
    );
    return () => clearInterval(tick);
  }, [delay]);
}

export default function Main() {
  const [time, setTime] = useState(dayjs().format("A hh시 mm분 ss초"));
  const [date, setDate] = useState(dayjs().format("YYYY년 MM월 DD일 dd"));

  useInterval(() => {
    setTime(dayjs().format("A hh시 mm분 ss초"));
    setDate(dayjs().format("YYYY년 MM월 DD일 dd"));
  }, 100);

  return (
    <div className="main" id="main">
      <div className="main-scrim" />
      <div className="main-content" data-aos="fade-up" data-aos-duration="1000">
        <span className="main-kicker">FRONT-END &amp; BACK-END DEVELOPER</span>
        <h1 className="main-name">정호상</h1>
      </div>
      <div className="main-clock">
        <span className="main-clock-date">{date}</span>
        <span className="main-clock-time">{time}</span>
      </div>
      <div className="main-mark" aria-hidden="true">
        PORTFOLIO
      </div>
      <Hint />
    </div>
  );
}
