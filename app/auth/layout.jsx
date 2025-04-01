import Image from "next/image";
const backgroundLight = "/bg_wave.svg";
const backgroundGray = "/bg_wave_gray.svg";

const layout = ({ children }) => {
  return (
    <div className="bg-main-gradient">
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
      <div className="z-10 flex h-svh w-full text-lg">{children}</div>
    </div>
  );
};

export default layout;
