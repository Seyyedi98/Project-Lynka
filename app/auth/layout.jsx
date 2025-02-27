import BgWave from "@/public/bg_wave";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ThemeSwitcher from "../_components/common/button/ThemeSwitcher";
const backgroundLight = "/bg_wave.svg";
const backgroundGray = "/bg_wave_gray.svg";

const layout = ({ children }) => {
  return (
    <div className="bg-main-gradient">
      <ThemeSwitcher className="fixed left-0 top-0" />
      <Image
        className="pointer-events-none absolute z-20 hidden object-cover object-center lg:block"
        fill
        src={backgroundLight}
        alt="bg"
      />
      <Image
        className="pointer-events-none absolute z-20 object-cover object-center lg:hidden"
        fill
        src={backgroundGray}
        alt="bg"
      />
      {/* <nav className="absolute flex w-full gap-4 bg-red-500 p-4 font-semibold text-white">
        <Link href="/auth/login">ورود</Link>
        <Link href="/auth/register">عضویت</Link>
      </nav> */}
      <div className="z-10 flex h-svh w-full text-lg">{children}</div>
    </div>
  );
};

export default layout;
