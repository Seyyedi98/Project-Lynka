import useEditor from "@/hooks/useEditor";
import { cn } from "@/lib/utils";
import Image from "next/image";

const NormalHero = ({ title, subtitle, primaryImage }) => {
  const primaryBgImage = primaryImage.url;

  return (
    <div
      // style={{ backgroundImage: `url(${primaryImage})` }}
      className="relative mb-24 h-72 w-full bg-lime-300 sm:h-52"
    >
      <div className="absolute -bottom-20 z-10 flex h-full w-full flex-1 flex-col items-center justify-end">
        <h2 className="text-3xl">{title}</h2>
        <h4 className="text-lg font-thin text-muted-foreground">{subtitle}</h4>
      </div>

      <Image
        priority
        width={500}
        height={500}
        src={primaryBgImage}
        alt={title}
        className="absolute right-0 top-0 h-full w-full object-cover object-center"
      />
    </div>
  );
};

export default NormalHero;
