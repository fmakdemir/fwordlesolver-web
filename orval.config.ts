import { defineConfig } from "orval";

export default defineConfig({
  api: {
    output: {
      // mode: "split",
      workspace: "src/api",
      target: "api",
      client: "vue-query",
      mock: true,
      prettier: true,
    },
    input: {
      target: "./src/api/openapi.json",
    },
  },
});
