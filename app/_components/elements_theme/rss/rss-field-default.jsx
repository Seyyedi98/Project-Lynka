"use client";

import { cn } from "@/lib/utils";
import { loadFont } from "@/utils/loadFont";
import { Loader2Icon, Rss } from "lucide-react";
import { useEffect, useState } from "react";

const RssFieldDefault = ({
  title,
  textColor,
  href,
  font,
  borderRadius,
  bgColor,
  isLive,
  isPremium,
}) => {
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
    if (!href) return;

    const fetchRssFeed = async () => {
      try {
        setLoading(true);
        setError(null);

        // Validate and format the URL
        let formattedUrl = href.trim();

        // Add protocol if missing (default to https)
        if (
          !formattedUrl.startsWith("http://") &&
          !formattedUrl.startsWith("https://")
        ) {
          formattedUrl = `https://${formattedUrl}`;
        }

        // Validate URL format
        try {
          new URL(formattedUrl);
        } catch (e) {
          throw new Error("Invalid URL format");
        }

        const response = await fetch(
          `/api/rss?url=${encodeURIComponent(formattedUrl)}`,
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || "Failed to fetch RSS feed");
        }

        const data = await response.json();
        setPosts(data.posts?.slice(0, 5) || []);
      } catch (err) {
        console.error("RSS fetch error:", err);
        setError(err.message || "Error fetching RSS feed");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRssFeed();
  }, [href]);

  return (
    <div className="relative w-full">
      {!isPremium && !isLive && (
        <div className="absolute left-1/2 top-1/2 z-10 w-3/4 -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-red-500 p-2 text-center text-white">
          برای استفاده از فید rss، اشتراک ویژه خود را تمدید کنید
        </div>
      )}
      <div
        className={cn(
          `w-full text-wrap rounded-md py-2`,
          !isPremium && "opacity-70",
        )}
      >
        {href ? (
          isPremium || !isLive ? (
            error ? (
              <div className="text-red-500">{error}</div>
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
                ) : posts.length > 0 ? (
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
                            `flex w-full cursor-pointer flex-col items-center justify-center gap-2 p-2 px-4 text-justify text-base font-medium text-white shadow-lg`,
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
                          style={{
                            backgroundColor: bgColor,
                            borderRadius: borderRadius,
                          }}
                          className={cn(
                            `flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 p-2 px-4 text-justify text-base font-medium text-white shadow-lg`,
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
                ) : (
                  <div className="text-center text-gray-500">
                    No posts found in RSS feed
                  </div>
                )}
              </ul>
            )
          ) : null
        ) : (
          <div className="grid h-40 w-full place-content-center rounded-lg border-2 border-dashed border-black bg-white text-black">
            <div className="flex flex-col items-center justify-center gap-2">
              <Rss className="h-8 w-8" />
              اتصال به rss
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RssFieldDefault;
