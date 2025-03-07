"use client";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useState } from "react";

export default function ExpandableGridCard({ page }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const id = useId();
  const ref = useOutsideClick(() => setIsModalOpen(false), true);

  const isPremium = page.isPremium ? "پیشرفته" : "عادی";

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    }

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen]);

  if (!page) {
    return null; // If no card is passed, render nothing
  }

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 h-full w-full bg-black/20"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] grid place-items-center overflow-y-scroll [scrollbar-width:none]">
            <motion.button
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-card md:hidden"
              onClick={() => setIsModalOpen(false)}
            >
              <XIcon className="h-5 w-5" />
            </motion.button>
            <motion.div
              layoutId={`page-${page.uri}-${id}`}
              ref={ref}
              className="flex h-full w-full max-w-[500px] flex-col overflow-hidden bg-white [scrollbar-width:none] dark:bg-neutral-900 sm:rounded-xl md:h-fit md:max-h-[90%] md:max-w-[400px] md:overflow-auto"
            >
              <motion.div
                layoutId={`image-${page.uri}-${id}`}
                className="h-4/5"
              >
                {/* Modal open image */}
                <Image
                  // src={active.src}
                  height={300}
                  width={300}
                  src="/album.jpg"
                  alt={page.uri}
                  className="h-full w-full object-cover object-center sm:rounded-tl-lg sm:rounded-tr-lg"
                />
              </motion.div>

              <div ref={ref} className="h-1/5">
                <div className="flex items-center justify-between p-4 sm:px-6">
                  <div>
                    <motion.h3
                      layoutId={`title-${page.uri}-${id}`}
                      className="text-lg font-semibold text-neutral-700 dark:text-neutral-200"
                    >
                      {page.uri}
                    </motion.h3>
                  </div>

                  <motion.span
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={cn(
                      `border-brand-400 text-brand-500 rounded-md border-2 px-2 py-1 text-xs font-bold`,
                      page.isPremium && "bg-brand-500 text-white",
                    )}
                  >
                    {isPremium}
                  </motion.span>
                </div>
                <div
                  className={cn(
                    `relative px-4 pt-4`,
                    !page.description && "hidden",
                  )}
                >
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-40 flex-col items-start gap-4 overflow-auto pb-10 text-xs text-neutral-600 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] dark:text-neutral-400 md:h-fit md:text-sm lg:text-base"
                  >
                    {typeof page.description === "function"
                      ? page.description()
                      : page.description}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div
        layoutId={`page-${page.uri}-${id}`}
        onClick={() => setIsModalOpen(true)}
        className="h-[450px] w-[300px] cursor-pointer rounded-xl border bg-card shadow-md transition-shadow duration-200 hover:shadow-xl md:h-[500px] md:w-[320px]"
      >
        <div className="flex h-full flex-col items-center justify-center">
          <div className="relative h-5/6 w-full overflow-hidden rounded-t-xl border-b-2">
            <Image
              fill
              // src={active.src}
              src="/album.jpg"
              alt={page.uri}
              className="object-cover object-center sm:rounded-tl-lg sm:rounded-tr-lg lg:h-80"
            />
          </div>
          <div className="flex h-1/6 w-full items-center justify-between rounded-b-xl text-neutral-400/80">
            <div className="ml-4 mr-4 text-left capitalize text-stone-900">
              {page.uri}
            </div>
            <div className="flex items-center justify-end">
              <span
                className={cn(
                  `border-brand-400 text-brand-500 ml-4 rounded-md border-2 px-2 py-1 text-xs`,
                  page.isPremium && "bg-brand-400 text-white",
                )}
              >
                {isPremium}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
