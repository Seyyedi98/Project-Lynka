import Image from "next/image";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import getImageAddress from "@/utils/get-image-address";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const MetaImageUploader = dynamic(
  () =>
    import("../input/meta-image-uploader").then(
      (mod) => mod.default || mod.PageBgImageUploader,
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="h-32 w-full rounded-md"></Skeleton>,
  },
);

const MetaImageForm = ({ uri, image }) => {
  let metaImage = "";
  const { isSilver } = useUserSubscription();
  if (image) metaImage = getImageAddress(JSON.parse(image).key);

  return (
    <div className="mt-8">
      <div className="flex flex-col items-center justify-center gap-2">
        {metaImage && (
          <Image
            width={280}
            height={280}
            alt="meta image preview"
            src={metaImage}
          />
        )}
        <h1 className="text-xl font-medium">Image</h1>
        <h2 className="text-base text-muted-foreground">
          Customise the icon shown in the browser bar
        </h2>
      </div>
      {isSilver ? (
        <MetaImageUploader metaImage={metaImage} uri={uri} />
      ) : (
        <p className="mt-4 text-center text-sm text-destructive">
          برای استفاده ای این قابلیت به اشتراک ویژه نیاز دارید
        </p>
      )}
    </div>
  );
};

export default MetaImageForm;
