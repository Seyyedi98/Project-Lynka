import { UpdatePageTheme } from "@/actions/page/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import deleteFile from "@/lib/upload/deleteFile";
import uploadFile from "@/lib/upload/uploadFile";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const PageBgImageUploader = ({ theme }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadLink, setUploadLink] = useState(null);

  const { uri } = useParams();

  const dispatch = useDispatch();

  let previousImage;
  try {
    previousImage = JSON.parse(theme.backgroundImage);
  } catch {
    previousImage = null;
  }

  const ACCESSKEY = process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY;
  const SECRETKEY = process.env.NEXT_PUBLIC_LIARA_SECRET_KEY;
  const ENDPOINT = process.env.NEXT_PUBLIC_LIARA_ENDPOINT;
  const BUCKET = process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME;

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(null);
    setUploadLink(null);
  };

  const handleUploadButton = async () => {
    const options = {
      maxSizeMB: 1, // Compress to be <= 0.7MB
      maxWidthOrHeight: 1280, // Optional: Resize image to 1280px width/height if it's larger
      initialQuality: 1, // Start with 100% quality and adjust as needed
      useWebWorker: true, // Enable web workers for faster processing
    };

    setIsUploading(true);
    const { permanentSignedUrl, response } = await uploadFile(file, options);
    const JSONBgImageData = JSON.stringify({
      url: permanentSignedUrl,
      key: response.Key,
    });

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
    } catch (error) {
      toast({
        description: "خطایی رخ داد. لطفا مجددا سعی کنید",
      });
      console.log(error);
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
            className="upload-button rounded-md"
          >
            {!isUploading ? "بارگزاری" : <Loader2 className="animate-spin" />}
          </Button>
        </div>
      </div>

      {uploadLink && (
        <h3 className="success-message">File uploaded successfully.</h3>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default PageBgImageUploader;
