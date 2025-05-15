import React from "react";
import "./assets/css/main.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Sec1 from "./components/Sec1";
import Sec2 from "./components/Sec2";
import Sec3 from "./components/Sec3";
import Sec4 from "./components/Sec4";
import Top from "./components/Top";

function App() {
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
