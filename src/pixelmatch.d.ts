// src/types/pixelmatch.d.ts
declare module 'pixelmatch' {
    import { PNG } from 'pngjs';
    export default function pixelmatch(
      img1: Buffer,
      img2: Buffer,
      diff: Buffer,
      width: number,
      height: number,
      options?: { threshold?: number }
    ): number;
  }
  