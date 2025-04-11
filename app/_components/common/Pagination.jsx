// components/common/pagination.jsx
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  const maxVisiblePages = 2;

  const getPageNumbers = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    let leftSide = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let rightSide = Math.min(
      totalPages,
      currentPage + Math.floor(maxVisiblePages / 2),
    );

    if (currentPage <= Math.floor(maxVisiblePages / 2)) {
      rightSide = maxVisiblePages;
    }

    if (currentPage >= totalPages - Math.floor(maxVisiblePages / 2)) {
      leftSide = totalPages - maxVisiblePages + 1;
    }

    for (let i = leftSide; i <= rightSide; i++) {
      pages.push(i);
    }

    if (leftSide > 1) {
      if (leftSide > 2) {
        pages.unshift("...");
      }
      pages.unshift(1);
    }

    if (rightSide < totalPages) {
      if (rightSide < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card transition-all",
          currentPage === 1
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-primary hover:text-primary-foreground",
        )}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="flex h-10 w-10 items-center justify-center"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-md border border-border transition-all",
              currentPage === page
                ? "bg-primary text-primary-foreground"
                : "bg-card hover:bg-primary/20",
            )}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card transition-all",
          currentPage === totalPages
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-primary hover:text-primary-foreground",
        )}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
    </div>
  );
};
