import { Skeleton } from "@/components/ui/skeleton";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import getImageAddress from "@/utils/get-image-address";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams } from "next/navigation";

const PageBgImageUploader = dynamic(
  () =>
    import("../input/page-bg-image-uploader").then(
      (mod) => mod.default || mod.PageBgImageUploader,
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="h-32 w-full rounded-md"></Skeleton>,
  },
);

const PageBgImageForm = ({ theme }) => {
  const { backgroundType, backgroundImage } = theme;
  const { isSilver } = useUserSubscription();

  const bgImage =
    backgroundType === "image" ? JSON.parse(backgroundImage) : null;
  const { uri } = useParams();

  return (
    <div className="mt-8 w-full">
      <div className="flex flex-col items-center justify-center gap-2">
        {bgImage && (
          <Image
            width={320}
            height={640}
            alt="background image preview"
            src={getImageAddress(bgImage.key)}
          />
        )}
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
