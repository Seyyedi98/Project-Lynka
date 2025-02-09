import { LoaderIcon } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-background">
      <LoaderIcon className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
};

export default Loading;
