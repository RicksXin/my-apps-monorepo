import { defineConfig } from 'vite';
import { join } from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import styleImport, { VantResolve } from 'vite-plugin-style-import';
// @ts-nocheck
import { svgstore } from './src/plugins/svgstore';

// https://vitejs.dev/config/
export default defineConfig({
  // build path
  // base: '/mangosteen/dist/',
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    vueJsx({
      transformOn: true,
      mergeProps: true,
    }),
    svgstore(),
    styleImport({
      resolves: [VantResolve()],
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: any) {
          if (id.includes('echarts')) {
            return 'echarts';
          }
          if (id.includes('vant')) {
            return 'vant';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
  server: {
    proxy: {
      '/api/v1': {
        // target: 'http://127.0.0.1:3000/',
        target: 'http://121.4.100.133:3000/',
      },
    },
  },
});
