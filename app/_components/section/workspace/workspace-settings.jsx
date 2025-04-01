import { Label } from "@/components/ui/label";
import ToggleDarkmode from "../../common/button/toggle-darkmode";

const WorkspaceSettings = () => {
  return (
    <div className="col-span-full mb-3 flex w-[99%] items-center justify-between space-x-2 rounded-md border border-primary/50 p-4 py-6">
      <Label htmlFor="theme-toggle">حالت تاریک</Label>
      <ToggleDarkmode />
    </div>
  );
};

export default WorkspaceSettings;
