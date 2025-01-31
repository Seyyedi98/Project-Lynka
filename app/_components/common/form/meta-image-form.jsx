import MetaImageUploader from "../input/meta-image-uploader";

const MetaImageForm = ({ uri, image }) => {
  let metaImage = "";
  if (image) metaImage = JSON.parse(image);

  return (
    <div className="mt-8">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-xl font-medium">Image</h1>
        <h2 className="text-base text-muted-foreground">
          Customise the icon shown in the browser bar
        </h2>
      </div>
      <MetaImageUploader metaImage={metaImage} uri={uri} />
    </div>
  );
};

export default MetaImageForm;
