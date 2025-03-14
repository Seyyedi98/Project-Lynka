const getImageAddress = (key) => {
  const imageUrl = `https://${process.env.NEXT_PUBLIC_LIARA_ENDPOINT}/${process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME}/${key}`;
  return imageUrl;
};

export default getImageAddress;

// {"url":"https://c465756.parspack.net/c465756/jinx11-11930.3489737103.jpg?AWSAccessKeyId=y5edJ0YDap95s7Nz&Expires=4895531349&Signature=nxWWM1oWWJ676Br7XSIy6TkyF2Q%3D","key":"jinx11-11930.3489737103.jpg"}
// {"url":"https://arklight.storage.c2.liara.space/10-5684.305709332585.JPG?AWSAccessKeyId=qul5ts3q9a8kgf6o&Expires=4895480059&Signature=hnMXAPyvG0Q8CiwOBle8kZGBR1s%3D","key":"10-5684.305709332585.JPG"}
