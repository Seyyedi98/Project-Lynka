import Image from "next/image";

const TransparentHero = ({ ...data }) => {
  const { title, subtitle, primaryImage, heroType, heroValue } = data;
  const primaryBgImage = primaryImage.url;

  return (
    <div className="relative mb-24 h-52 w-full bg-transparent sm:h-52">
      <div className="absolute -bottom-20 z-10 flex h-full w-full flex-1 flex-col items-center justify-end">
        <h2 className="text-3xl text-white">{title}</h2>
        <h4 className="text-lg font-thin text-white">{subtitle}</h4>
      </div>

      {primaryBgImage && (
        <Image
          priority
          width={500}
          height={500}
          src={primaryBgImage}
          alt={title}
          className="absolute -bottom-8 right-1/2 h-36 w-36 translate-x-1/2 rounded-full bg-white object-cover"
        />
      )}
    </div>
  );
};

export default TransparentHero;
