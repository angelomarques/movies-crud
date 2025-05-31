import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { CreateMoviePayload, Movie } from "./types";
import { createMovie } from ".";

export function useCreateMovieMutation(
  options?: Omit<
    UseMutationOptions<Movie, Error, CreateMoviePayload, unknown>,
    "mutationFn"
  >
) {
  return useMutation({
    mutationFn: createMovie,
    ...options,
  });
}
