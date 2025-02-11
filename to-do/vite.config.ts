import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/ts-lab/to-do/',
    plugins: [tsconfigPaths()],
});
