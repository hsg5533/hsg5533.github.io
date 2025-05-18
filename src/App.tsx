import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./assets/css/reset.css";
import "./assets/css/font.css";
import "./assets/css/navbar.css";
import "./assets/css/top.css";
import "./assets/css/main.css";
import "./assets/css/swiper.css";
import "./assets/css/slider.css";
import "./assets/css/sec1.css";
import "./assets/css/sec2.css";
import "./assets/css/sec3.css";
import "./assets/css/sec4.css";

import Header from "./components/Header";
import Main from "./components/Main";
import Sec1 from "./components/Sec1";
import Sec2 from "./components/Sec2";
import Sec3 from "./components/Sec3";
import Sec4 from "./components/Sec4";
import Top from "./components/Top";

function App() {
  useEffect(() => AOS.init(), []);

  return (
    <div id="wrap">
      <Header />
      <Main />
      <Sec1 />
      <Sec2 />
      <Sec3 />
      <Sec4 />
      <Top />
    </div>
  );
}

export default App;
