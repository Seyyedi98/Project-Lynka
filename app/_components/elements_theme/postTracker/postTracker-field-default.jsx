"use client";

import { Button } from "@/components/ui/button";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { cn } from "@/lib/utils";
import { loadFont } from "@/utils/loadFont";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "../../common/modal/diolog";
import { Input } from "@/components/ui/input";

const PostTrackerFieldDefault = (props) => {
  const { isPremium } = useUserSubscription();
  const [loadedFont, setLoadedFont] = useState(null);
  const [trackingCode, setTrackingCode] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { title, textColor, bgColor, borderRadius, font } = props;

  useEffect(() => {
    const fetchFont = async () => {
      try {
        const fontVariable = await loadFont(font);
        setLoadedFont(fontVariable);
      } catch (error) {
        console.error("Error loading font:", error);
      }
    };

    fetchFont();
  }, [font]);

  const handleTrackPost = async () => {
    if (!trackingCode.trim()) {
      setError("لطفاً کد رهگیری را وارد کنید");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // First try direct API call
      try {
        const response = await fetch(
          `https://tracking.post.ir/api/v1/tracking?tracking_code=${trackingCode}`,
        );

        if (response.ok) {
          const data = await response.json();
          setTrackingResult(data);
          return;
        }
      } catch (apiError) {
        console.log("Direct API failed, trying alternative method");
      }

      // If direct API fails, try alternative method (web scraping approach)
      try {
        const proxyResponse = await fetch(
          `/api/track-post?code=${trackingCode}`,
        );
        if (proxyResponse.ok) {
          const data = await proxyResponse.json();
          setTrackingResult(data);
          return;
        }
        throw new Error("خطا در دریافت اطلاعات");
      } catch (proxyError) {
        throw new Error(
          "سرویس رهگیری موقتاً در دسترس نیست. لطفاً از طریق لینک زیر اقدام کنید",
        );
      }
    } catch (error) {
      console.error("Tracking error:", error);
      setError(error.message);
      setTrackingResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full">
      {!isPremium && (
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-red-500 p-2 text-center text-white">
          برای استفاده از این بلوک، اشتراک ویژه خود را تمدید کنید
        </div>
      )}
      <div
        className={cn(
          `w-full text-wrap rounded-md py-2`,
          !isPremium && "opacity-70",
        )}
      >
        <Dialog>
          <DialogTrigger asChild>
            <div
              style={{ backgroundColor: bgColor, borderRadius: borderRadius }}
              className={cn(
                `flex h-16 w-full cursor-pointer flex-col items-center justify-center gap-2 p-2 text-lg font-medium text-white shadow-lg`,
              )}
            >
              <p
                style={{
                  fontFamily: loadedFont ? `var(${loadedFont})` : "inherit",
                  color: textColor,
                }}
              >
                {title}
              </p>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>رهگیری مرسوله پستی</DialogTitle>
              <DialogDescription>
                کد رهگیری مرسوله خود را وارد کنید
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-2">
                <Input
                  placeholder="کد رهگیری (مثال: 1234567890123)"
                  value={trackingCode}
                  onChange={(e) => {
                    setTrackingCode(e.target.value);
                    setError("");
                  }}
                  disabled={isLoading}
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button onClick={handleTrackPost} disabled={isLoading}>
                  {isLoading ? "در حال رهگیری..." : "رهگیری"}
                </Button>
              </div>

              {trackingResult ? (
                <div className="mt-4 rounded-md border p-4">
                  <h3 className="font-bold">وضعیت مرسوله:</h3>
                  <div className="mt-2 space-y-2">
                    {trackingResult.events?.map((event, index) => (
                      <div key={index} className="border-b pb-2">
                        <p className="font-medium">{event.status}</p>
                        <p className="text-sm text-gray-600">
                          {event.date} - {event.location}
                        </p>
                        <p className="text-sm">{event.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : error && error.includes("لینک") ? (
                <div className="mt-4 text-center">
                  <a
                    href={`https://tracking.post.ir/Tracking.aspx?lang=1&trackingCode=${trackingCode}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    رهگیری مرسوله در وبسایت رسمی پست
                  </a>
                </div>
              ) : null}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  بستن
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PostTrackerFieldDefault;
