"use client";

import ElementBorderRadiusFormField from "@/app/_components/common/form/element-properties/element-border-radius-formfield";
import ElementCardLayoutFormField from "@/app/_components/common/form/element-properties/element-card-layout-formfield";
import ElementFontFormField from "@/app/_components/common/form/element-properties/element-font-formfield";
import ElementhrefFormField from "@/app/_components/common/form/element-properties/element-href-formfield";
import ElementScheduleFormField from "@/app/_components/common/form/element-properties/element-schedule-formfield";
import ElementColorFormField from "@/app/_components/common/form/element-properties/element-color-formfield";
import ElementTitleFormField from "@/app/_components/common/form/element-properties/element-title-formfield";
import Divider from "@/app/_components/common/shared/devider";
import { ElementThemeController } from "@/app/_components/controller/element-theme-controller";
import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useUserSubscription } from "@/hooks/useUserSubscription";
import { Check } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const UploadButton = dynamic(
  () => import("@/app/_components/common/input/card-element-image-uploader"),
);

function PropertiesComponent({ elementInstance }) {
  const element = elementInstance;
  const dispatch = useDispatch();

  const { isSilver } = useUserSubscription();

  const RenderElement =
    ElementThemeController[element.type][element.extraAttributes.theme][0];

  const form = useForm({
    // TODO: Create zod schema
    // resolver: zodResolver(),
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
      scheduleStart: element.extraAttributes.scheduleStart || 0,
      scheduleEnd: element.extraAttributes.scheduleEnd || 0,
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
            className="flex flex-col gap-5 text-primary"
            onSubmit={form.handleSubmit(applyChanges)}
          >
            <Tabs dir="rtl" defaultValue="content" className="">
              <TabsList className="mb-2">
                <TabsTrigger value="content">محتوا</TabsTrigger>
                <TabsTrigger value="design">طراحی</TabsTrigger>
                <TabsTrigger value="visibility">نمایش</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="flex flex-col gap-4">
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
                  label="رنگ نوشته"
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
                  <p className="text-xs text-textLight">
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
              className="mt-4 hidden h-12 cursor-pointer items-center justify-center rounded-sm bg-green-500 p-2 text-white duration-200 hover:bg-green-600 sm:right-0 md:flex"
            >
              اعمال تغییرات
            </button>
          </form>
        </Suspense>
      </Form>
    </>
  );
}

export default PropertiesComponent;
