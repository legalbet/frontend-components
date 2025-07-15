import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'FrontendComponents',
      fileName: (format) => `frontend-components.${format}.js`,
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
    target: 'esnext', // optional: modern output
    outDir: 'dist',
    emptyOutDir: false,
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: './tests/setup.ts',
    include: ['tests/**/*.{test,spec}.{ts,js}'],
  },
});
