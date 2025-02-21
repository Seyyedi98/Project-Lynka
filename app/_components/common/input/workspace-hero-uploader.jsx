// import { savePageSettings } from "@/actions/page/page-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import deleteFile from "@/lib/upload/deleteFile";
import uploadFile from "@/lib/upload/uploadFile";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const HeroWorkspaceUploader = ({ uri }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadLink, setUploadLink] = useState(null);
  const [permanentLink, setPermanentLink] = useState(null);

  const dispatch = useDispatch();
  const hero = useSelector((store) => store.page.hero);

  const previousImage = hero?.extraAttributes?.primaryImage;

  const ACCESSKEY = process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY;
  const SECRETKEY = process.env.NEXT_PUBLIC_LIARA_SECRET_KEY;
  const ENDPOINT = process.env.NEXT_PUBLIC_LIARA_ENDPOINT;
  const BUCKET = process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME;

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
          BUCKET,
          ACCESSKEY,
          SECRETKEY,
          ENDPOINT,
        });
      }

      const payload = {
        ...hero,
        extraAttributes: {
          ...hero.extraAttributes,
          primaryImage: { url: permanentSignedUrl, key: response.Key },
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
      toast({
        description: "تصویر با موفقیت تغییر یافت",
      });
    } catch (error) {
      toast({
        description: "خطایی رخ داد. لطفا مجددا سعی کنید",
      });
    }

    setIsUploading(false);
  };

  return (
    <div className="upload-container">
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
            onClick={handleUploadButton}
            disabled={!file || isUploading}
            className="upload-button rounded-sm bg-button text-primary"
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
