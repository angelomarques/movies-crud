export type Movie = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  originalTitle: string;
  description: string;
  releaseDate: string;
  budget: number;
  imageUrl: string;
  duration: number;
  genre: MovieGenre;
};

export type CreateMoviePayload = Omit<Movie, "id" | "createdAt" | "updatedAt">;

export type DurationCategory = "short" | "medium" | "long";

export type GetMoviesParams = {
  page?: number;
  limit?: number;
  startDate?: string;
  endDate?: string;
  durationCategory?: DurationCategory;
  search?: string;
};

export type GetMoviesResponse = {
  data: Movie[];
  meta: {
    total: number;
    page: number;
    limit: number;
    count: number;
    totalPages: number;
  };
};

export const MovieGenre = {
  ACTION: "Action",
  COMEDY: "Comedy",
  DRAMA: "Drama",
  FANTASY: "Fantasy",
  HORROR: "Horror",
  MYSTERY: "Mystery",
  ROMANCE: "Romance",
  THRILLER: "Thriller",
  SCI_FI: "Sci-Fi",
  ANIMATION: "Animation",
  DOCUMENTARY: "Documentary",
  FAMILY: "Family",
  CRIME: "Crime",
  ADVENTURE: "Adventure",
  OTHER: "Other",
} as const;

export type MovieGenre = (typeof MovieGenre)[keyof typeof MovieGenre];
