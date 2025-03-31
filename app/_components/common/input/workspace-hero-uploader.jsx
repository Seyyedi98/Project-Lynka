// import { savePageSettings } from "@/actions/page/page-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import deleteFile from "@/lib/upload/deleteFile";
import uploadFile from "@/lib/upload/uploadFile";
import { Loader2, Loader2Icon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const HeroWorkspaceUploader = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadLink, setUploadLink] = useState(null);
  const [permanentLink, setPermanentLink] = useState(null);

  const dispatch = useDispatch();
  const hero = useSelector((store) => store.page.hero);

  const previousImage = hero?.extraAttributes?.primaryImage;

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(null);
    setUploadLink(null);
    setPermanentLink(null);
  };

  const handleUploadButton = async () => {
    const options = {
      maxSizeMB: 0.3, // Compress to be <= 0.3MB
      maxWidthOrHeight: 720, // Optional: Resize image to 720px width/height if it's larger
      initialQuality: 1, // Start with 100% quality and adjust as needed
      useWebWorker: true, // Enable web workers for faster processing
    };

    setIsUploading(true);
    const { permanentSignedUrl, response } = await uploadFile(file, options);

    try {
      if (previousImage) {
        deleteFile({
          file: previousImage,
        });
      }

      const payload = {
        ...hero,
        extraAttributes: {
          ...hero.extraAttributes,
          primaryImage: { key: response.Key },
        },
      };
      dispatch({ type: "page/setHero", payload });

      dispatch({ type: "modal/closeMenu" });
      setTimeout(
        () =>
          dispatch({
            type: "page/setSelectedElement",
            payload: null,
          }),
        200,
      );
      toast.success("تصویر با موفقیت تغییر یافت");
    } catch (error) {
      toast.error("خطایی رخ داد. لطفا مجددا سعی کنید");
    }

    setIsUploading(false);
  };

  return (
    <div className="upload-container">
      {isUploading && (
        <div className="fixed right-0 top-0 z-[99999] grid h-screen w-screen cursor-wait place-content-center bg-black opacity-80">
          <span className="flex items-center justify-center gap-2">
            در حال بارگزاری <Loader2Icon className="mt-1 animate-spin" />
          </span>
        </div>
      )}
      <div className="file-upload text-nowrap">
        <Label htmlFor="uploader">تصویر اصلی</Label>
        <div className="mt-2 flex justify-center gap-2">
          <Input
            id="uploader"
            disabled={isUploading}
            type="file"
            onChange={handleFileChange}
            className="file-input mb-2 rounded-md"
            accept="image/*"
          />
          <Button
            size="md"
            variant="primary_2"
            onClick={handleUploadButton}
            disabled={!file || isUploading}
            className="upload-button"
          >
            {!isUploading ? "بارگزاری" : <Loader2 className="animate-spin" />}
          </Button>
        </div>
      </div>

      {uploadLink && (
        <h3 className="success-message">فایل با موفقیت بارگزاری شد</h3>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default HeroWorkspaceUploader;
