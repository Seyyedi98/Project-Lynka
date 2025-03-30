import { useParams } from "next/navigation";
import React from "react";

const PageUrl = () => {
  const { uri } = useParams();

  return (
    <div className="cursor-pointer">
      <div className="relative flex h-10 w-full items-center justify-center rounded-full bg-black bg-opacity-20 px-4">
        <a
          href={`${process.env.NEXT_PUBLIC_WEBSITE_URL}${uri}`}
          target="_blank"
        >
          <span className="text-sm text-white">lynka.ir/{uri}</span>
        </a>
      </div>
    </div>
  );
};

export default PageUrl;
