import Link from "next/link";

export const LoadMoreButton = ({ currentPage }) => {
  return (
    <Link
      href={`/blog?page=${currentPage + 1}`}
      scroll={false}
      className="mx-auto mt-12 flex cursor-pointer items-center gap-2 rounded-full bg-gray-100 px-8 py-3 font-medium text-gray-700 transition-all hover:gap-3 hover:bg-gray-200"
    >
      مشاهده بیشتر
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 5v14M19 12l-7 7-7-7" />
      </svg>
    </Link>
  );
};
