import { S3 } from "aws-sdk";

const uploadFile = async (file) => {
  const ACCESSKEY = process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY;
  const SECRETKEY = process.env.NEXT_PUBLIC_LIARA_SECRET_KEY;
  const ENDPOINT = process.env.NEXT_PUBLIC_LIARA_ENDPOINT;
  const BUCKET = process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME;

  try {
    const fileNameArray = file.name.split(".");
    const fileName = fileNameArray[0];
    const fileFormat = fileNameArray[fileNameArray.length - 1];
    const fileUploadName = `${fileName}-${Math.random() * 12000}.${fileFormat}`;

    if (file.size / 1024 >= 2048) {
      console.log("File is too large");
      return;
    }

    if (!file) {
      console.log("Please select a file");
      return;
    }
    const s3 = new S3({
      accessKeyId: ACCESSKEY,
      secretAccessKey: SECRETKEY,
      endpoint: ENDPOINT,
    });
    const params = {
      Bucket: BUCKET,
      Key: fileUploadName,
      Body: file,
    };
    const response = await s3.upload(params).promise();
    const permanentSignedUrl = s3.getSignedUrl("getObject", {
      Bucket: BUCKET,
      Key: fileUploadName,
      Expires: 3153600000, // 100 year
    });

    return { permanentSignedUrl, response };
  } catch (error) {
    console.log("Error uploading file: " + error.message);
  }
};

export default uploadFile;
