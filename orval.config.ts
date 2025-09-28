import { faker } from "@faker-js/faker";
import { defineConfig } from "orval";

export default defineConfig({
  backend: {
    output: {
      workspace: "src/api",
      target: "backend",
      mode: "split",
      client: "vue-query",
      mock: true,
      prettier: true,
      baseUrl: "/wordle-solver/api",
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
      target: "./src/api/openapi_spec.json",
    },
  },
});
