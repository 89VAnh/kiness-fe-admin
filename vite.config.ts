/// <reference types="vite/client" />
import ckeditor5 from "@ckeditor/vite-plugin-ckeditor5";
import react from "@vitejs/plugin-react-swc";
import { createRequire } from "node:module";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

const require = createRequire(import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    ckeditor5({ theme: require.resolve("@ckeditor/ckeditor5-theme-lark") }),
  ],
  resolve: {
    alias: [
      { find: /^~/, replacement: "" },
      { find: "@", replacement: "/src" },
    ],
  },
  css: {
    // convert .app-header (less) to styles.appHeader (tsx)
    modules: {
      localsConvention: "camelCase",
    },
  },
  server: {
    port: 7845,
    open: true,
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:4010",
    //     // target: "http://kiness.aiacademy.edu.vn",
    //     changeOrigin: true,
    //     secure: false,
    //   },
    //   // "/api": {
    //   //   target: "http://localhost:4010",
    //   // },
    // },
  },
});
