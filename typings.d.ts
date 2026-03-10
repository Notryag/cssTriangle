/// <reference types="vite/client" />

declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module 'react-color' {
  import type * as React from 'react';

  export interface ColorResult {
    hex: string;
  }

  export interface SketchPickerProps {
    color: string;
    onChange: (color: ColorResult) => void;
  }

  export const SketchPicker: React.ComponentType<SketchPickerProps>;
}

declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const src: string;
  export default src;
}
