declare module 'pngjs' {
  export class PNG {
    constructor(options?: any);

    static sync: {
      read(buffer: Buffer): PNG;
    };

    data: Buffer;
    width: number;
    height: number;
  }
}
