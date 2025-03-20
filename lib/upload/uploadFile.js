import { toast } from "@/hooks/use-toast";
import { S3 } from "aws-sdk";
import imageCompression from "browser-image-compression"; // Install using `npm install browser-image-compression`

const uploadFile = async (file, options) => {
  const ACCESSKEY = process.env.NEXT_PUBLIC_ACCESS_KEY; // Keep the same env name
  const SECRETKEY = process.env.NEXT_PUBLIC_SECRET_KEY; // Keep the same env name
  const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT; // Keep the same env name
  const BUCKET = process.env.NEXT_PUBLIC_BUCKET_NAME; // Keep the same env name

  try {
    if (!ACCESSKEY || !SECRETKEY || !ENDPOINT || !BUCKET) {
      throw new Error("Missing required environment variables");
    }

    if (!file) {
      console.error("No file selected");
      return { error: "No file selected" };
    }

    // Compress the file
    const compressedFile = await imageCompression(file, options);

    // Generate unique file name
    const fileNameArray = compressedFile.name.split(".");
    const fileName = fileNameArray[0];
    let fileFormat = fileNameArray[fileNameArray.length - 1];
    const fileUploadName = `${fileName}-${Math.random() * 12000}.${fileFormat}`;

    // Initialize S3 client with ParsPack configuration
    const s3 = new S3({
      accessKeyId: ACCESSKEY,
      secretAccessKey: SECRETKEY,
      endpoint: ENDPOINT,
      s3ForcePathStyle: true, // Required for S3-compatible services
      // signatureVersion: "v4", // Use v4 for signing
      // logger: console,
    });

    // Upload file to ParsPack
    const params = {
      Bucket: BUCKET,
      Key: fileUploadName,
      Body: compressedFile,
      ContentType: file.type, // Ensure the correct MIME type is set
    };

    const response = await s3.upload(params).promise();

    // Generate a signed URL for the uploaded file
    const permanentSignedUrl = s3.getSignedUrl("getObject", {
      Bucket: BUCKET,
      Key: fileUploadName,
      Expires: 3153600000, // 100 years
    });

    return { permanentSignedUrl, response };
  } catch (error) {
    if (error.message === "The file given is not an image") {
      toast({
        description: "فرمت فایل انتخاب شده قابل قبول نیست",
      });
    }
    console.error("Error uploading file:", error.message);
    return { error: error.message };
  }
};

export default uploadFile;
