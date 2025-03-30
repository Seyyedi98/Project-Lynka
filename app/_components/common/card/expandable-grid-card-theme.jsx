"use client";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useState } from "react";

// theme : {image, name}
export default function ExpandableThemeGridCard({
  theme,
  onSelect,
  isPending,
}) {
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

  if (!theme) {
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
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white md:hidden"
              onClick={() => setIsModalOpen(false)}
            >
              <XIcon className="h-5 w-5" />
            </motion.button>
            <motion.div
              layoutId={`theme-${theme.name}-${id}`}
              ref={ref}
              className="flex h-full w-full max-w-[500px] flex-col overflow-hidden bg-white [scrollbar-width:none] dark:bg-neutral-900 sm:rounded-xl md:h-fit md:max-h-[90%] md:max-w-[400px] md:overflow-auto"
            >
              <motion.div
                layoutId={`image-${theme.name}-${id}`}
                className="h-4/5"
              >
                {/* Modal open image */}
                <Image
                  // src={active.src}
                  height={300}
                  width={300}
                  src="/album.jpg"
                  alt={theme.name}
                  className="h-full w-full object-cover object-center sm:rounded-tl-lg sm:rounded-tr-lg"
                />
              </motion.div>

              <div ref={ref} className="h-1/5">
                <div className="flex items-center justify-between p-4 sm:px-6">
                  <div>
                    <motion.h3
                      layoutId={`title-${theme.name}-${id}`}
                      className="text-lg font-semibold text-neutral-700 dark:text-neutral-200"
                    >
                      {theme.name}
                    </motion.h3>
                  </div>
                </div>
                <div
                  className={cn(
                    `relative px-4 pt-4`,
                    !theme.description && "hidden",
                  )}
                >
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-40 flex-col items-start gap-4 overflow-auto pb-10 text-xs text-neutral-600 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] dark:text-neutral-400 md:h-fit md:text-sm lg:text-base"
                  >
                    {typeof theme.description === "function"
                      ? theme.description()
                      : theme.description}
                  </motion.div>
                </div>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => onSelect(theme)}
                  disabled={isPending}
                  className="bg-brand-600/90 hover:bg-brand-600 absolute bottom-0 right-0 mt-auto flex h-10 w-full items-center justify-center text-primary-foreground duration-200 sm:relative"
                >
                  {isPending ? <LoaderIcon /> : "انتخاب"}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div
        layoutId={`theme-${theme.name}-${id}`}
        onClick={() => setIsModalOpen(true)}
        className="h-[400px] w-[250px] cursor-pointer overflow-hidden rounded-xl border bg-card shadow-md transition-shadow duration-200 hover:shadow-xl"
      >
        <div className="flex h-full flex-col items-center justify-center">
          <div className="relative h-full w-full overflow-hidden rounded-t-xl border-b-2">
            <Image
              fill
              // src={active.src}
              src="/album.jpg"
              alt={theme.name}
              className="object-cover object-center sm:rounded-tl-lg sm:rounded-tr-lg lg:h-80"
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}
