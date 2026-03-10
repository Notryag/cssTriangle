import React from 'react';
import styles from './index.module.less';
import { Divider } from 'antd';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const children = React.Children.toArray(props.children);

  return (
    <div className={styles.wrap}>
      <div className={styles.main}>
        <div className={styles.box}>
          <div className={styles.editArea}>{children[0]}</div>
          <div className={styles.previewBg}>{children[1]}</div>
        </div>
        <Divider dashed />
        {children[2]}
      </div>
    </div>
  );
}
