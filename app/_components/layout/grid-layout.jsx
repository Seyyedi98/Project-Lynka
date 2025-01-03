"use client";

const GridLayout = ({ children }) => {
  return (
    // <div className="grid grid-cols-1 place-items-center gap-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
    <div className="grid-cols-auto-fit-100 grid place-items-start gap-4 gap-y-8">
      {children}
    </div>
  );
};

export default GridLayout;
