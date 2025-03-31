import { trackClick } from "@/actions/page/analytics";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { fade } from "@/utils/animation/animation";
import CryptoJS from "crypto-js";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const backgroundLight = "/bg_wave.svg";

const ProtectedPagePasswordCheck = ({
  isModalOpen,
  setIsModalOpen,
  href,
  password,
  uri,
  title,
  elementId,
}) => {
  const [enteredPassword, setEnteredPassword] = useState("");

  const handleClick = async () => {
    // const userAgent = await GetUserAgentData();

    if (password === CryptoJS.SHA256(enteredPassword).toString()) {
      window.open(`http://${href}`, "_blank");

      trackClick({
        pageUri: uri,
        elementName: title,
        elementId,
      }).catch((error) => {
        console.error("Failed to update analytics data:", error);
      });
    } else {
      toast.error("رمز عبور وارد شده اشتباه می باشد");
    }
  };
  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          key="protected"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={fade}
          className="relative z-20 h-full w-full bg-main-gradient-light"
        >
          <span
            onClick={() => setIsModalOpen(false)}
            className="absolute left-4 top-4 cursor-pointer transition-transform duration-150 hover:scale-125"
          >
            <ChevronLeft className="h-8 w-8 text-white" />
          </span>
          <Image
            className="pointer-events-none absolute object-cover object-center"
            fill
            src={backgroundLight}
            alt="bg"
          />
          <div className="grid h-full w-full place-items-center">
            <div className="flex w-full items-center justify-center gap-4 p-4 sm:w-fit">
              <div
                onClick={handleClick}
                className="transition-color mt-0.5 cursor-pointer self-start rounded-full bg-secondary p-2.5 text-input-blue text-white duration-100 hover:bg-secondary/80"
              >
                <ArrowRight className="h-6 w-6" />
              </div>
              <div className="flex w-full flex-col items-center gap-4">
                <Input
                  value={enteredPassword}
                  onChange={(e) => setEnteredPassword(e.target.value)}
                  dir="ltr"
                  placeholder="رمز عبور"
                  type="password"
                  className="h-12 rounded-md border-none bg-input-blue/50 text-center text-white placeholder-white caret-white placeholder:opacity-60 focus:border-none focus:ring-0 sm:w-72"
                />
                <div className="mt-2 text-base opacity-60 sm:mt-0 md:text-xs">
                  برای مشاهده ی لینک، رمز عبور را وارد کنید
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProtectedPagePasswordCheck;
