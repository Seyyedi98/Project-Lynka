import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import React from "react";

const HumbergerMenuBtn = ({ setIsSidebarOpen, isSidebarOpen }) => {
  return (
    <div
      className="sm:hidden"
      onClick={(e) => {
        e.stopPropagation();
        setIsSidebarOpen(!isSidebarOpen);
      }}
    >
      <HamburgerMenuIcon className="w-7 h-7" />
    </div>
  );
};

export default HumbergerMenuBtn;
