"use client";

import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "lucide-react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export default function ExpandableCardDemo({ page }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useOutsideClick(() => setIsModalOpen(false), true);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    }

    if (isModalOpen && typeof isModalOpen === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isModalOpen]);

  if (!page) {
    return null; // If no card is passed, render nothing
  }

  return (
    <>
      <AnimatePresence>
        {isModalOpen && typeof isModalOpen === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 h-full w-full bg-black/20"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isModalOpen && typeof isModalOpen === "object" ? (
          <div className="fixed inset-0 z-[100] grid place-items-center">
            <motion.button
              key={`button-${isModalOpen.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-card lg:hidden"
              onClick={() => setIsModalOpen(null)}
            >
              <XIcon className="h-5 w-5" />
            </motion.button>
            <motion.div
              layoutId={`page-${isModalOpen.title}-${id}`}
              ref={ref}
              className="flex h-full w-full max-w-[500px] flex-col overflow-hidden bg-white dark:bg-neutral-900 sm:rounded-2xl md:h-fit md:max-h-[90%]"
            >
              <motion.div layoutId={`image-${isModalOpen.title}-${id}`}>
                {/* Modal open image */}
                <Image
                  priority
                  width={200}
                  height={200}
                  src="/album.jpg"
                  alt={page.uri}
                  className="h-full w-full object-cover object-center sm:rounded-tl-lg sm:rounded-tr-lg lg:h-80"
                />
              </motion.div>

              <div ref={ref}>
                <div className="flex items-center justify-between p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${isModalOpen.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200"
                    >
                      {isModalOpen.uri}
                    </motion.h3>
                    {/* <motion.p
                      layoutId={`description-${isModalOpen.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {isModalOpen.description}
                    </motion.p> */}
                  </div>

                  <motion.a
                    layoutId={`button-${isModalOpen.title}-${id}`}
                    href={`/workspace/${page.uri}`}
                    className="rounded-lg bg-green-500 px-4 py-3 text-sm text-white transition-colors duration-200"
                  >
                    ویرایش
                  </motion.a>
                </div>
                <div className="relative px-4 pt-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-40 flex-col items-start gap-4 overflow-auto pb-10 text-xs text-neutral-600 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] dark:text-neutral-400 md:h-fit md:text-sm lg:text-base"
                  >
                    {typeof isModalOpen.description === "function"
                      ? isModalOpen.description()
                      : isModalOpen.description}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <motion.div
        layoutId={`page-${page.title}-${id}`}
        key={`page-${page.title}-${id}`}
        onClick={() => setIsModalOpen(page)}
        className="flex cursor-pointer items-center justify-between rounded-xl p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800"
      >
        <div className="flex items-center gap-4">
          <motion.div layoutId={`image-${page.title}-${id}`}>
            <Image
              width={100}
              height={100}
              src="/album.jpg"
              // src={page.src}
              alt={page.uri}
              className="h-14 w-14 rounded-lg object-cover object-top"
            />
          </motion.div>
          <div className="">
            <motion.h3
              layoutId={`title-${page.title}-${id}`}
              className="text-center font-medium text-neutral-800 dark:text-neutral-200 md:text-left"
            >
              {page.uri}
            </motion.h3>
            {/* <motion.p
              layoutId={`description-${page.description}-${id}`}
              className="text-center text-neutral-600 dark:text-neutral-400 md:text-left"
            >
              {page.description}
            </motion.p> */}
          </div>
        </div>
        <motion.a
          onClick={(e) => e.stopPropagation()}
          href={`/workspace/${page.uri}`}
          layoutId={`button-${page.title}-${id}`}
          className="mt-4 rounded-lg bg-gray-100 px-4 py-2 text-sm text-black transition-colors duration-200 hover:bg-green-500 hover:text-white md:mt-0"
        >
          ویرایش
        </motion.a>
      </motion.div>
    </>
  );
}
