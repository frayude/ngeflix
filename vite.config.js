// vite.config.js
export default {
  server: {
    proxy: {
      "/api": "https://localhost:3000",
    },
  },
};
