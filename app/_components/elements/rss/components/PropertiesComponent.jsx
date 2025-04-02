"use client";

import DeleteElementBtn from "@/app/_components/common/button/PrimaryButton/delete-element-button";
import { ShinyButton } from "@/app/_components/common/button/PrimaryButton/shiny-button";
import ElementBorderRadiusFormField from "@/app/_components/common/form/element-properties/element-border-radius-formfield";
import ElementColorFormField from "@/app/_components/common/form/element-properties/element-color-formfield";
import ElementCountdownFormField from "@/app/_components/common/form/element-properties/element-countdown-formfield";
import ElementFontFormField from "@/app/_components/common/form/element-properties/element-font-formfield";
import ElementhrefFormField from "@/app/_components/common/form/element-properties/element-href-formfield";
import ElementScheduleFormField from "@/app/_components/common/form/element-properties/element-schedule-formfield";
import ElementTitleFormField from "@/app/_components/common/form/element-properties/element-title-formfield";
import Divider from "@/app/_components/common/shared/devider";
import ElementThemeSelector from "@/app/_components/elements_theme/element-theme-selector";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, ChevronLeft, TrashIcon } from "lucide-react";
import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

function PropertiesComponent({ elementInstance, isSilver }) {
  const element = elementInstance;
  const dispatch = useDispatch();

  const form = useForm({
    // resolver: zodResolver(cardFieldSchems),
    defaultValues: {
      title: element.extraAttributes.title || "",
      href: element.extraAttributes.href || "",
      font: element.extraAttributes.font || "",
      textColor: element.extraAttributes.textColor || "",
      bgColor: element.extraAttributes.bgColor || "",
      borderRadius: element.extraAttributes.borderRadius || "",
      schedule: element.extraAttributes.schedule || false,
      scheduleStart: element.extraAttributes.scheduleStart || "0",
      scheduleEnd: element.extraAttributes.scheduleEnd || "0",
      countdown: element.extraAttributes.countdown || false,
      countdownDate: element.extraAttributes.countdownDate || "0",
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
      bgColor,
      borderRadius,
      href,
      font,
      schedule,
      scheduleStart,
      scheduleEnd,
      countdown,
      countdownDate,
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
        },
      },
    };

    toast.success("تغییرات با موفقیت اعمال شد");

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
          <div className="h-full w-full">
            <form
              className="flex h-full flex-col gap-5 text-text/90"
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
                  <ElementhrefFormField
                    form={form}
                    message="آدرس فید را اینجا وارد کنید"
                  />

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
                  {/* Border radius */}
                  <ElementBorderRadiusFormField form={form} />

                  {/* Background Color */}
                  <ElementColorFormField
                    form={form}
                    label="رنگ پس زمینه"
                    fieldName="bgColor"
                  />
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
                      showToggle={true}
                      countdownData={element.extraAttributes}
                      form={form}
                      isSilver={isSilver}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              {/* Mobile drawer button */}
              <button
                type="submit"
                className="absolute -top-16 right-2 flex cursor-pointer items-center justify-center rounded-full bg-green-500 p-2 duration-200 hover:bg-green-600 sm:right-0 md:hidden"
              >
                <Check className="h-4 w-4 text-white" />
              </button>

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

                {/* Desktop sidebar button */}
                <button
                  type="submit"
                  className="mt-4 hidden h-12 w-full cursor-pointer items-center justify-center rounded-md bg-green-500 p-2 text-white duration-200 hover:bg-green-600 sm:right-0 md:flex"
                >
                  اعمال تغییرات
                </button>

                {/* Delete element buttons */}
                <div>
                  <DeleteElementBtn id={element?.id}>
                    <Button
                      asChild
                      variant="destructive"
                      className="mt-2 hidden h-12 w-full cursor-pointer items-center justify-center p-2 duration-200 md:flex"
                    >
                      <span>
                        حذف بلوک
                        <TrashIcon className="h-4 w-4 text-white" />
                      </span>
                    </Button>
                  </DeleteElementBtn>

                  <DeleteElementBtn id={element?.id}>
                    <button
                      variant="destructive"
                      className="absolute -top-16 left-2 flex cursor-pointer items-center justify-center rounded-full bg-destructive p-2 duration-200 hover:bg-green-600 md:right-0 md:hidden"
                    >
                      <TrashIcon className="h-4 w-4 text-white" />
                    </button>
                  </DeleteElementBtn>
                </div>
              </div>
            </form>
          </div>
        </Suspense>
      </Form>
    </>
  );
}

export default PropertiesComponent;
