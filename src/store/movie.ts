import type { Movie } from "@/service/movies/types";
import { create } from "zustand";

interface MovieState {
  selected: Movie | null;
  setSelected: (movieSelected: Movie | null) => void;
}

export const useMovieStore = create<MovieState>()((set) => ({
  selected: null,
  setSelected: (movieSelected) => set({ selected: movieSelected }),
}));
