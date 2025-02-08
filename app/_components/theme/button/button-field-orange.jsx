import Link from "next/link";

const ButtonFieldOrange = ({ title, href, isLive, font, color }) => {
  return (
    <>
      {isLive && (
        <Link
          href={`http://${href}`}
          target="_blank" // ask open in new page??
          className="flex h-16 w-full flex-col items-center justify-center gap-2 rounded-2xl bg-[#EE4540] p-2 text-white shadow-lg"
        >
          <p style={{ fontFamily: font, color: color }}>{title}</p>
        </Link>
      )}

      {!isLive && (
        <div className="flex h-16 w-full flex-col items-center justify-center gap-2 rounded-2xl bg-[#EE4540] p-2 text-white shadow-lg">
          <p style={{ fontFamily: font, color: color }}>{title}</p>
        </div>
      )}
    </>
  );
};

export default ButtonFieldOrange;
