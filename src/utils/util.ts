import { message } from 'antd';

export function humpToUnderline(str: string) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

export const copy = (val: string) => {
  const txa = document.createElement('textarea');
  txa.value = val;
  document.body.appendChild(txa);
  txa.select();
  const res = document.execCommand('copy');
  if (res) {
    message.success('复制成功');
  }
  document.body.removeChild(txa);
};
