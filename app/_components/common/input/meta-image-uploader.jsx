import { UpdatePageMetaImage } from "@/actions/page/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import deleteFile from "@/lib/upload/deleteFile";
import uploadFile from "@/lib/upload/uploadFile";
import getImageAddress from "@/utils/get-image-address";
import { Loader2, ImageIcon, Trash2, X, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const MetaImageUploader = ({ uri, metaImage }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [hasMetaImage, setHasMetaImage] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const metadata = useSelector((store) => store.page.metadata);

  // const previousImage = metaImage && getImageAddress(JSON.parse(metaImage).key);

  const ACCESSKEY = process.env.NEXT_PUBLIC_ACCESS_KEY;
  const SECRETKEY = process.env.NEXT_PUBLIC_SECRET_KEY;
  const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;
  const BUCKET = process.env.NEXT_PUBLIC_BUCKET_NAME;

  // Set initial state from metaImage prop
  useEffect(() => {
    setHasMetaImage(!!metaImage);
  }, [metaImage]);

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
      maxSizeMB: 0.2, // Compress to be <= 200KB
      maxWidthOrHeight: 720, // Optional: Resize image to 720px width/height if it's larger
      initialQuality: 1, // Start with 100% quality and adjust as needed
      useWebWorker: true, // Enable web workers for faster processing
    };

    setIsUploading(true);

    try {
      const { permanentSignedUrl, response } = await uploadFile(
        fileToUpload,
        options,
      );
      const JSONMetaImageData = JSON.stringify({
        key: response.Key,
      });

      if (metaImage) {
        await deleteFile({
          file: { key: JSON.parse(metaImage).key },
          BUCKET,
          ACCESSKEY,
          SECRETKEY,
          ENDPOINT,
        });
      }

      await UpdatePageMetaImage(uri, JSONMetaImageData);

      const payload = {
        ...metadata,
        metaImage: JSONMetaImageData,
      };

      dispatch({ type: "page/setMetadata", payload });
      dispatch({ type: "modal/closeMenu" });
      toast({
        description: "تصویر با موفقیت تغییر یافت",
      });

      setHasMetaImage(true);
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
    const file = metaImage ? { key: JSON.parse(metaImage).key } : null;

    setIsUploading(true);
    try {
      await UpdatePageMetaImage(uri, null);

      const payload = {
        ...metadata,
        metaImage: null,
      };

      dispatch({ type: "page/setMetadata", payload });
      dispatch({ type: "modal/closeMenu" });
      toast({
        description: "تصویر با موفقیت حذف شد",
      });

      setHasMetaImage(false);
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

      <div className="file-upload text-nowrap">
        {/* Hidden file input */}
        <Input
          id="meta-image-uploader"
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />

        {/* Show upload area if there's no meta image */}
        {!hasMetaImage && (
          <div
            onClick={triggerFileInput}
            className="mt-2 flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border-4 border-dashed border-gray-300 transition-colors duration-200 hover:border-gray-400 dark:border-white/30 dark:hover:border-white/50"
          >
            {isUploading ? (
              <Loader2 className="h-10 w-10 animate-spin text-gray-400" />
            ) : (
              <>
                <ImageIcon className="h-10 w-10 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">
                  انتخاب تصویر اصلی
                </span>
              </>
            )}
          </div>
        )}

        {/* Show delete button if there's a meta image */}
        {hasMetaImage && (
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
              <>
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
              </>
            )}
          </div>
        )}

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default MetaImageUploader;
