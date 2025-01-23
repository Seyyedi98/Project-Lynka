import { Button } from "@/components/ui/button";
import BackButtonWithConfirmation from "../../common/button/back-button-confirmation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../common/modal/diolog";
import PreviewPageElements from "../../preview/preview-elements-rendere";
import PageSettings from "../../editor/page-settings";

const WorkspaceHeader = () => {
  return (
    <header className="fixed right-0 top-0 z-20 flex h-14 w-full items-center justify-between bg-primary-500 px-4">
      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary" className="px-2 duration-200" asChild>
              <p>پیش نمایش</p>
            </Button>
          </DialogTrigger>
          <DialogContent className="flex h-screen max-h-screen w-screen max-w-full flex-grow flex-col gap-0 p-0 px-4">
            <DialogTitle>پیش نمایش</DialogTitle>
            <DialogDescription></DialogDescription>
            <div className="flex h-full w-full items-center justify-center">
              <section className="flex h-full w-3/4 max-w-[400px] flex-col items-center justify-center gap-4">
                <PreviewPageElements />
              </section>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="secondary">Settings</Button>
          </DialogTrigger>
          <DialogContent className="max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="text-right font-medium">
                تنظیمات صفحه
              </DialogTitle>
              <DialogDescription></DialogDescription>
              <PageSettings />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <BackButtonWithConfirmation url="/dashboard" />
    </header>
  );
};

export default WorkspaceHeader;
