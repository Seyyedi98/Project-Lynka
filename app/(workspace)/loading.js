import { Loader2 } from "lucide-react";

const loading = () => {
  return (
    <div className="grid h-full w-full place-content-center bg-primary-foreground">
      <Loader2 />
      <p className="text-xl text-primary-200"></p>
    </div>
  );
};

export default loading;
