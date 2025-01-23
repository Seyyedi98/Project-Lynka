import Link from "next/link";

const ButtonFieldNature = ({ title, href, isLive }) => {
  return (
    <>
      {isLive && (
        <Link
          href={`http://${href}`}
          target="_blank" // ask open in new page??
          className="flex h-16 w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-slate-800 bg-green-500 p-2"
        >
          <p>{title}</p>
        </Link>
      )}

      {!isLive && (
        <div className="flex h-16 w-full flex-col items-center justify-center gap-2 rounded-md border-2 border-slate-800 bg-green-500 p-2">
          <p>{title}</p>
        </div>
      )}
    </>
  );
};

export default ButtonFieldNature;
