import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  // 같은 네트워크의 모바일 기기에서 접속할 수 있도록 모든 인터페이스에 바인딩
  server: { host: true },
  preview: { host: true },
  build: {
    outDir: "dist",
  },
});
