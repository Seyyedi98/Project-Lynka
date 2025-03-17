import { cn } from "@/lib/utils";
import React from "react";

const SpaceFieldDefault = (props) => {
  const { height, isLive } = props;

  const space = Number(height) > 0 ? Number(height) : 20;

  return (
    <div
      style={{ height: space }}
      className={cn(
        `grid w-full place-content-center`,
        !isLive && "rounded-sm border-2 border-dashed border-white",
      )}
    >
      {!isLive && "فاصله"}
    </div>
  );
};

export default SpaceFieldDefault;
