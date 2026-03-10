import React from 'react';
import styles from './index.module.less';
import { Button, Input } from 'antd';
import { copy } from '@/utils/util';

interface CodeProps {
  cssCode: string;
}

export default function CodeWrap(props: CodeProps) {
  return (
    <div className={styles.codeWrap}>
      <h2 style={{ display: 'inline-block' }}>可直接使用的 CSS：</h2>
      <Button onClick={() => copy(props.cssCode)}>复制</Button>
      <Input.TextArea value={props.cssCode} autoSize readOnly />
    </div>
  );
}
