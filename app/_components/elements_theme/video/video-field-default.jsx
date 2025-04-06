"use client";

import { cn } from "@/lib/utils";
import { Loader2 as LoaderIcon, VideoIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const VideoFieldDefault = ({ href, isLive, isPremium }) => {
  const iframeRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState("400px");
  const [isLoading, setIsLoading] = useState(true);

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
      {!isPremium && !isLive && (
        <div className="absolute left-1/2 top-1/2 z-10 w-3/4 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-red-500 p-2 text-center text-white">
          برای استفاده از این بلوک، اشتراک ویژه خود را تمدید کنید
        </div>
      )}
      <div
        className={cn(
          `w-full text-wrap rounded-md py-2`,
          !isPremium && "opacity-70",
        )}
      >
        {iframeUrl ? (
          isPremium || !isLive ? (
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
          <div className="grid h-40 w-full place-content-center rounded-lg border-2 border-dashed border-black bg-white text-black">
            <div className="flex flex-col items-center justify-center gap-2">
              <VideoIcon className="h-8 w-8" />
              آدرس وارد شده معتبر نمی باشد
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoFieldDefault;
