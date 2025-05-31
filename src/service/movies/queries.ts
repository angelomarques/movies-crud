import {
  useQuery,
  type UndefinedInitialDataOptions,
} from "@tanstack/react-query";
import type { GetMoviesParams, GetMoviesResponse } from "./types";
import { getMovies } from ".";

export function useGetMoviesQuery(
  params: GetMoviesParams = {},
  options?: Omit<
    UndefinedInitialDataOptions<GetMoviesResponse, Error, GetMoviesResponse>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: ["movies", params],
    queryFn: () => getMovies(params),
    ...(options || {}),
  });
}
