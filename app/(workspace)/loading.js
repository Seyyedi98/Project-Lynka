import { Loader2 } from "lucide-react";

const loading = () => {
  return (
    <div className="grid items-center justify-center">
      <Loader2 />
      <p className="text-xl text-primary-200">Loading Cabin data</p>
    </div>
  );
};

export default loading;
