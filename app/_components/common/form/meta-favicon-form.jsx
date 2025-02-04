import Image from "next/image";
import FaviconUploader from "../input/favicon-uploader";

const MetaFaviconForm = ({ uri, favicon }) => {
  let metaFavicon = "";
  if (favicon) metaFavicon = JSON.parse(favicon);

  return (
    <div className="mt-8">
      <div className="flex flex-col items-center justify-center gap-2">
        {metaFavicon && (
          <Image
            width={32}
            height={32}
            alt="meta image preview"
            src={metaFavicon.url}
          />
        )}
        <h1 className="text-xl font-medium">Favicon</h1>
        <h2 className="text-base text-muted-foreground">
          Customise the icon shown in the browser bar
        </h2>
      </div>
      <FaviconUploader favicon={metaFavicon} uri={uri} />
    </div>
  );
};

export default MetaFaviconForm;
