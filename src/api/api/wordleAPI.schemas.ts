/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * Wordle API
 * This is an API for Wordle
 * OpenAPI spec version: 1.0.0
 */
export interface WordleSolveResponse {
  suggestions: string[];
  alternatives: string[];
  remaining: number;
  used_letters: string[];
}

export interface WordleSolveRequest {
  words: string[];
  places: string[];
  size: number;
}
