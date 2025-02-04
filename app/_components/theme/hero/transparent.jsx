import Image from "next/image";

const TransparentHero = ({ ...data }) => {
  const {
    title,
    subtitle,
    primaryImage,
    titleFont,
    subTitleFont,
    heroType,
    heroValue,
  } = data;
  const primaryBgImage = primaryImage.url;

  return (
    <div className="relative mb-24 h-52 w-full bg-transparent sm:h-52">
      <div className="absolute -bottom-20 z-10 flex h-full w-full flex-1 flex-col items-center justify-end">
        <h2 style={{ fontFamily: titleFont }} className="text-3xl text-white">
          {title}
        </h2>
        <h4
          style={{ fontFamily: subTitleFont }}
          className="text-lg font-thin text-white"
        >
          {subtitle}
        </h4>
      </div>

      {primaryBgImage && (
        <Image
          priority
          width={300}
          height={300}
          src={primaryBgImage}
          alt={title}
          className="absolute -bottom-8 right-1/2 h-36 w-36 translate-x-1/2 rounded-full bg-white object-cover"
        />
      )}
    </div>
  );
};

export default TransparentHero;
