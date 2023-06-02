/// <reference types="vite/client" />

declare module 'snarkjs';

declare module '*.json' {
  const content: any;
  export default content;
}

declare module '*.wasm' {
  const content: any;
  export default content;
}

declare module '*.zkey' {
  const content: any;
  export default content;
}
