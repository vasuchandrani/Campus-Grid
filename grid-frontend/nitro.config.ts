import { defineConfig } from "nitro/config";

export default defineConfig({
  handlers: [
    {
      route: "/**",
      handler: "./dist/server/server.js",
    },
  ],
  publicAssets: [
    {
      dir: "dist/client",
      baseURL: "/",
    },
  ],
});
