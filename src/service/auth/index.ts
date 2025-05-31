import { api } from "@/lib/api";
import type { LoginPayload, SignUpPayload } from "./types";

export function login(payload: LoginPayload) {
  // TODO: implement it
  return new Promise((resolve) =>
    setTimeout(() => resolve("success"), 3000)
  ) as Promise<string>;
}

export async function signUp(payload: SignUpPayload) {
  await api.post("/auth/sign-up", payload);
}
