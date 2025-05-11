import { Label } from "@/components/ui/label";
import { AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";
import ToggleDarkmode from "../../common/button/PrimaryButton/toggle-darkmode";
import DeletePage from "../../common/form/delete-page";
import { WorkspaceDynamicModal } from "../../common/modal/workspace-dynamic-modal";
import { redirect, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const WorkspaceSettings = () => {
  const pathname = usePathname();
  const page = pathname.split("/")[2];

  return (
    <div className="flex flex-col">
      <div className="col-span-full mb-3 flex w-[99%] items-center justify-between space-x-2 rounded-md border border-primary/50 p-4 py-6">
        <Label htmlFor="theme-toggle">حالت تاریک</Label>
        <ToggleDarkmode />
      </div>
      {/* Delete */}
      <WorkspaceDynamicModal
        mode="mobileDrawer"
        delay={400}
        modalId={`deletePage-${page.uri}`}
        trigger={
          <Button
            variant="destructive"
            size="md"
            title="حذف"
            className="cursor-pointer rounded-md p-2 transition"
          >
            حذف صفحه
            <Trash2 className="h-4 w-4" />
          </Button>
        }
      >
        <AnimatePresence>
          <DeletePage page={page} onClose={() => redirect("/dashboard")} />
        </AnimatePresence>
      </WorkspaceDynamicModal>
    </div>
  );
};

export default WorkspaceSettings;
