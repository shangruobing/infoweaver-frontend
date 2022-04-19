import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            "/api": {
                target: "127.0.0.1:8000/",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
    build: {
        chunkSizeWarningLimit: 1000,
    },
    css: {
        postcss: {
            plugins: [
                {
                    postcssPlugin: "internal:charset-removal",
                    AtRule: {
                        charset: (atRule) => {
                            if (atRule.name === "charset") {
                                atRule.remove();
                            }
                        },
                    },
                },
            ],
        },
    },
});
