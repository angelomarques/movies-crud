import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { login, signUp } from ".";
import type { LoginPayload, LoginResponse, SignUpPayload } from "./types";

export function useLoginMutation(
  options?: Omit<
    UseMutationOptions<LoginResponse, Error, LoginPayload, unknown>,
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
    UseMutationOptions<void, Error, SignUpPayload, unknown>,
    "mutationFn"
  >
) {
  return useMutation({
    mutationFn: signUp,
    ...options,
  });
}
