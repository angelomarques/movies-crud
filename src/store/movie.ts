import type { Movie } from "@/service/movies/types";
import { create } from "zustand";

interface MovieState {
  selected: Movie | null;
  setSelected: (movieSelected: Movie | null) => void;
  toDelete: Movie | null;
  setToDelete: (movieToDelete: Movie | null) => void;
}

export const useMovieStore = create<MovieState>()((set) => ({
  selected: null,
  setSelected: (movieSelected) => set({ selected: movieSelected }),
  toDelete: null,
  setToDelete: (movieToDelete) => set({ toDelete: movieToDelete }),
}));
