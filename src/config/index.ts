export type ShapeName = 'triangle' | 'starFive' | 'heart' | 'eight' | 'circular';

export type TriangleDirection = 'up' | 'down' | 'left' | 'right';

export interface BaseShapeValues {
  angle: number;
  color: string;
}

export interface TriangleValues extends BaseShapeValues {
  direction: TriangleDirection;
  width: number;
  height: number;
}

export interface HeartValues extends BaseShapeValues {
  width: number;
  height: number;
}

export interface StarFiveValues extends BaseShapeValues {
  width: number;
  height: number;
}

export interface EightValues extends BaseShapeValues {
  size: number;
  bw: number;
}

export interface CircularValues extends BaseShapeValues {
  size: number;
  sw: number;
}

export type ShapeValuesMap = {
  triangle: TriangleValues;
  starFive: StarFiveValues;
  heart: HeartValues;
  eight: EightValues;
  circular: CircularValues;
};

export type ShapeValues = ShapeValuesMap[ShapeName];
export type ShapeFieldName =
  | keyof TriangleValues
  | keyof StarFiveValues
  | keyof HeartValues
  | keyof EightValues
  | keyof CircularValues;

type SliderColumn = {
  type: 'slider';
  name: ShapeFieldName;
  label: string;
  max?: number;
};

type InputColumn = {
  type: 'input';
  name: ShapeFieldName;
  label: string;
};

type RadioColumn = {
  type: 'radio';
  name: ShapeFieldName;
  label: string;
  list: Array<{ value: string; label: string }>;
};

export type FormColumn = SliderColumn | InputColumn | RadioColumn;

export interface ShapeConfig<T extends ShapeValues> {
  columns: FormColumn[];
  cssTemplate: string;
  data: T;
}

type ShapeConfigMap = {
  [K in ShapeName]: ShapeConfig<ShapeValuesMap[K]>;
};

const allConfig: ShapeConfigMap = {
  heart: {
    columns: [
      { name: 'width', label: '宽度', type: 'slider' },
      { name: 'height', label: '高度', type: 'slider' },
      { name: 'angle', label: '旋转角度', type: 'slider', max: 360 },
    ],
    data: {
      width: 25,
      height: 40,
      angle: 0,
      color: 'rgb(18, 15, 222)',
    },
    cssTemplate: `
.heart {
  --cwidth: calc(var(--width) * 1px);
  --cheight: calc(var(--height) * 1px);
  --cangle: calc(var(--angle) * 1deg);
  height: 5px;
  width: 5px;
  transform: rotate(var(--cangle));
  position: relative;
}

.heart::before,
.heart::after {
  position: absolute;
  top: 0;
  content: '';
  background: var(--color);
  left: var(--cwidth);
  width: var(--cwidth);
  height: var(--cheight);
  border-radius: var(--cheight) var(--cheight) 0 0;
  transform: rotate(-45deg);
  transform-origin: 0 100%;
}

.heart::after {
  left: 0;
  transform: rotate(45deg);
  transform-origin: 100% 100%;
}`,
  },
  starFive: {
    columns: [
      { name: 'width', label: '宽度', type: 'slider' },
      { name: 'angle', label: '旋转角度', type: 'slider', max: 360 },
    ],
    data: {
      width: 60,
      height: 60,
      angle: 0,
      color: 'rgb(18, 15, 222)',
    },
    cssTemplate: `
.starFive,
.starFive::before,
.starFive::after {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: calc(var(--width) * 0.726542px) calc(var(--width) * 1px) 0 calc(var(--width) * 1px);
  border-color: var(--color) transparent transparent transparent;
}

.starFive {
  position: relative;
  transform: rotate(calc(var(--angle) * 1deg));
}

.starFive::before {
  content: '';
  position: absolute;
  transform: translate(-50%, -100%) rotate(70deg);
}

.starFive::after {
  content: '';
  position: absolute;
  transform: translate(-50%, -100%) rotate(-70deg);
}`,
  },
  triangle: {
    columns: [
      {
        name: 'direction',
        label: '方向',
        type: 'radio',
        list: [
          { value: 'up', label: '上' },
          { value: 'down', label: '下' },
          { value: 'right', label: '右' },
          { value: 'left', label: '左' },
        ],
      },
      { name: 'width', label: '宽度', type: 'slider' },
      { name: 'height', label: '高度', type: 'slider' },
      { name: 'angle', label: '旋转角度', type: 'slider', max: 360 },
    ],
    data: {
      direction: 'up',
      width: 60,
      height: 60,
      angle: 0,
      color: 'rgb(18, 15, 222)',
    },
    cssTemplate: '',
  },
  eight: {
    columns: [
      { name: 'size', label: '大小', type: 'slider' },
      { name: 'bw', label: '宽度', type: 'slider' },
      { name: 'angle', label: '旋转角度', type: 'slider', max: 360 },
    ],
    data: {
      size: 30,
      bw: 6,
      angle: 0,
      color: 'rgb(18, 15, 222)',
    },
    cssTemplate: `
.eight {
  --cbw: calc(var(--bw) * 1px);
  --cangle: calc(var(--angle) * 1deg);
  --csize: calc(var(--size) * 1px);
  transform: rotate(var(--cangle));
  width: calc(var(--csize) * 2 + (var(--csize) - var(--cbw)) * 1.414 - var(--csize));
  height: var(--csize);
  position: relative;
}

.eight::before,
.eight::after {
  content: '';
  position: absolute;
  width: var(--csize);
  height: var(--csize);
  border: var(--cbw) solid var(--color);
  border-radius: 50% 50% 0 50%;
  box-sizing: border-box;
}

.eight::before {
  transform: rotate(-45deg);
  left: 0;
}

.eight::after {
  transform: rotate(135deg);
  right: 0;
}`,
  },
  circular: {
    columns: [
      { name: 'size', label: '大小', type: 'slider' },
      { name: 'sw', label: '厚度', type: 'slider' },
      { name: 'angle', label: '旋转角度', type: 'slider', max: 360 },
    ],
    data: {
      size: 40,
      sw: 6,
      angle: 0,
      color: 'rgb(18, 15, 222)',
    },
    cssTemplate: `
.circular {
  --csize: calc(var(--size) * 1px);
  --csw: calc(var(--sw) * 1px);
  --cangle: calc(var(--angle) * 1deg);
  width: var(--csize);
  height: var(--csize);
  border-radius: 50%;
  box-shadow: var(--csw) var(--csw) 0 0 var(--color);
  transform: rotate(var(--cangle));
}`,
  },
};

export default allConfig;
  
