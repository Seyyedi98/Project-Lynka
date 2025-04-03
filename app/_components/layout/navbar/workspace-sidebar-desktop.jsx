import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import parseJson from "@/utils/parseJSON";
import { GearIcon } from "@radix-ui/react-icons";
import {
  AppWindow,
  ChartLine,
  Droplet,
  Layers,
  UserRoundIcon,
} from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import PageSettings from "../../workspace/page-settings";
import getImageAddress from "@/utils/get-image-address";

const WorkspaceSidebatDesktop = ({ selectedMenu, setSelectedMenu }) => {
  const data = useSelector((store) => store.page.hero);
  const dispatch = useDispatch();
  const key = parseJson(data?.extraAttributes?.primaryImage);
  const userImage = key ? getImageAddress(key?.key) : null;

  return (
    <div className="fixed right-2 top-0 z-40 flex h-full w-16 items-center ring-0">
      <div className="flex h-2/3 w-full items-stretch justify-center rounded-full bg-background/90 px-8 py-5 dark:bg-background">
        <div className="flex flex-col items-center justify-between">
          <ul className="relative flex flex-col items-center gap-8">
            <div
              className={cn(
                `absolute right-0 h-10 w-1 translate-x-[17px] border-r-2 border-text transition-all duration-200`,
                selectedMenu === "elements" && "top-[85px]",
                selectedMenu === "theme" && "top-[141px]",
                selectedMenu === "browser" && "top-[195px]",
                selectedMenu === "analytics" && "top-[251px]",
              )}
            />

            <li className="mb-8 translate-y-8 animate-fade-up cursor-pointer opacity-0 duration-300">
              <span className="h-10 w-10 bg-white">
                {userImage ? (
                  <Image
                    src={userImage}
                    width={128}
                    height={128}
                    alt="user image"
                    className="h-7 w-10 scale-[1.4] rounded-full object-cover"
                  />
                ) : (
                  <UserRoundIcon />
                )}
              </span>
            </li>

            <li
              onClick={() => {
                setTimeout(
                  () =>
                    dispatch({
                      type: "page/setSelectedElement",
                      payload: null,
                    }),
                  200,
                );
                setSelectedMenu("elements");
              }}
              className={cn(
                `translate-y-8 animate-fade-up cursor-pointer text-icon-light/70 opacity-0 duration-300`,
                selectedMenu === "elements" && "text-text",
              )}
            >
              <Layers className="" />
            </li>

            <li
              onClick={() => {
                setTimeout(
                  () =>
                    dispatch({
                      type: "page/setSelectedElement",
                      payload: null,
                    }),
                  200,
                );
                setSelectedMenu("theme");
              }}
              className={cn(
                `translate-y-8 animate-fade-up cursor-pointer text-icon-light/70 opacity-0 delay-100 duration-300`,
                selectedMenu === "theme" && "text-text",
              )}
            >
              <Droplet className="" />
            </li>

            <li
              onClick={() => {
                setTimeout(
                  () =>
                    dispatch({
                      type: "page/setSelectedElement",
                      payload: null,
                    }),
                  200,
                );
                setSelectedMenu("browser");
              }}
              className={cn(
                `translate-y-8 animate-fade-up cursor-pointer text-icon-light/70 opacity-0 delay-200 duration-300`,
                selectedMenu === "browser" && "text-text",
              )}
            >
              <AppWindow className="" />
            </li>
            <li
              onClick={() => {
                setTimeout(
                  () =>
                    dispatch({
                      type: "page/setSelectedElement",
                      payload: null,
                    }),
                  200,
                );
                setSelectedMenu("analytics");
              }}
              className={cn(
                `translate-y-8 animate-fade-up cursor-pointer text-icon-light/70 opacity-0 delay-300 duration-300`,
                selectedMenu === "analytics" && "text-text",
              )}
            >
              <ChartLine className="" />
            </li>
          </ul>

          <div className="flex flex-col items-center justify-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <GearIcon className="h-7 w-7 cursor-pointer" />
              </DialogTrigger>
              <DialogContent className="">
                <DialogTitle className="hidden"></DialogTitle>
                <DialogDescription className="hidden"></DialogDescription>
                <PageSettings />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSidebatDesktop;
