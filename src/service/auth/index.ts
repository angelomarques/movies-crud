import { api } from "@/lib/api";
import type { LoginPayload, LoginResponse, SignUpPayload } from "./types";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login", payload);

  return data;
}

export async function signUp(payload: SignUpPayload) {
  await api.post("/auth/sign-up", payload);
}
