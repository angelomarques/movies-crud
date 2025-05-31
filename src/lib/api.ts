import type { AuthState } from "@/store/auth";
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const authStorage = JSON.parse(
      localStorage.getItem("auth-storage") ?? ""
    ) as { state: AuthState };

    const token = authStorage?.state?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);
