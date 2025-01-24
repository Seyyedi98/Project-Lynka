import { cn } from "@/lib/utils";
import Image from "next/image";

const NormalHero = ({ title, subtitle, primaryImage }) => {
  const primaryBgImage = primaryImage;

  return (
    <div
      style={{ backgroundImage: `url(${primaryImage})` }}
      className={cn(`h-72 w-full bg-lime-300 bg-cover bg-center sm:h-52`)}
    >
      {title} {subtitle}
    </div>
  );
};

export default NormalHero;
