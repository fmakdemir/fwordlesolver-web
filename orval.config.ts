import { faker } from "@faker-js/faker";
import { defineConfig } from "orval";

export default defineConfig({
  api: {
    output: {
      // mode: "split",
      workspace: "src/api",
      target: "api",
      mode: "split",
      client: "vue-query",
      mock: true,
      prettier: true,
      override: {
        mock: {
          arrayMax: 5,
          useExamples: true,
          properties: {
            "/suggestions|alternatives/": () =>
              Array.from({ length: 5 }).map(() => faker.word.sample({ length: 5 })),
            remaining: () => faker.number.int({ min: 1, max: 20 }),
            used_letters: () => [...new Set(faker.string.alpha({ casing: "lower" }))],
          },
        },
      },
    },
    input: {
      target: "./src/api/openapi.json",
    },
  },
});
