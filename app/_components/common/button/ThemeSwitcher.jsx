"use client";

import { useEffect, useState } from "react";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
// import { MoonIcon, SunIcon } from "lucide-react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Tabs defaultValue={theme}>
      <TabsList>
        <TabsTrigger value="light" onClick={() => setTheme("light")}>
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-90 duration-500 dark:rotate-0" />
        </TabsTrigger>
        <TabsTrigger value="dark" onClick={() => setTheme("dark")}>
          <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all duration-500 dark:rotate-0" />
        </TabsTrigger>
        <TabsTrigger value="system" onClick={() => setTheme("system")}>
          <DesktopIcon className="h-[1.2rem] w-[1.2rem]" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ThemeSwitcher;
