import { toast } from "@/hooks/use-toast";
import { S3 } from "aws-sdk";
import imageCompression from "browser-image-compression"; // Install using `npm install browser-image-compression`

const uploadFile = async (file, options) => {
  const ACCESSKEY = process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY;
  const SECRETKEY = process.env.NEXT_PUBLIC_LIARA_SECRET_KEY;
  const ENDPOINT = process.env.NEXT_PUBLIC_LIARA_ENDPOINT;
  const BUCKET = process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME;

  try {
    if (!ACCESSKEY || !SECRETKEY || !ENDPOINT || !BUCKET) {
      throw new Error("Missing required environment variables");
    }

    if (!file) {
      console.error("No file selected");
      return { error: "No file selected" };
    }

    // console.log("Compressing file...");

    const compressedFile = await imageCompression(file, options);
    // console.log("File compressed successfully,  uploading...");

    // Generate unique file name
    const fileNameArray = compressedFile.name.split(".");
    const fileName = fileNameArray[0];
    let fileFormat = fileNameArray[fileNameArray.length - 1];
    const fileUploadName = `${fileName}-${Math.random() * 12000}.${fileFormat}`;

    const s3 = new S3({
      accessKeyId: ACCESSKEY,
      secretAccessKey: SECRETKEY,
      endpoint: ENDPOINT,
    });

    const params = {
      Bucket: BUCKET,
      Key: fileUploadName,
      Body: compressedFile,
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
      toast({
        description: "فرمت فایل انتخاب شده قابل قبول نیست",
      });
    }
    console.error("Error uploading file:", error.message);
    return { error: error.message };
  }
};

export default uploadFile;
