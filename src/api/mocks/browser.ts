import { setupWorker } from "msw/browser";
import { getWordleAPIMock } from "@/api/backend/wordleAPI.msw";

export const worker = setupWorker(...getWordleAPIMock());
