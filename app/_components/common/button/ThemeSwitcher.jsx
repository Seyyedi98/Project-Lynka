"use client";

import { useEffect, useState } from "react";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "rsuite";
// import { MoonIcon, SunIcon } from "lucide-react";

const ThemeSwitcher = () => {
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
    <div className="col-span-full mb-3 flex w-[99%] items-center justify-between space-x-2 rounded-md border border-primary/50 p-4 py-6">
      <Label htmlFor="theme-toggle">حالت تاریک</Label>
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

export default ThemeSwitcher;
