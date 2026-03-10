import type { CSSProperties } from 'react';
import allConfig, {
  type ShapeName,
  type ShapeValues,
  type TriangleDirection,
  type TriangleValues,
} from '@/config';
import { humpToUnderline } from '@/utils/util';

export type CssVariableStyle = CSSProperties &
  Record<`--${string}`, string | number>;

export type TriangleStyle = Pick<
  CSSProperties,
  | 'borderColor'
  | 'borderStyle'
  | 'borderWidth'
  | 'display'
  | 'height'
  | 'transform'
  | 'width'
>;

export const triangleBaseStyle: TriangleStyle = {
  display: 'inline-block',
  width: '0px',
  height: '0px',
  borderStyle: 'solid',
};

export const formatCssBlock = (
  selector: string,
  declarations: Record<string, string | number>,
) => {
  const lines = Object.entries(declarations).map(
    ([key, value]) => `  ${humpToUnderline(key)}: ${value};`,
  );

  return `${selector} {\n${lines.join('\n')}\n}`;
};

export const toCssVariables = (
  values: ShapeValues,
): Record<string, string | number> => {
  const style: Record<string, string | number> = {};

  Object.entries(values).forEach(([key, value]) => {
    if (key === 'direction') {
      return;
    }
    style[`--${key}`] = value;
  });

  return style;
};

export const getTriangleStyle = (triangle: TriangleValues): TriangleStyle => {
  const { direction, width, height, angle, color } = triangle;
  const borderWidthAndColor: Record<
    TriangleDirection,
    Pick<TriangleStyle, 'borderWidth' | 'borderColor'>
  > = {
    up: {
      borderWidth: `0 ${width / 2}px ${height}px ${width / 2}px`,
      borderColor: `transparent transparent ${color} transparent`,
    },
    down: {
      borderWidth: `${height}px ${width / 2}px 0 ${width / 2}px`,
      borderColor: `${color} transparent transparent transparent`,
    },
    left: {
      borderWidth: `${height / 2}px ${width}px ${height / 2}px 0`,
      borderColor: `transparent ${color} transparent transparent`,
    },
    right: {
      borderWidth: `${height / 2}px 0 ${height / 2}px ${width}px`,
      borderColor: `transparent transparent transparent ${color}`,
    },
  };

  return {
    ...triangleBaseStyle,
    ...borderWidthAndColor[direction],
    transform: `rotate(${angle}deg)`,
  };
};

export const buildTriangleCssCode = (
  triangle: TriangleValues,
  selector = '.triangle',
) => {
  const style = getTriangleStyle(triangle);

  return [
    `${selector} {`,
    `  display: ${style.display};`,
    `  width: ${style.width};`,
    `  height: ${style.height};`,
    `  border-style: ${style.borderStyle};`,
    `  border-width: ${style.borderWidth};`,
    `  border-color: ${style.borderColor};`,
    `  transform: ${style.transform};`,
    `}`,
  ].join('\n');
};

export const getPreviewStyle = (
  shape: ShapeName,
  values: ShapeValues,
): TriangleStyle | CssVariableStyle =>
  shape === 'triangle'
    ? getTriangleStyle(values as TriangleValues)
    : (toCssVariables(values) as CssVariableStyle);

export const buildCssCode = (shape: ShapeName, values: ShapeValues) => {
  if (shape === 'triangle') {
    return buildTriangleCssCode(values as TriangleValues);
  }

  const selector = `.${shape}`;
  const variableBlock = formatCssBlock(selector, toCssVariables(values));
  const templateBlock = allConfig[shape].cssTemplate.trim();

  return `${variableBlock}\n\n${templateBlock}`;
};
