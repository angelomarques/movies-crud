import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { CreateMoviePayload, Movie } from "./types";
import { createMovie, deleteMovie, updateMovie } from ".";

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

export function useUpdateMovieMutation(
  id: string,
  options?: Omit<
    UseMutationOptions<Movie, Error, CreateMoviePayload, unknown>,
    "mutationFn"
  >
) {
  return useMutation({
    mutationFn: (payload: CreateMoviePayload) => updateMovie(id, payload),
    ...options,
  });
}

export function useDeleteMovieMutation(
  id: string,
  options?: Omit<
    UseMutationOptions<Movie, Error, undefined, unknown>,
    "mutationFn"
  >
) {
  return useMutation({
    mutationFn: () => deleteMovie(id),
    ...options,
  });
}
