module.exports = {
  api: {
    output: {
      baseUrl: "/wordle-solver/api",
      mode: "split",
      workspace: "src/api",
      client: "vue-query",
      mock: true,
      prettier: true,
    },
    input: {
      target: "./src/api/openapi.json",
    },
  },
};
