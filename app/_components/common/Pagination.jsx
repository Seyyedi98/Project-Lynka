"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}) => {
  const maxVisiblePages = 5; // Increased for better navigation

  const getPageNumbers = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    // Adjust if we're at the beginning
    if (currentPage <= halfVisible) {
      startPage = 1;
      endPage = maxVisiblePages;
    }

    // Adjust if we're at the end
    if (currentPage >= totalPages - halfVisible) {
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages;
    }

    // Add first page and ellipsis if needed
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add last page and ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      {/* Previous Button - In RTL, this should go to the right */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-md border border-border transition-all duration-200",
          currentPage === 1
            ? "cursor-not-allowed opacity-40"
            : "bg-card hover:bg-primary hover:text-primary-foreground hover:shadow-md",
        )}
        aria-label="صفحه قبلی"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="flex h-9 w-9 items-center justify-center text-sm text-muted-foreground"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-md border border-border text-sm font-medium transition-all duration-200",
                currentPage === page
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card hover:bg-accent hover:text-accent-foreground",
              )}
              aria-label={`برو به صفحه ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          ),
        )}
      </div>

      {/* Next Button - In RTL, this should go to the left */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-md border border-border transition-all duration-200",
          currentPage === totalPages
            ? "cursor-not-allowed opacity-40"
            : "bg-card hover:bg-primary hover:text-primary-foreground hover:shadow-md",
        )}
        aria-label="صفحه بعدی"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
    </div>
  );
};
