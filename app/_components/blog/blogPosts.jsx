"use client";

import { ArrowLeft, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { DrawerContent, DrawerTitle, Drawer } from "../common/modal/drawer";

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

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg"
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            width={400}
            height={300}
            alt={post.title}
            src={post.images}
            className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-800">{post.title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-gray-600">
            {post.description || ""}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
            className="mt-5 flex w-fit items-center gap-1 rounded-full bg-gray-100 px-5 py-2 text-xs font-medium text-gray-700 transition-all hover:bg-primary hover:text-white group-hover:gap-2"
          >
            مشاهده پست
            <ArrowLeft className="h-3 w-3" />
          </button>
        </div>
      </div>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="h-[95vh] max-h-screen w-full max-w-full">
          <DrawerTitle></DrawerTitle>
          <div className="relative h-full w-full overflow-y-auto">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute left-6 top-6 z-50 rounded-full bg-white p-2 shadow-lg"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
              <div className="relative mb-8 h-64 w-full overflow-hidden rounded-xl sm:h-80">
                <Image
                  fill
                  alt={post.title}
                  src={post.images || "/default-image.jpg"}
                  className="object-cover"
                />
              </div>

              <h1 className="mb-4 mr-1 text-3xl font-bold text-gray-900 sm:mr-2">
                {post.title}
              </h1>

              <div className="prose max-w-none">
                <p className="mb-4 mr-1 leading-relaxed text-gray-600 sm:mr-2">
                  {post.description}
                </p>
                <div className="post-content leading-relaxed text-gray-700">
                  {post.postData}
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
