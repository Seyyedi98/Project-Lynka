import { useParams } from "next/navigation";
import PageBgImageUploader from "../input/page-bg-image-uploader";
import { useUserSubscription } from "@/hooks/useUserSubscription";

const PageBgImageForm = ({ theme }) => {
  const { backgroundType, backgroundImage } = theme;
  const { isSilver } = useUserSubscription();

  const bgImage =
    backgroundType === "image" ? JSON.parse(backgroundImage) : null;
  const { uri } = useParams();

  return (
    <div className="mt-8">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-xl font-medium">تصویر زمینه</h1>
        <h2 className="text-base text-muted-foreground">
          Customise the icon shown in the browser bar
        </h2>
      </div>
      {isSilver ? (
        <PageBgImageUploader theme={theme} bgImage={bgImage} uri={uri} />
      ) : (
        <p className="mt-4 text-sm text-destructive">
          برای استفاده ای این قابلیت به اشتراک ویژه نیاز دارید
        </p>
      )}
    </div>
  );
};

export default PageBgImageForm;
