import { PlusCircleIcon } from "lucide-react";

const NewPageCard = () => {
  return (
    <div className="hove h-[450px] w-[300px] cursor-pointer rounded-xl bg-white p-4 shadow-md duration-200 hover:scale-105 hover:bg-neutral-50 hover:shadow-lg md:h-[500px] md:w-[320px]">
      <div className="flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed p-2">
        <div className="mt-8 flex flex-col items-center gap-4">
          <PlusCircleIcon className="h-10 w-10 text-neutral-400" />
          <span className="text-neutral-400">ساخت صفحه ی جدید</span>
        </div>
      </div>
    </div>
  );
};

export default NewPageCard;
