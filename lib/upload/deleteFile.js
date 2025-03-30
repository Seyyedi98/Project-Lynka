const { S3 } = require("aws-sdk");

const deleteFile = async ({ file }) => {
  const ACCESSKEY = process.env.NEXT_PUBLIC_ACCESS_KEY;
  const SECRETKEY = process.env.NEXT_PUBLIC_SECRET_KEY;
  const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;
  const BUCKET = process.env.NEXT_PUBLIC_BUCKET_NAME;

  try {
    const s3 = new S3({
      accessKeyId: ACCESSKEY,
      secretAccessKey: SECRETKEY,
      endpoint: ENDPOINT,
      s3ForcePathStyle: true,
    });

    await s3.deleteObject({ Bucket: BUCKET, Key: file.key }).promise();

    console.log("File deleted successfully");
  } catch (error) {
    console.error("Error deleting file: ", error);
  }
};

export default deleteFile;
