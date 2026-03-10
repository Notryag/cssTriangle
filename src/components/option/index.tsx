import React from 'react';
import './index.less';
import type { ShapeName } from '@/config';

interface OptionProps {
  onChange: (value: ShapeName) => void;
  value: ShapeName;
}

const options: Array<{ value: ShapeName; className: string }> = [
  { value: 'triangle', className: 'triangle' },
  { value: 'starFive', className: 'starFive' },
  { value: 'heart', className: 'heart' },
  { value: 'eight', className: 'eight' },
  { value: 'circular', className: 'circular' },
];

export default function Option(props: OptionProps) {
  return (
    <div
      style={{
        width: '980px',
        margin: '0 auto',
        paddingLeft: '27px',
        height: '100px',
      }}
    >
      <span
        className={'optionWrap'}
        style={{ display: 'inline-block', height: '50px', width: '100%' }}
      >
        <h2>点击选择图形：</h2>
        {options.map((o) => (
          <span
            style={{
              marginRight: '40px',
              display: 'inline-block',
            }}
            className={o.className || ''}
            key={o.value}
            onClick={() => props.onChange(o.value)}
          ></span>
        ))}
      </span>
    </div>
  );
}
