import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { join } from 'path';
import Unocss from 'unocss/vite';

import { svgstore } from './src/plugins/svgstore';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
  plugins: [Unocss(), react(), svgstore()],
  server: {
    proxy: {
      '/api/v1': {
        // target: 'http://127.0.0.1:3000/',
        target: 'http://121.4.100.133:3000/',
      },
    },
  },
});
