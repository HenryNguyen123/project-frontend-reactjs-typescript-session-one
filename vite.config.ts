import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import detect from 'detect-port'

const PORTS = [3000, 5000, 3333, 6666];

async function getAvailablePort() {
  for (const port of PORTS) {
    const _port = await detect(port);
    if (_port === port) return port;
  }
  return 3000;
}

const selectedPort = await getAvailablePort(); 

export default defineConfig({
  plugins: [react()],
  server: {
    port: selectedPort,
    strictPort: true,
  },
  test: {
    environment: 'happy-dom',
    setupFiles: './src/test/setupTests.ts',
    globals: true,
  },
  //deploy homepage with github
  // base: '/project-frontend-reactjs-typescript-session-one/', 
  //deploy with vercel
  base: '/', 
});
