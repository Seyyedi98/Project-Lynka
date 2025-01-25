// import { savePageSettings } from "@/actions/page/page-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import uploadFile from "@/lib/upload/uploadFile";
import { S3 } from "aws-sdk";
import { useEffect, useState } from "react";

const Upload = ({ uri }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadLink, setUploadLink] = useState(null);
  const [permanentLink, setPermanentLink] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [buckets, setBuckets] = useState([]);

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

    // await savePageSettings(uri, formValues).then((data) => {
    //   if (data.success) {
    //     toast({
    //       description: data.success,
    //     });
    //   }
    //   if (data.error) {
    //     toast({
    //       description: data.error,
    //     });
    //   }
    // });
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
          type="file"
          onChange={handleFileChange}
          className="file-input mb-2 rounded-md"
        />
        <Button
          onClick={handleUploadButton}
          disabled={!file || isUploading}
          className="upload-button rounded-md"
        >
          {!isUploading ? "Upload" : " Uploading..."}
        </Button>
      </div>

      {uploadLink && (
        <h3 className="success-message">File uploaded successfully.</h3>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Upload;
