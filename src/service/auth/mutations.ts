import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { login, signUp } from ".";
import type { LoginPayload, SignUpPayload } from "./types";

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

export function useSignUpMutation(
  options?: Omit<
    UseMutationOptions<string, Error, SignUpPayload, unknown>,
    "mutationFn"
  >
) {
  return useMutation({
    mutationFn: signUp,
    ...options,
  });
}
