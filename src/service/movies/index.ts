import { api } from "@/lib/api";
import type { CreateMoviePayload, Movie } from "./types";

// TODO: implement
export async function getMovies() {
  //   const { data } = await api.get<Movie[]>("/movies");
  //   return data;
}

export async function createMovie(payload: CreateMoviePayload) {
  const { data } = await api.post<Movie>("/movies", payload);

  return data;
}
