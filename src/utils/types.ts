import Matter from "matter-js";

export interface SpeedometerOptions {
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

// Matter.js가 생성하지만 @types/matter-js에는 누락된 이벤트 핸들러.
export interface Mouse extends Matter.Mouse {
  mousemove?: EventListener;
  mousedown?: EventListener;
  mouseup?: EventListener;
  mousewheel?: EventListener;
}

export interface IConstraintDefinition extends Matter.IConstraintDefinition {
  angularStiffness: number;
}
