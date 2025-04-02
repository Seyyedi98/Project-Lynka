"use client";

import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Toggle } from "rsuite";

const ToggleDarkmode = (className) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState();

  function toggleTheme() {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="" {...className}>
      <Toggle
        checked={theme === "dark" ? true : false}
        onChange={toggleTheme}
        aria-readonly
        id="theme-toggle"
        color="blue"
      />
    </div>
  );
};

export default ToggleDarkmode;
