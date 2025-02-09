const ButtonFieldOrange = ({ title, href, isLive, font, color }) => {
  return (
    <>
      {isLive && (
        <a
          href={`http://${href}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-16 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl bg-[#EE4540] p-2 text-white shadow-lg"
        >
          <p style={{ fontFamily: font, color: color }}>{title}</p>
        </a>
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
