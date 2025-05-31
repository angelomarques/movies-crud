export type FileWithPreview = {
  file: File;
  id: string;
  progress: number;
  status: IDocumentFileStatus;
  url?: string;
};

export type IDocumentFileStatus = "uploading" | "complete" | "error";
