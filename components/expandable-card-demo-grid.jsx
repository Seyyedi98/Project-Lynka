"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import CloseIcon from "@/app/_components/common/button/close-button";
import { cn } from "@/lib/utils";

export default function ExpandableCard({ card }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const id = useId();
  const ref = useOutsideClick(() => setIsModalOpen(false), true);

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

  if (!card) {
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
          <div className="fixed inset-0 z-[100] grid place-items-center">
            <motion.button
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white lg:hidden"
              onClick={() => setIsModalOpen(false)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              ref={ref}
              className="flex h-full w-full max-w-[500px] flex-col overflow-hidden bg-white dark:bg-neutral-900 sm:rounded-3xl md:h-fit md:max-h-[90%]"
            >
              <motion.div layoutId={`image-${card.title}-${id}`}>
                {/* Add Image component here if needed */}
              </motion.div>

              <div ref={ref}>
                <div className="flex items-start justify-between p-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${card.title}-${id}`}
                      className="text-base font-medium text-neutral-700 dark:text-neutral-200"
                    >
                      {card.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${card.description}-${id}`}
                      className="text-base text-neutral-600 dark:text-neutral-400"
                    >
                      {card.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={card.ctaLink}
                    target="_blank"
                    className="rounded-full bg-green-500 px-4 py-3 text-sm font-bold text-white"
                  >
                    {card.ctaText}
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
                    {typeof card.content === "function"
                      ? card.content()
                      : card.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div
        layoutId={`card-${card.title}-${id}`}
        onClick={() => setIsModalOpen(true)}
        className={cn(
          `h-[450px] w-[300px] cursor-pointer rounded-xl border bg-card shadow-md duration-200 hover:scale-105 hover:shadow-lg md:h-[500px] md:w-[320px]`,
        )}
      >
        <div className={cn(`flex h-full flex-col items-center justify-center`)}>
          <div className="h-4/5 w-full rounded-t-xl border-b-2"></div>
          <div className="grid h-1/5 w-full grid-cols-2 grid-rows-2 rounded-b-xl text-neutral-400/80">
            <div className="mr-2 flex items-center justify-start">
              <span className="duration-200 hover:text-black">
                {/* Add icon component here */}
              </span>
            </div>
            <div className="flex items-center justify-end">
              <span className="ml-4 rounded-sm border-2 px-4 py-1">plan</span>
            </div>
            <div className="col-span-2 m-2 ml-4 text-left capitalize text-stone-900">
              {card.title}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
