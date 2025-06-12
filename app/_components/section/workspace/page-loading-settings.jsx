"use client";

import { useTransition } from "react";
import { LoadingController } from "../../controller/loading-controller";
import LoadingSpinner from "../../common/shared/loadingSpinner";
import { UpdatePageLoadingIcon } from "@/actions/page/page";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

const PageLoadingSettings = () => {
  const { uri } = useParams();
  const [isPending, startTransition] = useTransition();
  const loadersList = Object.keys(LoadingController);

  const changeLoadingIcon = async (loadingEl) => {
    try {
      await startTransition(async () => {
        const result = await UpdatePageLoadingIcon(uri, loadingEl);
        if (result?.success) {
          toast.success(
            loadingEl
              ? "آیکون لودینگ با موفقیت تغییر کرد"
              : "حالت بدون لودینگ اعمال شد",
          );
        } else {
          toast.error("خطا در تغییر آیکون لودینگ");
        }
      });
    } catch (error) {
      toast.error("خطای سیستمی در تغییر آیکون لودینگ");
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-medium">تنظیمات آیکون لودینگ</h3>
        <p className="text-sm text-muted-foreground">
          سبک نمایش حین بارگذاری صفحه را انتخاب کنید
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 overflow-y-scroll sm:grid-cols-4">
        {/* No Loading Option */}
        <div
          onClick={() => changeLoadingIcon(null)}
          className={cn(
            "flex h-24 cursor-pointer flex-col items-center justify-center rounded-lg border p-3 transition-all hover:border-primary hover:bg-accent",
            isPending && "pointer-events-none cursor-not-allowed opacity-70",
          )}
        >
          <div className="grid h-12 w-12 place-items-center">
            <div className="h-8 w-8 rounded-full border-2 border-dashed border-muted-foreground" />
          </div>
          <span className="mt-2 text-sm">بدون لودینگ</span>
        </div>

        {/* Loading Spinners */}
        {loadersList.map((loadingEl) => (
          <div
            key={loadingEl}
            onClick={() => changeLoadingIcon(loadingEl)}
            className={cn(
              "flex h-24 cursor-pointer flex-col items-center justify-center rounded-lg border p-3 transition-all hover:border-primary hover:bg-accent",
              isPending && "pointer-events-none cursor-not-allowed opacity-70",
            )}
          >
            <LoadingSpinner elementInstances={loadingEl} />
          </div>
        ))}
      </div>

      {isPending && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Loader2Icon className="h-4 w-4 animate-spin" />
          در حال اعمال تغییرات...
        </div>
      )}
    </div>
  );
};

export default PageLoadingSettings;
