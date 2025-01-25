const { S3 } = require("aws-sdk");

const deleteFile = async ({ file, BUCKET, ACCESSKEY, SECRETKEY, ENDPOINT }) => {
  try {
    const s3 = new S3({
      accessKeyId: ACCESSKEY,
      secretAccessKey: SECRETKEY,
      endpoint: ENDPOINT,
    });

    await s3.deleteObject({ Bucket: BUCKET, Key: file.key }).promise();

    console.log("File deleted successfully");
  } catch (error) {
    console.error("Error deleting file: ", error);
  }
};

export default deleteFile;
