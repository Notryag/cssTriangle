import React, { useRef } from 'react';
import styles from './index.less';
import { Button, Input } from 'antd';
import { copy } from '@/utils/util';

interface codeProps {
  cssCode: string;
}
export default function CodeWrap(props: codeProps) {
  let cssCode = props.cssCode;
  return (
    <div className={styles.codeWrap}>
      <h2 style={{ display: 'inline-block' }}>css代码：</h2>
      <Button onClick={() => copy(cssCode as string)}>复制</Button>
      <Input.TextArea value={cssCode} autoSize />
    </div>
  );
}
