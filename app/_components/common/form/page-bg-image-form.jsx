import Image from "next/image";
import PageBgImageUploader from "../input/page-bg-image-uploader";
import { useParams } from "next/navigation";

const PageBgImageForm = ({ theme }) => {
  const { backgroundType, backgroundImage } = theme;
  const bgImage =
    backgroundType === "image" ? JSON.parse(backgroundImage) : null;
  const { uri } = useParams();

  return (
    <div className="mt-8">
      <div className="flex flex-col items-center justify-center gap-2">
        {/* {bgImage && backgroundType === "image" && (
          <Image
            width={640}
            height={640}
            alt="Page background image"
            src={bgImage.url}
          />
        )} */}
        <h1 className="text-xl font-medium">Image</h1>
        <h2 className="text-base text-muted-foreground">
          Customise the icon shown in the browser bar
        </h2>
      </div>
      <PageBgImageUploader theme={theme} bgImage={bgImage} uri={uri} />
    </div>
  );
};

export default PageBgImageForm;
