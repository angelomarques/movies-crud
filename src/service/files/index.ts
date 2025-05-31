import { api } from "@/lib/api";
import type { FileUploadResponse } from "./types";

export async function handleUpload(file: File): Promise<FileUploadResponse> {
  const formData = new FormData();

  formData.append("file", file, file.name);

  const { data } = await api.post<FileUploadResponse>("files/upload", formData);

  return data;
}
