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
};

export type CreateMoviePayload = Omit<Movie, "id" | "createdAt" | "updatedAt">;
// TODO: implement it
// export type UpdateMoviePayload = Partial<CreateMoviePayload>;
