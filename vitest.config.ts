import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['tests/**/*.{test,spec}.{ts,js}'],
    coverage: {
      reporter: ['text', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
