/**
 * Generated by orval v7.5.0 🍺
 * Do not edit manually.
 * NinjaAPI
 * OpenAPI spec version: 1.0.0
 */
import { useMutation } from "@tanstack/vue-query";
import type {
  MutationFunction,
  UseMutationOptions,
  UseMutationReturnType,
} from "@tanstack/vue-query";
import * as axios from "axios";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { unref } from "vue";
import type { MaybeRef } from "vue";
import { HttpResponse, delay, http } from "msw";
export type FwordlesolverApiApiSolveWorldBody = {
  words: string[];
  places: string[];
};

/**
 * @summary Solve World
 */
export const fwordlesolverApiApiSolveWorld = (
  fwordlesolverApiApiSolveWorldBody: MaybeRef<FwordlesolverApiApiSolveWorldBody>,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<void>> => {
  fwordlesolverApiApiSolveWorldBody = unref(fwordlesolverApiApiSolveWorldBody);

  return axios.default.post(
    `/wordle-solver/api/wordle`,
    fwordlesolverApiApiSolveWorldBody,
    options,
  );
};

export const getFwordlesolverApiApiSolveWorldMutationOptions = <
  TError = AxiosError<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof fwordlesolverApiApiSolveWorld>>,
    TError,
    { data: FwordlesolverApiApiSolveWorldBody },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationOptions<
  Awaited<ReturnType<typeof fwordlesolverApiApiSolveWorld>>,
  TError,
  { data: FwordlesolverApiApiSolveWorldBody },
  TContext
> => {
  const mutationKey = ["fwordlesolverApiApiSolveWorld"];
  const { mutation: mutationOptions, axios: axiosOptions } = options
    ? options.mutation && "mutationKey" in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, axios: undefined };

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof fwordlesolverApiApiSolveWorld>>,
    { data: FwordlesolverApiApiSolveWorldBody }
  > = (props) => {
    const { data } = props ?? {};

    return fwordlesolverApiApiSolveWorld(data, axiosOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type FwordlesolverApiApiSolveWorldMutationResult = NonNullable<
  Awaited<ReturnType<typeof fwordlesolverApiApiSolveWorld>>
>;
export type FwordlesolverApiApiSolveWorldMutationBody = FwordlesolverApiApiSolveWorldBody;
export type FwordlesolverApiApiSolveWorldMutationError = AxiosError<unknown>;

/**
 * @summary Solve World
 */
export const useFwordlesolverApiApiSolveWorld = <
  TError = AxiosError<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof fwordlesolverApiApiSolveWorld>>,
    TError,
    { data: FwordlesolverApiApiSolveWorldBody },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationReturnType<
  Awaited<ReturnType<typeof fwordlesolverApiApiSolveWorld>>,
  TError,
  { data: FwordlesolverApiApiSolveWorldBody },
  TContext
> => {
  const mutationOptions = getFwordlesolverApiApiSolveWorldMutationOptions(options);

  return useMutation(mutationOptions);
};

export const getFwordlesolverApiApiSolveWorldMockHandler = (
  overrideResponse?:
    | void
    | ((info: Parameters<Parameters<typeof http.post>[1]>[0]) => Promise<void> | void),
) => {
  return http.post("*/wordle-solver/api/wordle", async (info) => {
    await delay(1000);
    if (typeof overrideResponse === "function") {
      await overrideResponse(info);
    }
    return new HttpResponse(null, { status: 200 });
  });
};
export const getNinjaAPIMock = () => [getFwordlesolverApiApiSolveWorldMockHandler()];
