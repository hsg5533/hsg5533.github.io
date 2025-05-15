import React from "react";
import react from "../assets/img/icon/react.png";
import reactnative from "../assets/img/icon/reactnative.png";
import springboot from "../assets/img/icon/springboot.png";
import python from "../assets/img/icon/python.png";
import vscode from "../assets/img/icon/vscode.png";
import mysql from "../assets/img/icon/mysql.png";
import java from "../assets/img/icon/java.png";
import html from "../assets/img/icon/Html.png";
import css from "../assets/img/icon/css.png";
import sql from "../assets/img/icon/sql.png";
import js from "../assets/img/icon/js.png";
import ts from "../assets/img/icon/ts.png";

export default function Sec2() {
  return (
    <div className="sec sec2" id="sec2">
      <div className="sec2title">
        <h2>SKILLS</h2>
      </div>
      <div className="sec2_box">
        <div className="skill-chart">
          <div className="skill-title">FRONT-END & BACK-END</div>
          <div className="skill-list">
            <div className="skill-title">USED IT</div>
            <ul className="skill-logo">
              <li>
                <img src={react} alt="react" />
              </li>
              <li>
                <img src={reactnative} alt="reactnative" />
              </li>
              <li>
                <img src={springboot} alt="springboot" />
              </li>
              <li>
                <img src={js} alt="javascript" />
              </li>
              <li>
                <img src={ts} alt="typescript" />
              </li>
              <li>
                <img src={java} alt="java" />
              </li>
              <li>
                <img src={html} alt="html" />
              </li>
              <li>
                <img src={css} alt="css" />
              </li>
              <li>
                <img src={vscode} alt="vscode" />
              </li>
              <li>
                <img src={python} alt="python" />
              </li>
              <li>
                <img src={sql} alt="sql" />
              </li>
              <li>
                <img src={mysql} alt="mysql" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
