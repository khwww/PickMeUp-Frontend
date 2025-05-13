import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
