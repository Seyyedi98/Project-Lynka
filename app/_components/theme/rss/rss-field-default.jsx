"use client";

import { useUserSubscription } from "@/hooks/useUserSubscription";
import { cn } from "@/lib/utils";
import { loadFont } from "@/utils/loadFont";
import { Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";

const RssFieldDefault = ({
  title,
  textColor,
  href,
  font,
  borderRadius,
  bgColor,
  isLive,
}) => {
  const { isSilver } = useUserSubscription();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loadedFont, setLoadedFont] = useState(null);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    if (href) {
      setLoading(true);
      fetch(`/api/rss?url=${encodeURIComponent(href.trim())}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch RSS feed");
          return res.json();
        })
        .then((data) => {
          setPosts(data.posts.slice(0, 5));
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [href]);

  return (
    <div className="relative w-full">
      {!isSilver && !isLive && (
        <div className="absolute left-1/2 top-1/2 z-10 w-3/4 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-red-500 p-2 text-center text-white">
          برای استفاده از فید rss، اشتراک ویژه خود را تمدید کنید
        </div>
      )}
      <div
        className={cn(
          `w-full text-wrap rounded-md py-2`,
          !isSilver && "opacity-70",
        )}
      >
        {href ? (
          isSilver || !isLive ? (
            error ? (
              <div className="text-red-500">خطا در دریافت اطلاعات فید</div>
            ) : (
              <ul className="list-none space-y-2 pl-0">
                <h4
                  style={{ color: textColor }}
                  className="text-center text-lg"
                >
                  {title}
                </h4>
                {loading ? (
                  <div className="flex h-16 w-full items-center justify-center">
                    <Loader2Icon className="h-8 w-8 animate-spin text-gray-500" />
                  </div>
                ) : (
                  posts.map((post, index) => (
                    <li key={index} className="w-full">
                      {isLive ? (
                        <a
                          href={post.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            backgroundColor: bgColor,
                            borderRadius: borderRadius,
                          }}
                          className={cn(
                            `flex h-16 w-full cursor-pointer flex-col items-center justify-center gap-2 p-2 px-4 text-justify text-base font-medium text-white shadow-lg`,
                            href === "" && "pointer-events-none",
                          )}
                        >
                          <p
                            style={{
                              fontFamily: loadedFont
                                ? `var(${loadedFont})`
                                : "inherit",
                              color: textColor,
                            }}
                          >
                            {post.title}
                          </p>
                        </a>
                      ) : (
                        <div
                          rel="noopener noreferrer"
                          style={{
                            backgroundColor: bgColor,
                            borderRadius: borderRadius,
                          }}
                          className={cn(
                            `flex h-16 w-full cursor-pointer flex-col items-center justify-center gap-2 p-2 px-4 text-justify text-base font-medium text-white shadow-lg`,
                            href === "" && "pointer-events-none",
                          )}
                        >
                          <p
                            style={{
                              fontFamily: loadedFont
                                ? `var(${loadedFont})`
                                : "inherit",
                              color: textColor,
                            }}
                          >
                            {post.title}
                          </p>
                        </div>
                      )}
                    </li>
                  ))
                )}
              </ul>
            )
          ) : null
        ) : (
          "برای اتصال به rss اینجا کلیک کنید"
        )}
      </div>
    </div>
  );
};

export default RssFieldDefault;
