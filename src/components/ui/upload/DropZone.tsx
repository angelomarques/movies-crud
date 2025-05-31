import React, { useState, useCallback } from "react";
import { FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DropZoneProps = {
  onFilesSelected: (files: FileList) => void;
  acceptedFileTypes: string;
  icon: React.ReactNode;
};

const DropZone: React.FC<DropZoneProps> = ({
  onFilesSelected,
  acceptedFileTypes,
  icon,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        onFilesSelected(e.dataTransfer.files);
      }
    },
    [onFilesSelected]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        onFilesSelected(e.target.files);
      }
    },
    [onFilesSelected]
  );

  return (
    <div
      className={cn(
        "border border-border border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center transition-colors",
        isDragging && "active"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {icon}
      <p className="mb-2 text-sm font-medium">
        Arraste e solte seus arquivos aqui ou
      </p>
      <input
        id="file-upload"
        type="file"
        accept={acceptedFileTypes}
        multiple
        className="hidden"
        onChange={handleFileInput}
      />
      <Button
        variant="outline"
        type="button"
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        <FilePlus className="mr-2 h-4 w-4" />
        Escolher Arquivos
      </Button>
      <p className="mt-2 text-xs">
        Formatos aceitos: {acceptedFileTypes.split(",").join(", ")}
      </p>
    </div>
  );
};

export default DropZone;
