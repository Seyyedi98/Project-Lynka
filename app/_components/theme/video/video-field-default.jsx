"use client";

import { useRef, useEffect, useState } from "react";
import { Loader2 as LoaderIcon } from "lucide-react";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { cn } from "@/lib/utils";

const VideoFieldDefault = ({ href, isLive }) => {
  const iframeRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState("400px");
  const [isLoading, setIsLoading] = useState(true);
  const { isSilver } = useUserSubscription();

  // extract video ID from the Aparat link
  const getVideoId = (url) => {
    const match = url.match(/aparat\.com\/v\/([^\/]+)/);
    return match ? match[1] : null;
  };

  const videoId = getVideoId(href);

  // Construct the iframe URL
  const iframeUrl = videoId
    ? `https://www.aparat.com/video/video/embed/videohash/${videoId}/vt/frame`
    : null;

  const updateIframeHeight = () => {
    if (iframeRef.current) {
      const iframeWidth = iframeRef.current.offsetWidth;
      const aspectRatio = 9 / 16;
      const newHeight = iframeWidth * aspectRatio;
      setIframeHeight(`${newHeight}px`);
    }
  };

  useEffect(() => {
    updateIframeHeight();
    window.addEventListener("resize", updateIframeHeight);
    return () => {
      window.removeEventListener("resize", updateIframeHeight);
    };
  }, []);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="relative w-full">
      {!isSilver && !isLive && (
        <div className="absolute left-1/2 top-1/2 z-10 w-3/4 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-red-500 p-2 text-center text-white">
          برای استفاده از این بلوک، اشتراک ویژه خود را تمدید کنید
        </div>
      )}
      <div
        className={cn(
          `w-full text-wrap rounded-md py-2`,
          !isSilver && "opacity-70",
        )}
      >
        {iframeUrl ? (
          isSilver || !isLive ? (
            <div style={{ position: "relative" }}>
              {isLoading && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <LoaderIcon className="h-8 w-8 animate-spin text-gray-500" />
                </div>
              )}
              <iframe
                ref={iframeRef}
                src={iframeUrl}
                width="100%"
                height={iframeHeight}
                frameBorder="0"
                allowFullScreen
                title="Aparat Video"
                style={{ display: "block" }}
                onLoad={handleIframeLoad}
              ></iframe>
            </div>
          ) : null
        ) : (
          <p>آدرس وارد شده معتبر نمی باشد</p>
        )}
      </div>
    </div>
  );
};

export default VideoFieldDefault;
