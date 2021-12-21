import React from 'react';
import styles from './index.less';
import { Divider } from 'antd';

export default function Layout(props: any) {
  return (
    <div className={styles.wrap}>
      <div className={styles.main}>
        <div className={styles.box}>
          <div className={styles.editArea}>{props.children[0]}</div>
          <div className={styles.previewBg}>{props.children[1]}</div>
        </div>
        <Divider dashed />
        {props.children[2]}
      </div>
    </div>
  );
}
