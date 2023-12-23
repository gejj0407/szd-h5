export default function createViteProxy() {
  return {
    "/api": {
      target: "",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ""),
    },
  };
}
