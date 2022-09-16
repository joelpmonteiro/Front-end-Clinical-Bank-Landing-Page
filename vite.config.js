import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig({
  root: "src",
  define: {
    env: loadEnv("mode", process.cwd(), ""),
  },
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        nested: resolve(__dirname, "src/ConsulteCredito/credito.html"),
      },
    },
  },
});
