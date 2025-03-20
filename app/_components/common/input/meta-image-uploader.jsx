import { UpdatePageMetaImage } from "@/actions/page/page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import deleteFile from "@/lib/upload/deleteFile";
import uploadFile from "@/lib/upload/uploadFile";
import { Loader2, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MetaImageUploader = ({ uri, metaImage }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadLink, setUploadLink] = useState(null);
  const [permanentLink, setPermanentLink] = useState(null);

  const dispatch = useDispatch();
  const metadata = useSelector((store) => store.page.metadata);

  const previousImage = metaImage?.key;

  const ACCESSKEY = process.env.NEXT_PUBLIC_ACCESS_KEY;
  const SECRETKEY = process.env.NEXT_PUBLIC_SECRET_KEY;
  const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;
  const BUCKET = process.env.NEXT_PUBLIC_BUCKET_NAME;

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
    const JSONMetaImageData = JSON.stringify({
      key: response.Key,
    });

    try {
      if (previousImage) {
        deleteFile({
          file: metaImage,
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
        <h3 className="success-message">File uploaded successfully.</h3>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default MetaImageUploader;
