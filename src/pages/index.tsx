import React, { useRef, useState } from 'react';
import styles from './index.less';
import { humpToUnderline } from '@/utils/util';
import CodeWrap from '@/components/codeWrap/index';

import ZChoose from '@/components/option';
import ZForm from '@/components/form/index';
import Layout from '@/components/layout';
import allConfig from '@/config';

export default function Page() {
  const getNewCss = (css: any) => {
    let res = {};
    for (const key in css) {
      res[`--${key}`] = css[key];
    }
    return res;
  };
  // 图形选择
  const [trick, setTrick] = useState('triangle');
  let config = allConfig[`${trick}Config`];
  // 展示的cssCode
  const [cssCode, setCssCode] = useState<string>();
  // 宽高等参数
  const [trickStyleCode, setTrickStyleCode] = useState(config.data || {});

  // 展示区code
  const getChangeCss = (newVal: any) => {
    let o = {};
    let css = '';
    for (const key in newVal) {
      let transKey = humpToUnderline(key);
      o[transKey] = newVal[key];
      css += `${transKey}:${newVal[key]}\n`;
    }
    return css;
  };

  const childRef = useRef();
  const getFormVal = (option = trick) => {
    let form = (childRef.current as any).getForm();
    setTimeout(() => {
      let formVal = form.getFieldValue();
      let trickStyleTemp;
      if (option === 'triangle') {
        let triangleStyle = getBorderWidthAndColor(formVal);
        trickStyleTemp = {
          ...JSON.parse(config.style),
          ...triangleStyle,
        };
        setTrickStyleCode(trickStyleTemp);
        setCssCode(getChangeCss(trickStyleTemp));
      } else {
        setTrickStyleCode(formVal);
        setCssCode(getChangeCss(getNewCss(formVal)) + config.style);
      }
    }, 0);
  };

  const handleChoose = (val: any) => {
    config = allConfig[`${val}Config`];
    setTrick(val);
    getFormVal(val);
  };

  const getBorderWidthAndColor = (triangle: any) => {
    let { direction, width: w, height: h, angle, color } = triangle;
    const borderWidthAndColor: any = {
      up: {
        borderWidth: `0 ${w / 2}px ${h}px ${w / 2}px`,
        borderColor: `transparent transparent ${color} transparent`,
      },
      down: {
        borderWidth: `${h}px ${w / 2}px 0 ${w / 2}px`,
        borderColor: `${color} transparent transparent transparent`,
      },
      left: {
        borderWidth: `${h / 2}px ${w}px ${h / 2}px 0`,
        borderColor: `transparent ${color} transparent transparent`,
      },
      right: {
        borderWidth: `${h / 2}px 0 ${h / 2}px ${w}px`,
        borderColor: `transparent transparent transparent ${color}`,
      },
    };
    return {
      ...borderWidthAndColor[direction],
      transform: `rotate(${angle}deg)`,
    };
  };
  return (
    <>
      <ZChoose value={trick} onChange={handleChoose} />
      <Layout>
        <ZForm
          {...config}
          cRef={childRef}
          onValuesChange={() => getFormVal(trick)}
        />
        <div
          className={`${styles[trick]} ${styles.trans}`}
          style={
            trick === 'triangle' ? trickStyleCode : getNewCss(trickStyleCode)
          }
        ></div>
        <CodeWrap cssCode={cssCode as string} />
      </Layout>
    </>
  );
}
