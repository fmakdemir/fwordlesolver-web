import { setupWorker } from "msw/browser";
import { getWordleAPIMock } from "../api/wordleAPI.msw";

export const worker = setupWorker(...getWordleAPIMock());
