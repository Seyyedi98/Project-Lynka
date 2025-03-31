import toast from "react-hot-toast";
import { S3 } from "aws-sdk";
import imageCompression from "browser-image-compression";

const uploadFile = async (file, options) => {
  const ACCESSKEY = process.env.NEXT_PUBLIC_ACCESS_KEY;
  const SECRETKEY = process.env.NEXT_PUBLIC_SECRET_KEY;
  const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;
  const BUCKET = process.env.NEXT_PUBLIC_BUCKET_NAME;

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

    const s3 = new S3({
      accessKeyId: ACCESSKEY,
      secretAccessKey: SECRETKEY,
      endpoint: ENDPOINT,
      s3ForcePathStyle: true, // Required for S3-compatible services
      // signatureVersion: "v4", // Use v4 for signing
      // logger: console,
    });

    const params = {
      Bucket: BUCKET,
      Key: fileUploadName,
      Body: compressedFile,
      ContentType: file.type,
    };

    const response = await s3.upload(params).promise();

    const permanentSignedUrl = s3.getSignedUrl("getObject", {
      Bucket: BUCKET,
      Key: fileUploadName,
      Expires: 3153600000, // 100 years
    });

    return { permanentSignedUrl, response };
  } catch (error) {
    if (error.message === "The file given is not an image") {
      toast.success("فرمت فایل انتخاب شده قابل قبول نیست");
    }
    console.error("Error uploading file:", error.message);
    return { error: error.message };
  }
};

export default uploadFile;
