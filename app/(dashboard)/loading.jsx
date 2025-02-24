import { TextShimmer } from "@/components/ui/text-shimmer";
import { LoaderIcon } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <TextShimmer className="text-lg" duration={1.5}>
        در حال آماده سازی...
      </TextShimmer>
    </div>
  );
};

export default Loading;
