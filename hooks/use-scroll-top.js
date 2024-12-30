"use client";

import { useEffect } from "react";

export default function ScrollDetector() {
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        console.log("User has scrolled more than 500px!");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div style={{ height: "1500px", padding: "20px" }}>
      <p>Scroll down to trigger the console log!</p>
    </div>
  );
}
