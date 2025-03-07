import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { XIcon } from "lucide-react";
import React from "react";

const HumbergerMenuBtn = ({ setIsSidebarOpen, isSidebarOpen }) => {
  return (
    <div
      className="transition-color cursor-pointer rounded-full bg-card p-2 text-text shadow-md duration-150 hover:bg-card/80"
      onClick={(e) => {
        e.stopPropagation();
        setIsSidebarOpen(!isSidebarOpen);
      }}
    >
      {isSidebarOpen ? (
        <XIcon className="h-6 w-6" />
      ) : (
        <HamburgerMenuIcon className="h-6 w-6" />
      )}
    </div>
  );
};

export default HumbergerMenuBtn;
