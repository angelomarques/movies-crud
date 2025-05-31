import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { FileText, LoaderCircle, Trash2 } from "lucide-react";
import React from "react";
import type { FileWithPreview } from "./types";

type FileItemProps = {
  fileObj: FileWithPreview;
  onRemove: (id: string) => void;
};

const FileItem: React.FC<FileItemProps> = ({ fileObj, onRemove }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const isUploading = fileObj.status === "uploading";

  const fileExtension = (filename: string) => {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
  };

  const truncateFilename = (filename: string, maxLength = 20) => {
    if (filename.length <= maxLength) return filename;
    const ext = fileExtension(filename);
    const nameWithoutExt = filename.slice(0, filename.lastIndexOf("."));
    return `${nameWithoutExt.slice(0, maxLength - ext.length - 3)}...${ext}`;
  };

  async function redirectToFile() {
    if (!fileObj.url) {
      return;
    }
    try {
      setIsLoading(true);

      const anchor = document.createElement("a");
      anchor.href = fileObj.url;
      anchor.target = "_blank";

      document.body.appendChild(anchor);

      anchor.click();

      document.body.removeChild(anchor);
    } catch (err) {
      console.error("Error downloading file:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center p-3 border border-gray-100 rounded-md">
      <div
        className={cn("flex-shrink-0 mr-3", {
          "cursor-pointer": !isLoading,
          "cursor-progress": isLoading,
        })}
        onClick={redirectToFile}
      >
        {isUploading ? (
          <LoaderCircle className="h-8 w-8 animate-spin" />
        ) : (
          <FileText className="h-8 w-8" />
        )}
      </div>
      <div
        className={cn("flex-grow", {
          "cursor-pointer": !isLoading,
          "cursor-progress": isLoading,
        })}
        onClick={redirectToFile}
      >
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium">
            {truncateFilename(fileObj.file.name)}
          </span>
        </div>

        {isUploading && (
          <Progress value={fileObj.progress} className="h-1.5 bg-gray-200" />
        )}
      </div>
      <div className="flex-shrink-0 ml-3">
        {!isUploading && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:text-red-500"
            onClick={() => onRemove(fileObj.url || "")}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FileItem;
