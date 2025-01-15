import {
  CopyIcon,
  EyeIcon,
  PlusIcon,
  QrCodeIcon,
  SaveIcon,
} from "lucide-react";
import React from "react";
import { WorkspaceDynamicModal } from "../../common/modal/workspace-dynamic-modal";
import EditorSidebarElements from "../../editor/element/editor-sidebar-elements";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import SavePageBtn from "../../common/button/PrimaryButton/save-page-button";
import Link from "next/link";

const WorkspaceBottomBar = ({ isDesktop }) => {
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const params = useParams();

  return (
    <div className="fixed bottom-0 right-0 z-10 h-[72px] w-full animate-fade-up duration-200">
      <div
        className={cn(
          `flex h-full items-center justify-center gap-3 rounded-t-3xl bg-white px-3 shadow-lg md:px-6`,
          isDesktop ? "mx-auto max-w-[700px]" : "mx-2",
        )}
      >
        <SavePageBtn uri={params.uri}>
          <div className="cursor-pointer rounded-full bg-primary-600 p-2 text-white duration-200 hover:bg-primary-700">
            <SaveIcon className="h-6 w-6" />
          </div>
        </SavePageBtn>

        <div
          dir="ltr"
          className="flex h-10 w-full items-center gap-2 rounded-full border-[1px] border-slate-200 px-5"
        >
          <Link
            href={`localhost:3000/${params.uri}`}
            // href={`${websiteUrl}${params.uri}`}
            target="_blank"
            className="truncate text-nowrap font-medium text-brand-600 hover:underline hover:underline-offset-4"
          >
            link.ir/
            <span className="truncate text-nowrap">{params.uri}</span>
          </Link>
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
