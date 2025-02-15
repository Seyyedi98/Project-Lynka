import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import deleteFile from "@/lib/upload/deleteFile";
import uploadFile from "@/lib/upload/uploadFile";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const CardElementBgUploader = ({ element }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadLink, setUploadLink] = useState(null);
  const [permanentLink, setPermanentLink] = useState(null);

  const dispatch = useDispatch();

  const previousImage = element.extraAttributes.image
    ? JSON.parse(element.extraAttributes.image)
    : "";
  const previousImageKey = previousImage ? previousImage?.key : null;

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
      maxSizeMB: 0.2, // Compress to be <= 200KB
      maxWidthOrHeight: 720, // Optional: Resize image to 720px width/height if it's larger
      initialQuality: 1, // Start with 100% quality and adjust as needed
      useWebWorker: true, // Enable web workers for faster processing
    };

    setIsUploading(true);
    const { permanentSignedUrl, response } = await uploadFile(file, options);
    const JSONCardImageData = JSON.stringify({
      url: permanentSignedUrl,
      key: response.Key,
    });

    try {
      if (previousImageKey) {
        deleteFile({
          file: previousImage,
          BUCKET,
          ACCESSKEY,
          SECRETKEY,
          ENDPOINT,
        });
      }

      const payload = {
        id: element.id,
        updatedElement: {
          ...element,
          extraAttributes: {
            ...element.extraAttributes,
            image: JSONCardImageData,
          },
        },
      };

      dispatch({ type: "page/updateElement", payload });
      dispatch({ type: "modal/closeMenu" });
      dispatch({ type: "page/setSelectedElement", payload: null });

      toast({
        description: "تصویر با موفقیت تغییر یافت",
      });
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
        <Label htmlFor="uploader">تصویر کارت</Label>
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

          <div className="mt-2 flex justify-center gap-2"></div>
        </div>

        {uploadLink && (
          <h3 className="success-message">File uploaded successfully.</h3>
        )}

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default CardElementBgUploader;
