import { api } from "@/lib/api";
import type {
  CreateMoviePayload,
  GetMoviesParams,
  GetMoviesResponse,
  Movie,
} from "./types";

export async function getMovies(params: GetMoviesParams = {}) {
  const { page, limit, startDate, endDate, durationCategory, search } = params;

  const { data } = await api.get<GetMoviesResponse>("/movies", {
    params: {
      page: page || 1,
      limit: limit || 10,
      startDate,
      endDate,
      durationCategory,
      search,
    },
  });

  return data;
}

export async function createMovie(payload: CreateMoviePayload) {
  const { data } = await api.post<Movie>("/movies", payload);

  return data;
}
