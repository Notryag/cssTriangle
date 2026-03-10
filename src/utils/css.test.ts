import { describe, expect, it } from 'vitest';
import type { TriangleValues } from '@/config';
import {
  buildCssCode,
  buildTriangleCssCode,
  getTriangleStyle,
  toCssVariables,
} from '@/utils/css';

describe('css utils', () => {
  it('builds triangle styles from the form values', () => {
    const triangle: TriangleValues = {
      direction: 'right',
      width: 40,
      height: 24,
      angle: 15,
      color: '#ff0000',
    };

    expect(getTriangleStyle(triangle)).toEqual({
      display: 'inline-block',
      width: '0px',
      height: '0px',
      borderStyle: 'solid',
      borderWidth: '12px 0 12px 40px',
      borderColor: 'transparent transparent transparent #ff0000',
      transform: 'rotate(15deg)',
    });
  });

  it('turns non-triangle form values into css variables', () => {
    expect(
      toCssVariables({
        width: 60,
        height: 60,
        angle: 0,
        color: 'rgb(18, 15, 222)',
      }),
    ).toEqual({
      '--width': 60,
      '--height': 60,
      '--angle': 0,
      '--color': 'rgb(18, 15, 222)',
    });
  });

  it('renders the css code block for the current shape', () => {
    const css = buildCssCode('triangle', {
      direction: 'up',
      width: 60,
      height: 30,
      angle: 0,
      color: '#111111',
    });

    expect(css).toContain('.triangle {');
    expect(css).toContain('border-width: 0 30px 30px 30px;');
    expect(css).toContain('border-color: transparent transparent #111111 transparent;');
  });

  it('renders standalone triangle css that can be copied directly', () => {
    const triangle: TriangleValues = {
      direction: 'down',
      width: 80,
      height: 40,
      angle: 12,
      color: '#222222',
    };

    expect(buildTriangleCssCode(triangle)).toBe(`.triangle {
  display: inline-block;
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 40px 40px 0 40px;
  border-color: #222222 transparent transparent transparent;
  transform: rotate(12deg);
}`);
  });
});
