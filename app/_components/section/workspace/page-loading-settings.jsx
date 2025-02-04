import React, { useTransition } from "react";
import { LoadingController } from "../../controller/loading-controller";
import LoadingSpinner from "../../common/shared/loadingSpinner";
import { UpdatePageLoadingIcon } from "@/actions/page";
import { useParams } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const PageLoadingSettings = () => {
  const { uri } = useParams();

  const [isPending, startTransition] = useTransition();
  const loadersList = Object.keys(LoadingController);

  const changeLoadingIcon = (uri, loadingEl) => {
    startTransition(async () => {
      await UpdatePageLoadingIcon(uri, loadingEl).then(
        toast({
          description: "آیکون لودینگ با موفقیت تغییر یافت",
        }),
      );
    });
  };
  isPending;
  return (
    <div className="grid h-full w-full grid-cols-auto-fit-100">
      <div
        onClick={() => changeLoadingIcon(uri, null)}
        className={cn(
          `h-fit w-fit cursor-pointer`,
          isPending && "pointer-events-none cursor-wait",
        )}
      >
        <p className="grid h-full w-full place-items-center">بدون لودینگ</p>
      </div>
      {loadersList.map((loadingEl) => {
        return (
          <div
            key={loadingEl}
            onClick={() => changeLoadingIcon(uri, loadingEl)}
            className={cn(
              `h-fit w-fit cursor-pointer`,
              isPending && "pointer-events-none cursor-wait",
            )}
          >
            <LoadingSpinner elementInstances={loadingEl} />
          </div>
        );
      })}
    </div>
  );
};

export default PageLoadingSettings;
