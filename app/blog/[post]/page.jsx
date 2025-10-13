"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getBlogPostById } from "@/actions/blog";
import { useParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useTheme } from "next-themes";

export default function BlogPost() {
  const params = useParams();
  const id = params.post;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const postData = await getBlogPostById(id);
        if (postData) {
          setPost(postData);
        } else {
          setError("مقاله مورد نظر یافت نشد");
        }
      } catch (err) {
        setError("خطا در بارگذاری مقاله");
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            {/* Skeleton for image */}
            <div className="mb-8 h-64 rounded-2xl bg-gray-300 dark:bg-gray-700"></div>
            {/* Skeleton for title */}
            <div className="mb-4 h-8 rounded bg-gray-300 dark:bg-gray-700"></div>
            <div className="mb-12 h-8 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>
            {/* Skeleton for content */}
            <div className="space-y-3">
              <div className="h-4 rounded bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-4 rounded bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-4 w-5/6 rounded bg-gray-300 dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 dark:bg-gray-900">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
            <svg
              className="h-12 w-12 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-100">
            {error || "مقاله یافت نشد"}
          </h1>
          <p className="mb-8 text-gray-600 dark:text-gray-400">
            متأسفانه قادر به پیدا کردن مقاله مورد نظر شما نیستیم.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-300 hover:bg-blue-700"
          >
            بازگشت به وبلاگ
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header Navigation */}
      <nav className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-medium text-gray-600 transition-colors duration-300 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              <ArrowRight className="ml-2 h-4 w-4" />
              بازگشت به وبلاگ
            </Link>
          </div>
        </div>
      </nav>

      {/* Article Content */}
      <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Featured Image */}
        {post.images && (
          <div className="mb-12">
            <div className="relative aspect-[21/9] overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={post.images}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        )}

        {/* Article Header */}
        <header className="mb-16 text-center">
          <h1 className="mb-8 text-4xl font-bold leading-10 text-gray-900 dark:text-white md:text-4xl">
            {post.title}
          </h1>

          {post.description && (
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              {post.description}
            </p>
          )}
        </header>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none text-right">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  className={`mb-4 text-2xl font-bold sm:text-3xl lg:text-4xl ${
                    isDark ? "text-gray-100" : "text-gray-900"
                  }`}
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className={`mb-3 mt-6 text-xl font-bold sm:text-2xl lg:text-3xl ${
                    isDark ? "text-gray-100" : "text-gray-800"
                  }`}
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className={`mb-2 mt-4 text-lg font-bold sm:text-xl lg:text-2xl ${
                    isDark ? "text-gray-200" : "text-gray-700"
                  }`}
                  {...props}
                />
              ),
              h4: ({ node, ...props }) => (
                <h4
                  className={`mb-2 mt-4 text-base font-bold sm:text-lg lg:text-xl ${
                    isDark ? "text-gray-200" : "text-gray-700"
                  }`}
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p
                  className={`mb-4 text-xl leading-10 sm:text-lg sm:leading-8 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                  {...props}
                />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  className={`mb-8 list-disc pr-4 text-xl sm:text-lg ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                  {...props}
                />
              ),
              ol: ({ node, ...props }) => (
                <ol
                  className={`mb-8 list-decimal pr-4 text-xl sm:text-lg ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                  {...props}
                />
              ),
              li: ({ node, ...props }) => (
                <li
                  className={`mb-2 text-xl sm:text-lg ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                  {...props}
                />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className={`mb-4 border-r-4 py-2 pr-4 text-base italic sm:text-lg ${
                    isDark
                      ? "border-primary bg-gray-800 text-gray-300"
                      : "border-primary bg-gray-50 text-gray-600"
                  }`}
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
                    }`}
                    {...props}
                  />
                ) : (
                  <code
                    className={`mb-4 block overflow-x-auto rounded-lg p-4 font-mono text-sm ${
                      isDark
                        ? "border border-gray-700 bg-gray-800 text-gray-200"
                        : "border border-gray-200 bg-gray-100 text-gray-800"
                    }`}
                    {...props}
                  />
                ),
              a: ({ node, ...props }) => (
                <a
                  className={`text-base underline transition-colors sm:text-lg ${
                    isDark
                      ? "text-primary-300 hover:text-primary-200"
                      : "hover:text-primary-dark text-primary"
                  }`}
                  {...props}
                />
              ),
              strong: ({ node, ...props }) => (
                <strong
                  className={`font-bold ${
                    isDark ? "text-gray-100" : "text-gray-900"
                  }`}
                  {...props}
                />
              ),
              em: ({ node, ...props }) => (
                <em
                  className={`italic ${
                    isDark ? "text-gray-200" : "text-gray-800"
                  }`}
                  {...props}
                />
              ),
              table: ({ node, ...props }) => (
                <div className="mb-4 overflow-x-auto">
                  <table
                    className={`min-w-full border-collapse text-sm sm:text-base ${
                      isDark ? "border-gray-600" : "border-gray-300"
                    }`}
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
                  }`}
                  {...props}
                />
              ),
              td: ({ node, ...props }) => (
                <td
                  className={`border px-3 py-2 text-right text-sm sm:px-4 sm:py-2 sm:text-base ${
                    isDark
                      ? "border-gray-600 text-gray-300"
                      : "border-gray-300 text-gray-700"
                  }`}
                  {...props}
                />
              ),
              hr: ({ node, ...props }) => (
                <hr
                  className={`my-6 ${
                    isDark ? "border-gray-700" : "border-gray-300"
                  }`}
                  {...props}
                />
              ),
            }}
          >
            {post.postData}
          </ReactMarkdown>
        </div>

        {/* Back to Blog CTA */}
        <div className="ml-4 mt-16 border-t border-gray-200 pt-8 dark:border-gray-700">
          <Link
            href="/blog"
            className="inline-flex w-full transform items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:text-white hover:shadow-xl sm:w-auto"
          >
            مشاهده همه مقالات
            <ArrowLeft />
          </Link>
        </div>
      </article>
    </div>
  );
}
