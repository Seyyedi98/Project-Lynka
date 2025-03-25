import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import uploadFile from "@/lib/upload/uploadFile";
import { Loader2, Loader2Icon } from "lucide-react";
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

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(null);
    setUploadLink(null);
    setPermanentLink(null);
  };

  const handleUploadButton = async () => {
    const options = {
      maxSizeMB: 0.15, // Compress to be <= 150KB
      maxWidthOrHeight: 720, // Optional: Resize image to 720px width/height if it's larger
      initialQuality: 1, // Start with 100% quality and adjust as needed
      useWebWorker: true, // Enable web workers for faster processing
    };

    setIsUploading(true);
    try {
      // Upload the file using the updated `uploadFile` function
      const data = await uploadFile(file, options);
      const { permanentSignedUrl, response } = data;

      const JSONCardImageData = JSON.stringify({
        key: response.Key,
      });

      // Delete the previous image if it exists
      // if (previousImageKey) {
      //   await deleteFile({
      //     file: previousImage,
      //     BUCKET,
      //     ACCESSKEY,
      //     SECRETKEY,
      //     ENDPOINT,
      //   });
      // }

      // Update the element with the new image data
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
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
    }
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
        <Label htmlFor="uploader">تصویر پس زمینه</Label>
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
