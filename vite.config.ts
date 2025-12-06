import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
    env: {
      DATABASE_URL: 'postgresql://docker:docker@localhost:5432/agents',
      GEMINI_API_KEY: 'your_api_key_here',
    },
  },
});
