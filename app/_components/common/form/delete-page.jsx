"use client";

import { deletePage } from "@/actions/page/page";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

const DeletePage = ({ page, onClose }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const form = useForm({
    defaultValues: {
      confirmText: "",
    },
  });

  const confirmValue = form.watch("confirmText");

  useEffect(() => {
    setIsConfirmed(confirmValue === page);
  }, [confirmValue, page]);

  const handleDelete = () => {
    if (!isConfirmed) return;

    startTransition(async () => {
      try {
        await deletePage(page);
        setSuccess("صفحه با موفقیت حذف شد");
        setTimeout(() => {
          router.refresh();
          onClose();
        }, 1000);
      } catch (err) {
        setError("خطا در حذف صفحه");
      }
    });
  };

  return (
    <div className="mx-auto flex max-w-md flex-col items-center space-y-6 p-3">
      <div className="text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-100 to-red-200">
          <Trash2 className="h-8 w-8 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">حذف صفحه</h2>
        <p className="mt-4 text-base text-text/80">
          آیا مطمئن هستید که می‌خواهید صفحه
          <span className="font-bold"> {page} </span> را حذف کنید؟
        </p>
        <p className="mt-4 text-base text-red-500">
          این عمل غیرقابل بازگشت است!
        </p>
      </div>

      <Form {...form}>
        <div className="w-full">
          <div dir="ltr" className="flex flex-col gap-4">
            <div className="relative flex items-center">
              <div className="absolute left-3 flex items-center">
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full",
                    isConfirmed ? "bg-green-500" : "bg-muted-foreground",
                  )}
                />
                <span className="ml-2 text-sm font-medium text-muted-foreground">
                  برای حذف، تایپ کنید:
                </span>
              </div>
              <FormField
                control={form.control}
                name="confirmText"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending || success}
                        onKeyDown={(e) => {
                          if (e.key === " ") {
                            e.preventDefault();
                          }
                        }}
                        className="h-12 rounded-xl border-2 bg-card pl-[150px] text-sm font-medium text-foreground transition-all duration-200 focus:border-red-500 focus:ring-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div dir="rtl" className="flex h-fit items-center">
              {error && (
                <p className="flex w-full items-center text-right text-destructive sm:text-xs">
                  <span>🚫 {error}</span>
                </p>
              )}
              {success && (
                <p className="flex w-full items-center text-xs text-green-600">
                  <span>✅ {success}</span>
                </p>
              )}
            </div>

            <div className="flex gap-3 sm:mb-4">
              <Button
                onClick={handleDelete}
                disabled={isPending || success || !isConfirmed}
                className="flex h-12 flex-1 items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:from-red-700 hover:to-rose-700 hover:shadow-red-400/20 disabled:opacity-50 disabled:shadow-none"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    در حال حذف...
                  </span>
                ) : (
                  <>
                    حذف صفحه
                    <Trash2 className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default DeletePage;
