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
};

export type CreateMoviePayload = Omit<Movie, "id" | "createdAt" | "updatedAt">;
// TODO: implement it
// export type UpdateMoviePayload = Partial<CreateMoviePayload>;

export type GetMoviesParams = {
  page?: number;
  limit?: number;
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
