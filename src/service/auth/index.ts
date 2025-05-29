import type { LoginPayload, SignUpPayload } from "./types";

export function login(payload: LoginPayload) {
  // TODO: implement it
  return new Promise((resolve) =>
    setTimeout(() => resolve("success"), 3000)
  ) as Promise<string>;
}

export function signUp(payload: SignUpPayload) {
  // TODO: implement it
  return new Promise((resolve) =>
    setTimeout(() => resolve("success"), 3000)
  ) as Promise<string>;
}
