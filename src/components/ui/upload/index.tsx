import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";
import React, { useCallback, useState } from "react";
import { toast } from "sonner";
import DropZone from "./DropZone";
import FileItem from "./FileItem";
import type { FileWithPreview, IDocumentFileStatus } from "./types";

export interface IProps {
  acceptedFileTypes?: string;
  maxFiles?: number;
  className?: string;
  uploadService: (file: File) => Promise<{ success: boolean; url?: string }>;
  initialFileKeys?: string[];
  customFileName?: string;
}

export const UploadInput: React.FC<IProps> = ({
  acceptedFileTypes = ".pdf,.doc,.docx,.jpg,.jpeg,.png",
  maxFiles = 10,
  className,
  uploadService,
  initialFileKeys,
  customFileName,
}) => {
  const [files, setFiles] = useState<FileWithPreview[]>(
    initialFileKeys?.map((item, index) => ({
      id: item,
      url: item,
      progress: 100,
      status: "complete",
      file: new File([], getFileName(item, index)),
    })) ?? []
  );
  const [isDeleting, setIsDeleting] = useState(false);

  function getFileName(key: string, index: number) {
    const ext = key.split(".").pop();

    if (customFileName) {
      return `${customFileName}-${index + 1}.${ext}`;
    }

    return key.split("/").pop() || `${index}.${ext}`;
  }

  const handleFiles = useCallback(
    (fileList: FileList) => {
      if (files.length >= maxFiles) {
        toast.error(
          "Você já atingiu o número máximo de arquivos permitidos." +
            ` Máximo: ${maxFiles} arquivos.`
        );
        return;
      }

      const newFiles = Array.from(fileList)
        .slice(0, maxFiles - files.length)
        .map((file) => ({
          file,
          id: Math.random().toString(36).substring(2, 9),
          progress: 0,
          status: "uploading" as const,
        }));

      setFiles((prev) => [...prev, ...newFiles]);

      newFiles.forEach(async (fileObj) => {
        const res = await uploadService(fileObj.file);

        setFiles((prevFiles) => {
          const updatedFiles = prevFiles.map((prevFile) => {
            if (prevFile.id !== fileObj.id) {
              return prevFile;
            }

            const status: IDocumentFileStatus = res.success
              ? "complete"
              : "error";

            return { ...prevFile, url: res.url, status };
          });

          return updatedFiles;
        });
      });
    },
    [files, maxFiles]
  );

  const removeFile = useCallback(async (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  }, []);

  return (
    <div className={cn("modern-card", className)}>
      <DropZone
        onFilesSelected={handleFiles}
        acceptedFileTypes={acceptedFileTypes}
        icon={<Upload className="h-10 w-10 mb-2" />}
      />

      {files.length > 0 && (
        <div className="space-y-3 mt-6">
          {files.map((fileObj) => (
            <FileItem
              key={fileObj.id}
              fileObj={fileObj}
              onRemove={() => removeFile(fileObj.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
