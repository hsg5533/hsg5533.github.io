import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko"; // 한국어 가져오기

dayjs.extend(relativeTime);
dayjs.locale("ko");

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>(null);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    if (delay !== null) {
      const tick = setInterval(
        () => savedCallback.current && savedCallback.current(),
        delay
      );
      return () => clearInterval(tick);
    }
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
      <div className="mainL">
        <div className="mainL1">
          <p>
            {date}
            <br />
            {time}
          </p>
        </div>
        <div className="mainL2">
          <div className="down-txt">HOSANG</div>
          <div className="up-txt">PORTFOLIO</div>
        </div>
      </div>
      <div className="mainR"></div>
    </div>
  );
}
