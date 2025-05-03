"use client";

import React, { useState, useEffect } from "react";

const ConnectionLost = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white p-4 text-center">
      <div className="mx-auto max-w-md">
        <h2 className="mb-4 text-2xl font-bold text-red-600">خطای اتصال</h2>
        <p className="mb-6 text-gray-700">
          لطفاً اتصال خود به اینترنت را بررسی کرده و مجدداً امتحان کنید
        </p>
        <div className="animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ConnectionLost;

// const NetworkStatusProvider = ({ children }) => {
//   const [isOnline, setIsOnline] = useState(navigator.onLine);

//   useEffect(() => {
//     const handleOnline = () => setIsOnline(true);
//     const handleOffline = () => setIsOnline(false);

//     window.addEventListener("online", handleOnline);
//     window.addEventListener("offline", handleOffline);

//     return () => {
//       window.removeEventListener("online", handleOnline);
//       window.removeEventListener("offline", handleOffline);
//     };
//   }, []);

//   return (
//     <>
//       {!isOnline && <ConnectionLost />}
//       {children}
//     </>
//   );
// };

// export default NetworkStatusProvider;
