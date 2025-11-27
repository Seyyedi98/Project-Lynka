"use client";

import Link from "next/link";

const LivePageCta = () => {
  return (
    <Link
      href="/"
      className="fixed bottom-5 left-0 right-0 flex items-center justify-center"
    >
      <div className="flex items-center gap-1 rounded-full bg-white px-6 py-3 text-black shadow-lg">
        <span className="text-[15px]">صفحه اختصاصی خودتو بساز</span>

        {/* Full arrow with tail */}
        <span className="arrow inline-block">
          <svg
            width="34"
            height="20"
            viewBox="0 0 40 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* tail */}
            <line x1="26" y1="10" x2="10" y2="10" />
            {/* arrow head */}
            <polyline points="16,4 10,10 16,16" />
          </svg>
        </span>
      </div>

      <style>{`
        @keyframes arrowAnim {
          0% {
            opacity: 0;
            transform: translateX(100%);
          }
          25% {
            opacity: 1;
            transform: translateX(0);
          }
          75% {
            opacity: 1;
            transform: translateX(0);
          }
          100% {
            opacity: 0;
            transform: translateX(-100%);
          }
        }

        .arrow {
          animation: arrowAnim 3s ease-in-out infinite;
          display: inline-block;
        }
      `}</style>
    </Link>
  );
};

export default LivePageCta;
