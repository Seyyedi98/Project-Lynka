import { Button } from "@/components/ui/button";
import { Loader2, X, Check, Image as ImageIcon } from "lucide-react";
import { useState, useEffect } from "react";
import getImageAddress from "@/utils/get-image-address";
import Image from "next/image";
import uploadFile from "@/lib/upload/uploadFile";

export const ImageUploaderField = ({
  value,
  onChange,
  index,
  label = "تصویر",
  options,
  showImageDeleteButton = true,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [tempFile, setTempFile] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Auto-upload when file is selected
  useEffect(() => {
    const handleAutoUpload = async () => {
      if (tempFile && !value) {
        setIsUploading(true);
        try {
          const data = await uploadFile(tempFile, options);
          const { response } = data;
          const stringifiedData = JSON.stringify({
            key: response.Key,
          });
          onChange(stringifiedData);
          setTempFile(null);
        } catch (error) {
          console.error("Upload failed:", error);
        } finally {
          setIsUploading(false);
        }
      }
    };

    handleAutoUpload();
  }, [tempFile, value, onChange, options]);

  return (
    <div className="mt-2 flex flex-col gap-2">
      <label className="text-center text-sm font-medium">{label}</label>
      {value ? (
        <div className="relative">
          {(() => {
            try {
              const imageData = JSON.parse(value);
              return (
                <Image
                  width={640}
                  height={400}
                  src={getImageAddress(imageData.key)}
                  alt="Uploaded image"
                  className="h-full w-full rounded border object-contain"
                />
              );
            } catch {
              return (
                <div className="flex h-32 w-full items-center justify-center rounded border bg-gray-100">
                  <span className="text-gray-500">Invalid image data</span>
                </div>
              );
            }
          })()}

          {showDeleteConfirm ? (
            <div className="mt-1 flex w-full gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 gap-1 text-text"
                onClick={(e) => {
                  e.preventDefault();
                  setShowDeleteConfirm(false);
                }}
              >
                <X className="h-4 w-4" />
                انصراف
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="flex-1 gap-1"
                onClick={(e) => {
                  e.preventDefault();
                  onChange("");
                  setShowDeleteConfirm(false);
                }}
              >
                <Check className="h-4 w-4" />
                حذف
              </Button>
            </div>
          ) : (
            showImageDeleteButton && (
              <Button
                variant="destructive"
                size="sm"
                className="bottom-0 right-0 mt-1 w-full"
                onClick={(e) => {
                  e.preventDefault();
                  setShowDeleteConfirm(true);
                }}
              >
                حذف تصویر
              </Button>
            )
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <input
            type="file"
            id={`file-upload-${index}`}
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setTempFile(file);
              }
            }}
            className="hidden"
          />
          <label
            htmlFor={`file-upload-${index}`}
            className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border-4 border-dashed border-gray-300 transition-colors duration-200 hover:border-gray-400 dark:border-white/30 dark:hover:border-white/50"
          >
            {isUploading ? (
              <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
            ) : (
              <>
                <ImageIcon className="h-10 w-10 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">انتخاب تصویر</span>
              </>
            )}
          </label>
        </div>
      )}
    </div>
  );
};
