/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Wordle API
 * This is an API for Wordle
 * OpenAPI spec version: 1.0.0
 */
import { faker } from "@faker-js/faker";
import { HttpResponse, delay, http } from "msw";
import type { WordleSolveResponse } from "./wordleAPI.schemas";

export const getSolveWordleResponseMock = (
  overrideResponse: Partial<WordleSolveResponse> = {},
): WordleSolveResponse => ({
  suggestions: (() => Array.from({ length: 5 }).map(() => faker.word.sample({ length: 5 })))(),
  alternatives: (() => Array.from({ length: 5 }).map(() => faker.word.sample({ length: 5 })))(),
  remaining: (() => faker.number.int({ min: 1, max: 20 }))(),
  used_letters: (() => [...new Set(faker.string.alpha({ casing: "lower" }))])(),
  ...overrideResponse,
});

export const getSolveWordleMockHandler = (
  overrideResponse?:
    | WordleSolveResponse
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0],
      ) => Promise<WordleSolveResponse> | WordleSolveResponse),
) => {
  return http.post("*/wordle-solver/api/wordle", async (info) => {
    await delay(1000);

    return new HttpResponse(
      JSON.stringify(
        overrideResponse !== undefined
          ? typeof overrideResponse === "function"
            ? await overrideResponse(info)
            : overrideResponse
          : getSolveWordleResponseMock(),
      ),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  });
};

export const getPingMockHandler = (
  overrideResponse?:
    | void
    | ((info: Parameters<Parameters<typeof http.get>[1]>[0]) => Promise<void> | void),
) => {
  return http.get("*/wordle-solver/api/ping", async (info) => {
    await delay(1000);
    if (typeof overrideResponse === "function") {
      await overrideResponse(info);
    }
    return new HttpResponse(null, { status: 200 });
  });
};
export const getWordleAPIMock = () => [getSolveWordleMockHandler(), getPingMockHandler()];
