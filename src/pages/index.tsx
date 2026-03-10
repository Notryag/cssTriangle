import React, { useState } from 'react';
import styles from './index.module.less';
import CodeWrap from '@/components/codeWrap/index';
import ZChoose from '@/components/option';
import ZForm from '@/components/form/index';
import Layout from '@/components/layout';
import allConfig from '@/config';
import type { ShapeName, ShapeValues } from '@/config';
import { buildCssCode, getPreviewStyle } from '@/utils/css';

export default function Page() {
  const [shape, setShape] = useState<ShapeName>('triangle');
  const [shapeValues, setShapeValues] = useState<ShapeValues>(allConfig.triangle.data);
  const config = allConfig[shape];

  const handleShapeChange = (nextShape: ShapeName) => {
    setShape(nextShape);
    setShapeValues(allConfig[nextShape].data);
  };

  const previewStyle = getPreviewStyle(shape, shapeValues);
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
