import { CopyIcon, EyeIcon, PlusIcon, QrCodeIcon } from "lucide-react";
import React from "react";
import { WorkspaceDynamicModal } from "../common/shared/workspace-dynamic-modal";
import EditorSidebarElements from "../editor/element/editor-sidebar-elements";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

const WorkspaceBottomBar = ({ isDesktop }) => {
  const params = useParams();

  return (
    <div className="fixed bottom-0 right-0 z-10 h-[72px] w-full">
      <div
        className={cn(
          `flex h-full items-center justify-center gap-3 rounded-t-3xl bg-white px-6 shadow-lg`,
          isDesktop ? "mx-auto max-w-[700px]" : "mx-4",
        )}
      >
        <div className="cursor-pointer rounded-full bg-primary-600 p-2 text-white duration-200 hover:bg-primary-700">
          <EyeIcon />
        </div>
        <div
          dir="ltr"
          className="flex h-10 w-full items-center gap-2 rounded-full border-[1px] border-slate-200 px-6"
        >
          <span className="font-medium text-brand-600 hover:underline hover:underline-offset-4">
            link.ir/ {params.uri}
          </span>
          <span>
            <CopyIcon className="h-4 w-4 duration-100 hover:text-blue-800" />
          </span>
          <span>
            <QrCodeIcon className="h-4 w-4 cursor-pointer duration-100 hover:text-blue-800" />
          </span>
        </div>
        {!isDesktop && (
          <div className="cursor-pointer rounded-full bg-primary-600 p-2 text-white duration-200 hover:bg-primary-700">
            <WorkspaceDynamicModal
              mode="allDrawer"
              trigger={
                <div>
                  <PlusIcon />
                </div>
              }
              title="لیست بلوک ها"
            >
              <EditorSidebarElements />
            </WorkspaceDynamicModal>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkspaceBottomBar;
