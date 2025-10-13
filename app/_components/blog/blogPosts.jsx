"use client";

import { ArrowLeft, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { DrawerContent, DrawerTitle, Drawer } from "../common/modal/drawer";
import ReactMarkdown from "react-markdown";
import { useTheme } from "next-themes";

export const BlogPostsList = ({ posts }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

const PostCard = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className={`group cursor-pointer overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-lg ${
          isDark
            ? "border border-gray-700 bg-gray-800 hover:shadow-gray-900/30"
            : "bg-white hover:shadow-xl"
        } `}
        dir="rtl"
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            width={400}
            height={300}
            alt={post.title}
            src={post.images}
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-t ${
              isDark
                ? "from-black/60 via-transparent to-transparent"
                : "from-black/40 via-transparent to-transparent"
            }`}
          />
        </div>

        <div className="p-4 sm:p-5">
          <h3
            className={`text-right text-lg font-bold sm:text-xl ${
              isDark ? "text-gray-100" : "text-gray-800"
            } `}
          >
            {post.title}
          </h3>
          <p
            className={`mt-2 line-clamp-2 text-right text-sm sm:text-base ${
              isDark ? "text-gray-300" : "text-gray-600"
            } `}
          >
            {post.description || ""}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
            className={`mt-4 flex w-fit items-center gap-1 rounded-full px-4 py-2 text-xs font-medium transition-all group-hover:gap-2 sm:mt-5 sm:px-5 sm:py-2 sm:text-sm ${
              isDark
                ? "bg-gray-700 text-gray-200 hover:bg-primary hover:text-white"
                : "bg-gray-100 text-gray-700 hover:bg-primary hover:text-white"
            } `}
          >
            مشاهده پست
            <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </div>
      </div>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent
          className={`h-[95vh] max-h-screen w-full max-w-full ${
            isDark ? "border-gray-700 bg-gray-900" : "bg-white"
          } `}
        >
          <DrawerTitle></DrawerTitle>
          <div className="relative h-full w-full overflow-y-auto" dir="rtl">
            <button
              onClick={() => setIsOpen(false)}
              className={`absolute left-4 top-4 z-50 rounded-full p-2 shadow-lg transition-colors sm:left-6 sm:top-6 ${
                isDark
                  ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              } `}
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
              <div className="relative mb-6 h-48 w-full overflow-hidden rounded-xl sm:mb-8 sm:h-64 lg:h-80">
                <Image
                  fill
                  alt={post.title}
                  src={post.images || "/default-image.jpg"}
                  className="object-cover"
                />
              </div>

              <h1
                className={`mb-4 text-right text-2xl font-bold sm:text-3xl lg:text-4xl ${
                  isDark ? "text-gray-100" : "text-gray-900"
                } `}
              >
                {post.title}
              </h1>

              {post.description && (
                <p
                  className={`mb-6 text-right text-base leading-relaxed sm:text-lg sm:leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-600"
                  } `}
                >
                  {post.description}
                </p>
              )}

              <div
                className={`prose prose-base sm:prose-lg max-w-none text-right ${
                  isDark ? "prose-invert prose-gray" : "prose-gray"
                } `}
              >
                <ReactMarkdown
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1
                        className={`mb-4 text-2xl font-bold sm:text-3xl lg:text-4xl ${
                          isDark ? "text-gray-100" : "text-gray-900"
                        } `}
                        {...props}
                      />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2
                        className={`mb-3 mt-6 text-xl font-bold sm:text-2xl lg:text-3xl ${
                          isDark ? "text-gray-100" : "text-gray-800"
                        } `}
                        {...props}
                      />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3
                        className={`mb-2 mt-4 text-lg font-bold sm:text-xl lg:text-2xl ${
                          isDark ? "text-gray-200" : "text-gray-700"
                        } `}
                        {...props}
                      />
                    ),
                    h4: ({ node, ...props }) => (
                      <h4
                        className={`mb-2 mt-4 text-base font-bold sm:text-lg lg:text-xl ${
                          isDark ? "text-gray-200" : "text-gray-700"
                        } `}
                        {...props}
                      />
                    ),
                    p: ({ node, ...props }) => (
                      <p
                        className={`mb-4 text-base leading-7 sm:text-lg sm:leading-8 ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        } `}
                        {...props}
                      />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul
                        className={`mb-4 list-disc pr-4 text-base sm:text-lg ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        } `}
                        {...props}
                      />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol
                        className={`mb-4 list-decimal pr-4 text-base sm:text-lg ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        } `}
                        {...props}
                      />
                    ),
                    li: ({ node, ...props }) => (
                      <li
                        className={`mb-1 text-base sm:text-lg ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        } `}
                        {...props}
                      />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote
                        className={`mb-4 border-r-4 py-2 pr-4 text-base italic sm:text-lg ${
                          isDark
                            ? "border-primary bg-gray-800 text-gray-300"
                            : "border-primary bg-gray-50 text-gray-600"
                        } `}
                        {...props}
                      />
                    ),
                    code: ({ node, inline, ...props }) =>
                      inline ? (
                        <code
                          className={`rounded px-1 py-0.5 font-mono text-sm ${
                            isDark
                              ? "bg-gray-700 text-gray-200"
                              : "bg-gray-100 text-gray-800"
                          } `}
                          {...props}
                        />
                      ) : (
                        <code
                          className={`mb-4 block overflow-x-auto rounded-lg p-4 font-mono text-sm ${
                            isDark
                              ? "border border-gray-700 bg-gray-800 text-gray-200"
                              : "border border-gray-200 bg-gray-100 text-gray-800"
                          } `}
                          {...props}
                        />
                      ),
                    a: ({ node, ...props }) => (
                      <a
                        className={`text-base underline transition-colors sm:text-lg ${
                          isDark
                            ? "text-primary-300 hover:text-primary-200"
                            : "hover:text-primary-dark text-primary"
                        } `}
                        {...props}
                      />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong
                        className={`font-bold ${
                          isDark ? "text-gray-100" : "text-gray-900"
                        } `}
                        {...props}
                      />
                    ),
                    em: ({ node, ...props }) => (
                      <em
                        className={`italic ${
                          isDark ? "text-gray-200" : "text-gray-800"
                        } `}
                        {...props}
                      />
                    ),
                    table: ({ node, ...props }) => (
                      <div className="mb-4 overflow-x-auto">
                        <table
                          className={`min-w-full border-collapse text-sm sm:text-base ${
                            isDark ? "border-gray-600" : "border-gray-300"
                          } `}
                          {...props}
                        />
                      </div>
                    ),
                    th: ({ node, ...props }) => (
                      <th
                        className={`border px-3 py-2 text-right text-sm sm:px-4 sm:py-2 sm:text-base ${
                          isDark
                            ? "border-gray-600 bg-gray-800 text-gray-200"
                            : "border-gray-300 bg-gray-100 text-gray-800"
                        } `}
                        {...props}
                      />
                    ),
                    td: ({ node, ...props }) => (
                      <td
                        className={`border px-3 py-2 text-right text-sm sm:px-4 sm:py-2 sm:text-base ${
                          isDark
                            ? "border-gray-600 text-gray-300"
                            : "border-gray-300 text-gray-700"
                        } `}
                        {...props}
                      />
                    ),
                    hr: ({ node, ...props }) => (
                      <hr
                        className={`my-6 ${
                          isDark ? "border-gray-700" : "border-gray-300"
                        } `}
                        {...props}
                      />
                    ),
                  }}
                >
                  {post.postData}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
