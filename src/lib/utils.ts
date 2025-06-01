import type { DurationCategory } from "@/service/movies/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatBRL = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export function getDurationCategoryLabel(
  durationCategory: DurationCategory
): string {
  switch (durationCategory) {
    case "short":
      return "Curta (até 50 minutos)";
    case "medium":
      return "Média (entre 51 e 100 minutos)";
    case "long":
      return "Longa (mais de 100 minutos)";
  }
}
