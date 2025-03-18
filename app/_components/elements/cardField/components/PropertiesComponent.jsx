"use client";

import ElementBorderRadiusFormField from "@/app/_components/common/form/element-properties/element-border-radius-formfield";
import ElementCardLayoutFormField from "@/app/_components/common/form/element-properties/element-card-layout-formfield";
import ElementColorFormField from "@/app/_components/common/form/element-properties/element-color-formfield";
import ElementCountdownFormField from "@/app/_components/common/form/element-properties/element-countdown-formfield";
import ElementFontFormField from "@/app/_components/common/form/element-properties/element-font-formfield";
import ElementhrefFormField from "@/app/_components/common/form/element-properties/element-href-formfield";
import ElementPasswordFormField from "@/app/_components/common/form/element-properties/element-password-formfield";
import ElementScheduleFormField from "@/app/_components/common/form/element-properties/element-schedule-formfield";
import ElementTitleFormField from "@/app/_components/common/form/element-properties/element-title-formfield";
import Divider from "@/app/_components/common/shared/devider";
import { ElementThemeController } from "@/app/_components/controller/element-theme-controller";
import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { cardFieldSchems } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import CryptoJS from "crypto-js";
import { Check, ChevronLeft } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ShinyButton } from "@/app/_components/common/button/shiny-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ElementThemeSelector from "@/app/_components/theme/element-theme-selector";

const UploadButton = dynamic(
  () => import("@/app/_components/common/input/card-element-image-uploader"),
);

function PropertiesComponent({ elementInstance }) {
  const element = elementInstance;
  const dispatch = useDispatch();

  const { isSilver } = useUserSubscription();

  const RenderElement =
    ElementThemeController[element.type][element.extraAttributes.theme][0];

  const hashPassword = (password) => {
    const hashedPassword = CryptoJS.SHA256(password).toString();
    return hashedPassword;
  };

  const form = useForm({
    // resolver: zodResolver(cardFieldSchems),
    defaultValues: {
      title: element.extraAttributes.title || "",
      href: element.extraAttributes.href || "",
      font: element.extraAttributes.font || "",
      textColor: element.extraAttributes.textColor || "",
      bgColor: element.extraAttributes.bgColor || "",
      borderRadius: element.extraAttributes.borderRadius || "",
      layout: element.extraAttributes.layout || "",
      image: "",
      schedule: element.extraAttributes.schedule || false,
      scheduleStart: element.extraAttributes.scheduleStart || "0",
      scheduleEnd: element.extraAttributes.scheduleEnd || "0",
      countdown: element.extraAttributes.countdown || false,
      countdownDate: element.extraAttributes.countdownDate || "0",
      isProtected: element.extraAttributes.isProtected || false,
      password: "",
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values) {
    const {
      title,
      theme,
      textColor,
      layout,
      image,
      href,
      font,
      borderRadius,
      bgColor,
      schedule,
      scheduleStart,
      scheduleEnd,
      countdown,
      countdownDate,
      isProtected,
      password,
    } = values;

    const payload = {
      id: element.id,
      updatedElement: {
        ...element,
        extraAttributes: {
          ...element.extraAttributes,
          title,
          theme,
          textColor,
          layout:
            layout === "basic" || layout === "roundedImage"
              ? layout
              : isSilver
                ? layout
                : element.extraAttributes.layout,
          image,
          href,
          font,
          borderRadius,
          bgColor,
          schedule: isSilver ? schedule : element.extraAttributes.schedule,
          scheduleStart: isSilver
            ? scheduleStart
            : element.extraAttributes.scheduleStart,
          scheduleEnd: isSilver
            ? scheduleEnd
            : element.extraAttributes.scheduleEnd,
          countdown: isSilver ? countdown : element.extraAttributes.countdown,
          countdownDate: isSilver
            ? countdownDate
            : element.extraAttributes.countdownDate,
          isProtected: isSilver
            ? isProtected
            : element.extraAttributes.isProtected,
          password: isSilver
            ? element.extraAttributes.password !== password && password !== ""
              ? hashPassword(password)
              : element.extraAttributes.password
            : element.extraAttributes.password,
        },
      },
    };

    toast({
      description: "تغییرات با موفقیت اعمال شد",
    });

    dispatch({ type: "page/updateElement", payload });

    dispatch({ type: "modal/closeMenu" });
    setTimeout(
      () => dispatch({ type: "page/setSelectedElement", payload: null }),
      200,
    );
  }

  return (
    <>
      <Form {...form}>
        <Suspense
          fallback={
            <div>
              <div className="flex w-full gap-4">
                <Skeleton className="h-16 w-1/2" />

                <Skeleton className="h-16 w-1/2" />
              </div>
              <Skeleton className="mt-6 h-16 w-full" />
              <Skeleton className="mt-6 h-48 w-full" />
              <Skeleton className="mt-6 h-4 w-[250px]" />
              <Skeleton className="mt-3 h-4 w-[200px]" />
            </div>
          }
        >
          <form
            // onBlur={form.handleSubmit(applyChanges)}
            className="flex flex-col gap-5 text-text/90"
            onSubmit={form.handleSubmit(applyChanges)}
          >
            <Tabs dir="rtl" defaultValue="content" className="">
              <TabsList className="mb-2">
                <TabsTrigger value="content">محتوا</TabsTrigger>
                <TabsTrigger value="design">طراحی</TabsTrigger>
                <TabsTrigger value="visibility">نمایش</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="flex flex-col gap-5">
                {/* Title */}
                <ElementTitleFormField form={form} />

                {/* Address */}
                <ElementhrefFormField form={form} />

                <Divider className="mt-4 opacity-50" />

                {/* Font */}
                <ElementFontFormField fieldName="font" form={form} />

                {/* Text Color */}
                <ElementColorFormField
                  form={form}
                  label="رنگ متن"
                  fieldName="textColor"
                />
              </TabsContent>

              <TabsContent value="design" className="flex flex-col gap-4">
                {/* Layout */}
                <ElementCardLayoutFormField
                  form={form}
                  RenderElement={RenderElement}
                  isSilver={isSilver}
                  element={element}
                />
                {/* Border radius */}
                <ElementBorderRadiusFormField form={form} />
                <Divider className="mt-4 opacity-50" />
                {/* Background Color */}
                <ElementColorFormField
                  form={form}
                  label="رنگ بلوک"
                  fieldName="bgColor"
                />
                {/* Image upload */}
                <div className="mt-2">
                  <UploadButton form={form} element={element} />
                  <p className="text-textLight text-xs">
                    پس از انتخاب فایل، دکمه بارگزاری را بزنید
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="visibility" className="flex flex-col gap-4">
                {/* Schedule */}
                <div className="mt-6">
                  <ElementScheduleFormField
                    scheduleData={element.extraAttributes}
                    form={form}
                    isSilver={isSilver}
                  />
                </div>

                {/* Countdown */}
                <div className="mt-6">
                  <ElementCountdownFormField
                    countdownData={element.extraAttributes}
                    form={form}
                    isSilver={isSilver}
                  />
                </div>

                {/* Password */}
                <div className="mt-6">
                  <ElementPasswordFormField
                    passwordData={element.extraAttributes}
                    form={form}
                    isSilver={isSilver}
                  />
                </div>
              </TabsContent>
            </Tabs>

            {/* Mobile drawaer button */}
            <button
              type="submit"
              className="absolute -top-16 right-2 flex cursor-pointer items-center justify-center rounded-full bg-green-500 p-2 duration-200 hover:bg-green-600 sm:right-0 md:hidden"
            >
              <Check className="h-4 w-4 text-white" />
            </button>

            {/* Desktop sidebar button */}
            <button
              type="submit"
              className="mt-4 hidden h-12 cursor-pointer items-center justify-center rounded-md bg-green-500 p-2 text-white duration-200 hover:bg-green-600 sm:right-0 md:flex"
            >
              اعمال تغییرات
            </button>
          </form>
        </Suspense>
      </Form>
      <div className="mt-auto">
        <Dialog>
          <DialogTrigger asChild>
            <ShinyButton
              className="mt-4 h-14 w-full bg-button hover:bg-card-light"
              size="lg"
            >
              <span className="s flex w-full items-center justify-between text-text">
                تغییر تم
                <ChevronLeft />
              </span>
            </ShinyButton>
          </DialogTrigger>
          <DialogContent className="flex h-screen max-h-svh w-screen max-w-full flex-grow flex-col gap-0 p-0">
            <DialogTitle className="hidden"></DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
            <ElementThemeSelector elementInstance={element} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default PropertiesComponent;
