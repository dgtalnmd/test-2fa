import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tsconfigPaths()],
    server: {
      port: 3000,
    },
    define: {
      "import.meta.env.API_URL": JSON.stringify(
        process.env.API_URL || env.API_URL
      ),
    },
  };
});
