import React from 'react';
import './index.less';

export default function Option(props: any) {
  const options = [
    { value: 'triangle', className: 'triangle' },
    { value: 'starFive', className: 'starFive' },
    { value: 'heart', className: 'heart' },
    { value: 'eight', className: 'eight' },
    { value: 'circular', className: 'circular' },
  ];
  const handleClick = (e: any) => {
    props.onChange(e.target.classList[0] || props.value);
  };

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
        {options.map((o, index) => (
          <span
            style={{
              marginRight: '40px',
              display: 'inline-block',
            }}
            className={o.className || ''}
            key={o.value}
            onClick={(e) => handleClick(e)}
          ></span>
        ))}
      </span>
    </div>
  );
}
