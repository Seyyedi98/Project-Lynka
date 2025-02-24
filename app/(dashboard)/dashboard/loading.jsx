import { Loader2Icon } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
};

export default Loading;
