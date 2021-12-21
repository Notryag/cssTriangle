export default {
    heartConfig: {
      columns: [
        { name: 'width', label: '宽度', type: 'slider' },
        { name: 'height', label: '高度', type: 'slider' },
        { name: 'angle', label: '旋转角度', type: 'slider', max: 360 },
      ],
      data: {
        width: 25,
        height: 40,
        angle: 0,
        color: 'rgb(18, 15, 222)',
      },
      style: `
  .heart {
    --cwidth: calc(var(--width) * 1px);
    --cheight: calc(var(--height) * 1px);
    --cangle: calc(var(--angle) * 1deg);
    height: 5px;
    width: 5px;
    transform: rotate(var(--cangle));
    position: relative;
  }
  .heart:before,
  .heart:after {
    position: absolute;
    top: 0;
    content: '';
    background: var(--color);
    left: var(--cwidth);
    width: var(--cwidth);
    height: var(--cheight);
    border-radius: var(--cheight) var(--cheight) 0 0;
    transform: rotate(-45deg);
    transform-origin: 0 100%;
  }
  .heart:after {
    content: '';
    left: 0;
    top: 0;
    transform: rotate(45deg);
    transform-origin: 100% 100%;
  }`,
    },
    starFiveConfig: {
      columns: [
        { name: 'width', label: '宽度', type: 'slider' },
        { name: 'angle', label: '旋转角度', type: 'slider', max: 360 },
      ],
      data: {
        width: 60,
        height: 60,
        angle: 0,
        color: 'rgb(18, 15, 222)',
      },
      style: `
  .starFive,
  .starFive::before,
  .starFive::after {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: calc(var(--width) * 0.726542px) calc(var(--width) * 1px) 0 calc(var(--width) * 1px);
    border-color: var(--color) transparent transparent transparent;
  }
  .starFive {
    --width: 100;
    --color: rgb(18, 15, 222);
    --angle: 35;
    position: relative;
    transform: rotate(calc(var(--angle) * 1deg)) ;
  }
  .starFive::before {
    content: '';
    position: absolute;
    transform: translate(-50%, -100%) rotate(70deg);
  }
  .starFive::after {
    content: '';
    position: absolute;
    transform: translate(-50%, -100%) rotate(-70deg);
  }
  `,
    },
    triangleConfig: {
      columns: [
        {
          name: 'direction',
          label: '方向',
          type: 'radio',
          list: [
            { value: 'up', label: '上' },
            { value: 'down', label: '下' },
            { value: 'right', label: '右' },
            {
              value: 'left',
              label: '左',
            },
          ],
        },
        { name: 'width', label: '宽度', type: 'slider' },
        { name: 'height', label: '高度', type: 'slider' },
        { name: 'angle', max: 360, label: '旋转角度', type: 'slider' },
      ],
      data: {
        direction: 'up',
        width: 60,
        height: 60,
        angle: 0,
        color: 'rgb(18, 15, 222)',
      },
      style:
        '{"display":"inline-block","width":"0px","height":"0px","borderStyle":"solid","transform":"rotate(0deg)","borderWidth":"0px 30px 60px","borderColor":"transparent transparent rgb(18, 15, 222)"}',
    },
    eightConfig: {
      columns: [
        { name: 'size', label: '大小', type: 'slider' },
        { name: 'bw', label: '宽度', type: 'slider' },
        { name: 'angle', max: 360, label: '旋转角度', type: 'slider' },
      ],
      data: {
        size: 30,
        bw: 6,
        angle: 0,
        color: 'rgb(18, 15, 222)',
      },
      style: `
  .eight{
    --cbw: calc(var(--bw) * 1px);
    --cangle: calc(var(--angle) * 1deg);
    --csize: calc(var(--size) * 1px);
    transform: rotate(var(--cangle));
    width: calc(var(--csize) * 2 + (var(--csize) - var(--cbw)) * 1.414 - var(--csize));
    height: var(--cheight);
    position: relative;
  }
  .eight::before,
  .eight::after {
    content: '';
    position: absolute;
    width: var(--csize);
    height: var(--csize);
    border: var(--cbw) solid var(--color);
    border-radius: 50% 50% 0 50%;
    box-sizing: border-box;
  }
  .eight::before {
    transform: rotate(-45deg);
    left: 0;
  }
  .eight::after {
    transform: rotate(135deg);
    right: 0;
  }`,
    },
    circularConfig: {
      columns: [
        { name: 'size', label: '大小', type: 'slider' },
        { name: 'sw', label: '厚度', type: 'slider' },
        { name: 'angle', max: 360, label: '旋转角度', type: 'slider' },
      ],
      data: {
        size: 40,
        sw: 6,
        angle: 0,
        color: 'rgb(18, 15, 222)',
      },
      style: `
    .circular{
      --size:40;
      --sw:6;
      --csize:calc(var(--size) * 1px);
      --csw: calc(var(--sw) * 1px);
      --color: rgb(18, 15, 222);
      width: var(--csize);
      height: var(--csize);
      border-radius: 50%;
      box-shadow: var(--csw) var(--csw) 0 0 var(--color);
      transform: transform: rotate(var(--cangle));;
    }`,
    },
  };
  