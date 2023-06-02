import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import resolve from '@rollup/plugin-node-resolve';

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.wams', '**/*.zkey'],
  plugins: [
    react(),
    resolve({
      extensions: ['.js', '.ts'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@contracts': path.resolve(__dirname, './src/contracts'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
});
