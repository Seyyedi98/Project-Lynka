import React from "react";

const layout = ({ children }) => {
  return (
    <div className="flex h-full min-h-screen w-screen items-center justify-center bg-background">
      {children}
    </div>
  );
};

export default layout;
