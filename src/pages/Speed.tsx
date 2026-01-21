import React, { useEffect } from "react";
import "../assets/css/speed.css";

interface SpeedometerOptions {
  maxValue: number; // e.g., 180
  smallFactor: number; // distance between labeled major ticks
  dangerRange: number; // from this value and up -> "danger" color
  initialAngle: number; // e.g., -45
  totalAngle: number; // e.g., 270
  outerRadius: number; // gauge radius in px
  needleHeight: number;
  needleOffset: number;
  needleLength: number;
  indicatorRadius: number; // radius where ticks are placed
  labelRadius: number; // radius where labels are placed
  labelSize: number; // label circle size (px)
  smallTick: number; // every Nth tick is a "major" tick
  multiplier: number; // value display multiplier
  majorTickWidth: number;
  majorTickHeight: number;
  minorTickWidth: number;
  minorTickHeight: number;
  eventType: string;
  unitLabel: string; // e.g., 'km/h'
}

class Speedometer {
  private targetInput: HTMLInputElement;
  private config: SpeedometerOptions;
  private indicatorHtml = "";
  private totalTicks: number;
  private degreesTick: number;
  private diameter: number;
  private labelOffset: number;
  private wrapperId: string;
  private wrapperElement: HTMLDivElement;
  constructor(targetElement: string, options = {}) {
    this.targetInput = document.querySelector(targetElement)!!;
    this.config = Object.assign(
      {
        maxValue: 180,
        smallFactor: 10,
        dangerRange: 120,
        initialAngle: -45,
        totalAngle: 270,
        outerRadius: 150,
        needleHeight: 4,
        needleOffset: 95,
        needleLength: 13,
        indicatorRadius: 125,
        labelRadius: 90,
        labelSize: 80,
        smallTick: 2,
        multiplier: 1,
        majorTickWidth: 20,
        majorTickHeight: 4,
        minorTickWidth: 10,
        minorTickHeight: 3,
        eventType: "change",
        unitLabel: "km/h",
      },
      options,
    );
    this.indicatorHtml = "";
    this.totalTicks = this.config.maxValue / this.config.smallFactor;
    this.degreesTick = this.config.totalAngle / this.totalTicks;
    this.diameter = 2 * this.config.outerRadius;
    this.labelOffset = this.config.outerRadius - this.config.labelSize / 2;
    this.wrapperId = "speedometerWrapper-" + this.targetInput.id;
    const wrapper = document.createElement("div");
    wrapper.id = this.wrapperId;
    this.targetInput.parentNode?.insertBefore(wrapper, this.targetInput);
    wrapper.appendChild(this.targetInput);
    this.wrapperElement = wrapper;
    this.wrapperElement.insertAdjacentHTML(
      "beforeend",
      `<style>${`#${this.wrapperId} .envelope{width:${this.diameter}px;height:${
        this.diameter
      }px;}#${this.wrapperId} .speedNobe{height:${
        this.config.needleHeight
      }px;top:${
        this.config.outerRadius - this.config.needleHeight / 2
      }px;transform:rotate(${this.config.initialAngle}deg);}#${
        this.wrapperId
      } .speedPosition{width:${this.config.labelSize}px;height:${
        this.config.labelSize
      }px;top:${this.labelOffset}px;left:${this.labelOffset}px;}#${
        this.wrapperId
      } .speedNobe div{width:${this.config.needleOffset}px;left:${
        this.config.needleLength
      }px;}#${this.wrapperId} .nob{width:${
        this.config.majorTickWidth
      }px;height:${this.config.majorTickHeight}px;}#${
        this.wrapperId
      } .numb{width:${this.config.majorTickWidth}px;height:${
        this.config.majorTickHeight
      }px;}#${this.wrapperId} .midTick{width:${
        this.config.minorTickWidth
      }px;height:${this.config.minorTickHeight}px;}`}</style>`,
    );
    for (let i = 0; i <= this.totalTicks; i++) {
      const angleDeg = this.config.initialAngle + i * this.degreesTick;
      const isDanger =
        i * this.config.smallFactor >= this.config.dangerRange ? "danger" : "";
      const rad = (Math.PI / 180) * angleDeg;
      const outerX = this.config.indicatorRadius * Math.cos(rad);
      const outerY = this.config.indicatorRadius * Math.sin(rad);
      const labelX = this.config.labelRadius * Math.cos(rad);
      const labelY = this.config.labelRadius * Math.sin(rad);
      if (i % this.config.smallTick === 0) {
        this.indicatorHtml += `<div class="nob ${isDanger}"style="left:${
          this.config.outerRadius - outerX - 10
        }px;top:${
          this.config.outerRadius - outerY - 2
        }px;${`transform:rotate(${angleDeg}deg);`}"></div><div class="numb ${isDanger}"style="left:${
          this.config.outerRadius - labelX - this.config.majorTickHeight / 2
        }px;top:${
          this.config.outerRadius - labelY - this.config.majorTickWidth / 2
        }px;"></div>`;
      } else {
        this.indicatorHtml += `<div class="nob ${isDanger} midTick"style="left:${
          this.config.outerRadius - outerX - this.config.minorTickWidth / 2
        }px;top:${
          this.config.outerRadius - outerY - this.config.minorTickHeight / 2
        }px;${`transform:rotate(${angleDeg}deg);`}"></div><div class="numb"></div>`;
      }
    }
    this.wrapperElement.insertAdjacentHTML(
      "beforeend",
      `<div class="envelope"><div class="speedNobe"><div></div></div><div class="speedPosition"></div>${this.indicatorHtml}</div>`,
    );
    this.targetInput.addEventListener(this.config.eventType, () => {
      const raw = parseFloat(this.targetInput.value);
      const angle =
        (this.config.totalAngle / this.config.maxValue) * raw +
        this.config.initialAngle;
      const needleElem = this.wrapperElement.querySelector(
        ".speedNobe",
      ) as HTMLElement;
      needleElem.style.transform = `rotate(${angle}deg)`;
      const allTicks = this.wrapperElement.querySelectorAll(".envelope .nob");
      const allLabels = this.wrapperElement.querySelectorAll(".envelope .numb");
      this.wrapperElement.querySelector(".speedPosition")!!.innerHTML =
        `<strong>${raw * this.config.multiplier}%</strong><br/>${
          this.config.unitLabel
        }`;
      allTicks.forEach((node) => node.classList.remove("bright"));
      allLabels.forEach((node) => node.classList.remove("bright"));
      for (let idx = 0; idx <= this.totalTicks; idx++) {
        if (raw >= idx * this.config.smallFactor) {
          allTicks[idx].classList.add("bright");
          allLabels[idx].classList.add("bright");
        } else {
          break;
        }
      }
    });
  }
}

// BenchmarkManager
class BenchmarkManager {
  private targetInput: HTMLInputElement;
  private workerList: Worker[];
  private workerMessage: number[];
  private totalCore: number;
  private scores: HTMLElement;
  private cores: HTMLSpanElement;
  private progress: HTMLElement;
  private progressBar: HTMLDivElement;
  private singleScore: HTMLElement;
  private singleBench: HTMLElement;
  private multiScore: HTMLElement;
  private multiBench: HTMLElement;
  private startButtons: NodeListOf<HTMLElement>;
  private restartIcon: HTMLElement;
  private singleInterval: number | null;
  private multiInterval: number | null;
  constructor(targetElement: string) {
    this.workerList = [];
    this.workerMessage = [];
    this.totalCore = navigator.hardwareConcurrency || 1;
    this.targetInput = document.querySelector(targetElement)!!;
    this.scores = document.querySelector(".scores")!!;
    this.cores = document.querySelector(".detected span")!!;
    this.progress = document.querySelector(".progress-bar")!!;
    this.progressBar = document.querySelector(".progress-bar div")!!;
    this.singleScore = document.querySelector("#single .score")!!;
    this.singleBench = document.querySelector("#single .bench")!!;
    this.multiScore = document.querySelector("#multi .score")!!;
    this.multiBench = document.querySelector("#multi .bench")!!;
    this.startButtons = document.querySelectorAll("#start, .restart")!!;
    this.restartIcon = document.querySelector(".restart")!!;
    this.singleInterval = null;
    this.multiInterval = null;
  }
  init() {
    this.updateSpeedometer(0);
    this.cores.textContent = String(this.totalCore);
    this.startButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        let singleProgress = 0;
        let multiProgress = 0;
        this.workerList = [];
        this.workerMessage = [];
        this.scores.style.display = "block";
        this.progress.classList.add("visible");
        this.startButtons.forEach((e) => (e.style.display = "none"));
        this.progressBar.style.transition = "width 20s linear";
        this.progressBar.style.width = "100%";
        // 싱글코어 준비
        this.singleScore.style.display = "none";
        this.singleBench.style.display = "inline-block";
        this.updateSpeedometer(Math.floor(100 / this.totalCore));
        // 워커 1개 생성
        this.createWorker();
        // 싱글코어 진행
        this.singleInterval = window.setInterval(() => {
          singleProgress++;
          this.progressBar.textContent = `${singleProgress}%`;
          if (singleProgress >= 100) {
            this.singleInterval && clearInterval(this.singleInterval);
            this.singleBench.style.display = "none";
            this.singleScore.style.display = "inline-block";
            this.singleScore.textContent = String(this.workerMessage[0]);
            this.progressBar.style.transition = "width 0s linear";
            this.progressBar.style.width = "0%";
            this.progressBar.textContent = "0%";
            this.updateSpeedometer(0);
            this.workerList.forEach((worker) => worker.terminate());
            this.workerList = [];
            this.workerMessage = [];
            // 멀티코어 테스트 시작
            setTimeout(() => {
              for (let i = 0; i < this.totalCore; i++) {
                this.createWorker();
              }
              this.progressBar.style.transition = "width 20s linear";
              this.progressBar.style.width = "100%";
              this.multiScore.style.display = "none";
              this.multiBench.style.display = "inline-block";
              this.updateSpeedometer(100);
              this.multiInterval = window.setInterval(() => {
                multiProgress++;
                this.progressBar.textContent = `${multiProgress}%`;
                if (multiProgress >= 100) {
                  this.multiInterval && clearInterval(this.multiInterval);
                  this.progress.classList.remove("visible");
                  this.multiBench.style.display = "none";
                  this.restartIcon.style.display = "inline-block";
                  this.multiScore.style.display = "inline-block";
                  this.multiScore.textContent = String(
                    this.workerMessage.reduce((acc, c) => acc + c, 0),
                  );
                  this.progressBar.style.transition = "width 0s linear";
                  this.progressBar.style.width = "0%";
                  this.progressBar.textContent = "0%";
                  this.workerList.forEach((worker) => worker.terminate());
                  this.workerList = [];
                  this.updateSpeedometer(0);
                }
              }, 200);
            }, 1000);
          }
        }, 200);
      });
    });
  }
  updateSpeedometer(value: number) {
    this.targetInput.value = String(value);
    this.targetInput.dispatchEvent(new Event("change"));
  }
  createWorker() {
    const thread = `for(;;)fibonacci(32),postMessage('u');function fibonacci(n){return n<=1?1:fibonacci(n-1)+fibonacci(n-2)}`;
    const blob = new Blob([thread], { type: "application/javascript" });
    const worker = new Worker(URL.createObjectURL(blob));
    const idx = this.workerMessage.length;
    this.workerList.push(worker);
    this.workerMessage.push(0);
    worker.onmessage = () => this.workerMessage[idx]++;
  }
}

export default function Speed() {
  useEffect(() => {
    const targetInputId = "#velocimetro";
    new Speedometer(targetInputId, {
      maxValue: 100,
      dangerRange: 90,
      unitLabel: "<small>CPU Usage</small>",
    });
    new BenchmarkManager(targetInputId).init();
  }, []);
  return (
    <main>
      <div className="vel-container">
        <input type="hidden" id="velocimetro" />
      </div>
      <br />
      <p className="detected">
        <span></span> cores detected
      </p>
      <div className="center">
        <button id="start" className="start">
          <b>START</b>
          <br />
          Benchmark
        </button>
      </div>
      <div className="progress-bar">
        <div>0%</div>
      </div>
      <div className="center iconos">
        <div className="icon restart">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="undo-alt"
            className="svg-inline--fa fa-undo-alt fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M255.545 8c-66.269.119-126.438 26.233-170.86 68.685L48.971 40.971C33.851 25.851 8 36.559 8 57.941V192c0 13.255 10.745 24 24 24h134.059c21.382 0 32.09-25.851 16.971-40.971l-41.75-41.75c30.864-28.899 70.801-44.907 113.23-45.273 92.398-.798 170.283 73.977 169.484 169.442C423.236 348.009 349.816 424 256 424c-41.127 0-79.997-14.678-110.63-41.556-4.743-4.161-11.906-3.908-16.368.553L89.34 422.659c-4.872 4.872-4.631 12.815.482 17.433C133.798 479.813 192.074 504 256 504c136.966 0 247.999-111.033 248-247.998C504.001 119.193 392.354 7.755 255.545 8z"></path>
          </svg>
        </div>
      </div>
      <section className="scores">
        <h4>Scores</h4>
        <div id="single">
          <div>Single core:</div>
          <div className="score"></div>
          <div className="bench"></div>
        </div>
        <div id="multi">
          <div>Multi core:</div>
          <div className="score"></div>
          <div className="bench"></div>
        </div>
      </section>
    </main>
  );
}
