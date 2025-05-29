import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { login } from ".";
import type { LoginPayload } from "./types";

export function useLoginMutation(
  options?: Omit<
    UseMutationOptions<string, Error, LoginPayload, unknown>,
    "mutationFn"
  >
) {
  return useMutation({
    mutationFn: login,
    ...options,
  });
}
