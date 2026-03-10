import React, { CSSProperties, useState } from 'react';
import styles from './index.module.less';
import { humpToUnderline } from '@/utils/util';
import CodeWrap from '@/components/codeWrap/index';
import ZChoose from '@/components/option';
import ZForm from '@/components/form/index';
import Layout from '@/components/layout';
import allConfig, {
  ShapeName,
  ShapeValues,
  TriangleDirection,
  TriangleValues,
} from '@/config';

type CssVariableStyle = CSSProperties & Record<`--${string}`, string | number>;
type TriangleStyle = Pick<
  CSSProperties,
  'borderColor' | 'borderStyle' | 'borderWidth' | 'display' | 'height' | 'transform' | 'width'
>;

const triangleBaseStyle: TriangleStyle = {
  display: 'inline-block',
  width: '0px',
  height: '0px',
  borderStyle: 'solid',
};

const formatCssBlock = (
  selector: string,
  declarations: Record<string, string | number>,
) => {
  const lines = Object.entries(declarations).map(
    ([key, value]) => `  ${humpToUnderline(key)}: ${value};`,
  );

  return `${selector} {\n${lines.join('\n')}\n}`;
};

const toCssVariables = (values: ShapeValues): Record<string, string | number> => {
  const style: Record<string, string | number> = {};

  Object.entries(values).forEach(([key, value]) => {
    if (key === 'direction') {
      return;
    }
    style[`--${key}`] = value;
  });

  return style;
};

const getTriangleStyle = (triangle: TriangleValues): TriangleStyle => {
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

const buildCssCode = (shape: ShapeName, values: ShapeValues) => {
  if (shape === 'triangle') {
    return formatCssBlock('.triangle', getTriangleStyle(values as TriangleValues));
  }

  const selector = `.${shape}`;
  const variableBlock = formatCssBlock(selector, toCssVariables(values));
  const templateBlock = allConfig[shape].cssTemplate.trim();

  return `${variableBlock}\n\n${templateBlock}`;
};

export default function Page() {
  const [shape, setShape] = useState<ShapeName>('triangle');
  const [shapeValues, setShapeValues] = useState<ShapeValues>(allConfig.triangle.data);
  const config = allConfig[shape];

  const handleShapeChange = (nextShape: ShapeName) => {
    setShape(nextShape);
    setShapeValues(allConfig[nextShape].data);
  };

  const previewStyle =
    shape === 'triangle'
      ? getTriangleStyle(shapeValues as TriangleValues)
      : (toCssVariables(shapeValues) as CssVariableStyle);
  const cssCode = buildCssCode(shape, shapeValues);

  return (
    <>
      <ZChoose value={shape} onChange={handleShapeChange} />
      <Layout>
        <ZForm
          key={shape}
          {...config}
          onValuesChange={setShapeValues}
        />
        <div
          className={`${styles[shape]} ${styles.trans}`}
          style={previewStyle}
        ></div>
        <CodeWrap cssCode={cssCode} />
      </Layout>
    </>
  );
}
