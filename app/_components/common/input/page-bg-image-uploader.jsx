import { UpdatePageTheme } from "@/actions/page/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import deleteFile from "@/lib/upload/deleteFile";
import uploadFile from "@/lib/upload/uploadFile";
import { Check, ImageIcon, Loader2, Trash2, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const PageBgImageUploader = ({ theme, bgImage }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const fileInputRef = useRef(null);

  const { uri } = useParams();
  const dispatch = useDispatch();

  let previousImage;
  try {
    previousImage = JSON.parse(theme.backgroundImage);
  } catch {
    previousImage = null;
  }

  // Set initial state from bgImage prop
  useEffect(() => {
    setHasImage(!!bgImage);
  }, [bgImage]);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setError(null);

    // Automatically start upload
    await handleUpload(selectedFile);
  };

  const handleUpload = async (fileToUpload) => {
    const options = {
      maxSizeMB: 0.7,
      maxWidthOrHeight: 1280,
      initialQuality: 1,
      useWebWorker: true,
    };

    setIsUploading(true);

    try {
      const { permanentSignedUrl, response } = await uploadFile(
        fileToUpload,
        options,
      );
      const JSONBgImageData = JSON.stringify({
        key: response.Key,
      });

      const payload = {
        ...theme,
        backgroundType: "image",
        backgroundImage: JSONBgImageData,
      };

      dispatch({ type: "page/setTheme", payload });
      dispatch({ type: "modal/closeMenu" });
      toast({
        description: "تصویر پس زمینه با موفقیت تغییر یافت",
      });

      const newTheme = JSON.stringify({
        ...theme,
        backgroundType: "image",
        backgroundImage: JSONBgImageData,
      });

      // Update db
      await UpdatePageTheme(uri, newTheme);
      setHasImage(true);
    } catch (error) {
      toast({
        description: "خطایی رخ داد. لطفا مجددا سعی کنید",
      });
      console.log(error);
      setError("خطا در آپلود تصویر");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    setIsUploading(true);
    try {
      if (bgImage) {
        await deleteFile({
          file: previousImage,
        });
      }

      const payload = {
        ...theme,
        backgroundType: "color",
        backgroundImage: null,
      };

      dispatch({ type: "page/setTheme", payload });
      dispatch({ type: "modal/closeMenu" });
      toast({
        description: "تصویر پس زمینه با موفقیت حذف شد",
      });

      const newTheme = JSON.stringify({
        ...theme,
        backgroundType: "color",
        backgroundImage: null,
      });

      await UpdatePageTheme(uri, newTheme);
      setHasImage(false);
      setShowDeleteConfirm(false);
    } catch (error) {
      toast({
        description: "خطایی در حذف تصویر رخ داد",
      });
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="upload-container">
      {isUploading && (
        <div className="fixed right-0 top-0 z-[99999] grid h-screen w-screen cursor-wait place-content-center bg-black opacity-80">
          <span className="flex items-center justify-center gap-2">
            در حال بارگزاری <Loader2 className="mt-1 animate-spin" />
          </span>
        </div>
      )}

      <div className="file-upload w-full text-nowrap">
        {/* Hidden file input */}
        <Input
          id="uploader"
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />

        {/* Only show upload area if there's no image */}
        {!hasImage && (
          <div
            onClick={triggerFileInput}
            className="mt-2 flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border-4 border-dashed border-gray-300 transition-colors duration-200 hover:border-gray-400 dark:border-white/30 dark:hover:border-white/50"
          >
            <ImageIcon className="h-8 w-8 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              {isUploading ? "در حال آپلود..." : "انتخاب تصویر"}
            </p>
          </div>
        )}

        {/* Show delete button if there's an image */}
        {hasImage && (
          <div className="mt-2">
            {showDeleteConfirm ? (
              <div className="flex w-full gap-2">
                <Button
                  variant="outline"
                  className="flex-1 gap-1"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowDeleteConfirm(false);
                  }}
                  disabled={isUploading}
                >
                  <X className="h-4 w-4" />
                  انصراف
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1 gap-1"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete();
                  }}
                  disabled={isUploading}
                >
                  <Check className="h-4 w-4" />
                  حذف
                </Button>
              </div>
            ) : (
              <Button
                variant="destructive"
                className="w-full"
                onClick={(e) => {
                  e.preventDefault();
                  setShowDeleteConfirm(true);
                }}
                disabled={isUploading}
              >
                <Trash2 className="ml-2 h-4 w-4" />
                حذف تصویر
              </Button>
            )}
          </div>
        )}

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default PageBgImageUploader;
