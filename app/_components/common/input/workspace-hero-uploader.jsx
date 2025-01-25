// import { savePageSettings } from "@/actions/page/page-data";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import useEditor from "@/hooks/useEditor";
import useModal from "@/hooks/useModal";
import uploadFile from "@/lib/uploadFile";
import { S3 } from "aws-sdk";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const HeroWorkspaceUploader = ({ uri }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadLink, setUploadLink] = useState(null);
  const [permanentLink, setPermanentLink] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [buckets, setBuckets] = useState([]);

  const { updateHero, hero } = useEditor();
  const { closeMenu } = useModal();

  const ACCESSKEY = process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY;
  const SECRETKEY = process.env.NEXT_PUBLIC_LIARA_SECRET_KEY;
  const ENDPOINT = process.env.NEXT_PUBLIC_LIARA_ENDPOINT;
  const BUCKET = process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME;

  const fetchBuckets = async () => {
    const s3 = new S3({
      accessKeyId: ACCESSKEY,
      secretAccessKey: SECRETKEY,
      endpoint: ENDPOINT,
    });
    try {
      const response = await s3.listBuckets().promise();
      setBuckets(response.Buckets);
    } catch (error) {
      console.error("Error fetching buckets: ", error);
    }
  };

  const fetchAllFiles = async () => {
    const s3 = new S3({
      accessKeyId: ACCESSKEY,
      secretAccessKey: SECRETKEY,
      endpoint: ENDPOINT,
    });

    try {
      const response = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
      setAllFiles(response.Contents);
    } catch (error) {
      console.error("Error fetching files: ", error);
    }
  };

  useEffect(() => {
    fetchBuckets();
    fetchAllFiles();
  }, [uploadLink]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(null);
    setUploadLink(null);
    setPermanentLink(null);
  };

  const handleUploadButton = async () => {
    setIsUploading(true);
    const res = await uploadFile(file);
    const formValues = { bgImage: res };
    // Add image url to database

    try {
      updateHero({
        ...hero,
        extraAttributes: {
          ...hero.extraAttributes,
          primaryImage: res,
        },
      });
      closeMenu();
      toast({
        description: "succeed",
      });
    } catch (error) {
      toast({
        description: "error",
      });
    }

    setIsUploading(false);
  };

  const handleDeleteFile = async (file) => {
    try {
      const s3 = new S3({
        accessKeyId: ACCESSKEY,
        secretAccessKey: SECRETKEY,
        endpoint: ENDPOINT,
      });

      await s3.deleteObject({ Bucket: BUCKET, Key: file.Key }).promise();

      console.log("File deleted successfully");
    } catch (error) {
      console.error("Error deleting file: ", error);
    }
  };

  return (
    <div className="upload-container">
      <div className="file-upload flex gap-2">
        <Input
          disabled={isUploading}
          type="file"
          onChange={handleFileChange}
          className="file-input mb-2 rounded-md"
        />
        <Button
          onClick={handleUploadButton}
          disabled={!file || isUploading}
          className="upload-button rounded-md"
        >
          {!isUploading ? "بارگزاری" : <Loader2 className="animate-spin" />}
        </Button>
      </div>

      {uploadLink && (
        <h3 className="success-message">File uploaded successfully.</h3>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default HeroWorkspaceUploader;
